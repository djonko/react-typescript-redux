import React from "react";
import { Pizza } from "../Types";
import { AddToCartProps, withAddToCart } from "./AddToCart";
import { useStateDispatchAction } from "./AppState";
import PizzaCss from './Pizza.module.css'


interface Props extends AddToCartProps{
    pizza: Pizza;
}


const PizzaItem: React.FC<Props> = ({ pizza, addToCart }) => {
    const handleAddToCartClick = () => { addToCart({id: pizza.id, name: pizza.name, price: pizza.price}) };

    return (
        <li className={PizzaCss.container}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <button type="button" onClick={handleAddToCartClick}>Add to Cart</button>
        </li>
    )

}
export default withAddToCart(PizzaItem) 

