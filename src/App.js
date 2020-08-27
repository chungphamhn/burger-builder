import React, { Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';



class App extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        error: false
    }

    test = () => {
        const testState = () => {
            return {
                ...this.state,
                totalPrice: 0
            };
        };
        console.log(this.state.totalPrice);
        console.log(testState);
    }
    //test 
    //state = {
    //    show: true
    //}

    //componentDidMount() {
    //    setTimeout(() => {
    //        this.setState({ show: false });
    //    }, 5000);
    //}

    render() {
        this.test();
        return (
            <div>
                <Layout >
                    <Switch>
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                   
                </Layout>
            </div>
        );
    }
}



export default App;
