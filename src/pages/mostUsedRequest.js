import React, { useEffect, useState } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"

const MostUsedRequest = () => {
  const [mostUsedRequest, setMostUsedRequest] = useState(null)

  useEffect(() => {
    const fetchMostUsedRequest = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/most-used-request"
        )
        setMostUsedRequest(response.data)
      } catch (error) {
        console.error("Failed to fetch most used request:", error)
      }
    }

    fetchMostUsedRequest()
  }, [])

  return (
    <div className="bg-black text-white p-4">
      <h1 className="text-center mb-4">Most Used Request</h1>
      <a href="/home" className="text-white d-block mb-2">
        Go to home page!
      </a>
      <a href="/history" className="text-light">
        Go to history page!
      </a>
      {mostUsedRequest ? (
        <div>
          <h3>The most used request is:</h3>
          <p>Scan Option: {mostUsedRequest.scanOption}</p>
          <p>Option: {mostUsedRequest.option}</p>
          <p>Address: {mostUsedRequest.address}</p>
          <p>Port: {mostUsedRequest.port}</p>
          {mostUsedRequest.output && (
            <div>
              <h3>Command Output</h3>
              <pre>{mostUsedRequest.output}</pre>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default MostUsedRequest
