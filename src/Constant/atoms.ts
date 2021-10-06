import { atom } from 'recoil';

import MemoryData from '../Utils/MemoryData';

import { MeetStep, Scene, SceneType, IGameConfig } from './types';

import { DEFAULT_SCENE } from '.';

function getGameCharacter(): string {
  const hashRoute = window.location.hash.split('/');
  if (hashRoute[1] === 'game' && hashRoute[2]) {
    return hashRoute[2];
  }
  return '';
}

export const gameConfigAtom = atom<IGameConfig>({
  key: 'gameConfig',
  default: {
    characterName: getGameCharacter(),
    sceneType: 'text' as SceneType,
    meetStep: 'script' as MeetStep,
  },
});

export const gameSceneAtom = atom<Scene>({
  key: 'gameScene',
  default: DEFAULT_SCENE as Scene,
});

export const gameOverAtom = atom<boolean>({
  key: 'gameOver',
  default: false as boolean,
});

export interface UserConfig {
  gender: 'male' | 'female';
  name: string;
  job: 'officer' | 'student' | 'yet' | 'international';
  sexualOrientation: 'opposite' | 'same' | 'both';
  [key: string]: any;
}

export const userConfigAtom = atom<UserConfig>({
  key: 'userConfigAtom',
  default: MemoryData.getData() ?? {
    gender: 'male',
    name: '',
    job: 'student',
    sexualOrientation: 'opposite',
  },
});
