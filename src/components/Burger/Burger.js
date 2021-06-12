import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) =>{
    console.log("Burger", props);

    /* Here Object.keys will give us the array of keys whic is string 
       such as ["salad", "bacon", "cheese", "meat"] values of these keys
       are not part of this array.
       
       Here First map method will transform the array of every string into values 
       like for cheese strring key the value is 2 defined then thia map method
       will give the array of 2 length or values.or whatever the value inside it.

       Here Second map method underscore(_) shows that we don't care about element
       but index(i) is important to us and key = {igKey + i} shows the unique 
       key for ecery iteration.

    */
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey =>{
        
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key = {igKey + i} type = {igKey}/>;

        });
      
    })
    /* Reduce is a builtin array function which allows us to 
       transform array into something else it takes two argument previous value and 
       current value and it also accept initial value*/
    .reduce((arr, el) => {
        return  arr.concat(el);                           //Here we are returning updated value arr(previous value), el(next value)
    },[]); 

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients !</p>
    }

    console.log(transformedIngredients);
    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type = "bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type = "bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);