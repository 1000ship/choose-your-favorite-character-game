var sound: HTMLAudioElement;

const SoundPlayer = {
  play: (folderName?: string, fileName?: string) => {
    if( !folderName || !fileName ) return;
    try {
      if (sound) sound.pause();
    } catch {}
    sound = new Audio();
    sound.src = `./res/sounds/${folderName}/${fileName}`;
    sound.play();
  },
  pause: () => {
    sound.pause();
  },
};

export default SoundPlayer;
