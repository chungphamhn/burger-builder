import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    //state = {
    //    ingredients: 5,
    //    totalPrice: 0
    //}

    //componentWillMount() {
    //    const query = new URLSearchParams(this.props.location.search);
    //    const ingredients = {};
    //    let price = 0;

    //    for (let param of query.entries()) {
    //        if (param[0] === 'price') {
    //            price = param[1];
    //        }
    //        else
    //            ingredients[param[0]] = + param[1];
    //    }

    //    this.setState({ ingredients: ingredients, totalPrice: price });
    //    //console.log(ingredients);

    //}

    //componentWillMount() {
    //    this.props.onInitPurchase(); 
    //}

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    //render={(props) => (<ContactData ingredients={this.props.ings} price={this.state.totalPrice} {...props} />)}
                    />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
        //,
        //price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps)(Checkout);