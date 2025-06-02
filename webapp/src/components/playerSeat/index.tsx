import { HoldemPlayerStatus } from '@pokertrust/backend/src/holdem/session/HoldemGameState'
import { useState } from 'react'
import dealerChip from '../../assets/images/chip-dealer.png'
import getCardImage from '../../lib/cards'
import { trpc } from '../../lib/trpc'
import chip1 from '/src/assets/images/chip-1.png'

type PlayerSeatProps = {
  name: string
  cards: string[] | null
  stack: string
  hand: string
  isDealer: boolean
  status: HoldemPlayerStatus
  position: number
  bet: number
  tableWidth: number
  orientation: 'portrait' | 'landscape'
  tableId: string
  userId: string
  currentUserId: string
  isWinner: boolean
  // countdownTime: number | null
}

export default function PlayerSeat({
  name,
  cards,
  stack,
  hand,
  isDealer,
  status,
  position,
  bet,
  tableWidth,
  orientation,
  tableId,
  userId,
  currentUserId,
  isWinner,
}: PlayerSeatProps) {
  const seatWidth = Math.floor(tableWidth * 0.2)

  let content

  switch (status) {
    case 'default':
      content = (
        <PlayerDefault
          name={name}
          cards={cards}
          hand={hand}
          stack={stack}
          isDealer={isDealer}
          seatWidth={seatWidth}
          tableId={tableId}
          userId={userId}
          currentUserId={currentUserId}
          isWinner={isWinner}
        />
      )
      break
    case 'fold':
      content = <PlayerFold name={name} isDealer={isDealer} seatWidth={seatWidth} tableId={tableId} userId={userId} />
      break
    case 'allIn':
      content = (
        <PlayerAllIn
          name={name}
          cards={cards}
          hand={hand}
          isDealer={isDealer}
          seatWidth={seatWidth}
          tableId={tableId}
          userId={userId}
          isWinner={isWinner}
        />
      )
      break
  }

  content = <div style={{ width: `${seatWidth}px` }}>{content}</div>

  if (bet > 0) {
    const betContent = <Bet bet={bet} seatWidth={seatWidth} />

    switch (position) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center gap-1">
            {content}
            {betContent}
          </div>
        )
      case 2:
        return (
          <div className="flex flex-col items-center justify-center gap-1">
            {content}
            {betContent}
          </div>
        )

      case 3:
        return (
          <div
            className={`flex ${orientation === 'portrait' ? 'flex-row-reverse' : 'flex-col'} items-center justify-center gap-1`}
          >
            {content}
            {betContent}
          </div>
        )
      case 4:
        return (
          <div className="flex flex-row-reverse items-center justify-center gap-1">
            {content}
            {betContent}
          </div>
        )
      case 5:
        return (
          <div className="flex flex-col-reverse items-center justify-center gap-1">
            {content}
            {betContent}
          </div>
        )

      case 6:
        return (
          <div
            className={`flex ${orientation === 'portrait' ? 'flex-row' : 'flex-col-reverse'} items-center justify-center gap-1`}
          >
            {content}
            {betContent}
          </div>
        )

      case 7:
        return (
          <div className="flex flex-row items-center justify-center gap-1">
            {content}
            {betContent}
          </div>
        )
    }
  }

  return content // <div className="w-[20%] mx-auto absolute">{content}</div>
}

type PlayerDefaultProps = {
  name: string
  cards: string[] | null
  hand: string
  stack: string
  isDealer: boolean
  seatWidth: number
  tableId: string
  userId: string
  currentUserId: string
  isWinner: boolean
}

function PlayerDefault({
  name,
  cards,
  hand,
  stack,
  isDealer,
  seatWidth,
  tableId,
  userId,
  currentUserId,
  isWinner,
}: PlayerDefaultProps) {
  let card1Path: string | null
  let card2Path: string | null

  if (cards !== null && cards.length > 0) {
    card1Path = getCardImage(cards[0])
    card2Path = getCardImage(cards[1])
  } else if (cards?.length === 0) {
    card1Path = getCardImage('')
    card2Path = getCardImage('')
  } else {
    card1Path = null
    card2Path = null
  }

  const statusBar = (
    <StatusBarTime
      name={name}
      status={'default'}
      stack={stack}
      seatWidth={seatWidth}
      tableId={tableId}
      userId={userId}
      currentUserId={currentUserId}
      isWinner={isWinner}
    />
  )

  return (
    <div className="flex flex-col relative items-stretch">
      {card1Path === null || card2Path === null ? (
        <>
          {/* <div className="w-full mx-auto flex flex-row justify-center z-0 opacity-0">
            <img
              style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
              src={getCardImage('')}
              className="w-46/100 rounded-[max(1vh,1vw)]"
            />
            <img
              style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
              src={getCardImage('')}
              className="-ml-[6%] w-46/100  rounded-[max(1vh,1vw)]"
            />
          </div> */}
          {statusBar}
        </>
      ) : (
        <>
          {isDealer && <img src={dealerChip} className="absolute -top-1 right-[5%] w-[min(4vw,4vh)] h-auto z-20" />}
          <div className="w-full mx-auto flex flex-row justify-center z-0">
            <img
              style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
              src={card1Path}
              className="w-[46%] rounded-[max(1vh,1vw)]"
            />
            <img
              style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
              src={card2Path}
              className="-ml-[6%] w-[46%]  rounded-[max(1vh,1vw)]"
            />
          </div>
          {hand !== '' && (
            <div
              style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}
              className="mx-auto max-w-fit text-center relative z-10 -mt-[20%] text-[min(2.2vh,2.2vw)] font-normal whitespace-nowrap rounded-[min(15vh,15vw)] px-1 bg-blue-700"
            >
              {hand}
            </div>
          )}
          {statusBar}
        </>
      )}
    </div>
  )
}

type PlayerAllInProps = {
  name: string
  cards: string[] | null
  hand: string
  isDealer: boolean
  seatWidth: number
  tableId: string
  userId: string
  isWinner: boolean
}

function PlayerAllIn({ name, cards, hand, isDealer, seatWidth, tableId, userId, isWinner }: PlayerAllInProps) {
  let card1Path: string | null
  let card2Path: string | null

  if (cards !== null && cards.length > 0) {
    card1Path = getCardImage(cards[0])
    card2Path = getCardImage(cards[1])
  } else {
    card1Path = getCardImage('')
    card2Path = getCardImage('')
  }

  return (
    <div className="flex flex-col relative items-stretch">
      {isDealer && <img src={dealerChip} className="absolute -top-1 right-[5%] w-[min(4vw,4vh)] h-auto z-20" />}
      <div className="w-full mx-auto flex flex-row justify-center z-0">
        <img
          style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
          src={card1Path}
          className="w-[48%] rounded-[max(1vh,1vw)]"
        />
        <img
          style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
          src={card2Path}
          className="-ml-[6%] w-[48%] rounded-[max(1vh,1vw)]"
        />
      </div>
      {hand !== '' && (
        <div
          style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}
          className="mx-auto max-w-fit text-center relative z-10 -mt-[20%] text-[min(2.2vh,2.2vw)] font-normal whitespace-nowrap rounded-[min(15vh,15vw)] px-1 bg-blue-700"
        >
          {hand}
        </div>
      )}
      {
        <StatusBar
          name={name}
          status={'allIn'}
          stack={''}
          seatWidth={seatWidth}
          tableId={tableId}
          userId={userId}
          isWinner={isWinner}
        />
      }
    </div>
  )
}

type PlayerFoldProps = {
  name: string
  isDealer: boolean
  seatWidth: number
  tableId: string
  userId: string
}

function PlayerFold({ name, isDealer, seatWidth, tableId, userId }: PlayerFoldProps) {
  return (
    <div className="flex flex-col relative items-stretch">
      {isDealer && <img src={dealerChip} className="absolute -top-1 right-[5%] w-[min(4vw,4vh)] h-auto z-20" />}
      <div className="w-90/100 mx-auto flex flex-row justify-center z-0">
        <img
          style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
          src={getCardImage('cardBackInactive')}
          className="w-[44%] rounded-[max(1vh,1vw)]"
        />
        <img
          style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}
          src={getCardImage('cardBackInactive')}
          className="-ml-[6%] w-[44%]  rounded-[max(1vh,1vw)]"
        />
      </div>
      {
        <StatusBar
          name={name}
          status={'fold'}
          stack={''}
          seatWidth={seatWidth}
          tableId={tableId}
          userId={userId}
          isWinner={false}
        />
      }
    </div>
  )
}

function StatusBarTime({
  name,
  status,
  stack,
  seatWidth,
  tableId,
  userId,
  currentUserId,
  isWinner,
}: {
  name: string
  status: HoldemPlayerStatus
  stack: string
  seatWidth: number
  tableId: string
  userId: string
  currentUserId: string
  isWinner: boolean
}) {
  const countDownTime = 45

  const [time, setTime] = useState<number>(0)

  trpc.onTimeToMove.useSubscription(
    { tableId: tableId },
    {
      onData(data) {
        if (data.userId === userId) {
          setTime(data.time)
        }
      },
      onError(err) {
        console.info('Error onTimeToMove sub:', err)
      },
    }
  )

  const textSize1 = Math.floor(seatWidth * 0.18)

  switch (status) {
    case 'default':
      return (
        <div
          style={{ boxShadow: `${isWinner ? '0px 0px 15px yellow' : '0px 0px 5px rgba(0, 0, 0, 0.5)'}` }}
          className="items-stretch relative -mt-[7%] z-0 flex flex-col width-9/10 rounded-[max(1vh,1vw)] bg-neutral-600 border-[min(0.6vw,0.6vh)] border-green-700"
        >
          <div style={{ fontSize: `${textSize1}px` }} className=" text-center truncate">
            {name}
          </div>

          {time !== 0 && currentUserId === userId && (
            <span
              style={{ boxShadow: '0px 0px 5px black', fontSize: `${textSize1 * 0.7}px` }}
              className="z-20 mx-aut rounded-[50%] w-[25%] flex items-center justify-center aspect-square absolute -top-[10%] -right-[15%] leading-none text-neutral-300 font-bold bg-red-900"
            >
              {time}
            </span>
          )}

          {time !== 0 && (
            <div
              style={{
                width: `${(100 / countDownTime) * time}%`,
                transition: 'width 0.7s linear',
              }}
              className="absolute top-[50%] -translate-y-1/2 self-start animate-color-flow border-b-4 rounded-r-[2px] z-20"
            ></div>
          )}

          <span
            style={{ fontSize: `${textSize1}px` }}
            className="text-center truncate rounded-b-[max(1vh,1vw)] bg-neutral-800 overflow-clip"
          >
            {stack}
          </span>
        </div>
      )
    case 'fold':
      return (
        <div
          style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)' }}
          className="items-stretch relative -mt-[5%] z-0 flex flex-col width-9/10 rounded-[max(1vh,1vw)] bg-neutral-800 border-[min(0.5vw,0.5vh)] border-neutral-600 overflow-clip"
        >
          <div style={{ fontSize: `${textSize1}px` }} className="bg-neutral-600  text-center  truncate">
            {name}
          </div>
          <div style={{ fontSize: `${textSize1}px` }} className="text-center truncate">
            folded
          </div>
        </div>
      )
    case 'allIn':
      return (
        <div
          style={{ boxShadow: `${isWinner ? '0px 0px 15px yellow' : '0px 0px 5px rgba(0, 0, 0, 0.5)'}` }}
          className="items-stretch relative -mt-[5%] z-0 flex flex-col width-9/10 rounded-[max(1vh,1vw)] bg-neutral-800 border-[min(0.6vw,0.6vh)] border-purple-700 overflow-clip"
        >
          <div style={{ fontSize: `${textSize1}px` }} className="bg-neutral-600  text-center truncate">
            {name}
          </div>
          <div style={{ fontSize: `${textSize1}px` }} className="text-center ">
            All-in
          </div>
        </div>
      )
  }
}

function StatusBar({
  name,
  status,
  stack,
  seatWidth,
  isWinner,
}: {
  name: string
  status: HoldemPlayerStatus
  stack: string
  seatWidth: number
  tableId: string
  userId: string
  isWinner: boolean
}) {
  const textSize1 = Math.floor(seatWidth * 0.18)

  switch (status) {
    case 'default':
      return (
        <div
          style={{ boxShadow: `${isWinner ? '0px 0px 5px yellow' : '0px 0px 5px rgba(0, 0, 0, 0.5)'}` }}
          className="items-stretch relative -mt-[7%] z-0 flex flex-col width-9/10 rounded-[max(1vh,1vw)] bg-neutral-800 border-[min(0.6vw,0.6vh)] border-green-700 overflow-clip"
        >
          <div style={{ fontSize: `${textSize1}px` }} className="bg-neutral-600  text-center truncate">
            {name}
          </div>
          <div style={{ fontSize: `${textSize1}px` }} className="text-center truncate">
            {stack}
          </div>
        </div>
      )
    case 'fold':
      return (
        <div
          style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)' }}
          className="items-stretch relative -mt-[5%] z-0 flex flex-col width-9/10 rounded-[max(1vh,1vw)] bg-neutral-800 border-[min(0.5vw,0.5vh)] border-neutral-600 overflow-clip"
        >
          <div style={{ fontSize: `${textSize1}px` }} className="bg-neutral-600  text-center  truncate">
            {name}
          </div>
          <div style={{ fontSize: `${textSize1}px` }} className="text-center truncate">
            folded
          </div>
        </div>
      )
    case 'allIn':
      return (
        <div
          style={{ boxShadow: `${isWinner ? '0px 0px 10px yellow' : '0px 0px 5px rgba(0, 0, 0, 0.5)'}` }}
          className="items-stretch relative -mt-[5%] z-0 flex flex-col width-9/10 rounded-[max(1vh,1vw)] bg-neutral-800 border-[min(0.6vw,0.6vh)] border-purple-700 overflow-clip"
        >
          <div style={{ fontSize: `${textSize1}px` }} className="bg-neutral-600  text-center truncate">
            {name}
          </div>
          <div style={{ fontSize: `${textSize1}px` }} className="text-center ">
            All-in
          </div>
        </div>
      )
  }
}

function Bet({ bet, seatWidth }: { bet: number; seatWidth: number }) {
  const textSize1 = Math.floor(seatWidth * 0.18)

  return (
    <div className="flex-row items-center rounded-[max(1.5vw,1.5vh)] gap-[2px] px-1 bg-gradient-to-b from-[#FAC159] to-[#916b25]">
      <img src={chip1} className="h-[max(1.5vw,1.5vh)] aspect-square" />
      <label style={{ fontSize: `${textSize1}px` }} className="text-amber-800 font-semibold">
        {bet}
      </label>
    </div>
  )
}
