import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Team', value: (team) => team.name },
  { label: 'Description', value: (team) => team.description },
  { label: 'Members', value: (team) => team.members?.length ?? 0 },
]

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadTeams() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/teams/`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Teams request failed (${response.status}).`)
        }
        setTeams(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || 'Unable to load teams.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadTeams()
    return () => controller.abort()
  }, [])

  return (
    <CollectionPage
      columns={columns}
      error={error}
      loading={loading}
      rows={teams}
      title="Teams"
    />
  )
}

export default Teams
