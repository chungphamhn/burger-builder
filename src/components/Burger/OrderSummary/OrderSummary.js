import React, { Component } from 'react';
import Aux from '../../../hoc/A-u-x/A-u-x';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //this could be a functional component, doesn't have to be a class
    //componentWillUpdate() {
    //    console.log('OrderSummary willUpdate');
    //}

    render() {
        const ingredientSummaray = Object.keys(this.props.ingredients).map(
            igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li >
                );
            }
        );
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A burger</p>
                <ul>
                    {ingredientSummaray}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
    );
    }

} 

export default OrderSummary;