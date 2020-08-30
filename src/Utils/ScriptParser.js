import React from 'react';

const ScriptParser = {
  getText: ( script, data = {name: "성혁"} ) => {
    let result = script
    const originals = result.match(/{\w*}/g) ?? []
    const keys = originals.map( str => str.match(/\w*/g).join("").trim() )
    originals.forEach( (original, i) => result = result.replace(original, data[keys[i]]) )
    result = result.replace( /{input:\w*}/g, "<input type='text'/>" )
    result = result.replace( /{\w*:.+\.?\w*}/g, "" )
    return result
  },
  getSpecials: (script) => {
    let result = {}
    const specials = script.match( /{\w*:.+\.?\w*}/g ) ?? []
    const tuples = specials.map( str => str.match( /[^{:}]+/g ) )
    tuples.forEach( tuple => result[tuple[0]] = tuple[1])
    return result;
  }
}

export default ScriptParser