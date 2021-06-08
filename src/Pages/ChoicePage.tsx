import React, { useEffect, useMemo, useState } from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import styled from "styled-components"
import "swiper/components/navigation/navigation.scss"
import "swiper/components/pagination/pagination.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.scss"
import { gameConfigAtom } from "../Constant/atoms"
import { userConfigSelector } from "../Constant/selectors"
import AmyResource from "../Resources/Images/amy.png"
import AmyNameResource from "../Resources/Images/amy_name.png"
import AndrewResource from "../Resources/Images/andrew.png"
import AndrewNameResource from "../Resources/Images/andrew_name.png"
import BellaResource from "../Resources/Images/bella.png"
import BellaNameResource from "../Resources/Images/bella_name.png"
import BrianResource from "../Resources/Images/brian.png"
import BrianNameResource from "../Resources/Images/brian_name.png"
import CarlResource from "../Resources/Images/carl.png"
import CarlNameResource from "../Resources/Images/carl_name.png"
import ChoiceAlertResource from "../Resources/Images/choice_alert.png"
import ClairResource from "../Resources/Images/clair.png"
import ClairNameResource from "../Resources/Images/clair_name.png"
import DebugResource from "../Resources/Images/debug.png"
import DebugNameResource from "../Resources/Images/debug_name.png"
import BGMPlayer from "../Utils/BGMPlayer"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#ee609c, #b565d9);
`

const ChoiceAlert = styled.img`
  width: 85%;
  position: absolute;
  top: 4%;
  left: 50%;
  transform: translate(-50%, 0px);
`

const CharacterSet = styled(Swiper)`
  width: 100%;
  height: 100%;
`

const CharacterContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const CharacterImage = styled.img`
  object-fit: contain;
  object-position: bottom center;
  height: 80%;
`

const CharacterName = styled.img`
  height: 60px;
  object-fit: contain;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -100%);
`

const ChoicePage: React.FC<RouteComponentProps> = ({ history }) => {
  const setGameConfig = useSetRecoilState(gameConfigAtom)
  const userConfig = useRecoilValue(userConfigSelector)
  const [config, setConfig] = useState({
    swiper: null as any,
    slidesPerView: (window.innerWidth / 400) as number,
  })

  const onCharacterClick = (characterName: string) => (e: React.MouseEvent) => {
    if (!config?.swiper) return
    const { activeIndex } = config?.swiper as any
    const targetIndex = characters.findIndex(({ name }) => name === characterName)
    if (targetIndex < 0) return
    if (activeIndex !== targetIndex) {
      config.swiper.slideTo(targetIndex)
    } else if (characterName === "debug") {
      setGameConfig((gameConfig) => ({ ...gameConfig, characterName }))
      history.push(`/game/debug`)
      BGMPlayer.pause()
    } else {
      setGameConfig((gameConfig) => ({ ...gameConfig, characterName }))
      history.push(`/video/${characterName}`)
      BGMPlayer.pause()
    }
  }

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setConfig((config) => ({ ...config, slidesPerView: window.innerWidth / 375 }))
    })
  }, [])

  const targetGender = {
    male:
      userConfig.sexualOrientation === "both" ||
      (userConfig.gender === "male" && userConfig.sexualOrientation === "same") ||
      (userConfig.gender === "female" && userConfig.sexualOrientation === "opposite"),
    female:
      userConfig.sexualOrientation === "both" ||
      (userConfig.gender === "female" && userConfig.sexualOrientation === "same") ||
      (userConfig.gender === "male" && userConfig.sexualOrientation === "opposite"),
  }
  const characters = useMemo(
    () =>
      [
        { name: "debug", image: DebugResource, nameImage: DebugNameResource, isShow: process.env.NODE_ENV === "development" },
        { name: "amy_male", image: AmyResource, nameImage: AmyNameResource, isShow: targetGender.female && userConfig.gender === "male" },
        { name: "amy_female", image: AmyResource, nameImage: AmyNameResource, isShow: targetGender.female && userConfig.gender === "female" },
        { name: "bella", image: BellaResource, nameImage: BellaNameResource, isShow: targetGender.female },
        { name: "clair", image: ClairResource, nameImage: ClairNameResource, isShow: targetGender.female },
        { name: "andrew", image: AndrewResource, nameImage: AndrewNameResource, isShow: targetGender.male },
        { name: "brian_male", image: BrianResource, nameImage: BrianNameResource, isShow: targetGender.male && userConfig.gender === "male" },
        { name: "brian_female", image: BrianResource, nameImage: BrianNameResource, isShow: targetGender.male && userConfig.gender === "female" },
        { name: "carl", image: CarlResource, nameImage: CarlNameResource, isShow: targetGender.male },
      ].filter((character) => character.isShow),
    [userConfig],
  )

  return (
    <Container>
      <ChoiceAlert src={ChoiceAlertResource}></ChoiceAlert>
      <CharacterSet pagination={{ clickable: true }} spaceBetween={50} slidesPerView={config.slidesPerView} centeredSlides onSwiper={(swiper) => setConfig((config) => ({ ...config, swiper }))}>
        {characters.map(({ name, image, nameImage }) => (
          <SwiperSlide key={name}>
            <CharacterContainer onClick={onCharacterClick(name)}>
              <CharacterImage src={image} />
              <CharacterName src={nameImage}></CharacterName>
            </CharacterContainer>
          </SwiperSlide>
        ))}
      </CharacterSet>
    </Container>
  )
}

export default withRouter(ChoicePage)
