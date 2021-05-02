import { selector } from "recoil";
import {gameSceneAtom} from "./atoms"

export const gameSceneSelector = selector({
  key: "gameSceneSelector",
  get({get}){
    const gameScene = get(gameSceneAtom)
    return {
      ...gameScene,
      // characterImage,
      // backgroundImage,
      // sceneSound,
      // backgroundSound,
    }
  },
  set({set}, value) {
    set(value)
  }
})