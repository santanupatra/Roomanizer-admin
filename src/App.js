import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import PrivateRoute from './components/PrivateRoute';
import ApiInterceptor from './api/apiInterceptor';
import { NotificationContainer } from 'react-notifications'
// import reset from './containers/Login/reset';
// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const Login = React.lazy(() => import('./containers/Login/Login'));
const ForgetPassword = React.lazy(() => import('./containers/Login/ForgetPassword'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
// const reset =React.lazy(()=>import('./containers/Login/reset'))

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <ApiInterceptor />
        <NotificationContainer/>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/forget-password" name="Forget Page" render={props => <ForgetPassword {...props}/> } />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              {/* <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
              <PrivateRoute path="/" component={DefaultLayout}/>
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
