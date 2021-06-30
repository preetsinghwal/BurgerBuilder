import * as actionType from './actions';

const initialState = {
    ingredients : {
        salad : 0,
        bacon : 0,
        cheese: 0,
        meat  : 0
    },
    totalPrice  : 4
};

const reducer = (state = initialState, action) =>{

    switch (action.type) {
        case actionType.ADD_INGREDIENTS:
            return {

                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                }

            }
        case actionType.REMOVE_INGREDIENTS:
            return {

                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                }

            }
        default :
            return state;
    }

};

export default reducer;