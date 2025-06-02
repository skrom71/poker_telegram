import _2s from '/src/assets/images/cards/2s.png'
import _3s from '/src/assets/images/cards/3s.png'
import _4s from '/src/assets/images/cards/4s.png'
import _5s from '/src/assets/images/cards/5s.png'
import _6s from '/src/assets/images/cards/6s.png'
import _7s from '/src/assets/images/cards/7s.png'
import _8s from '/src/assets/images/cards/8s.png'
import _9s from '/src/assets/images/cards/9s.png'
import As from '/src/assets/images/cards/As.png'
import Js from '/src/assets/images/cards/Js.png'
import Ks from '/src/assets/images/cards/Ks.png'
import Qs from '/src/assets/images/cards/Qs.png'
import Ts from '/src/assets/images/cards/Ts.png'

import _2h from '/src/assets/images/cards/2h.png'
import _3h from '/src/assets/images/cards/3h.png'
import _4h from '/src/assets/images/cards/4h.png'
import _5h from '/src/assets/images/cards/5h.png'
import _6h from '/src/assets/images/cards/6h.png'
import _7h from '/src/assets/images/cards/7h.png'
import _8h from '/src/assets/images/cards/8h.png'
import _9h from '/src/assets/images/cards/9h.png'
import Ah from '/src/assets/images/cards/Ah.png'
import Jh from '/src/assets/images/cards/Jh.png'
import Kh from '/src/assets/images/cards/Kh.png'
import Qh from '/src/assets/images/cards/Qh.png'
import Th from '/src/assets/images/cards/Th.png'

import _2d from '/src/assets/images/cards/2d.png'
import _3d from '/src/assets/images/cards/3d.png'
import _4d from '/src/assets/images/cards/4d.png'
import _5d from '/src/assets/images/cards/5d.png'
import _6d from '/src/assets/images/cards/6d.png'
import _7d from '/src/assets/images/cards/7d.png'
import _8d from '/src/assets/images/cards/8d.png'
import _9d from '/src/assets/images/cards/9d.png'
import Ad from '/src/assets/images/cards/Ad.png'
import Jd from '/src/assets/images/cards/Jd.png'
import Kd from '/src/assets/images/cards/Kd.png'
import Qd from '/src/assets/images/cards/Qd.png'
import Td from '/src/assets/images/cards/Td.png'

import _2c from '/src/assets/images/cards/2c.png'
import _3c from '/src/assets/images/cards/3c.png'
import _4c from '/src/assets/images/cards/4c.png'
import _5c from '/src/assets/images/cards/5c.png'
import _6c from '/src/assets/images/cards/6c.png'
import _7c from '/src/assets/images/cards/7c.png'
import _8c from '/src/assets/images/cards/8c.png'
import _9c from '/src/assets/images/cards/9c.png'
import Ac from '/src/assets/images/cards/Ac.png'
import cardBackInactive from '/src/assets/images/cards/card-back-inactive.png'
import cardBack from '/src/assets/images/cards/card-back.png'
import Jc from '/src/assets/images/cards/Jc.png'
import Kc from '/src/assets/images/cards/Kc.png'
import Qc from '/src/assets/images/cards/Qc.png'
import Tc from '/src/assets/images/cards/Tc.png'

export default function getCardImage(card: string): string {
  switch (card) {
    case '2s':
      return _2s
    case '3s':
      return _3s
    case '4s':
      return _4s
    case '5s':
      return _5s
    case '6s':
      return _6s
    case '7s':
      return _7s
    case '8s':
      return _8s
    case '9s':
      return _9s
    case 'Ts':
      return Ts
    case 'Js':
      return Js
    case 'Qs':
      return Qs
    case 'Ks':
      return Ks
    case 'As':
      return As

    case '2h':
      return _2h
    case '3h':
      return _3h
    case '4h':
      return _4h
    case '5h':
      return _5h
    case '6h':
      return _6h
    case '7h':
      return _7h
    case '8h':
      return _8h
    case '9h':
      return _9h
    case 'Th':
      return Th
    case 'Jh':
      return Jh
    case 'Qh':
      return Qh
    case 'Kh':
      return Kh
    case 'Ah':
      return Ah

    case '2d':
      return _2d
    case '3d':
      return _3d
    case '4d':
      return _4d
    case '5d':
      return _5d
    case '6d':
      return _6d
    case '7d':
      return _7d
    case '8d':
      return _8d
    case '9d':
      return _9d
    case 'Td':
      return Td
    case 'Jd':
      return Jd
    case 'Qd':
      return Qd
    case 'Kd':
      return Kd
    case 'Ad':
      return Ad

    case '2c':
      return _2c
    case '3c':
      return _3c
    case '4c':
      return _4c
    case '5c':
      return _5c
    case '6c':
      return _6c
    case '7c':
      return _7c
    case '8c':
      return _8c
    case '9c':
      return _9c
    case 'Tc':
      return Tc
    case 'Jc':
      return Jc
    case 'Qc':
      return Qc
    case 'Kc':
      return Kc
    case 'Ac':
      return Ac
    case 'cardBack':
      return cardBack
    case 'cardBackInactive':
      return cardBackInactive

    default:
      return cardBack
  }
}
