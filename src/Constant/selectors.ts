import { selector } from "recoil";
import { gameConfigAtom, gameSceneAtom } from "./atoms";
import { Scene } from "./types";

export const gameSceneSelector = selector<Scene>({
  key: "gameSceneSelector",
  get({ get }) {
    const gameConfig = get(gameConfigAtom);
    const gameScene = get(gameSceneAtom);
    return {
      ...gameScene,
      characterImagePath: `./res/img/character/${gameConfig.characterName}/${gameScene.characterImage}`,
      backgroundImagePath: `./res/img/background/${gameConfig.characterName}/${gameScene.backgroundImage}`,
      sceneSoundPath: `./res/sounds/${gameConfig.characterName}/${gameScene.sceneSound}`,
      backgroundSoundPath: `./res/bgm/${gameConfig.characterName}/${gameScene.backgroundSound}`,
    };
  },
  set({ set }, value: any) {
    set(gameSceneAtom, value)
  },
});
