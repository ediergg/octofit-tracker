import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Workout', value: (workout) => workout.name },
  { label: 'Description', value: (workout) => workout.description },
  { label: 'Difficulty', value: (workout) => workout.difficulty },
  { label: 'Duration (min)', value: (workout) => workout.durationMinutes },
  { label: 'Exercises', value: (workout) => workout.exercises?.length ?? 0 },
]

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadWorkouts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/workouts/`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Workouts request failed (${response.status}).`)
        }
        setWorkouts(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || 'Unable to load workouts.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()
    return () => controller.abort()
  }, [])

  return (
    <CollectionPage
      columns={columns}
      error={error}
      loading={loading}
      rows={workouts}
      title="Workouts"
    />
  )
}

export default Workouts
