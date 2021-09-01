import React from "react";
import { useSetState } from "./AppState";
import PizzaCss from './Pizza.module.css'

interface Pizza {
    id: number,
    name: string,
    description: string,
    price: number
}
interface Props {
    pizza: Pizza
}


const Pizza: React.FC<Props> = ({ pizza }) => {
    const setState = useSetState()

    const handleAddToCartClick = () => {
        setState((prevState) => {
            const itemExists = prevState.cart.items.find((item) => item.id === pizza.id)

            /*
            return {
                ...prevState,
                cart: {
                    ...prevState.cart,
                    items: itemExists
                        ? prevState.cart.items.map((item) => {
                            if (item.id === pizza.id) {
                                return { ...item, quantity: itemExists.quantity + 1}
                            }
                            return item
                        }
                        )

                        :
                        [
                            ...prevState.cart.items,
                            { id: pizza.id, name: pizza.name, price: pizza.price, quantity: 1 }
                        ]
                }
            }*/

            return {
                cart: {
                    items:
                        itemExists ? // if true
                            prevState.cart.items.map((item) => {
                                if (item.id === pizza.id) {
                                    return { ...item, quantity: itemExists.quantity + 1 }
                                }
                                return item
                            }) 
                            : [ //if false
                                ...prevState.cart.items,
                                { id: pizza.id, name: pizza.name, price: pizza.price, quantity: 1 }
                            ]
                }
            }

        });
    };

    return (
        <li className={PizzaCss.container}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <button type="button" onClick={handleAddToCartClick}>Add to Cart</button>
        </li>
    )

}
export default Pizza

