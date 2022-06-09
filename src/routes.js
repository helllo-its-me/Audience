import { Switch, Route, Redirect } from 'react-router-dom'
import Audience from './Components/Audience/Audience'

export const useRoutes = () => {
  return (
    <Switch>
      <Route exact path='/audiences/:id' component={Audience} />
      <Redirect to={`/audiences/32`} />
    </Switch>
  )
}
