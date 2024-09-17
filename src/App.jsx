import React, { useRef } from 'react'
import { useEffect, useState, useCallback } from 'react'

const App = () => {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+"
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 text-orange-50">
      <div className="w-full max-w-xl h-[25rem] flex flex-col justify-evenly bg-gray-900 shadow-lg rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-orange-400">Password Generator</h1>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full py-3 px-4 rounded-lg text-orange-600 bg-gray-200 border-none focus:ring-2 focus:ring-orange-400"
            placeholder="Generated Password"
            ref={passwordRef}
          />
          <button
            className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <label className="flex-grow text-sm">Password Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-2/3 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="h-4 w-4 text-orange-400 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-orange-400"
              />
              <span className="text-sm">Include Numbers</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed(prev => !prev)}
                className="h-4 w-4 text-orange-400 bg-gray-800 border-gray-600 rounded focus:ring-2 focus:ring-orange-400"
              />
              <span className="text-sm">Include Characters</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
