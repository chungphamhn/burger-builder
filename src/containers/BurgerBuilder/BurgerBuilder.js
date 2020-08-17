import React, { Component } from 'react';
import Aux from '../../hoc/A-u-x/A-u-x';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    //constructor(props) {
    //    super(props);
    //    this.state = {...}
    //}
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burger-builder-db3d3.firebaseio.com/ingredients.json')
            .then(response => {
                //console.log(response);
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    purchaseContinueHandle = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

        //this.setState({ loading: true });
        //const order = {
        //    ingredients: this.state.ingredients,
        //    price: this.state.totalPrice,
        //    customer: {
        //        name: 'test name',
        //        address: {
        //            street: 'test street',
        //            zipCode: '12345',
        //            country: 'FI'
        //        },
        //        email: 'test@test'
        //    },
        //    deliveryMethod: 'method'
        //}
        //axios.post('/orders.json', order)
        //    .then(response => {
        //        this.setState({ loading: false, purchasing: false });
        //    })
        //    .catch(error => {
        //        this.setState({ loading: false, purchasing: false });
        //    });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    updatePurchaseable(ingredients) {
        //const ingredients = {
        //    ...this.state.ingredients
        //};
        const sum = Object.keys(ingredients).map(
            igKey => {
                return ingredients[igKey];
            }
        ).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({ purchaseable: sum > 0 });
    }
    //    addIngredientHandler(type) {
    //wrong syntax function
    //}
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseable(updatedIngredients);

    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseable(updatedIngredients);
    }

    render() {

        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {

            disableInfo[key] = disableInfo[key] <= 0;

        }
        let orderSummary = null;

        
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : < Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientsHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                price={this.state.totalPrice.toFixed(2)}
                ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);


