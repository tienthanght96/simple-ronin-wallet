import mongoose from 'mongoose'

const BalanceSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: [true, 'Balance must have a name'],
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
