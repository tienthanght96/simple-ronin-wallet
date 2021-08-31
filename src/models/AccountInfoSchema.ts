import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: [true, 'Please provide account number.'],
    },
    currency: {
      type: String,
      default: 'vnd',
    },
    mainBanlanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Balance',
      required: [true, 'Account must have a main balance.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export default mongoose.models.Account ||
  mongoose.model('Account', AccountSchema)
