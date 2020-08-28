import React from "react";
import MeetViewPresenter from "./MeetViewPresenter";

const MeetViewContainer = ({ scene }) => {
  const { characterName, sceneScript } = scene;
  console.log( scene )
  return (
    <MeetViewPresenter
      characterName={characterName}
      sceneScript={sceneScript}
    ></MeetViewPresenter>
  );
};

export default MeetViewContainer;
