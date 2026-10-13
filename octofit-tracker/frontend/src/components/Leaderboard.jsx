import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Rank', value: (entry) => `#${entry.rank}` },
  { label: 'Athlete', value: (entry) => entry.user?.name ?? entry.user?.username },
  { label: 'Points', value: (entry) => entry.points },
]

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadLeaderboard() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leaderboard/`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Leaderboard request failed (${response.status}).`)
        }
        setEntries(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || 'Unable to load the leaderboard.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()
    return () => controller.abort()
  }, [])

  return (
    <CollectionPage
      columns={columns}
      error={error}
      loading={loading}
      rows={entries}
      title="Leaderboard"
    />
  )
}

export default Leaderboard
