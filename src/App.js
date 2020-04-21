import React, {Component, Fragment} from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    let routes = (
      <Fragment>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Fragment>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Fragment>
          <Route path="/orders" component={Orders}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Fragment>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
