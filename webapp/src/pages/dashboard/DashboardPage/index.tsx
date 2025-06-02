import { HoldemTable, TableLevel } from '@pokertrust/backend/src/holdem/manager/HoldemManager'
import { Blinds, BuyIn } from '@pokertrust/backend/src/holdem/session/HoldemGameState'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParallax } from 'react-scroll-parallax'
import dashback from '../../../assets/images/dashback.png'
import NotEnoughFunds from '../../../components/dialogs/notEnoughFunds'
import { env } from '../../../lib/env'
import { trpc } from '../../../lib/trpc'
import { useLocalIdStore } from '../../../lib/useLocalIdStore'

export default function DashboardPage() {
  const { localId } = useLocalIdStore()

  const getMeQuery =
    env.VITE_HOST_ENV === 'local' ? trpc.getMeLocal.useQuery({ userId: localId }) : trpc.getMe.useQuery()

  const incomingTransactionsVerifyQuery = trpc.incomingTransactionsVerify.useQuery({
    userId: env.VITE_HOST_ENV === 'local' ? localId : (getMeQuery.data?.me?.id ?? ''),
  })

  const [tables, setTables] = useState<HoldemTable[]>([])
  const [balance, setBalance] = useState<number | null>(null)
  const [freeBalance, setFreeBalance] = useState<number | null>(null)

  trpc.onBalance.useSubscription(
    { userId: env.VITE_HOST_ENV === 'local' ? localId : (getMeQuery.data?.me?.id ?? '') },
    {
      onData(data) {
        setBalance(data.amount)
      },
      onError(err) {
        console.error('Balance Error', err)
      },
    }
  )

  trpc.onFreeBalance.useSubscription(
    { userId: env.VITE_HOST_ENV === 'local' ? localId : (getMeQuery.data?.me?.id ?? '') },
    {
      onData(data) {
        setFreeBalance(data.amount)
      },
      onError(err) {
        console.error('Balance Error', err)
      },
    }
  )

  trpc.onHoldemTableList.useSubscription(undefined, {
    onData(data) {
      setTables(data.list)
    },
    onError(err) {
      console.error('Holdem List Error', err)
    },
  })

  if (
    getMeQuery.isLoading ||
    getMeQuery.isFetching ||
    incomingTransactionsVerifyQuery.isLoading ||
    incomingTransactionsVerifyQuery.isFetching
  ) {
    return <div>Loading...</div>
  }

  if (getMeQuery.isError) {
    return <div>User Data Error: {getMeQuery.error.message}</div>
  }

  if (incomingTransactionsVerifyQuery.isError) {
    return <div>Incomming Transaction Error: {incomingTransactionsVerifyQuery.error.message}</div>
  }

  if (!getMeQuery.data?.me?.id) {
    return <div>User Data Error: Invalid user ID</div>
  }

  const userId = getMeQuery.data.me.id
  const userName = getMeQuery.data.me.name
  const depositAddress = getMeQuery.data.me.tonAddress

  if (!userId || !userName || balance === null || freeBalance === null || tables.length === 0) {
    return <div>Loading data...</div>
  }

  return (
    <Dashboard
      userId={userId}
      userName={userName}
      depositAddress={depositAddress}
      balance={balance}
      freeBalance={freeBalance}
      tables={tables}
    />
  )
}

type DashboardProps = {
  userId: string
  userName: string
  depositAddress: string
  balance: number
  freeBalance: number
  tables: HoldemTable[]
}

function Dashboard({ userId, userName, depositAddress, balance, tables }: DashboardProps) {
  const navigate = useNavigate()

  const [tableLevel, setTableLevel] = useState<TableLevel>('low')
  const [isSticky, setIsSticky] = useState(false)
  const [notEnoughFundsVisible, setNotEnoughFundsVisible] = useState<boolean>(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const { ref } = useParallax<HTMLDivElement>({
    translateY: [0, 0],
    opacity: [1, 1],
    easing: 'easeInOut',
    shouldAlwaysCompleteAnimation: true,
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const headerHeight = ref.current?.offsetHeight || 0
      const scrollDirection = scrollY > lastScrollY.current ? 'down' : 'up'

      if (scrollDirection === 'down' && scrollY > headerHeight + 16) {
        setIsSticky(true)
      } else if (scrollDirection === 'up' && scrollY < headerHeight + 16) {
        setIsSticky(false)
      }

      lastScrollY.current = scrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tables.length, balance, ref])

  const join = (tableId: string) => {
    navigate(`/table/${tableId}`)
  }

  const handleDeposit = () => {
    navigate(`/deposit/${userId}/${depositAddress}`)
  }

  const handleWithdraw = () => {
    // if (balance >= 0.8) {
    //   navigate(`/withdraw`)
    // } else {
    //   setNotEnoughFundsVisible(true)
    // }
  }

  return (
    <div className="page items-center">
      {notEnoughFundsVisible && (
        <NotEnoughFunds
          handleClose={() => {
            setNotEnoughFundsVisible(false)
          }}
          handleDeposit={() => {
            setNotEnoughFundsVisible(false)
            handleDeposit()
          }}
        />
      )}
      <div
        ref={ref}
        style={{ backgroundImage: `url(${dashback})` }}
        className=" bg-cover bg-center py-3 w-full flex flex-col items-center rounded-[10px] bg-stone-900"
      >
        <div className="pt-2 text-center title3-semibold text-neutral-200">{userName}</div>
        <div className="py-2 flex flex-row items-center">
          <div className="w-5 h-5 rounded-full bg-neutral-300 flex items-center justify-center">
            <span className="pt-[0px] headline-bold text-slate-800">$</span>
          </div>
          <label className="ml-1 text-neutral-300 title3-semibold">{balance.toFixed(2)}</label>
        </div>
        <div className="flex flex-row w-full justify-center gap-4">
          <button
            onClick={handleDeposit}
            className="button flex flex-row justify-center items-center mt-2 w-2/5 py-2 subheadline1-semibold rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="px-1">Deposit</span>
          </button>
          <button
            onClick={handleWithdraw}
            className="button flex flex-row justify-center items-center mt-2 w-2/5 py-2 subheadline1-semibold rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="px-1">Withdraw</span>
          </button>
        </div>
      </div>
      <div
        ref={panelRef}
        className={`z-10 ${isSticky ? 'fixed top-0 max-w-xl mx-auto px-6 border-b-[1px] border-[#c0c0c03b]' : ''} py-2 flex flex-row w-full justify-items-start gap-2 bg-slate-800`}
      >
        {['low', 'medium', 'high', 'free'].map((tl) => (
          <button
            key={tl}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setTableLevel(tl as TableLevel)
            }}
            className={`${tl === tableLevel ? 'bg-neutral-700' : ''} button px-2 rounded-[4px] border-2 border-neutral-500 subheadline1-normal`}
          >
            {tl}
          </button>
        ))}
      </div>

      {isSticky && (
        <div className="py-2 opacity-0">
          <div className="px-2 subheadline1-normal">Placeholder</div>
        </div>
      )}

      <div className="pt-3 flex flex-col gap-3 w-full scrollbar-hide z-0 bg-slate-800">
        {tables
          .filter((t) => t.level === tableLevel)
          .map((t) => {
            t.playerIds.includes(userId)
            return (
              <TableItem
                key={t.tableId}
                tableId={t.tableId}
                blinds={t.blinds}
                buyIn={t.buyIn}
                players={t.playerIds.length}
                handleJoin={() => join(t.tableId)}
                isBack={t.playerIds.includes(userId) ? true : false}
              />
            )
          })}
      </div>

      {/* <TableList userId={userId} tableLevel={tableLevel} tableList={tables} handleJoin={join} /> */}
    </div>
  )
}

type TableItemProps = {
  tableId: string
  blinds: Blinds
  buyIn: BuyIn
  players: number
  handleJoin: (tableId: string) => void
  isBack: boolean
}

function TableItem({ tableId, blinds, buyIn, players, handleJoin, isBack }: TableItemProps) {
  return (
    <div
      onClick={() => handleJoin(tableId)}
      style={{ boxShadow: isBack ? '0 0 5px #ffa600b4' : '' }}
      className={`button ${isBack ? 'border-2 border-amber-500' : 'border border-[#ffa6003b]'} p-1 px-2 flex flex-row items-center w-full rounded-[10px] `}
    >
      <table className="w-3/4 border-collapse">
        <tbody>
          <tr className="border-b caption1-normal text-neutral-500 border-[#8080803d]">
            <td className="text-center">Blinds</td>
            <td className="text-center">Buy-In</td>
            <td className="text-center">Players</td>
          </tr>
          <tr className="">
            <td className="text-center p-[1px] h-6">
              <span className="subheadline2-normal text-neutral-500">$</span>
              <span className="mx-[2px] subheadline2-normal">{blinds.small_blind.toFixed(2)}</span>
            </td>
            <td className="text-center p-[1px] h-6">
              <span className="subheadline2-normal text-neutral-500">$</span>
              <span className="mx-[2px] subheadline2-normal text-neutral-300">{buyIn.at.toFixed(2)}</span>
            </td>
            <td className="text-center p-[1px] h-6">
              <span className="mx-[2px] subheadline2-normal text-neutral-300">{players}/7</span>
            </td>
          </tr>
          <tr className="">
            <td className="text-center">
              <span className="subheadline2-normal text-neutral-500">$</span>
              <span className="mx-[2px] subheadline2-normal text-neutral-300">{blinds.big_blind.toFixed(2)}</span>
            </td>
            <td className="text-center">
              <span className="subheadline2-normal text-neutral-500">$</span>
              <span className="mx-[2px] subheadline2-normal text-neutral-300">{buyIn.to.toFixed(2)}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className={`button flex flex-row justify-center items-center mt-2 w-1/4 py-1 subheadline2-semibold rounded-2xl bg-gradient-to-b ${isBack ? 'from-amber-400 to-amber-500' : 'from-emerald-600 to-emerald-700'}  text-gray-800`}
      >
        {!isBack && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path d="M8 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.156 11.763c.16-.629.44-1.21.813-1.72a2.5 2.5 0 0 0-2.725 1.377c-.136.287.102.58.418.58h1.449c.01-.077.025-.156.045-.237ZM12.847 11.763c.02.08.036.16.046.237h1.446c.316 0 .554-.293.417-.579a2.5 2.5 0 0 0-2.722-1.378c.374.51.653 1.09.813 1.72ZM14 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM3.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 13c-.552 0-1.013-.455-.876-.99a4.002 4.002 0 0 1 7.753 0c.136.535-.324.99-.877.99H5Z" />
          </svg>
        )}
        <span className="px-1">{isBack ? 'Return' : 'Join'}</span>
      </button>
    </div>
  )
}
