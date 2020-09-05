import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const VideoView = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const Flash = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation-duration: 0.3s;
  animation-name: flash-animation;
  background-color: white;
  @keyframes flash-animation {
    from {
      opacity: 1;
    }
  }
`;

const CameraPage = (props) => {
  const { history } = props;
  const [flash, setFlash] = useState(false);

  var errorCallback = function (e) {
    console.log("Reeeejected!", e);
  };

  useEffect(() => {
    if (navigator?.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        function (localMediaStream) {
          var video = document.querySelector("video");
          video.srcObject = localMediaStream;
          video.onloadedmetadata = function (e) {
            // Ready to go. Do some stuff.
            video.play();
          };
        },
        errorCallback
      );
    } else {
      document.getElementById("camera").click();
      history.push("/choice")
    }
  }, []);

  const onShotClick = () => {
    var video = document.querySelector("video");
    video.pause();
    setFlash(true);
    setTimeout(() => history.push("/choice"), 1500);
  };

  return (
    <Container onClick={onShotClick}>
      <VideoView></VideoView>
      {flash && <Flash></Flash>}
      <input
        hidden
        type="file"
        id="camera"
        name="camera"
        capture="camera"
        accept="image/*"
      />
    </Container>
  );
};

export default withRouter(CameraPage);
