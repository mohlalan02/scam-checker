'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('unknown')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!url) {
      alert('Please enter a URL')
      return
    }

    setLoading(true)

    const { error } = await supabase.from('reports').insert({
      url,
      category,
    })

    setLoading(false)

    if (error) {
      alert('Error submitting report: ' + error.message)
    } else {
      alert('Report submitted successfully!')
      setUrl('')
      setCategory('unknown')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">Scam Checker SA</h1>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste suspicious link here"
        className="border p-2 w-80 rounded"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-80 rounded"
      >
        <option value="unknown">Unknown</option>
        <option value="facebook">Facebook</option>
        <option value="tiktok">TikTok</option>
        <option value="whatsapp">WhatsApp</option>
        <option value="other">Other</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </main>
  )
}
