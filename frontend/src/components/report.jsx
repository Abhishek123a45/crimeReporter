

import React, { useState } from "react"
import axios from "axios"

// Placeholder data - replace with actual data in a real application
const states = [
  "Cyber Crime", "E-FIR(Delhi)", "E-FIR(Uttar Pradesh)", "E-FIR(Gujrat)", "E-FIR(Bihar)", "E-FIR(Odisha)",
  "E-FIR(Punjab)", "E-FIR(Kerala)", "E-FIR(Tamil  Nadu)", "E-FIR(Madhya pradesh)", "E-FIR(West Bengal)",
   "E-FIR (Maharashtra)", "Consumer Complaint", "Income Tax Fraud", "RTI Complaint",
    "Traffic Violation", "Anti-Corruption"

]


export default function CrimeReportForm() {
  const [selectedState, setSelectedState] = useState("")
  const [data,setData] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Submitted:", { state: selectedState })
    // You would typically send this data to an API or perform some other action
    gethelpline(selectedState);
  }


  async function gethelpline(state ) {
    try {
      const response = await axios.get(`/api/criminalhelp?complain=${state}`);
      console.log(response.data);
      setData(response.data.data[0].helpline);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-20">

      
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Crime Report Form</h2>
        
        <div style={styles.inputGroup}>
          <label htmlFor="state-select" style={styles.label}>
            Select Crime
          </label>
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Choose a crime</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>


        <button type="submit" style={styles.button}>
          Get Help
        </button>
      </form>

      {
        data.length > 0 && (
          <div className="mt-10">
            <h3 className="">Go to this website:</h3>
            <a className = 'text-red-900 text-2xl' href={`${data}`}>{data}</a> {/* Use curly braces for JSX expression */}
          </div>
        )
    }

    </div>
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