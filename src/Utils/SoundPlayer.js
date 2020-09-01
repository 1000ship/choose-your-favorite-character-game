var sound;

const SoundPlayer = {
  play: (folderName, fileName) => {
    try {
      if (sound) sound.pause();
    } catch {}
    sound = new Audio();
    sound.src = `/res/sounds/${folderName}/${fileName}`;
    sound.play();
  },
  pause: () => {
    sound.pause();
  },
};

export default SoundPlayer;
