import React, { useCallback } from 'react';
import { gameConfig } from '../Recoil/atoms';

const DebugPage = () => {
  const dirRef = useCallback( input => {
    input.setAttribute("webkitdirectory", "webkitdirectory")
    input.addEventListener('change', showTextFile);
    function showTextFile() {
      console.log( input.webkitEntries )
      const selectedFiles = input.files;
      for(const file of selectedFiles) {
        console.log( file )
      }
    }
  }, [])

  return (
    <div style={{padding: 5, fontSize: 18, lineHeight: 1.2}}>
      <h1 style={{fontSize: 24}}>디버깅</h1>
      <label>
        대본 선택<br/>
        <input ref={dirRef} type="file"/>
      </label>
    </div>
  );
};

export default DebugPage;