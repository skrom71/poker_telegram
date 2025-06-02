import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { retrieveTelgInitData } from '../../../lib/retrieveTelgInitData'
import { trpc } from '../../../lib/trpc'

export default function SplashPage() {
  const navigate = useNavigate()

  const { data, error, isLoading, isFetching, isError } = trpc.init.useQuery({ tma: `${retrieveTelgInitData()}` })

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    }
  }, [data, navigate])

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error1: {error?.message}</div>
  }

  return <div>Redirecting...</div>
}
