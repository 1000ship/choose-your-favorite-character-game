var sound;

const SoundPlayer = {
  play: (fileName) => {
    sound = new Audio();
    sound.src = `./res/sounds/${fileName}`;
    sound.play()
  },
  pause: () => {
    sound.pause()
  }
};

export default SoundPlayer;
