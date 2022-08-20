import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { RESOURCE_PATH } from '../Constant';
import { isiOS } from '../Constant/environment';

import { gameConfigSelector, gameSceneSelector } from '../Constant/selectors';

import BGMPlayer from './BGMPlayer';
import SoundPlayer from './SoundPlayer';

export function useSound() {
  const gameConfig = useRecoilValue(gameConfigSelector);
  const gameScene = useRecoilValue(gameSceneSelector);
  useEffect(() => {
    const path = gameScene.sceneSoundPath?.trim() ?? '';
    if (!path.length) return;

    if (process.env.NODE_ENV === 'development')
      toast.info(`Sound Path : ${path}`);
    SoundPlayer.play(path);
  }, [gameScene.sceneSoundPath]);

  return {
    manuallyPlay: (link: string) => {
      const path =
        link.length > 0
          ? encodeURI(
              `${RESOURCE_PATH}/characters/${gameConfig.characterName}/sound/${link}`,
            ).replaceAll('#', '%23')
          : '';
      if (!path.length) return;
      SoundPlayer.play(path);
    },
  };
}

export function useBGM() {
  const [didManuallyPlay, setDidManuallyPlay] = useState(!isiOS);

  const gameScene = useRecoilValue(gameSceneSelector);
  useEffect(() => {
    if (!gameScene.backgroundSound?.length) return;
    if (process.env.NODE_ENV === 'development')
      toast.info(`BGM : ${gameScene.backgroundSound}`);
    BGMPlayer.play(gameScene.backgroundSoundPath as string);
  }, [gameScene.backgroundSoundPath, gameScene.backgroundSound]);

  return {
    manuallyPlay: () => {
      if (didManuallyPlay) return;
      BGMPlayer.play(gameScene.backgroundSoundPath as string);
      setDidManuallyPlay(true);
    },
  };
}
