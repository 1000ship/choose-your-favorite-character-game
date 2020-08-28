import { useState, useEffect } from "react";

const ScriptInterpreter = function (fileName) {
  const currentSceneState = useState({ characterName: "", sceneScript: "", options:[] });
  const filePath = `./res/scenes/${fileName}`;
  this.scenes = [];
  this.currentScene = currentSceneState[0];
  this.setCurrentScene = currentSceneState[1];

  useEffect(async () => {
    const data = await fetch(filePath);
    this.scenes = await data.json();
    this.setCurrentScene(this.scenes[0]);
  }, []);

  useEffect(() => console.log(this.currentScene), [this.currentScene]);

  this.getNextScene = (optionIndex) => {
    const nextSceneId = this.currentScene.options[optionIndex].nextId;
    const nextSceneIndex = this.scenes.findIndex(
      (scene) => scene.sceneId === nextSceneId
    );
    this.setCurrentScene(this.scenes[nextSceneIndex]);
  };
};

export default ScriptInterpreter;
