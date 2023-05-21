import mongoose from "mongoose"

const nmapResultSchema = new mongoose.Schema({
  scanOption: {
    type: String,
  },
  option: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  port: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const nmapResult = mongoose.model("results", nmapResultSchema)

export default nmapResult
