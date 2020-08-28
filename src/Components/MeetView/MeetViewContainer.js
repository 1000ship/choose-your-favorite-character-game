import React from "react";
import MeetViewPresenter from "./MeetViewPresenter";

const MeetViewContainer = ({ scriptInterpreter }) => {
  return (
    <MeetViewPresenter
      scriptInterpreter={scriptInterpreter}
    ></MeetViewPresenter>
  );
};

export default MeetViewContainer;
