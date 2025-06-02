import { Howl } from 'howler'
import backToActive from '../assets/sounds/back-to-active.mp3'
import { default as bet, default as call } from '../assets/sounds/bet.wav'
import check from '../assets/sounds/check.mp3'
import fold from '../assets/sounds/fold.mp3'
import potCollect from '../assets/sounds/pot-collect.mp3'
import shuffleCards from '../assets/sounds/shuffle-cards.mp3'
import nextCard from '../assets/sounds/swipe.mp3'
import tikSound from '../assets/sounds/tik.wav'
import tokSound from '../assets/sounds/tok.wav'
import winSound from '../assets/sounds/win.mp3'

const sounds = {
  win: new Howl({ src: [winSound], volume: 1.0 }),
  nextCard: new Howl({ src: [nextCard], volume: 1.0 }),
  shuffleCards: new Howl({ src: [shuffleCards], volume: 1.0 }),
  fold: new Howl({ src: [fold], volume: 1.0 }),
  check: new Howl({ src: [check], volume: 0.6 }),
  call: new Howl({ src: [call], volume: 1.0 }),
  bet: new Howl({ src: [bet], volume: 1.0 }),
  allIn: new Howl({ src: [bet], volume: 1.0 }),
  potCollect: new Howl({ src: [potCollect], volume: 0.4 }),
  backToActive: new Howl({ src: [backToActive], volume: 0.5 }),
  wheelTik: new Howl({ src: [tikSound], volume: 2.0 }),
  wheelTok: new Howl({ src: [tokSound], volume: 1.0 }),
}

export const playSound = (key: keyof typeof sounds) => {
  sounds[key].play()
}
