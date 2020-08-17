import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'test name',
                address: {
                    street: 'test street',
                    zipCode: '12345',
                    country: 'FI'
                },
                email: 'test@test'
            },
            deliveryMethod: 'method'
        }
        //console.log(this.props.ingredients);
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }
    render() {
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="your name" />
                <input className="Input" type="text" name="email" placeholder="your email" />
                <input className="Input" type="text" name="street" placeholder="street" />
                <input className="Input" type="text" name="postcode" placeholder="your postcode" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
            
        );
    }
}

export default ContactData;