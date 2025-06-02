import mongoose, { Document, Schema } from 'mongoose'
import { env } from '../../lib/env'

export interface IAccount extends Document {
  id: string
  name: string
  username: string
  balance: number
  freeBalance: number
  tonMnemonic: string[]
  tonAddress: string
}

const AccountSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: false },
    username: { type: String, required: false, unique: false },
    balance: {
      type: Number,
      set: (v: number) => Math.round((v + Number.EPSILON) * 100) / 100,
      get: (v: number) => Math.round((v + Number.EPSILON) * 100) / 100,
      required: true,
      unique: false,
    },
    freeBalance: {
      type: Number,
      set: (v: number) => Math.round((v + Number.EPSILON) * 100) / 100,
      get: (v: number) => Math.round((v + Number.EPSILON) * 100) / 100,
      required: true,
      unique: false,
    },
    tonMnemonic: { type: [String], required: true, unique: false },
    tonAddress: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

export default mongoose.model<IAccount>(env.HOST_ENV === 'local' ? 'AccountLocal' : 'Account', AccountSchema)
