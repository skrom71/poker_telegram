import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { trpc } from '../../../lib/trpc'
import { useLocalIdStore } from '../../../lib/useLocalIdStore'

export default function SplashPageLocal() {
  const navigate = useNavigate()

  const { setLocalId: setId } = useLocalIdStore()

  const initLocal = trpc.initLocal.useMutation()

  const [input, setInput] = useState<string>('')

  const handleOnClick = () => {
    if (input !== '') {
      initLocal.mutate({ playerId: input })
      setTimeout(() => {
        setId(input)
        navigate('/dashboard')
      }, 3000)
    }
  }

  return (
    <div className="-mt-20 page items-stretch justify-center h-screen">
      <input
        type="number"
        placeholder="Enter local id"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="px-2 py-1 subheadline-normal text-center rounded-xl appearance-none outline-gray-500 outline-1 bg-zinc-900 focus:outline-1 focus:outline-blue-500"
      />
      <button
        className="button mt-2 px-2 py-1 text-semibold bg-amber-500 text-slate-900 rounded-md"
        onClick={handleOnClick}
      >
        Sing In
      </button>
    </div>
  )
}
