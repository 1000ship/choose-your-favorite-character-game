import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { gameSceneSelector } from "../Constant/selectors";
import BGMPlayer from "./BGMPlayer";
import SoundPlayer from "./SoundPlayer";

export function useSound() {
  const gameScene = useRecoilValue(gameSceneSelector);
  useEffect(() => {
    const path = gameScene.sceneSoundPath ?? ""
    if( !path.length ) return
    // console.log(gameScene.sceneSoundPath, "목소리 재생");
    SoundPlayer.play(path)
  }, [gameScene.sceneSoundPath]);
}

export function useBGM() {
  const gameScene = useRecoilValue(gameSceneSelector);
  useEffect(() => {
    const path = gameScene.backgroundSoundPath ?? ""
    if( !path.length ) return
    // console.log(gameScene.backgroundSoundPath, "배경음악 재생");
    BGMPlayer.play(path)
  }, [gameScene.backgroundSoundPath]);
}