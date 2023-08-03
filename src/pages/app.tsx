import { Router } from '@reach/router'
import CreateExpense from '@/components/createExpense/CreateExpense'
import axios from 'axios'

import Login from '../components/login/login'
import Dashboard from '@/components/dashboard/Dashboard'
import PrivateRoute from '@/components/privateRoute/PrivateRoute'
import ReviewExpense from '@/components/reviewExpense/ReviewExpense'
import RejectExpense from '@/components/rejectExpense/RejectExpense'
import CreateNewDeposit from '@/components/createNewDeposit/CreateNewDeposit'
import CreateReport from '@/components/createReport/CreateReport'

const App = () => {
  axios.defaults.withCredentials = true

  return (
    <Router>
      <Login path="/" />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
      <PrivateRoute path="/app/create-expense" component={CreateExpense} />
      <PrivateRoute path="/app/review-expense" component={ReviewExpense} />
      <PrivateRoute path="/app/reject-expense" component={RejectExpense} />
      <PrivateRoute path="/app/create-deposit" component={CreateNewDeposit} />
      <PrivateRoute path="/app/create-report" component={CreateReport} />
    </Router>
  )
}

export default App
