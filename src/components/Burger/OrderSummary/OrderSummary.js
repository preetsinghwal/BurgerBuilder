import React, { Component } from 'react';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {

    //This could be a functional compnent, does not have to be a class

    componentDidUpdate(){
       console.log('[OderSummary Update]');
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igkey =>{
        return( <li key ={igkey}> 
                <span style = {{textTransform : 'capitalize'}}>{igkey}</span> 
                : {this.props.ingredients[igkey]}
               </li>
        )
    });
        return(
            <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
               {ingredientSummary}
            </ul>
            <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType = "Danger" clicked = {this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType = "Success" clicked ={this.props.purchaseContinued}>CONTINUE</Button>
        
        </Auxillary>
        );
    }
} 

export default OrderSummary;