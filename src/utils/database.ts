import mongoose, { ConnectOptions } from 'mongoose'
// const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI =
  '"mongodb+srv://thangtran:thangtran@cluster0.rfipi.mongodb.net/ronnin?retryWrites=true&w=majority'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable!')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
