import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import ChoiceAlertResource from "../Resources/Images/choice_alert.png";
import AmyResource from "../Resources/Images/amy.png";
import BellaResource from "../Resources/Images/bella.png";
import ClairResource from "../Resources/Images/clair.png";
import AmyNameResource from "../Resources/Images/amy_name.png";
import BellaNameResource from "../Resources/Images/bella_name.png";
import ClairNameResource from "../Resources/Images/clair_name.png";
import { BGM_AMY, BGM_BELLA, BGM_CLAIR } from "../Utils/constant";
import BGMPlayer from "../Utils/BGMPlayer";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#ee609c, #b565d9);
`;

const ChoiceAlert = styled.img`
  width: 85%;
  position: absolute;
  top: 4%;
  left: 50%;
  transform: translate(-50%, 0px);
`;

const CharacterSet = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const CharacterImage = styled.div`
  cursor: pointer;
  background-image: url(${({ imageSrc }) => imageSrc});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom center;
  height: 100%;
  position: relative;
`;

const CharacterName = styled.img`
  width: 200px;
  object-fit: contain;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -100%);
`;

const ChoicePage = ({ history }) => {

  const [config, setConfig] = useState({
    swiper: null,
    slidesPerView: window.innerWidth / 375
  })

  const onCharacterClick = (characterName) => (e) => {
    if( !config?.swiper ) return;
    const {activeIndex} = config?.swiper
    const targetIndex = characters.findIndex( ({name}) => name === characterName )
    if( targetIndex < 0 ) return;
    if( activeIndex !== targetIndex ) {
      config.swiper.slideTo( targetIndex )
    } else if ( characterName === "debug") {
      history.push(`/game/debug`)
      BGMPlayer.pause();
    } else { 
      history.push(`/video/${characterName}`);
      BGMPlayer.pause();
    }
  };

  useEffect( () => {
    window.addEventListener("resize", (e) => {
      setConfig( config => ({...config, slidesPerView: window.innerWidth / 375})) 
    })
  }, [])

  const characters = useMemo( () => [
    { name: "amy", image: AmyResource, nameImage: AmyNameResource },
    { name: "bella", image: BellaResource, nameImage: BellaNameResource },
    { name: "clair", image: ClairResource, nameImage: ClairNameResource },
    { name: "debug", image: AmyResource, nameImage: AmyNameResource },
  ], [])

  return (
    <Container>
      <ChoiceAlert src={ChoiceAlertResource}></ChoiceAlert>
      <CharacterSet
        // navigation
        pagination={{clickable: true}}
        spaceBetween={50}
        slidesPerView={config.slidesPerView}
        centeredSlides
        onSlideChange={(swiper) => console.log(swiper.activeIndex)}
        onSwiper={(swiper => setConfig(config => ({...config, swiper})))}
      >
        {
          characters.map( ({name, image, nameImage}) =>
            <SwiperSlide key={name}>
              <CharacterImage onClick={onCharacterClick(name)} imageSrc={image}>
                <CharacterName src={nameImage}></CharacterName>
              </CharacterImage>
            </SwiperSlide>
          )
        }
      </CharacterSet>
    </Container>
  );
};

export default withRouter(ChoicePage);
