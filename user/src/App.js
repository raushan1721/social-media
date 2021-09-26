
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/HOC";
import CreateNewPassword from "./containers/CreatePassword";
import ForgotPassword from "./containers/ForgotPassword";
import Home from "./containers/Home";
import Signin from './containers/Signin';
import Signup from './containers/Signup';
function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/createpassword" component={CreateNewPassword} />
        
</Switch>
    </div>
  );
}

export default App;
