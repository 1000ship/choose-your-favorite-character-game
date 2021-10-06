import React, { useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

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

const CameraPage: React.FC<RouteComponentProps> = (props) => {
  const { history } = props;
  const [flash, setFlash] = useState(false);

  const errorCallback: any = function () {
    setTimeout(() => history.push('/choice'), 1500);
  };

  useEffect(() => {
    if ((navigator as any)?.getUserMedia) {
      (navigator as any).getUserMedia(
        { video: true },
        function (localMediaStream: any) {
          const video = document.querySelector('video') as HTMLVideoElement;
          video.srcObject = localMediaStream;
          video.onloadedmetadata = function (e) {
            // Ready to go. Do some stuff.
            video.play();
          };
        },
        errorCallback,
      );
    }
  });

  const onShotClick = () => {
    const video = document.querySelector('video') as HTMLVideoElement;
    video.pause();
    setFlash(true);
    setTimeout(() => history.push('/choice'), 1500);
  };

  return (
    <Container onClick={onShotClick}>
      <VideoView />
      {flash && <Flash />}
    </Container>
  );
};

export default withRouter(CameraPage);
