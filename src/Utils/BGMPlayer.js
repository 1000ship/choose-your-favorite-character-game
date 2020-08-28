var bgm;

const BGMPlayer = {
  play: (fileName) => {
    bgm = new Audio();
    bgm.src = `./res/bgm/${fileName}`;
    bgm.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    bgm.play()
  },
  pause: () => {
    bgm.pause()
  }
};

export default BGMPlayer;
