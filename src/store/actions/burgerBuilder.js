import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};


export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
}

export const fetchIngredients = () => {

    return dispatch => {
        axios.get('https://burger-builder-db3d3.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
                ////console.log(response);
                //this.setState({ ingredients: response.data });
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
                //this.setState({ error: true });
            });
    };
}