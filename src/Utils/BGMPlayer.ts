var bgm: HTMLAudioElement;

const BGMPlayer = {
  play: (fileName: string) => {
    try {
      if (bgm) bgm.pause();
    } catch {}
    bgm = new Audio();
    bgm.loop = true;
    bgm.src = `./res/bgm/${fileName}`;
    bgm.play();
  },
  pause: () => {
    if( bgm ) bgm.pause();
  },
};

export default BGMPlayer;
