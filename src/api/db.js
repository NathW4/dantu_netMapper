import mongoose from "mongoose"

async function connectDB() {
  try {
    await mongoose.connect(process.env.URI_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    const db = mongoose.connection.db

    const collectionExists = db.listCollections({ name: "results" })

    if (!collectionExists) {
      await db.createCollection("results")
    }

    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Failed to connect to MongoDB", error)
  }
}

export default connectDB
