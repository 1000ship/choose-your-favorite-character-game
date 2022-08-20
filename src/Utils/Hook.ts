import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { isAndroid, isiOS } from '../Constant/environment';

import { gameSceneSelector } from '../Constant/selectors';

import BGMPlayer from './BGMPlayer';
import SoundPlayer from './SoundPlayer';

export function useSound() {
  const gameScene = useRecoilValue(gameSceneSelector);
  useEffect(() => {
    const path = gameScene.sceneSoundPath ?? '';
    if (!path.length) return;
    SoundPlayer.play(path);
  }, [gameScene.sceneSoundPath]);
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
