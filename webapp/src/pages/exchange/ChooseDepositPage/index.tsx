// import { DepositMethod } from '@pokertrust/backend/src/router/funds/depositMethods'
// import { useNavigate, useParams } from 'react-router-dom'
// import tonIcon from '../../../assets/images/ton-logo.png'
// import usdtTONIcon from '../../../assets/images/usdtTON.png'
// import { trpc } from '../../../lib/trpc'

// // export type DepositMethod = {
// //   name: string
// //   icon: string
// //   minDeposit: number
// //   fee: number
// // }

// // export type ChooseDepositPageProps = {
// //   depositMethods: DepositMethod[]
// // }

// export default function ChooseDepositPage() {
//   const { userId } = useParams()

//   const navigate = useNavigate()

//   // const [dmId, setDmId] = useState<string | null>('')

//   if (!userId) {
//     return <div>Error params</div>
//   }

//   const depositMethodsQuery = trpc.depositMethods.useQuery({ userId: userId })

//   if (depositMethodsQuery.isLoading || depositMethodsQuery.isFetching) {
//     return <div>Loading...</div>
//   }

//   if (depositMethodsQuery.isError) {
//     return <div>User Deposit Data Error: {depositMethodsQuery.error.message}</div>
//   }

//   if (!depositMethodsQuery.data) {
//     return <div>No deposit methods</div>
//   }

//   const handleDepositMethod = (dm: DepositMethod) => {
//     navigate(`/deposit/${userId}/${dm.id}/${dm.address}`)
//   }

//   return (
//     <div className="page items-center">
//       <div className="title1-normal">Deposit</div>

//       <div className="mt-4 subtitle1-normal text-neutral-400">Choose deposit method:</div>

//       <div className="px-4 flex flex-row justify-between w-full">
//         {depositMethodsQuery.data.map((dm) => {
//           return (
//             <div
//               key={dm.id}
//               className="button pt-2  w-[50%] flex flex-col items-center"
//               onClick={() => handleDepositMethod(dm)}
//             >
//               <div className="py-2 mb-2 flex flex-col border-2 items-center border-neutral-400 bg-slate-700 active:border-amber-500 rounded-[max(1vh,1vw)] w-[80%]">
//                 <img
//                   src={dm.id === 'ton' ? tonIcon : usdtTONIcon}
//                   alt={dm.name}
//                   className="w-[50px] h-[50px] object-contain"
//                 />
//                 <label className="subheadline1-normal pt-3 flex flex-row">{dm.name}</label>
//               </div>
//               {/* <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke-width="1.5"
//                 stroke="currentColor"
//                 class="size-6"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
//                 />
//               </svg> */}
//             </div>
//           )
//         })}
//       </div>
//       <div className="mt-4 w-[90%] border rounded-[4px] border-[#8080803d] bg-slate-700">
//         <table className="w-full ">
//           <tbody style={{ borderRadius: '10px' }} className="">
//             <tr className="border-b caption1-normal text-neutral-500 border-[#8080803d]">
//               <td className="text-center"></td>
//               <td className="text-center">Min deposit</td>
//               <td className="px-6 text-center">Fee</td>
//             </tr>

//             {depositMethodsQuery.data.map((dm) => {
//               return (
//                 <tr className="border-t border-[#8080803d]">
//                   <td className="caption1-normal text-center text-slate-300">{dm.name}</td>
//                   <td className="text-center">
//                     <label className="mr-0 caption2-normal text-slate-200">+$</label>
//                     <label className="caption1-normal text-slate-200">{dm.minDeposit.toFixed(2)}</label>
//                   </td>
//                   <td className="text-center">
//                     <label className="mr-0 caption2-normal text-slate-200">-$</label>
//                     <label className="caption1-normal text-slate-300">{dm.fee.toFixed(2)}</label>
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
