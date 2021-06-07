import { DefaultValue, selector } from "recoil"
import { DEBUG_LINK } from "."
import { loadScript } from "../Utils/api"
import { gameConfigAtom, gameSceneAtom } from "./atoms"
import { IGameConfig, Scene } from "./types"
import MemoryData from "../Utils/MemoryData"
import { UserConfig, userConfigAtom } from "./atoms"

export const gameConfigSelector = selector<IGameConfig>({
  key: "gameConfigSelector",
  async get({ get }) {
    const gameConfig = get(gameConfigAtom)
    let scenes = []
    if (gameConfig?.scenes?.length) scenes = gameConfig.scenes
    else if (gameConfig.characterName.length > 0) scenes = await loadScript(gameConfig.characterName)
    return {
      ...gameConfig,
      scenes,
    }
  },
  set({ set }, value: any) {
    set(gameConfigAtom, value)
  },
})

export const gameSceneSelector = selector<Scene>({
  key: "gameSceneSelector",
  get({ get }) {
    const gameConfig = get(gameConfigAtom)
    const gameScene = get(gameSceneAtom)
    console.log(gameScene)

    let characterImagePath = `./res/${gameConfig.characterName}/character/${gameScene.characterImage}`
    let backgroundImagePath = `./res/${gameConfig.characterName}/background/${gameScene.backgroundImage}`
    let sceneSoundPath = `./res/${gameConfig.characterName}/sound/${gameScene.sceneSound}`
    let backgroundSoundPath = `./res/${gameConfig.characterName}/bgm/${gameScene.backgroundSound}`

    // 디버깅 처리
    if (gameConfig.characterName === "debug") {
      characterImagePath = `${DEBUG_LINK}/${gameConfig.characterName}/character/${gameScene.characterImage}`
      backgroundImagePath = `${DEBUG_LINK}/${gameConfig.characterName}/background/${gameScene.backgroundImage}`
      sceneSoundPath = `${DEBUG_LINK}/${gameConfig.characterName}/sound/${gameScene.sceneSound}`
      backgroundSoundPath = `${DEBUG_LINK}/${gameConfig.characterName}/bgm/${gameScene.backgroundSound}`
    }

    return {
      ...gameScene,
      characterImagePath,
      backgroundImagePath,
      sceneSoundPath,
      backgroundSoundPath,
      selectedOption: typeof gameScene.optionIndex === "number" ? gameScene.options[gameScene.optionIndex] : undefined,
    }
  },
  set({ set }, value: Scene | DefaultValue) {
    set(gameSceneAtom, value)
  },
})

export const userConfigSelector = selector<UserConfig>({
  key: "userConfigSelector",
  get({ get }) {
    return get(userConfigAtom)
  },
  set({ set }, newValue) {
    MemoryData.setData(newValue)
    set(userConfigAtom, newValue)
  },
})
