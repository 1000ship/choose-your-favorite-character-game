import React from "react";
import MemoryData from "./MemoryData";

const ScriptParser = {
  getText: (script, isInputed = false) => {
    let result = script;
    if (isInputed) result = result.replace("input:", "");
    const originals = result.match(/{\w*}/g) ?? [];
    const keys = originals.map((str) => str.match(/\w*/g).join("").trim());
    originals.forEach(
      (original, i) => (result = result.replace(original, MemoryData.getData(keys[i])))
    );
    result = result.replace(/{input:\w*}/g, "<input type='text'/>");
    result = result.replace(/{\w*:[^{:}]+\.?\w*}/g, "");
    return result;
  },
  getSpecials: (script) => {
    let result = {};
    const specials = script.match(/{\w*:[^{:}]+\.?\w*}/ig) ?? [];
    console.log( specials )
    const tuples = specials.map((str) => str.match(/[^{:}]+/g));
    tuples.forEach((tuple) => (result[tuple[0]] = tuple[1]));
    return result;
  },
};

export default ScriptParser;
