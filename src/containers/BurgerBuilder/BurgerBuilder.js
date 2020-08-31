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




class BurgerBuilder extends Component {

    //constructor(props) {
    //    super(props);
    //    this.state = {...}
    //}
    state = {
        //ingredients: null,
        //totalPrice: 4,
        //purchaseable: false,
        purchasing: false,
        //loading: false,
        //error: false
    }

    componentDidMount() {
        this.props.onFetchIngredients();
        //axios.get('https://burger-builder-db3d3.firebaseio.com/ingredients.json')
        //    .then(response => {
        //        //console.log(response);
        //        this.setState({ ingredients: response.data });
        //    })
        //    .catch(error => {
        //        this.setState({ error: true });
        //    });
    }

    purchaseContinueHandle = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        //try redirect
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated)
            this.setState({ purchasing: true });
        else
            this.props.history.push('/auth');
    }

    updatePurchaseable(ingredients) {

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

        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {

            disableInfo[key] = disableInfo[key] <= 0;

        }
        let orderSummary = null;


        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : < Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseable(this.props.ings)}
                        ordered={this.purchaseHandler}
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
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchasable: state.burgerBuilder.purchasable,
        error: state.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
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


