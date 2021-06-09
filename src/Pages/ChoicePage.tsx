import React, { useCallback, useMemo } from "react"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import styled from "styled-components"
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
import ChoiceAlert2Resource from "../Resources/Images/choice_alert_2.png"
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
  align-self: center;
  width: 80%;
  flex: 0 0 15vh;
  object-fit: contain;
  object-position: center;
  @media (max-width: 512px) {
    width: 95%;
  }
`

const CharacterSet = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100vw;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`

const Character = styled.div`
  flex: 0 0 300px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const CharacterImage = styled.img`
  height: 100%;
  object-fit: contain;
  object-position: bottom center;
`

const CharacterName = styled.img`
  height: 44px;
  object-fit: contain;
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%, 0px);
`

const ChoicePage: React.FC<RouteComponentProps> = ({ history }) => {
  const setGameConfig = useSetRecoilState(gameConfigAtom)
  const userConfig = useRecoilValue(userConfigSelector)

  const onCharacterClick = (characterName: string) => (e: React.MouseEvent) => {
    setGameConfig((gameConfig) => ({ ...gameConfig, characterName }))
    history.push(characterName === "debug" ? `/game/debug` : `/video/${characterName}`)
    BGMPlayer.pause()
  }

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
        { name: "andrew", image: AndrewResource, nameImage: AndrewNameResource, isShow: targetGender.male },
        { name: "bella", image: BellaResource, nameImage: BellaNameResource, isShow: targetGender.female },
        { name: "brian_male", image: BrianResource, nameImage: BrianNameResource, isShow: targetGender.male && userConfig.gender === "male" },
        { name: "brian_female", image: BrianResource, nameImage: BrianNameResource, isShow: targetGender.male && userConfig.gender === "female" },
        { name: "clair", image: ClairResource, nameImage: ClairNameResource, isShow: targetGender.female },
        { name: "carl", image: CarlResource, nameImage: CarlNameResource, isShow: targetGender.male },
      ].filter((character) => character.isShow),
    [userConfig],
  )

  const characterSetRef = useCallback((characterSet: HTMLDivElement) => {
    if (!characterSet) return
    characterSet.scrollTo({
      left: characterSet.scrollWidth / 2 - window.outerWidth / 2,
    })

    function transformScroll(event: any) {
      if (!event.deltaY) return
      characterSet.scrollLeft += event.deltaY + event.deltaX
      event.preventDefault()
    }

    characterSet.addEventListener("wheel", transformScroll)
    return () => characterSet.removeEventListener("wheel", transformScroll)
  }, [])

  return (
    <Container>
      <ChoiceAlert src={characters.length >= 6 ? ChoiceAlert2Resource : ChoiceAlertResource} alt={`You have matched with ${characters.length} people!`}></ChoiceAlert>
      <CharacterSet ref={characterSetRef}>
        <div style={{ flexShrink: 0, flexBasis: 30 }}></div>
        {characters.map(({ name, image, nameImage }) => (
          <Character onClick={onCharacterClick(name)}>
            <CharacterImage src={image} alt={name} />
            <CharacterName src={nameImage} alt={name}></CharacterName>
          </Character>
        ))}
        <div style={{ flexShrink: 0, flexBasis: 30 }}></div>
      </CharacterSet>
    </Container>
  )
}

export default withRouter(ChoicePage)
