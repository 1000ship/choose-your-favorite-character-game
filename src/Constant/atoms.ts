import { atom } from "recoil";
import { DEFAULT_SCENE } from ".";
import { Scene } from "./types";

function getGameCharacter(): string {
  const hashRoute = window.location.hash.split("/");
  if (hashRoute[1] === "game" && hashRoute[2]) {
    return hashRoute[2];
  }
  return "";
}

interface IGameConfigAtom {
  characterName: string;
}
export const gameConfigAtom = atom<IGameConfigAtom>({
  key: "gameConfig",
  default: {
    characterName: getGameCharacter(),
  },
});


export const gameSceneAtom = atom<Scene>({
  key: "gameScene",
  default: DEFAULT_SCENE as Scene,
});
