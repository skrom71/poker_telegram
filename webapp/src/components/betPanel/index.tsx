import { roundToTwoDecimals } from '@pokertrust/shared/src/lib/formater'
import { useState } from 'react'
// import css from './index.module.scss'
import backArrow from '../../assets/images/back-arrow.png'
import RangeSlider from './rangeSlider'

export type BetPanelProps = {
  min: number
  pot: number
  allIn: number
  smallBlind: number
  handleClose: (amount: number | undefined) => void
}

export default function BetPanel({ min, pot, allIn, smallBlind, handleClose }: BetPanelProps) {
  const [inputBet, setInputBet] = useState<string>(min.toString())
  const [defaultBetFormat, setDefaultBetFormat] = useState<'min' | 'pot' | 'allIn' | undefined>('min')
  let defaultBetValue: number

  const handleBet = () => {
    const num = parseFloat(inputBet)
    if (inputBet === '' || isNaN(num) || num > allIn || num < min) {
      //error
      return
    } else {
      handleClose(roundToTwoDecimals(num))
    }
  }

  // const onChangeInputBet = (value: string) => {
  //   const num = parseFloat(value)

  //   if (num <= allIn) {
  //     setInputBet(value)
  //   }

  //   if (num < min || value === '') {
  //     setInputBet(min.toString())
  //   }

  //   setDefaultBetFormat(num === min ? 'min' : num === pot ? 'pot' : num === allIn ? 'allIn' : undefined)
  // }

  const onChangeSlider = (num: number) => {
    setInputBet(num.toString())
    setDefaultBetFormat(num === min ? 'min' : num === pot ? 'pot' : num === allIn ? 'allIn' : undefined)
  }

  const onClickBetMin = () => {
    defaultBetValue = min
    setInputBet(min.toString())
    setDefaultBetFormat('min')
  }

  const onClickBetPOT = () => {
    defaultBetValue = pot
    setInputBet(pot.toString())
    setDefaultBetFormat('pot')
  }

  const onClickBetAllIn = () => {
    defaultBetValue = allIn
    setInputBet(allIn.toString())
    setDefaultBetFormat('allIn')
  }

  if (defaultBetFormat === 'pot') {
    defaultBetValue = pot
  } else if (defaultBetFormat === 'allIn') {
    defaultBetValue = allIn
  } else if (defaultBetFormat === 'min') {
    defaultBetValue = min
  } else {
    defaultBetValue = inputBet === '' ? min : parseFloat(inputBet)
  }

  return (
    <div className="flex flex-col w-full">
      <div className="">
        <RangeSlider min={min} max={allIn} defaultValue={defaultBetValue} step={smallBlind} onChange={onChangeSlider} />
      </div>

      <div className="flex flex-row items-center w-full justify-between h-[max(4vw,4vh)] gap-2">
        <button
          className="bg-neutral-500 px-5 p-2 rounded-[max(1vw,1vh)] h-full flex items-center"
          onClick={() => handleClose(undefined)}
        >
          <img src={backArrow} />
        </button>
        <button
          className={`whitespace-nowrap px-1 border-[2px] rounded-[max(0.5vw,0.5vh)] border-neutral-500 caption1-normal ${defaultBetFormat === 'min' && defaultBetValue === min && 'bg-violet-700 border-violet-700'}`}
          onClick={onClickBetMin}
        >
          Min
        </button>
        <button
          className={`whitespace-nowrap px-1 border-[2px] rounded-[max(0.5vw,0.5vh)] border-neutral-500 caption1-normal ${defaultBetFormat === 'pot' && defaultBetValue === pot && 'bg-violet-700 border-violet-700'}`}
          onClick={onClickBetPOT}
        >
          POT
        </button>
        <button
          className={`whitespace-nowrap px-1 border-[2px] rounded-[max(0.5vw,0.5vh)] border-neutral-500 caption1-normal ${defaultBetFormat === 'allIn' && defaultBetValue === allIn && 'bg-violet-700 border-violet-700'}`}
          onClick={onClickBetAllIn}
        >
          All-in
        </button>
        <input
          type="number"
          className="h-full w-full headline-normal bg-zinc-900 rounded-[max(0.5vw,0.5vh)] text-center appearance-none border-0 outline-0"
          value={inputBet}
          // onChange={(e) => onChangeInputBet(e.target.value)}
          readOnly={true}
        ></input>
        <button
          className="bg-[#FAC159] px-5 p-2 headline-normmal text-slate-800 rounded-[max(1vw,1vh)] h-full  flex items-center"
          onClick={handleBet}
        >
          <div>Bet</div>
        </button>
      </div>
    </div>
  )
}

// import { useState } from 'react'
// import { trimToTwoDecimals } from '../../../../shared/src/formater'
// import backArrow from '../../assets/images/back-arrow.png'
// import css from './index.module.scss'
// import RangeSlider from './rangeSlider'

// export type BetPanelProps = {
//   min: number
//   pot: number
//   allIn: number
//   smallBlind: number
//   handleClose: (amount: number | undefined) => void
// }

// export default function BetPanel({ min, pot, allIn, smallBlind, handleClose }: BetPanelProps) {
//   const [inputBet, setInputBet] = useState<string>(min.toString())
//   const [defaultBetFormat, setDefaultBetFormat] = useState<'min' | 'pot' | 'allIn' | undefined>('min')
//   let defaultBetValue: number

// const handleBet = () => {
//   const num = parseFloat(inputBet)
//   if (inputBet === '' || isNaN(num) || num > allIn || num < min) {
//     //error
//     return
//   } else {
//     handleClose(trimToTwoDecimals(num))
//   }
// }

// const onChangeInputBet = (value: string) => {
//   const num = parseFloat(value)

//   if (num <= allIn) {
//     setInputBet(value)
//   }

//   if (num < min || value === '') {
//     setInputBet(min.toString())
//   }

//   setDefaultBetFormat(num === min ? 'min' : num === pot ? 'pot' : num === allIn ? 'allIn' : undefined)
// }

// const onChangeSlider = (num: number) => {
//   setInputBet(num.toString())
//   setDefaultBetFormat(num === min ? 'min' : num === pot ? 'pot' : num === allIn ? 'allIn' : undefined)
// }

// const onClickBetMin = () => {
//   defaultBetValue = min
//   setInputBet(min.toString())
//   setDefaultBetFormat('min')
// }

// const onClickBetPOT = () => {
//   defaultBetValue = pot
//   setInputBet(pot.toString())
//   setDefaultBetFormat('pot')
// }

// const onClickBetAllIn = () => {
//   defaultBetValue = allIn
//   setInputBet(allIn.toString())
//   setDefaultBetFormat('allIn')
// }

// if (defaultBetFormat === 'pot') {
//   defaultBetValue = pot
// } else if (defaultBetFormat === 'allIn') {
//   defaultBetValue = allIn
// } else if (defaultBetFormat === 'min') {
//   defaultBetValue = min
// } else {
//   defaultBetValue = inputBet === '' ? min : parseFloat(inputBet)
// }

//   return (
//     <div className={css.betPanelContainer}>
//       <div className={css.rangeSlider}>
//         <RangeSlider min={min} max={allIn} defaultValue={defaultBetValue} step={smallBlind} onChange={onChangeSlider} />
//       </div>

//       <div className="{css.betActionRow}">
//         <button className={css.backButton}>
//           <img src={backArrow} className={css.backButtonIcon} onClick={() => handleClose(undefined)} />
//         </button>

//         <button
//           className={
//             defaultBetFormat === 'min' && defaultBetValue === min ? css.betFormatButtonSelected : css.betFormatButton
//           }
//           onClick={onClickBetMin}
//         >
//           Min
//         </button>

//         <button
//           className={
//             defaultBetFormat === 'pot' && defaultBetValue === pot ? css.betFormatButtonSelected : css.betFormatButton
//           }
//           onClick={onClickBetPOT}
//         >
//           POT
//         </button>

//         <button
//           className={
//             defaultBetFormat === 'allIn' && defaultBetValue === allIn
//               ? css.betFormatButtonSelected
//               : css.betFormatButton
//           }
//           onClick={onClickBetAllIn}
//         >
//           All-in
//         </button>

//         <input
//           type="number"
//           className={css.betInput}
//           value={inputBet}
//           onChange={(e) => onChangeInputBet(e.target.value)}
//         ></input>

//         <button className={css.betButton} onClick={handleBet}>
//           Bet
//         </button>
//       </div>
//     </div>
//   )
// }
