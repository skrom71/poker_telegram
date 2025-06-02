import { createTrpcRouter } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getMeTrpcRoute } from './auth/getMe'
import { getMeLocalTrpcRoute } from './auth/getMeLocal'
import { initTrpcRoute } from './auth/init'
import { initLocalTrpcRoute } from './auth/initLocal'
import { depositAddressTrpcRoute } from './funds/depositAddress'
import { incomingTransactionsVerifyTrpcRoute } from './funds/incomingTransactionsVerify'
import { onBalanceTrpcRoute } from './funds/onBalance'
import { onFreeBalanceTrpcRoute } from './funds/onFreeBalance'
import { onGameStateTrpcRoute } from './gameState/holdem/onGameState'
import { onHoldemTableListTrpcRoute } from './gameState/holdem/onHoldemTableList'
import { onNewRoundTrpcRoute } from './gameState/holdem/onNewRound'
import { onNextCardTrpcRoute } from './gameState/holdem/onNextCard'
import { onNextStageTrpcRoute } from './gameState/holdem/onNextStage'
import { onNotEnoughPlayersTrpcRoute } from './gameState/holdem/onNotEnoughPlayers'
import { onPlayerActionTrpcRoute } from './gameState/holdem/onPlayerAction'
import { onPlayersWinTrpcRoute } from './gameState/holdem/onPlayersWin'
import { onPlayerToActiveTrpcRoute } from './gameState/holdem/onPlayerToActive'
import { onPotCollectTrpcRoute } from './gameState/holdem/onPotCollect'
import { onTimeToMoveTrpcRoute } from './gameState/holdem/onTimeToMove'
import { playerActionTrpcRoute } from './gameState/holdem/playerAction'
import { playerBuyInTrpcRoute } from './gameState/holdem/playerBuyIn'
import { playerLeaveTrpcRoute } from './gameState/holdem/playerLeave'
// @endindex

export const trpcRouter = createTrpcRouter({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getMe: getMeTrpcRoute,
  getMeLocal: getMeLocalTrpcRoute,
  init: initTrpcRoute,
  initLocal: initLocalTrpcRoute,
  depositAddress: depositAddressTrpcRoute,
  incomingTransactionsVerify: incomingTransactionsVerifyTrpcRoute,
  onBalance: onBalanceTrpcRoute,
  onFreeBalance: onFreeBalanceTrpcRoute,
  onGameState: onGameStateTrpcRoute,
  onHoldemTableList: onHoldemTableListTrpcRoute,
  onNewRound: onNewRoundTrpcRoute,
  onNextCard: onNextCardTrpcRoute,
  onNextStage: onNextStageTrpcRoute,
  onNotEnoughPlayers: onNotEnoughPlayersTrpcRoute,
  onPlayerAction: onPlayerActionTrpcRoute,
  onPlayersWin: onPlayersWinTrpcRoute,
  onPlayerToActive: onPlayerToActiveTrpcRoute,
  onPotCollect: onPotCollectTrpcRoute,
  onTimeToMove: onTimeToMoveTrpcRoute,
  playerAction: playerActionTrpcRoute,
  playerBuyIn: playerBuyInTrpcRoute,
  playerLeave: playerLeaveTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
