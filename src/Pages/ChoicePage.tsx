import React, { useCallback, useMemo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { gameConfigAtom } from '../Constant/atoms';
import { userConfigSelector } from '../Constant/selectors';
import AmyResource from '../Resources/Images/amy.png';
import AmyNameResource from '../Resources/Images/amy_name.png';
import AndrewResource from '../Resources/Images/andrew.png';
import AndrewNameResource from '../Resources/Images/andrew_name.png';
import BellaResource from '../Resources/Images/bella.png';
import BellaNameResource from '../Resources/Images/bella_name.png';
import BrianResource from '../Resources/Images/brian.png';
import BrianNameResource from '../Resources/Images/brian_name.png';
import CarlResource from '../Resources/Images/carl.png';
import CarlNameResource from '../Resources/Images/carl_name.png';
import ChoiceAlertResource from '../Resources/Images/choice_alert.png';
import ChoiceAlert2Resource from '../Resources/Images/choice_alert_2.png';
import ClairResource from '../Resources/Images/clair.png';
import ClairNameResource from '../Resources/Images/clair_name.png';
import DebugResource from '../Resources/Images/debug.png';
import DebugNameResource from '../Resources/Images/debug_name.png';
import BGMPlayer from '../Utils/BGMPlayer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(#ee609c, #b565d9);
`;

const ChoiceAlert = styled.img`
  align-self: center;
  width: 80%;
  flex: 0 0 15vh;
  object-fit: contain;
  object-position: center;
  @media (max-width: 512px) {
    width: 95%;
  }
`;

const ScrollView = styled.div`
  flex: 1;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
`;

const CharacterSet = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
`;

const Character = styled.div`
  position: relative;
  width: 60vh;
  flex-shrink: 0;
  height: 100%;
  overflow: visible;
  cursor: pointer;
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: bottom center;
`;

const CharacterName = styled.img`
  position: absolute;
  max-width: 100%;
  object-fit: contain;
  height: 10vh;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%, 0px);
`;

const ChoicePage: React.FC<RouteComponentProps> = ({ history }) => {
  const setGameConfig = useSetRecoilState(gameConfigAtom);
  const userConfig = useRecoilValue(userConfigSelector);

  const onCharacterClick = (characterName: string) => (e: React.MouseEvent) => {
    setGameConfig((gameConfig) => ({ ...gameConfig, characterName }));
    history.push(
      characterName === 'debug' ? `/game/debug` : `/video/${characterName}`,
    );
    BGMPlayer.pause();
  };

  const [autoScroll, setAutoScroll] = useState({
    enabled: true,
    to: 'right' as 'left' | 'right',
  });

  const targetGender = {
    male:
      userConfig.sexualOrientation === 'both' ||
      (userConfig.gender === 'male' &&
        userConfig.sexualOrientation === 'same') ||
      (userConfig.gender === 'female' &&
        userConfig.sexualOrientation === 'opposite'),
    female:
      userConfig.sexualOrientation === 'both' ||
      (userConfig.gender === 'female' &&
        userConfig.sexualOrientation === 'same') ||
      (userConfig.gender === 'male' &&
        userConfig.sexualOrientation === 'opposite'),
  };

  const characters = useMemo(
    () =>
      [
        {
          name: 'debug',
          image: DebugResource,
          nameImage: DebugNameResource,
          isShow: process.env.NODE_ENV === 'development',
        },
        {
          name: 'amy_male',
          image: AmyResource,
          nameImage: AmyNameResource,
          isShow: targetGender.female && userConfig.gender === 'male',
        },
        {
          name: 'amy_female',
          image: AmyResource,
          nameImage: AmyNameResource,
          isShow: targetGender.female && userConfig.gender === 'female',
        },
        {
          name: 'andrew',
          image: AndrewResource,
          nameImage: AndrewNameResource,
          isShow: targetGender.male,
        },
        {
          name: 'bella',
          image: BellaResource,
          nameImage: BellaNameResource,
          isShow: targetGender.female,
        },
        {
          name: 'brian_male',
          image: BrianResource,
          nameImage: BrianNameResource,
          isShow: targetGender.male && userConfig.gender === 'male',
        },
        {
          name: 'brian_female',
          image: BrianResource,
          nameImage: BrianNameResource,
          isShow: targetGender.male && userConfig.gender === 'female',
        },
        {
          name: 'clair',
          image: ClairResource,
          nameImage: ClairNameResource,
          isShow: targetGender.female,
        },
        {
          name: 'carl',
          image: CarlResource,
          nameImage: CarlNameResource,
          isShow: targetGender.male,
        },
      ].filter((character) => character.isShow),
    [userConfig, targetGender],
  );

  // 굉장히 복잡함.. 리팩토링..
  const scrollViewRef = useCallback(
    (scrollView: HTMLDivElement) => {
      if (!scrollView) return;
      const totalScroll = scrollView.scrollWidth - scrollView.offsetWidth;

      let _id: number | null = null;
      function tickAutoScroll() {
        if (autoScroll.to === 'left') {
          const dx = Math.max((scrollView.scrollLeft - 0) * 0.01, 1);
          scrollView.scrollBy(-dx, 0);
          if (scrollView.scrollLeft <= 10) {
            setAutoScroll((state) => ({ ...state, to: 'right' }));
            scrollView.removeEventListener('wheel', transformScroll);
            scrollView.removeEventListener('touchmove', transformScroll);
          } else {
            _id = requestAnimationFrame(tickAutoScroll);
          }
        } else if (autoScroll.to === 'right') {
          const dx = Math.max((totalScroll - scrollView.scrollLeft) * 0.01, 1);
          scrollView.scrollBy(dx, 0);
          if (totalScroll - 10 <= scrollView.scrollLeft) {
            setAutoScroll((state) => ({ ...state, to: 'left' }));
            scrollView.removeEventListener('wheel', transformScroll);
            scrollView.removeEventListener('touchmove', transformScroll);
          } else {
            _id = requestAnimationFrame(tickAutoScroll);
          }
        }
      }
      if (autoScroll.enabled) requestAnimationFrame(tickAutoScroll);

      function transformScroll(event: any) {
        if (autoScroll.enabled) {
          if (_id) cancelAnimationFrame(_id);
          setAutoScroll((state) => ({ ...state, enabled: false }));
          scrollView.removeEventListener('wheel', transformScroll);
          scrollView.removeEventListener('touchmove', transformScroll);
        } else {
          if (!event.deltaY) return;
          scrollView.scrollLeft += event.deltaY + event.deltaX;
          event.preventDefault();
        }
      }

      scrollView.addEventListener('wheel', transformScroll);
      scrollView.addEventListener('touchmove', transformScroll);
      return () => {
        scrollView.removeEventListener('wheel', transformScroll);
        scrollView.removeEventListener('touchmove', transformScroll);
      };
    },
    [autoScroll],
  );

  return (
    <Container>
      <ChoiceAlert
        style={{ height: '5vh' }}
        src={
          characters.length >= 6 ? ChoiceAlert2Resource : ChoiceAlertResource
        }
        alt={`You have matched with ${characters.length} people!`}
      />
      <ScrollView ref={scrollViewRef}>
        <div style={{ width: '20vw' }} />
        <CharacterSet>
          {characters.map(({ name, image, nameImage }) => (
            <Character key={name} onClick={onCharacterClick(name)}>
              <CharacterImage src={image} alt={name} />
              <CharacterName src={nameImage} alt={name} />
            </Character>
          ))}
        </CharacterSet>
        <div style={{ width: '20vw' }} />
      </ScrollView>
    </Container>
  );
};

export default withRouter(ChoicePage);
