// import { TonConnectButton } from '@tonconnect/ui-react'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import tonIcon from '../../../assets/images/ton-logo.png'
import tonkeeperIcon from '../../../assets/images/tonkeeper-icon.png'
// import usdtTONIcon from '../../../assets/images/usdtTON.png'

export default function DepositPage() {
  const { userId, address } = useParams()

  const [qrImageVisible, setQrImageVisible] = useState(false)
  const [qrUrl, setQrUrl] = useState<string>('')

  useEffect(() => {
    if (qrUrl === '' && address !== undefined) {
      QRCode.toDataURL(address, {
        color: {
          dark: '#000000',
          light: '#ffffff00',
        },
      })
        .then((url) => {
          setQrUrl(url)
        })
        .catch((err) => console.error(err))
    }
  })

  const handleTonkeeperDeposit = () => {
    window.open(`https://app.tonkeeper.com/transfer/${address}`)
  }

  if (userId === undefined) {
    return <div>Error user id</div>
  }

  return (
    <div className="page items-center break-word text-center">
      <div className="title1-normal flex flex-row items-center justify-center">
        <label>TON</label>
        <img src={tonIcon} className="w-[30px] h-[30px] object-contain pl-2" />
      </div>
      <div className="flex flex-row items-center justify-center ml-2 mr-2 mt-4 mb-4 px-2 border-2 border-red-700 border-opacity-80 bg-red-800 rounded-[max(1vh,1vw)] bg-opacity-25">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#b91c1c"
          className="size-20 opacity-80"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>

        <div className="pl-2 text-left subheadline3-normal">
          Use this address only for TON transactions. Sending other assets may result in loss of your funds.
        </div>
      </div>

      <div className="caption2-normal text-neutral-500 text-center px-4">
        Make a transfer to this address and wait for your balance update in Poker Trust{' '}
      </div>
      <div className="title3-normal mt-2">Deposit Address: </div>
      <div className="p-4 subheadline2-normal w-full break-all bg-slate-700 text-slate-200 rounded-[max(1vw,1vh)]">
        {address}
      </div>

      <div className="flex flex-row mt-4 w-full">
        <div className="flex-1 flex-row">
          <button className="button flex flex-row justify-center items-center px-2 py-1 bg-gradient-to-br from-amber-400 to-amber-500 rounded-[max(1vw,1vh)] text-slate-900 title3-normal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
              <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
            </svg>
            <label>Copy</label>
          </button>

          <button
            onClick={() => {
              setQrImageVisible(!qrImageVisible)
            }}
            className="button ml-2 flex flex-row justify-center items-center px-2 py-1 bg-gradient-to-br from-amber-400 to-amber-500 rounded-[max(1vw,1vh)] text-slate-900 title3-normal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path
                fill-rule="evenodd"
                d="M3.75 2A1.75 1.75 0 0 0 2 3.75v3.5C2 8.216 2.784 9 3.75 9h3.5A1.75 1.75 0 0 0 9 7.25v-3.5A1.75 1.75 0 0 0 7.25 2h-3.5ZM3.5 3.75a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.5a.25.25 0 0 1-.25.25h-3.5a.25.25 0 0 1-.25-.25v-3.5ZM3.75 11A1.75 1.75 0 0 0 2 12.75v3.5c0 .966.784 1.75 1.75 1.75h3.5A1.75 1.75 0 0 0 9 16.25v-3.5A1.75 1.75 0 0 0 7.25 11h-3.5Zm-.25 1.75a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.5a.25.25 0 0 1-.25.25h-3.5a.25.25 0 0 1-.25-.25v-3.5Zm7.5-9c0-.966.784-1.75 1.75-1.75h3.5c.966 0 1.75.784 1.75 1.75v3.5A1.75 1.75 0 0 1 16.25 9h-3.5A1.75 1.75 0 0 1 11 7.25v-3.5Zm1.75-.25a.25.25 0 0 0-.25.25v3.5c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-3.5a.25.25 0 0 0-.25-.25h-3.5Zm-7.26 1a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V5.5a1 1 0 0 0-1-1h-.01Zm9 0a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V5.5a1 1 0 0 0-1-1h-.01Zm-9 9a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1v-.01a1 1 0 0 0-1-1h-.01Zm9 0a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1v-.01a1 1 0 0 0-1-1h-.01Zm-3.5-1.5a1 1 0 0 1 1-1H12a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1V12Zm6-1a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1H17a1 1 0 0 0 1-1V12a1 1 0 0 0-1-1h-.01Zm-1 6a1 1 0 0 1 1-1H17a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1V17Zm-4-1a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1H12a1 1 0 0 0 1-1V17a1 1 0 0 0-1-1h-.01Z"
                clip-rule="evenodd"
              />
            </svg>

            <label>QR code</label>
          </button>
        </div>

        <button onClick={handleTonkeeperDeposit}>
          <img
            style={{ boxShadow: '0px 0px 5px 0px gray' }}
            src={tonkeeperIcon}
            className="ml-4 w-[40px] h-[40px] object-contain rounded-[max(1vw,1vh)]"
          />
        </button>
      </div>
      {qrImageVisible && (
        <>
          <img
            src={qrUrl}
            className="mt-4 w-full h-auto object-contain rounded-[max(2vw,2vh)] bg-slate-50"
            alt="QR code"
          />
          <div className="opacity-0">/</div>
        </>
      )}
    </div>
  )
}
