import React from "react";
import MeetViewPresenter from "./MeetViewPresenter";

const MeetViewContainer = ({ scene }) => {
  return (
    <MeetViewPresenter
      scene={scene}
    ></MeetViewPresenter>
  );
};

export default MeetViewContainer;
