import { useState, useEffect } from "react"
import axios from "axios"

export default function App() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const audio = document.getElementById("introAudio")
    if (audio) audio.play()
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    try {
      const res = await axios.post("http://ishaan.hidencloud.com:24584/chat", {
        prompt: `Mbaza: ${prompt}`
      })
      setResponse(res.data.response)
    } catch {
      setResponse("Mbaza AI yagize ikibazo. Ongera ugerageze.")
    } finally {
      setLoading(false)
    }
  }

  if (showSplash) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <img src="/assets/mbaza-logo.png" alt="Mbaza Logo" className="w-12 h-12 mb-4" />
        <h1 className="text-xl font-bold text-center px-4">
          Mbaza AI yakozwe n’Abanyarwanda — ikuganiriza mu Kinyarwanda, ku byo ushaka byose.
        </h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center p-4">
      
      {/* Creator Circles */}
      <div className="flex space-x-6 mb-4">
        <div className="flex flex-col items-center">
          <img src="/assets/yves.jpg" alt="Yves" className="w-16 h-16 rounded-full border border-white shadow" />
          <span className="text-sm mt-1">Yves</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/assets/alphonse.jpg" alt="Alphonse" className="w-16 h-16 rounded-full border border-white shadow" />
          <span className="text-sm mt-1">Alphonse</span>
        </div>
      </div>

      {/* Logo and Tagline */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2">
          <img src="/assets/mbaza-logo.png" alt="Mbaza AI Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Mbaza AI</h1>
        </div>
        <p className="mt-2 text-lg text-center animate-fadeUp">
          Mbaza AI yakozwe n’Abanyarwanda — ikuganiriza mu Kinyarwanda, ku byo ushaka byose.
        </p>
      </div>

      {/* Prompt Input */}
      <textarea
        className="w-full max-w-xl p-3 border rounded bg-gray-800 text-white mb-4"
        rows={4}
        placeholder="Andika ikibazo cyawe hano..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Mbaza irimo gusubiza..." : "Ohereza"}
      </button>

      {/* Response Box */}
      {response && (
        <div className="mt-6 w-full max-w-xl bg-gray-900 p-4 border border-blue-500 rounded shadow">
          <h2 className="font-semibold mb-2">Igisubizo:</h2>
          <p>{response}</p>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-400 text-center">
        Made in Rwanda • Mbaza AI © 2025
      </footer>
    </div>
  )
}
