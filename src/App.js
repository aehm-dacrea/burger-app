import React, {Component, Fragment} from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions'

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    let routes = (
      <Fragment>
        <Route path="/auth" component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Fragment>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Fragment>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={asyncAuth}/>
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
