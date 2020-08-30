import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchasBurgerFail = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                //this.setState({ loading: false });
                //this.props.history.push('/');
            })
            .catch(error => {
                dispatch(purchasBurgerFail(error));
                //this.setState({ loading: false });
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionType.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(
                response => {
                    const fetchedOrders = [];
                    for (let key in response.data) {
                        fetchedOrders.push({
                            ...response.data[key],
                            id: key
                        });
                    }
                    dispatch(fetchOrdersSuccess(fetchedOrders));
                    //this.setState({ loading: false, orders: fetchedOrders });
                }
            ).catch(
                error => {
                    dispatch(fetchOrdersFail(error));
                    //this.setState({ loading: false });
                }
            );
    };
};