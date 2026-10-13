import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Activity', value: (activity) => activity.type },
  { label: 'Athlete', value: (activity) => activity.user?.name ?? activity.user?.username },
  { label: 'Duration (min)', value: (activity) => activity.duration },
  { label: 'Calories', value: (activity) => activity.calories },
  {
    label: 'Date',
    value: (activity) =>
      activity.date ? new Date(activity.date).toLocaleDateString() : activity.date,
  },
]

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadActivities() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/activities/`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Activities request failed (${response.status}).`)
        }
        setActivities(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || 'Unable to load activities.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadActivities()
    return () => controller.abort()
  }, [])

  return (
    <CollectionPage
      columns={columns}
      error={error}
      loading={loading}
      rows={activities}
      title="Activities"
    />
  )
}

export default Activities
