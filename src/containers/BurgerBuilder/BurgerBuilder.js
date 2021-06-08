import { Component } from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad : 0.5,
  cheese : 0.4,
  meat : 1.3,
  bacon : 0.7
};

class BurgerBuilder extends Component {

  /* OLD METHOD OF DEFINING STATE */

  // constructor(props){
  //   super(props);
  //   this.state ={...}

  // }

  /* LATEST METHOD */
  state ={
    ingredients : {
      salad : 0,
      bacon : 0,
      cheese: 0,
      meat  : 0
    },
    totalPrice : 4,
    purchasable : false,
    purchasing : false
  }

  updatePurchaseState (ingredients) {

    // Here Object.keys takes ingredients object and return string like "salad" , "bacon"
    // Here In map method we are converting string to their respective value like salad : 0 and so on.
    // here reduce is used convert into one single no it taking two things here one is function
    // and another is stsrting from where it will start iterate like 0
    // in function(sum, el) sum is constantly updated utill the all the iteration and el 
    // is the individual element
    const sum = Object.keys(ingredients)
    .map(igkey =>{
      return ingredients[igkey]
    })
    .reduce((sum, el) =>{
      return sum + el;
    },0);

    this.setState({purchasable : sum > 0})

  }

  addIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updatedIngredients ={
         ...this.state.ingredients
    };
    updatedIngredients[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice : newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
   
  }

  removeIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return;
    }
    const updateCount = oldCount - 1;
    const updatedIngredients ={
         ...this.state.ingredients
    };
    updatedIngredients[type] = updateCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice : newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);

  }

  purchaseHandler = () => {
    this.setState({purchasing:true});

  }

  purchaseCancelHandler = () => {
    this.setState({purchasing : false});
  }

  purchaseContinueHandler = () =>{
    alert('You Continue !');
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    // salad : true , bacon : false .... so on 
    return (
      <Aux>
        <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients = {this.state.ingredients}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.purchaseContinueHandler}
            price = {this.state.totalPrice}/>
        </Modal>
        <Burger ingredients = {this.state.ingredients}/>
        <BuildControls
          ingredientAdded = {this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabled = {disabledInfo}
          price = {this.state.totalPrice}
          purchasable = {this.state.purchasable}
          ordered = {this.purchaseHandler}  />
      </Aux>
    );
  }
}
//BurgerBuilder.js
export default BurgerBuilder;
