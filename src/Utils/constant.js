export const DEFAULT_SCENE = {
  sceneId: "",
  characterName: "",
  sceneScript: "",
  characterImage: "",
  backgroundImage: "",
  sceneSound: "",
  nextSceneId: "",
  options: [
    {
      answer: "",
      reaction: "",
      nextId: "",
    },
  ],
  sceneType: "meet",
};

export const SCENE_TYPE_TEXT = "text"
export const SCENE_TYPE_MEET = "meet"
export const SCENE_TYPE_ENDING = "ending"

export const MEET_STEP_SCRIPT = "script";
export const MEET_STEP_OPTION = "option";
export const MEET_STEP_REACTION = "reaction";