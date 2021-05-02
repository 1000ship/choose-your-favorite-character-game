import { Scene } from "../Constant/types";

export const SCRIPT_AMY_MALE = "amy_male.txt";
export const SCRIPT_AMY_FEMALE = "amy_female.txt";
export const SCRIPT_BELLA = "bella.txt";
export const SCRIPT_CLAIR = "clair.txt";

class ScriptInterpreter {
  folderName: string;
  scenes: Scene[];
  currentScene: Scene | null;

  constructor(folderName: string = "") {
    this.folderName = folderName as string;
    this.scenes = [] as Scene[];
    this.currentScene = null;
  }

  setFolderName(folderName: string) {
    this.folderName = folderName;
  }

  setScenes(scenes: Scene[]) {
    this.scenes = scenes;
    this.currentScene = this.scenes[0];
  }

  getNextScene(nextSceneId: string) {
    const nextSceneIndex = this.scenes.findIndex((scene) => scene.sceneId === nextSceneId);
    if (nextSceneIndex === -1) {
      alert(`${nextSceneId}이 존재하지 않음`);
      return;
    }
    this.currentScene = this.scenes[nextSceneIndex];
    console.log(this.currentScene);
    return this.currentScene;
  }
}

export default ScriptInterpreter;
