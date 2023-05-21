import React, { useEffect, useState } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"

const History = () => {
  const [queries, setQueries] = useState([])
  const [filteredQueries, setFilteredQueries] = useState([])
  const [scanOptionFilter, setScanOptionFilter] = useState("")
  const [optionFilter, setOptionFilter] = useState("")
  const [addressFilter, setAddressFilter] = useState("")
  const [portFilter, setPortFilter] = useState("")

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/history")
        setQueries(response.data)
      } catch (error) {
        console.error("Failed to fetch query history:", error)
      }
    }

    fetchQueries()
  }, [])

  useEffect(() => {
    // Filtrer les requêtes en fonction des critères de recherche
    const filtered = queries.filter((query) => {
      // Filtrer par scan option
      if (scanOptionFilter && query.scanOption !== scanOptionFilter) {
        return false
      }
      // Filtrer par option
      if (optionFilter && query.option !== optionFilter) {
        return false
      }
      // Filtrer par adresse IP
      if (addressFilter && query.address !== addressFilter) {
        return false
      }
      // Filtrer par port
      if (portFilter && query.port !== portFilter) {
        return false
      }
      return true
    })

    setFilteredQueries(filtered)
  }, [queries, scanOptionFilter, optionFilter, addressFilter, portFilter])

  return (
    <div className="bg-black text-white p-4">
      <h1 className="text-center mb-4">Query History</h1>
      <a href="/home" className="text-white d-block mb-2">
        Go to home page!
      </a>
      <a href="/mostUsedRequest" className="text-light">
        Go to most used query page!
      </a>
      <h2>Filter :</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="scanOptionFilter">Scan Option:</label>
          <input
            type="text"
            id="scanOptionFilter"
            value={scanOptionFilter}
            onChange={(e) => setScanOptionFilter(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="optionFilter">Option:</label>
          <input
            type="text"
            id="optionFilter"
            value={optionFilter}
            onChange={(e) => setOptionFilter(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="addressFilter">Address:</label>
          <input
            type="text"
            id="addressFilter"
            value={addressFilter}
            onChange={(e) => setAddressFilter(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="portFilter">Port:</label>
          <input
            type="text"
            id="portFilter"
            value={portFilter}
            onChange={(e) => setPortFilter(e.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <ul className="list-group">
        {filteredQueries.map((query) => (
          <li key={query.id} className="list-group-item bg-dark text-white">
            <div>
              <h3>Query Details</h3>
              <p>Scan Option: {query.scanOption}</p>
              <p>Option: {query.option}</p>
              <p>Address: {query.address}</p>
              <p>Port: {query.port}</p>
            </div>
            {query.output && (
              <div>
                <h3>Command Output</h3>
                <pre>{query.output}</pre>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default History
