import DepositTonTx, { IDepositTonTx } from './DepositTonTxModel'

export async function getDepositPendingTx(userAddress: string): Promise<IDepositTonTx | null> {
  return DepositTonTx.findOne({ userAddress, status: 'pending' })
}

export async function updateDepositPendingTx(
  userAddress: string,
  newSeqno: number,
  newStatus: string
): Promise<IDepositTonTx | null> {
  return DepositTonTx.findOneAndUpdate(
    { userAddress, status: 'pending' },
    {
      $set: {
        seqno: newSeqno,
        status: newStatus,
      },
    },
    { new: true }
  )
}

export async function addDepositTx(
  userId: string,
  userAddress: string,
  destination: string,
  amount: number,
  seqno: number,
  status: 'pending' | 'confirmed' | 'failed'
): Promise<IDepositTonTx> {
  return new DepositTonTx({
    userId,
    userAddress,
    destination: destination,
    amount,
    seqno,
    status,
  }).save()
}
