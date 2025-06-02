import {
  Blinds,
  HoldemGameState,
  HoldemGameStatePlayer,
  Pot,
} from '@pokertrust/backend/src/holdem/session/HoldemGameState'
// import { ReactNode } from 'react'
import { ReactNode, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
import { roundToTwoDecimals } from '@pokertrust/shared/src/lib/formater'
import { useNavigate, useParams } from 'react-router-dom'
import BetPanel from '../../../components/betPanel'
import BuyInDialog from '../../../components/dialogs/buyIn/indext'
import LowAccountBalanceDialog from '../../../components/dialogs/lowAccountBalance'
import PlayerSeat from '../../../components/playerSeat'
import getCardImage from '../../../lib/cards'
import { env } from '../../../lib/env'
import { playSound } from '../../../lib/soundManager'
import { trpc } from '../../../lib/trpc'
import { useLocalIdStore } from '../../../lib/useLocalIdStore'
import './input.css'
import chip1 from '/src/assets/images/chip-1.png'
import tableImage from '/src/assets/images/table.png'
import tableImage90 from '/src/assets/images/table90.png'

const maxWidth = 576

export default function TablePage() {
  const { tableId } = useParams()
  const { localId } = useLocalIdStore()
  const getMeQuery =
    env.VITE_HOST_ENV === 'local' ? trpc.getMeLocal.useQuery({ userId: localId }) : trpc.getMe.useQuery()

  const userId = getMeQuery.data?.me?.id
  const name = getMeQuery.data?.me?.name
  const fiatBalance = getMeQuery.data?.me?.balance
  const freeBalance = getMeQuery.data?.me?.freeBalance

  if (
    tableId === undefined ||
    userId === undefined ||
    name === undefined ||
    fiatBalance === undefined ||
    freeBalance === undefined
  ) {
    return <div>Error params</div>
  }

  return (
    <TableContent tableId={tableId} userId={userId} name={name} fiatBalance={fiatBalance} freeBalance={freeBalance} />
  )
}

function TableContent({
  tableId,
  userId,
  name,
  fiatBalance,
  freeBalance,
}: {
  tableId: string
  userId: string
  name: string
  fiatBalance: number
  freeBalance: number
}) {
  const navigate = useNavigate()
  const orientation = window.innerWidth < window.innerHeight ? 'portrait' : 'landscape'

  const [gameState, setGameState] = useState<HoldemGameState | null>(null)
  const [playerCards, setPlayerCards] = useState<string[] | null>(null)
  const [hand, setHand] = useState<string | null>(null)
  const [playersWin, setPlayersWin] = useState<string[] | null>(null)
  const [buyInDialogVisible, setBuyInDialogVisible] = useState<boolean>(false)
  const [lowBalanceVisible, setLowBalanceVisible] = useState<boolean>(false)

  const [betPanelVisible, setBetPanelVisible] = useState<boolean>(false)
  const [seatPosition, setSeatPosition] = useState<number | undefined>(undefined)

  const playerAction = trpc.playerAction.useMutation()
  const playerBuyIn = trpc.playerBuyIn.useMutation()
  const playerLeave = trpc.playerLeave.useMutation()

  const positions = [1, 2, 3, 4, 5, 6, 7]

  // trpc events

  trpc.onGameState.useSubscription(
    { userId: userId, tableId: tableId },
    {
      onData(data) {
        // setPlayersWin([])
        setGameState(data.gameState)
      },
      onError(err) {
        console.info('Error onGameState sub:', err)
      },
    }
  )

  trpc.onPlayersWin.useSubscription(
    { tableId: tableId },
    {
      onData(data) {
        setPlayersWin(data.userIds)
        playSound('win')
      },
      onError(err) {
        console.info('Error onPlayerWin sub:', err)
      },
    }
  )

  trpc.onNextStage.useSubscription(
    { tableId: tableId, userId: userId },
    {
      onData(data) {
        setHand(data.hand)
      },
      onError(err) {
        console.info('Error onNextStage sub:', err)
      },
    }
  )

  trpc.onNewRound.useSubscription(
    { tableId: tableId, userId: userId },
    {
      onData(data) {
        playSound('shuffleCards')
        setHand(null)
        setPlayersWin([])
        setPlayerCards([])
        setTimeout(() => {
          setPlayerCards(data.cards)
        }, 1000)
      },
      onError(err) {
        console.info('Error onNewRound sub:', err)
      },
    }
  )

  trpc.onNotEnoughPlayers.useSubscription(
    { tableId: tableId },
    {
      onData() {
        setPlayerCards([])
        setHand(null)
        // setPlayersWin([])
      },
      onError(err) {
        console.info('Error onNotEnoughPlayers sub:', err)
      },
    }
  )

  trpc.onPlayerToActive.useSubscription(
    { tableId: tableId, userId: userId },
    {
      onData() {
        playSound('backToActive')
      },
      onError(err) {
        console.info('Error onPlayerToActive sub:', err)
      },
    }
  )

  trpc.onPlayerAction.useSubscription(
    { tableId: tableId },
    {
      onData(data) {
        setBetPanelVisible(false)
        playSound(data.action)
      },
      onError(err) {
        console.info('Error onPlayerFold sub:', err)
      },
    }
  )

  trpc.onPotCollect.useSubscription(
    { tableId: tableId },
    {
      onData() {
        playSound('potCollect')
      },
      onError(err) {
        console.info('Error onPlayerFold sub:', err)
      },
    }
  )

  trpc.onNextCard.useSubscription(
    { tableId: tableId },
    {
      onData() {
        playSound('nextCard')
      },
      onError(err) {
        console.info('Error onPlayerFold sub:', err)
      },
    }
  )

  if (!gameState) {
    return <div>Loading...</div>
  }

  const balanceAmount: number = gameState.level === 'free' ? freeBalance : fiatBalance

  const handleSit = (position: number) => {
    if (balanceAmount && balanceAmount >= gameState.buyIn.at) {
      setSeatPosition(position)
      setBuyInDialogVisible(true)
    } else {
      setLowBalanceVisible(true)
    }
  }

  //  handle actions
  const handleLogOut = () => {
    if (gameState.players.length === 0 && gameState.pendingPlayers.length === 1) {
      playerLeave.mutate({ tableId: tableId, userId: userId })
    }
    navigate(-1)
  }

  const handleAction = (action: 'fold' | 'call' | 'bet' | 'check' | 'allIn', betAmount: number = 0) => {
    const amount = roundToTwoDecimals(betAmount)
    playerAction.mutate({ tableId: tableId, playerAction: { userId, action, betAmount: amount } })
  }

  const handleBuyInDialogClose = (amount: number | undefined) => {
    setBuyInDialogVisible(false)

    if (gameState && amount && seatPosition && name && balanceAmount >= amount) {
      playerBuyIn.mutate({
        tableId: tableId,
        player: {
          id: userId,
          name: name,
          stack: amount,
          position: seatPosition,
        },
      })
    } else {
      throw 'Buy In Error'
    }
  }

  const handleBetAction = () => {
    setBetPanelVisible(true)
  }

  const handleBetPanelClose = (amount: number | undefined) => {
    if (amount && gameState !== null && gameState.currentPlayer) {
      if (amount === gameState.currentPlayer.stack) {
        handleAction('allIn', amount)
      } else {
        handleAction('bet', amount)
      }
    }
    setBetPanelVisible(false)
  }

  const tableWidth = Math.min(maxWidth, orientation === 'portrait' ? window.innerWidth - 64 : window.innerHeight - 64)
  const seatWidth = tableWidth * 0.2

  return (
    <div className="no-scroll">
      {buyInDialogVisible && balanceAmount >= gameState.buyIn.at && (
        <BuyInDialog balance={balanceAmount} buyIn={gameState.buyIn} handleClose={handleBuyInDialogClose} />
      )}
      {lowBalanceVisible && balanceAmount < gameState.buyIn.at && (
        <LowAccountBalanceDialog
          balance={balanceAmount}
          buyIn={gameState.buyIn}
          handleClose={() => {
            setLowBalanceVisible(false)
          }}
          handleDeposit={() => {
            setLowBalanceVisible(false)
          }}
        />
      )}

      <button onClick={handleLogOut} className="absolute m-[3%] p-[2%] top-0 left-0 border-1 rounded-[max(1vw,1vh)]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
          <path
            fill-rule="evenodd"
            d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      {/* <img src={logOutIcon} className="" onClick={handleLogOut} /> */}
      {gameState && (
        <div className="table portrait:table-portrait landscape:table-landscape">
          <img src={tableImage} alt="Portrait" className="portrait:block landscape:hidden" />
          <img src={tableImage90} alt="Portrait" className="portrait:hidden landscape:block" />

          {gameState.pots.length > 0 && <Pots pots={gameState.pots} seatWidth={seatWidth} />}
          {gameState.blinds && <BlindsInfo blinds={gameState.blinds} seatWidth={seatWidth} />}
          {gameState.board.length > 0 && <BoardCards cards={gameState.board} />}

          {positions.map((position) => {
            const playerByPosition: HoldemGameStatePlayer | undefined = gameState.players.find(
              (player) => player.position === position
            )

            const pendingPlayerByPosition: HoldemGameStatePlayer | undefined = gameState.pendingPlayers.find(
              (player) => player.position === position
            )

            if (playerByPosition) {
              return (
                <Seat
                  position={position}
                  child={
                    <PlayerSeat
                      name={playerByPosition.name}
                      cards={
                        playerByPosition.id === userId && playerCards
                          ? playerCards
                          : playerByPosition.cards
                            ? playerByPosition.cards
                            : []
                      }
                      stack={playerByPosition.stack.toString()}
                      hand={playerByPosition.id === userId && hand ? hand : playerByPosition.hand}
                      isDealer={
                        gameState.dealerIndex !== undefined &&
                        gameState.players[gameState.dealerIndex] &&
                        playerByPosition.id === gameState.players[gameState.dealerIndex].id
                      }
                      status={playerByPosition.status}
                      position={position}
                      bet={playerByPosition.bet}
                      tableWidth={tableWidth}
                      orientation={orientation}
                      tableId={tableId}
                      userId={playerByPosition.id}
                      currentUserId={userId}
                      isWinner={playersWin?.includes(playerByPosition.id) ?? false}
                    />
                  }
                />
              )
            } else if (pendingPlayerByPosition) {
              return (
                <Seat
                  position={position}
                  child={
                    <PlayerSeat
                      position={position}
                      name={pendingPlayerByPosition.name}
                      cards={pendingPlayerByPosition.cards}
                      stack={pendingPlayerByPosition.stack.toString()}
                      hand={pendingPlayerByPosition.hand}
                      isDealer={
                        gameState.dealerIndex !== undefined &&
                        gameState.players[gameState.dealerIndex] &&
                        pendingPlayerByPosition.id === gameState.players[gameState.dealerIndex].id
                      }
                      status={pendingPlayerByPosition.status}
                      bet={pendingPlayerByPosition.bet}
                      tableWidth={tableWidth}
                      orientation={orientation}
                      tableId={tableId}
                      userId={pendingPlayerByPosition.id}
                      currentUserId={userId}
                      isWinner={false}
                    />
                  }
                />
              )
            } else if (
              gameState.players.find((player) => player.id === userId) ||
              gameState.pendingPlayers.find((player) => player.id === userId)
            ) {
              return <Seat child={<InviteButton seatWidth={seatWidth} />} position={position} />
            } else {
              return <Seat child={<SitButton seatWidth={seatWidth} position={position} />} position={position} />
            }
          })}
        </div>
      )}
      {betPanelVisible && gameState.currentPlayer && (
        <div className="bet-panel">
          <BetPanel
            min={roundToTwoDecimals(
              gameState.blinds.big_blind + (gameState.previousMaxBet - gameState.currentPlayer.bet)
            )}
            pot={roundToTwoDecimals(
              gameState.totalPot < gameState.blinds.big_blind + (gameState.previousMaxBet - gameState.currentPlayer.bet)
                ? gameState.blinds.big_blind + (gameState.previousMaxBet - gameState.currentPlayer.bet)
                : gameState.totalPot > gameState.currentPlayer.stack
                  ? gameState.currentPlayer.stack
                  : gameState.totalPot
            )}
            allIn={gameState.currentPlayer.stack}
            smallBlind={gameState.blinds.small_blind}
            handleClose={handleBetPanelClose}
          />
        </div>
      )}
      {!betPanelVisible && gameState.currentPlayer && gameState.currentPlayer.id === userId && <ActionBar />}
    </div>
  )

  // =========================================Components=========================================

  function SitButton({ seatWidth, position }: { seatWidth: number; position: number }) {
    const textSize1 = Math.floor(seatWidth * 0.2)

    return (
      <button
        onClick={() => handleSit(position)}
        style={{ width: `${seatWidth}px`, fontSize: `${textSize1}px`, boxShadow: '0px 0px 10px #7e5a18' }}
        className="button py-2 bg-gradient-to-b from-[#FAC159] to-[#916b25] text-amber-900 flex flex-col items-center font-semibold text-[min(3vw,3vh)] px-3 mx-auto whitespace-nowrap  text-center border-slate-700 rounded-[max(2vw,2vh)]"
      >
        SIT
      </button>
    )
  }

  function ActionBar() {
    if (gameState && !betPanelVisible && gameState.currentPlayer && gameState.currentPlayer.id === userId) {
      const checkVisible = gameState.previousMaxBet === gameState.currentPlayer.bet

      const callVisible =
        gameState.currentPlayer.stack > gameState.previousMaxBet - (gameState.currentPlayer.bet ?? 0) &&
        gameState.previousMaxBet > 0 &&
        gameState.previousMaxBet !== gameState.currentPlayer.bet

      const betVisible = gameState.currentPlayer.stack > gameState.previousMaxBet - gameState.currentPlayer.bet

      return (
        <div className="action-bar">
          <button
            onClick={() => handleAction('fold')}
            style={{ boxShadow: '0 0 3px #FF8989' }}
            className="p-3 flex-1 bg-red-800 rounded-[max(1vw,1vh)]"
          >
            Fold
          </button>
          <button
            onClick={() => handleAction('check')}
            disabled={!checkVisible}
            style={{ boxShadow: `${checkVisible && '0 0 3px #00CE75'}` }}
            className={`${checkVisible ? 'bg-emerald-600' : 'bg-emerald-900 text-neutral-400'} p-3 flex-1 rounded-[max(1vw,1vh)]`}
          >
            Check
          </button>
          <button
            disabled={!callVisible}
            onClick={() => handleAction('call')}
            style={{ boxShadow: `${callVisible && '0 0 3px #00CE75'}` }}
            className={`${callVisible ? 'bg-emerald-600' : 'bg-emerald-900 text-neutral-400'} p-3 flex-1 rounded-[max(1vw,1vh)]`}
          >
            Call
          </button>
          {betVisible ? (
            <button
              onClick={handleBetAction}
              style={{ boxShadow: '0 0 3px #00CE75' }}
              className="p-3 flex-1 bg-emerald-600 rounded-[max(1vw,1vh)]"
            >
              Bet
            </button>
          ) : (
            <button
              onClick={() => handleAction('allIn')}
              style={{ boxShadow: '0 0 5px #6847B7' }}
              className="p-3 flex-1 bg-[#6847B7] rounded-[max(1vw,1vh)]"
            >
              All-in
            </button>
          )}
        </div>
      )
    }
  }

  function Seat({ position, child }: { position: number; child: ReactNode }) {
    type PositionStyle = {
      portrait: string
      landscape: string
    }

    type Positions = Record<number, PositionStyle>

    const positions: Positions = {
      1: {
        portrait: 'portrait:top-0 portrait:left-[20%]',
        landscape: 'landscape:top-0 landscape:left-[12%]',
      },
      2: {
        portrait: 'portrait:top-0 portrait:right-[20%]',
        landscape: 'landscape:-top-[3%] landscape:right-[50%] landscape:translate-x-1/2',
      },
      3: {
        portrait: 'portrait:top-[30%] portrait:-right-[5%]',
        landscape: 'landscape:top-0 landscape:right-[12%]',
      },
      4: {
        portrait: 'portrait:bottom-[30%] portrait:-right-[5%]',
        landscape: 'landscape:bottom-[50%] landscape:-right-[3%] landscape:translate-y-[50%]',
      },
      5: {
        portrait: 'portrait:bottom-0 portrait:left-[50%] portrait:-translate-x-[50%]',
        landscape: 'landscape:bottom-0 landscape:right-[25%]',
      },
      6: {
        portrait: 'portrait:bottom-[30%] portrait:-left-[5%]',
        landscape: 'landscape:bottom-0 landscape:left-[25%]',
      },
      7: {
        portrait: 'portrait:top-[30%] portrait:-left-[5%]',
        landscape: 'landscape:bottom-[50%] landscape:-left-[3%] landscape:translate-y-[50%]',
      },
    }

    return <div className={`absolute ${positions[position].portrait} ${positions[position].landscape}`}>{child}</div>
  }

  function InviteButton({ seatWidth }: { seatWidth: number }) {
    const textSize1 = Math.floor(seatWidth * 0.2)
    return (
      <button
        style={{ fontSize: `${textSize1}px` }}
        className="button backdrop-blur-[1vw] flex flex-col items-center font-normal text-[min(3vw,3vh)] px-3 py-1 mx-auto whitespace-nowrap border-dashed border text-gray-300 text-center border-gray-400 rounded-[min(2vw,2vh)] opacity-95 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
        <div>Invate</div>
      </button>
    )
  }

  function Pots({ pots, seatWidth }: { pots: Pot[]; seatWidth: number }) {
    const textSize1 = Math.floor(seatWidth * 0.2)
    return (
      <div className="pots portrait:pots-portrait landscape:pots-landscape">
        {pots.map((pot) => (
          <div className="flex-row items-center rounded-[max(1.5vw,1.5vh)] gap-[2px] px-1 bg-gradient-to-b from-neutral-700 to-neutral-800 opacity-100">
            <img src={chip1} className="h-[max(1.5vw,1.5vh)] aspect-square" />
            <label style={{ fontSize: `${textSize1}px` }} className="text-neutral-300 font-normal">
              {pot.amount}
            </label>
          </div>
        ))}
      </div>
    )
  }

  function BoardCards({ cards }: { cards: string[] }) {
    return (
      <div className="board portrait:board-portrait landscape:board-landscape">
        {cards.map((card) => (
          <img
            style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
            src={getCardImage(card)}
            className="h-full w-auto rounded-[max(1vh,1vw)]"
          />
        ))}
      </div>
    )
  }

  function BlindsInfo({ blinds, seatWidth }: { blinds: Blinds; seatWidth: number }) {
    const textSize1 = Math.floor(seatWidth * 0.2)
    return (
      <div
        style={{ fontSize: `${textSize1}px` }}
        className="blinds portrait:blinds-portrait landscape:blinds-landscape text-neutral-300 border-neutral-300"
      >
        Min.Max {blinds.small_blind}/{blinds.big_blind}
      </div>
    )
  }
  //--=------------------------------------------END-------------------------------------
}
