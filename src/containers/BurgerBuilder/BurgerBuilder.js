import { Component } from "react";
import { connect } from "react-redux";
import Auxillary from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions';




class BurgerBuilder extends Component {
  /* OLD METHOD OF DEFINING STATE */

  // constructor(props){
  //   super(props);
  //   this.state ={...}

  // }

  /* LATEST METHOD */
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log("BurgerBulder", this.props);
    // axios
    //   .get("https://burger-d2b37-default-rtdb.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState(ingredients) {
    // Here Object.keys takes ingredients object and return string like "salad" , "bacon"
    // Here In map method we are converting string to their respective value like salad : 0 and so on.
    // here reduce is used convert into one single no it taking two things here one is function
    // and another is stsrting from where it will start iterate like 0
    // in function(sum, el) sum is constantly updated utill the all the iteration and el
    // is the individual element
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0 ;
  }

  
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredient's can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Auxillary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Auxillary>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    // salad : true , bacon : false .... so on
    return (
      <Auxillary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxillary>
    );
  }
}
//BurgerBuilder.js

const mapStateToProps = state =>{
  return {
    ings : state.ingredients,
    price : state.totalPrice
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    onIngredientAdded : (ingName) => dispatch({type : actionTypes.ADD_INGREDIENTS, ingredientName : ingName}),
    onIngredientRemoved : (ingName) => dispatch({type : actionTypes.REMOVE_INGREDIENTS, ingredientName : ingName})
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
