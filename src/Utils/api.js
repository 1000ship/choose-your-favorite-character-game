import MemoryData from "./MemoryData";
import { ENDING_COUNTER_STORAGE_KEY } from "./constant";

export const loadScript = async (fileName) => {
  const filePath = `./res/scenes/${fileName}`;
  console.log( filePath )
  const data = await fetch(filePath);
  const scenes = await data.json();
  return scenes;
};


export const endingCounter = {
  countUp: (characterName, sceneId) => {
    const key = `${characterName}${sceneId}`
    console.log( key, "counted up");
    const endingCounter = JSON.parse(localStorage.getItem(ENDING_COUNTER_STORAGE_KEY) ?? "{}");
    if( endingCounter[key] )
      endingCounter[key] = parseInt(endingCounter[key]) + 1;
    else
      endingCounter[key] = 1;
    localStorage.setItem(ENDING_COUNTER_STORAGE_KEY, JSON.stringify(endingCounter))
  },
  getEndingCounter: () => {
    return JSON.parse(localStorage.getItem(ENDING_COUNTER_STORAGE_KEY) ?? "{}");
  },
  resetEndingCounter: () => {
    localStorage.setItem(ENDING_COUNTER_STORAGE_KEY, "{}")
  }
}