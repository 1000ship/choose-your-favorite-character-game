import { atom } from "recoil";
import { DEFAULT_SCENE } from "../Utils/constant";

function getGameCharacter() {
  const hashRoute = window.location.hash.split("/");
  if (hashRoute[1] === "game" && hashRoute[2]) {
    return hashRoute[2];
  }
  return null;
}

console.log("hash", window.location.hash);
export const gameConfigAtom = atom({
  key: "gameConfig",
  default: {
    character: getGameCharacter(),
  },
});

export const gameSceneAtom = atom({
  key: "gameScene",
  default: DEFAULT_SCENE,
});
