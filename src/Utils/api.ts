import { DEBUG_LINK, ENDING_COUNTER_STORAGE_KEY } from "../Constant";

export const loadScript = async (fileName: string) => {
  try {
    let filePath = `./res/scenes/${fileName}.txt`;
    if( fileName === "debug")
      filePath = `${DEBUG_LINK}/${fileName}/script.txt`
    const data = await fetch(filePath);
    const scenes = await data.json();
    return scenes;
  } catch ( error ) {
    return {}
  }
};

export const endingCounter = {
  countUp: (characterName: string, sceneId: string) => {
    const key = `${characterName}${sceneId}`
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