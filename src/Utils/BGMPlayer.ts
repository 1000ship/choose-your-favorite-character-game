var bgm: HTMLAudioElement

const BGMPlayer = {
  play: (path: string) => {
    try {
      if (bgm) bgm.pause()
    } catch {}
    console.log(path)
    bgm = new Audio()
    bgm.loop = true
    bgm.src = path
    bgm.play()
  },
  pause: () => {
    if (bgm) bgm.pause()
  },
}

export default BGMPlayer
