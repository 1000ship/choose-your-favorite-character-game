import { useState, useEffect } from "react";

const ScriptInterpreter = function (fileName) {
  const currentSceneState = useState({
    characterName: "",
    sceneScript: "",
    options: [],
  });
  const filePath = `./res/scenes/${fileName}`;
  this.scenes = [];
  this.currentScene = currentSceneState[0];
  this.setCurrentScene = currentSceneState[1];

  useEffect(() => {
    (async () => {
      const data = await fetch(filePath);
      this.scenes = await data.json();
      this.setCurrentScene(this.scenes[0]);
    })();
  }, []);

  useEffect(() => console.log(this.currentScene), [this.currentScene]);

  this.getNextScene = (nextSceneId) => {
    const nextSceneIndex = this.scenes.findIndex(
      (scene) => scene.sceneId === nextSceneId
    );
    if( nextSceneIndex === -1 )
    {
      alert( `${nextSceneId}이 존재하지 않음`)
      return;
    }
    this.setCurrentScene(this.scenes[nextSceneIndex]);
  };
};

export default ScriptInterpreter;
