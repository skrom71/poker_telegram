import { BuyIn } from '@pokertrust/backend/src/holdem/session/HoldemGameState'
import Dialog from '..'

export type LowAccountBalanceProps = {
  balance: number
  buyIn: BuyIn
  handleClose: () => void
  handleDeposit: () => void
}

export default function LowAccountBalanceDialog({
  balance,
  buyIn,
  handleClose,
  handleDeposit,
}: LowAccountBalanceProps) {
  return (
    <Dialog title="Low Account Balance" onClose={handleClose}>
      <div className="text1-normal mb-[8px]  text-neutral-200">
        Oh no! You don’t have enough funds for this operation. No worries - top up now and continue the fun!
      </div>
      <div>
        <label className="subheadline2-normal text-neutral-500">Your Balance: </label>
        <label className="subheadline1-normal text-neutral-300">
          <span className="text-[90%] text-neutral-400">$</span>
          {balance.toFixed(2)}
        </label>
      </div>
      <div>
        <label className="subheadline2-normal text-neutral-500">Minimal buy-in: </label>
        <label className="subheadline1-normal text-neutral-300">
          <span className="text-[90%] text-neutral-400">$</span>
          {buyIn.at.toFixed(2)}
        </label>
      </div>

      <button
        className="button my-[24px] text-semibold py-2 text-slate-800 bg-gradient-to-b from-amber-400 to-amber-500 w-full rounded-[10px]"
        onClick={handleDeposit}
      >
        Deposit
      </button>
    </Dialog>
  )
}
