import { atom } from "recoil";
import { DEFAULT_SCENE } from ".";
import { MeetStep, Scene, SceneType } from "./types";
import { IGameConfig } from "./types";

function getGameCharacter(): string {
  const hashRoute = window.location.hash.split("/");
  if (hashRoute[1] === "game" && hashRoute[2]) {
    return hashRoute[2];
  }
  return "";
}

export const gameConfigAtom = atom<IGameConfig>({
  key: "gameConfig",
  default: {
    characterName: getGameCharacter(),
    sceneType: "text" as SceneType,
    meetStep: "script" as MeetStep,
    isGameOver: false as boolean,
  },
});

export const gameSceneAtom = atom<Scene>({
  key: "gameScene",
  default: DEFAULT_SCENE as Scene,
});
