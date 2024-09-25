

import React, { useState } from "react"

// Placeholder data - replace with actual data in a real application
const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  // ... add more states
]

const crimeTypes = [
  "Theft", "Assault", "Burglary", "Fraud", "Vandalism",
  // ... add more crime types
]

export default function CrimeReportForm() {
  const [selectedState, setSelectedState] = useState("")
  const [selectedCrimeType, setSelectedCrimeType] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Submitted:", { state: selectedState, crimeType: selectedCrimeType })
    // You would typically send this data to an API or perform some other action
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Crime Report Form</h2>
      
      <div style={styles.inputGroup}>
        <label htmlFor="state-select" style={styles.label}>
          Select State
        </label>
        <select
          id="state-select"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          required
          style={styles.select}
        >
          <option value="">Choose a state</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.inputGroup}>
        <label htmlFor="crime-type-select" style={styles.label}>
          Select Crime Type
        </label>
        <select
          id="crime-type-select"
          value={selectedCrimeType}
          onChange={(e) => setSelectedCrimeType(e.target.value)}
          required
          style={styles.select}
        >
          <option value="">Choose a crime type</option>
          {crimeTypes.map((crimeType) => (
            <option key={crimeType} value={crimeType}>
              {crimeType}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" style={styles.button}>
        Submit Report
      </button>
    </form>
  )
}

// Inline styles
const styles = {
  form: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: '500',
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
}