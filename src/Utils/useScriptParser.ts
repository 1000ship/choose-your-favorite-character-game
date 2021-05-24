import { useRecoilValue } from "recoil"
import { userConfigSelector } from "../Constant/selectors"

const useScriptParser = () => {
  const userConfig = useRecoilValue(userConfigSelector)

  return {
    getText: (script: string, isInputed: boolean = false) => {
      let result = script
      if (isInputed) result = result.replace("input:", "")
      const originals: string[] = result.match(/{\w*}/g) ?? []
      const keys: any = originals.map((str) => str.match(/\w*/g)?.join("")?.trim()) || []
      originals.forEach((original, i) => (result = result.replace(original, userConfig[keys[i]])))
      result = result.replace(/{input:\w*}/g, "<input type='text'/>")
      result = result.replace(/{\w*:[^{:}]+\.?\w*}/g, "")
      return result
    },
    getSpecials: (script?: string) => {
      if (!script) return null
      let result: any = {}
      const specials: string[] = script.match(/{\w*:[^{:}]+\.?\w*}/gi) ?? []
      const tuples: string[][] = specials.map((str) => str.match(/[^{:}]+/g) as string[]) ?? []
      tuples.forEach((tuple) => (result[tuple[0]] = tuple[1]))
      return result
    },
  }
}

export default useScriptParser
