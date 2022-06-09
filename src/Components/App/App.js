import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTree } from '../../redux/actions'
import { useRoutes } from '../../routes.js'
import { HashRouter as Router } from 'react-router-dom'
import Header from '../Header/Header'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const routes = useRoutes()
  useEffect(() => dispatch(fetchTree()), [])

  return (
    <Router>
      <div className='App'>
        <Header />

        {routes}
      </div>
    </Router>
  )
}

export default App
