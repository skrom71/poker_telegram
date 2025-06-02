import Dialog from '..'

export default function NotEnoughFunds({
  handleClose,
  handleDeposit,
}: {
  handleClose: () => void
  handleDeposit: () => void
}) {
  return (
    <Dialog title="" onClose={handleClose}>
      <div className="text1-normal mb-[8px]  text-neutral-200">Not enough funds to withdraw</div>
      <button
        className="button my-[24px] text-semibold py-2 text-slate-800 bg-gradient-to-b from-amber-400 to-amber-500 w-full rounded-[10px]"
        onClick={handleDeposit}
      >
        Deposit
      </button>
    </Dialog>
  )
}
