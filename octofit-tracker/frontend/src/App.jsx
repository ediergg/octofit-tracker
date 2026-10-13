import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const pages = [
  { path: 'activities', label: 'Activities', Component: Activities },
  { path: 'leaderboard', label: 'Leaderboard', Component: Leaderboard },
  { path: 'teams', label: 'Teams', Component: Teams },
  { path: 'users', label: 'Users', Component: Users },
  { path: 'workouts', label: 'Workouts', Component: Workouts },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/users" aria-label="OctoFit Tracker home">
          <img src={logo} alt="" />
          <span>OctoFit Tracker</span>
        </NavLink>
        <nav className="nav nav-pills" aria-label="Main navigation">
          {pages.map(({ path, label }) => (
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              key={path}
              to={`/${path}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="container py-4">
        <Routes>
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<Navigate replace to="/users" />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

export default App
