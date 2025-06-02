import { BuyIn } from '@pokertrust/backend/src/holdem/session/HoldemGameState'
import { roundToTwoDecimals } from '@pokertrust/shared/src/lib/formater'
import { useState } from 'react'
import Dialog from '..'

export type BuyInProps = {
  balance: number
  buyIn: BuyIn
  handleClose: (amount: number | undefined) => void
}

export default function BuyInDialog({ balance, buyIn, handleClose }: BuyInProps) {
  const [input, setInput] = useState<string>('')
  const [error, setError] = useState<string | undefined>()

  const handleTakeTheSeat = () => {
    const num = parseFloat(input)
    if (input === '' || isNaN(num) || num > balance || num < buyIn.at || num > buyIn.to) {
      setError(`Enter a value between ${buyIn.at} and ${buyIn.to}`)
      return
    } else {
      handleClose(roundToTwoDecimals(num))
    }
  }

  return (
    <Dialog title="Buy In" onClose={() => handleClose(undefined)}>
      <div>
        <div>
          <label className="subheadline2-normal text-neutral-500">Balance: </label>
          <label className="subheadline1-normal text-neutral-300">{balance}</label>
        </div>
        <div className="relative">
          <input
            type={'number'}
            value={input}
            min={buyIn.at}
            max={buyIn.to}
            className="w-full my-1 px-2 py-3 title1-normal text-center rounded-[8px] appearance-none bg-zinc-900 outline-neutral-500 outline-1 invalid:outline-red-900"
            onChange={(e) => {
              setInput(e.target.value)
              const value = e.target.value
              const num = parseFloat(value)
              if (value !== '' && num <= balance && num <= buyIn.to && num >= buyIn.at) {
                setError('')
              }
            }}
            placeholder=""
          />
          <div className="absolute right-1 top-[50%] -translate-y-1/2 flex flex-col gap-2 bg-zinc-900">
            <button
              className="button bg-neutral-700 px-4 py-[2px] caption1-semibold rounded-[36px]"
              onClick={() => {
                setInput(buyIn.to.toString())
                setError('')
              }}
            >
              max
            </button>
            <button
              className="button bg-neutral-700 px-4 py-[2px] caption1-semibold rounded-[36px]"
              onClick={() => {
                setInput(buyIn.at.toString())
                setError('')
              }}
            >
              min
            </button>
          </div>
        </div>
        <div className="h-4 caption1-normal text-red-800">{error}</div>

        <button
          className="button my-[24px] text-semibold py-2 text-slate-800 bg-gradient-to-b from-amber-400 to-amber-500 w-full rounded-[10px]"
          onClick={handleTakeTheSeat}
        >
          Take the seat
        </button>
      </div>
    </Dialog>
  )
}

// import { BuyIn } from '@pokertrust/backend/src/holdem/session/HoldemGameState'
// import { useState } from 'react'
// import { trimToTwoDecimals } from '../../../../../shared/src/formater'
// import crossIcon from '../../assets/images/cross.png'

// export type BuyInDialogProps = {
//   balance: number
//   buyIn: BuyIn
//   handleClose: (amount: number | undefined) => void
// }

// export default function BuyInDialog({ balance, buyIn, handleClose }: BuyInDialogProps) {
//   const [input, setInput] = useState<string>('')

//   const [error, setError] = useState<string | undefined>()

//   const handleTakeTheSeat = () => {
//     const num = parseFloat(input)
//     if (input === '' || isNaN(num) || num > balance || num < buyIn.at || num > buyIn.to) {
//       setError(`Enter a value between ${buyIn.at} and ${buyIn.to}`)
//       return
//     } else {
//       handleClose(trimToTwoDecimals(num))
//     }
//   }

//   return (
//     <div className="bg-[rgba(0, 0, 0, 0.2)]">
//       <div className={css.dialog}>
//         <div className={css.titleRow}>
//           <div className={css.label}>Buy In</div>
//           <img
//             src={crossIcon}
//             className={css.crossIcon}
//             onClick={() => {
//               handleClose(undefined)
//             }}
//           ></img>
//         </div>
//         <div className={css.balanceRow}>
//           <div className={css.label}>Balance:</div>
//           <div className={css.amount}>{balance}</div>
//         </div>
//         <div className={css.inputRow}>
//           <input
//             type="number"
//             value={input}
//             onChange={(e) => {
//               setInput(e.target.value)
//               const value = e.target.value
//               const num = parseFloat(value)
//               if (value !== '' && num <= balance && num <= buyIn.to && num >= buyIn.at) {
//                 setError('')
//               }
//             }}
//             className={css.inputAmount}
//             placeholder=""
//           />
//           <div className={css.maxMin}>
//             <button className={css.max} onClick={() => setInput(buyIn.to.toString())}>
//               max
//             </button>
//             <button className={css.min} onClick={() => setInput(buyIn.at.toString())}>
//               min
//             </button>
//           </div>
//         </div>
//         <div className={css.errorRow}>{error}</div>
//         <button className={css.takeTheSeatButton} onClick={handleTakeTheSeat}>
//           Sit
//         </button>
//       </div>
//     </div>
//   )
// }
