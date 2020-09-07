import React, { Component } from 'react';

import Aux from '../../hoc/A-u-x/A-u-x';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

import * as burgerBuilderActions from '../../store/actions/index';
/**
 * The main component
 * User can add ingredients of a burger 
 * Then calculate price
 * Handle continue after adding ingredients
 * */
class BurgerBuilder extends Component {


    state = {

        purchasing: false
    }

    componentDidMount() {
        //load burger template
        //store.dispatch(burgerBuilderActions.fetchIngredients());      //this can be used
        this.props.onFetchIngredients();
    }

    //after user adds ingredients
    purchaseContinueHandle = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    //use to display dropdown or redirect to login page
    purchaseHandler = () => {
        if (this.props.isAuthenticated)
            this.setState({ purchasing: true });
        else
            this.props.history.push('/auth');
    }

    updatePurchaseable(ingredients) {
        //sum of ingredients
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey];
            }
        ).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }


    render() {

        //to enable or disable add/subtract ingredient buttons
        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {
            //disable when no ingredient added
            disableInfo[key] = disableInfo[key] <= 0;

        }
        let orderSummary = null;


        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : < Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}              //add button
                        ingredientRemove={this.props.onIngredientRemoved}           //remove button
                        disabled={disableInfo}                                      //disable buttons
                        price={this.props.price}
                        purchaseable={this.updatePurchaseable(this.props.ings)}     //enable/disable continue button
                        ordered={this.purchaseHandler}                              //continue button
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                price={this.props.price.toFixed(2)}
                ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandle}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal  //to use dropdown
                    //enable/disable dropdown
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >{orderSummary}</Modal>

                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    //state
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchasable: state.burgerBuilder.purchasable,
        error: state.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    //action
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onFetchIngredients: () => dispatch(burgerBuilderActions.fetchIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
        //onIngredientAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
        //onIngredientRemoved: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));


