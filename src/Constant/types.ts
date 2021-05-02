export type MeetStep = "script" | "option" | "reaction" | "ending"
export type SceneType = "meet" | "text" | "ending"

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
  characterImagePath?: string;
  backgroundImagePath?: string;
  sceneSoundPath?: string;
  backgroundSoundPath?: string;
}

export interface Chat {
  who: "left" | "right";
  message: string;
  isEnding?: boolean;
}

export interface MeetData {
  step: MeetStep;
  characterName: string;
  sceneScript: string;
  options: any[];
  optionIndex: number;
  data: string;
  nextSceneId?: string;
  folderName?: string;
}


