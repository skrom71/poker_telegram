import mongoose, { Document, Schema } from 'mongoose'

export interface IDepositTonTx extends Document {
  userId: string
  userAddress: string
  destination: string
  amount: number
  seqno: number
  status: 'pending' | 'confirmed' | 'failed'
}

const depositTonTxSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: false },
    userAddress: { type: String, required: true, unique: false },
    destination: { type: String, required: true, unique: false },
    amount: {
      type: Number,
      set: (v: number) => Math.round((v + Number.EPSILON) * 100) / 100,
      get: (v: number) => Math.round((v + Number.EPSILON) * 100) / 100,
      required: true,
      unique: false,
    },
    seqno: { type: Number, required: true, unique: false },
    status: { type: String, required: true, unique: false },
  },
  { timestamps: true }
)

export default mongoose.model<IDepositTonTx>('depositTonTx', depositTonTxSchema)
