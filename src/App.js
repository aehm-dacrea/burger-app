import React from 'react';
import {Route} from 'react-router-dom'

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

function App() {
  return (
    <Layout>
      <Route path="/" exact component={BurgerBuilder}/>
      <Route path="/orders" component={Orders}/>
      <Route path="/checkout" component={Checkout}/>
    </Layout>
  );
}

export default App;
