import { useState } from 'react'
import {useQuery, useConvex } from "convex/react"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { api } from "../convex/_generated/api"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const convex = useConvex();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={async () => {
              console.log(convex)
              console.log(await convex.query(api.myFn.get_attractions,{ city: "New York", price_high: 4, price_low: 2 }))
            }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
