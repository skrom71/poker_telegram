import mongoose, { Document, Schema } from 'mongoose'

export interface IBalanceOp extends Document {
  userId: string
  amount: number
  currentBalance: number
  previousBalance: number
  type: 'free' | 'fiat'
  tag: 'deposit' | 'withdraw' | 'buy-in' | 'buy-out'
}

const balanceOpSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: false },
    amount: {
      type: Number,
      set: (v: number) => Math.round((v + Number.EPSILON) * 100) / 100,
      get: (v: number) => Math.round((v + Number.EPSILON) * 100) / 100,
      required: true,
      unique: false,
    },
    currentBalance: { type: Number, required: true, unique: false },
    previousBalance: { type: Number, required: true, unique: false },
    type: { type: String, required: true, unique: false },
    tag: { type: String, required: true, unique: false },
  },
  { timestamps: true }
)

export default mongoose.model<IBalanceOp>('balanceOp', balanceOpSchema)
