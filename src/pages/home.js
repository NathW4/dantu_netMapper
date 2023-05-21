import React, { useState, useEffect } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"

const Home = () => {
  const [scanOption, setScanOption] = useState("")
  const [option, setOption] = useState("")
  const [address, setAddress] = useState("")
  const [port, setPort] = useState("")
  const [commandOutput, setCommandOutput] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const options = {
      scanOption,
      option,
      address,
      port,
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/server",
        options
      )
      console.log("Command output:", response.data.output)
      setCommandOutput(response.data.output) // Mettre à jour la réponse de la commande Nmap
    } catch (error) {
      console.error("Failed to execute Nmap command:", error)
    }
  }

  useEffect(() => {
    const fetchCommandOutput = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/commandOutput"
        )
        setCommandOutput(response.data.output)
      } catch (error) {
        console.error("Failed to fetch command output:", error)
      }
    }

    fetchCommandOutput()
  }, [])

  return (
    <div className="container-fluid bg-dark text-light p-5">
      <h1 className="text-center">Scan Nmap</h1>
      <a href="/history" className="text-light d-block mb-3">
        Go to history page!
      </a>
      <a href="/mostUsedRequest" className="text-light d-block mb-3">
        Go to most used query page!
      </a>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="scanOption" className="text-light">
            Scan option Nmap:
          </label>
          <select
            id="scanOption"
            value={scanOption}
            onChange={(e) => setScanOption(e.target.value)}
            className="form-control"
          >
            <option value="">choose an option :</option>
            <option value="-sU">UDP Scan</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="option" className="text-light">
            Option:
          </label>
          <select
            id="option"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="form-control"
          >
            <option value="">Choose an option</option>
            <option value="-O">Enable OS detection</option>
            <option value="--traceroute">Trace hop path</option>
            <option value="-v">Verbose</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="address" className="text-light">
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="port" className="text-light">
            Port:
          </label>
          <input
            type="text"
            id="port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Exécuter
        </button>
      </form>
      {commandOutput && (
        <div className="mt-5">
          <h2>Résultat de la commande Nmap :</h2>
          <pre className="text-light bg-dark p-3">{commandOutput}</pre>
        </div>
      )}
    </div>
  )
}

export default Home
