import { toast } from 'react-toastify';

let bgm: HTMLAudioElement;

const BGMPlayer = {
  play: (path: string) => {
    if (process.env.NODE_ENV === 'development')
      toast.info(`BGM Path : ${path}`);

    try {
      if (bgm) bgm.pause();
    } catch {}
    bgm = new Audio();
    bgm.loop = true;
    bgm.src = path;
    bgm.play();
  },
  pause: () => {
    if (bgm) bgm.pause();
  },
  isPlaying: () => {
    if (bgm) return !bgm.paused;
    return false;
  },
};

export default BGMPlayer;
