var bgm;

const BGMPlayer = {
  play: (fileName) => {
    try {
      if (bgm) bgm.pause();
    } catch {}
    bgm = new Audio();
    bgm.src = `./res/bgm/${fileName}`;
    bgm.play();
  },
  pause: () => {
    bgm.pause()
  }
};

export default BGMPlayer;
