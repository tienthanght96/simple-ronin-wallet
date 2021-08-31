import mongoose from 'mongoose'

const BalanceSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'vnd',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export default mongoose.models.Balance ||
  mongoose.model('Balance', BalanceSchema)
