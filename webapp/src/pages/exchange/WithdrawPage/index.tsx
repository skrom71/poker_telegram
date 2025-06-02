// import { roundToTwoDecimals } from '@pokertrust/shared/src/lib/formater'
// import { useState } from 'react'
// import usdtTONIcon from '../../../assets/images/usdtton.png'
// import { env } from '../../../lib/env'
// import { trpc } from '../../../lib/trpc'
// import { useLocalIdStore } from '../../../lib/useLocalIdStore'

// export default function WithdrawPage() {
//   const { localId } = useLocalIdStore()

//   const getMeQuery =
//     env.VITE_HOST_ENV === 'local' ? trpc.getMeLocal.useQuery({ userId: localId }) : trpc.getMe.useQuery()

//   const fiatBalance = getMeQuery.data?.me?.balance
//   const jettonTransferFee = feesQuery.data?.find((value) => value.id === 'usdt_ton')

//   if (fiatBalance === undefined || jettonTransferFee === undefined) {
//     return <div>Error params</div>
//   }

//   return <WithdrawPageContent availableWithdraw={roundToTwoDecimals(fiatBalance - jettonTransferFee.fee)} />
// }

// function WithdrawPageContent({ availableWithdraw }: { availableWithdraw: number }) {
//   const [address, setAddress] = useState<string>('null')

//   return (
//     <div className="page items-center">
//       <div className="title1-normal">Withdraw</div>
//       <div className="mt-4 subheadline1-normal flex flex-row items-center justify-center">
//         <label>USDT TON</label>
//         <img src={usdtTONIcon} className="w-[25px] h-[25px] object-contain pl-2" />
//       </div>

//       <div className="relative mt-4 w-full h-auto">
//         <input
//           onChange={(e) => {
//             setAddress(e.target.value)
//           }}
//           placeholder="Withdraw USDT TON wallet address"
//           className={`input w-full px-2 py-2 subheadline-normal`}
//         />
//       </div>
//       <input
//         step={0.01}
//         min={0.0}
//         max={availableWithdraw}
//         type="number"
//         placeholder="0.00"
//         className="input mt-4 w-full px-2 py-2 subheadline-normal invalid:ring-red-700"
//       />

//       <div className="text-neutral-500 w-full text-right caption1-normal">Available: {availableWithdraw}</div>

//       <button
//         className="button my-[24px] text-semibold py-2 text-slate-800 bg-gradient-to-b from-amber-400 to-amber-500 w-full rounded-[10px]"
//         onClick={() => {
//           console.info('Withdraw', address)
//         }}
//       >
//         Withdraw
//       </button>
//     </div>
//   )
// }
