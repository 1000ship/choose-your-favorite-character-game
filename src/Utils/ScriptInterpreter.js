export const SCRIPT_AMY_MALE = "amy_male.txt";
export const SCRIPT_AMY_FEMALE = "amy_female.txt";
export const SCRIPT_BELLA = "bella.txt";
export const SCRIPT_CLAIR = "clair.txt";

const ScriptInterpreter = function (folderName = "") {
  this.folderName = folderName;
  this.scenes = [];
  this.currentScene = null;

  this.setFolderName = (folderName) => {
    this.folderName = folderName;
  };

  this.setScenes = (scenes) => {
    this.scenes = scenes;
    this.currentScene = this.scenes[0];
  };

  this.getNextScene = (nextSceneId) => {
    const nextSceneIndex = this.scenes.findIndex(
      (scene) => scene.sceneId === nextSceneId
    );
    if (nextSceneIndex === -1) {
      alert(`${nextSceneId}이 존재하지 않음`);
      return;
    }
    this.currentScene = this.scenes[nextSceneIndex];
    console.log(this.currentScene);
    return this.currentScene;
  };
};

export default ScriptInterpreter;
