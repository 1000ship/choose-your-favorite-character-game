import { useState, useEffect } from "react";
import { DEFAULT_SCENE } from "../Utils/constant";

const ScriptInterpreter = function () {
  this.scenes = [];
  this.currentScene = null;

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
  };
};

export default ScriptInterpreter;
