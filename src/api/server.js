import express from "express"
import dotenv from "dotenv"
import { spawn } from "child_process"
import cors from "cors"
import nmapResult from "./schema_db.js"
import connectDB from "./db.js"

dotenv.config()

connectDB()

const app = express()
const PORT = 3001

app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

app.post("/api/server", (req, res) => {
  const { scanOption, option, address, port } = req.body

  const command = `nmap ${scanOption} ${option} ${address} -p ${port}`

  const nmapProcess = spawn(command, { shell: true })

  let output = ""

  nmapProcess.stdout.on("data", async (data) => {
    output += data.toString()
  })

  nmapProcess.stderr.on("data", (data) => {
    console.error("Failed to execute Nmap command:", data.toString())
    res.status(500).json({ error: "Failed to execute Nmap command" })
  })

  nmapProcess.on("close", async (code) => {
    try {
      const result = await nmapResult.create({
        scanOption: scanOption || "-sS",
        option: option || "No option",
        address,
        port,
        output,
      })

      console.log("Data inserted:", result)

      if (code === 0) {
        // La commande Nmap s'est exécutée avec succès
        res.json({ output })
      } else {
        res.status(500).json({ error: "Failed to execute Nmap command" })
      }
    } catch (error) {
      console.error("Failed to insert data into MongoDB:", error)
      res.status(500).json({ error: "Failed to insert data into MongoDB" })
    }
  })
})

//History page
app.get("/api/history", async (req, res) => {
  try {
    const queries = await nmapResult.find({}).sort({ createdAt: -1 }).exec()
    res.json(queries)
  } catch (error) {
    console.error("Failed to fetch query history:", error)
    res.status(500).json({ error: "Failed to fetch query history" })
  }
})

app.get("/api/most-used-request", async (req, res) => {
  try {
    const mostUsedRequest = await nmapResult
      .aggregate([
        {
          $group: {
            _id: {
              scanOption: "$scanOption",
              option: "$option",
              address: "$address",
              port: "$port",
              output: "$output"
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ])
      .exec()

    if (mostUsedRequest.length > 0) {
      res.json(mostUsedRequest[0]._id)
    } else {
      res.json(null)
    }
  } catch (error) {
    console.error("Failed to fetch most used request:", error)
    res.status(500).json({ error: "Failed to fetch most used request" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
