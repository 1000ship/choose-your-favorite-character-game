import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

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
  const gameScene = useRecoilValue(gameSceneSelector);
  useEffect(() => {
    if (!gameScene.backgroundSound?.length) return;
    BGMPlayer.play(gameScene.backgroundSoundPath as string);
  }, [gameScene.backgroundSoundPath, gameScene.backgroundSound]);
}
