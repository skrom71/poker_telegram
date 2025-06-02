import { ReactNode } from 'react'

export type DialogProps = {
  children: ReactNode
  title?: string
  onClose: () => void
}

export default function Dialog({ children, title, onClose }: DialogProps) {
  return (
    <div className="dialog">
      <div className="dialog-workspace">
        <div className="bg-slate-800 w-full rounded-xl py-4 px-6 ">
          <div className="w-full flex flex-col justify-center items-stretch">
            <div className="flex flex-row justify-between items-center mb-[16px]">
              <label className="title2-normal">{title}</label>
              <button onClick={onClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-7"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
