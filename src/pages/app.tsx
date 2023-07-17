import { Router } from '@reach/router'

import Login from '../components/login/login'
import Dashboard from '@/components/dashboard/Dashboard'
import PrivateRoute from '@/components/privateRoute/PrivateRoute'

const App = () => {
  return (
    <Router>
      <Login path="/" />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
    </Router>
  )
}

export default App
