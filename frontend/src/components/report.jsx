import React, { useState } from "react"
import axios from "axios"

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
    console.log("Submitted:", { state: selectedState })
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

      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-5">Crime Report Form</h2>
        
        <div className="mb-5">
          <label htmlFor="state-select" className="block mb-1 text-sm font-medium">
            Select Crime
          </label>
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            required
            className="w-full p-2 text-lg border border-gray-300 rounded"
          >
            <option value="">Choose a crime</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>


        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Get Help
        </button>
      </form>

      {
        data.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg">Go to this website:</h3>
            <a className="text-red-900 text-2xl" href={`${data}`}>{data}</a> {/* Use curly braces for JSX expression */}
          </div>
        )
    }

    </div>
  )


}
