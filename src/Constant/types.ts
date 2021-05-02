export type MeetStep = "script" | "option" | "reaction" | "ending";
export type SceneType = "meet" | "text" | "ending";

export interface IGameConfig {
  characterName: string;
  sceneType: SceneType;
  scenes?: Scene[];
  meetStep: MeetStep;
  isGameOver?: boolean;
}

export interface SceneOption {
  answer?: string;
  reaction?: string;
  nextId?: string;
}
export interface Scene {
  sceneId: string;
  characterName: string;
  sceneScript: string;
  characterImage: string;
  backgroundImage: string;
  sceneSound: string;
  backgroundSound: string;
  nextSceneId: string;
  options: SceneOption[];
  sceneType: SceneType;
  selectedOption?: SceneOption;
  characterImagePath?: string;
  backgroundImagePath?: string;
  sceneSoundPath?: string;
  backgroundSoundPath?: string;
  step?: MeetStep;
  optionIndex?: number;
}

export interface Chat {
  who: "left" | "right";
  message: string;
  isEnding?: boolean;
}
