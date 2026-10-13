import { useEffect, useState } from 'react'
import { API_BASE_URL, normalizeCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'Athlete', value: (user) => user.name ?? user.username },
  { label: 'Username', value: (user) => user.username },
  { label: 'Email', value: (user) => user.email },
]

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Users request failed (${response.status}).`)
        }
        setUsers(normalizeCollection(await response.json()))
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message || 'Unable to load users.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [])

  return (
    <CollectionPage
      columns={columns}
      error={error}
      loading={loading}
      rows={users}
      title="Users"
    />
  )
}

export default Users
