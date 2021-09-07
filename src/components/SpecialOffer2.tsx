import React from "react"
import { Pizza } from "../Types";
import {  WithAddToCartRenderProps } from "./AddToCart";
import SpecialOfferCss from "./SpecialOffer.module.css"

interface Props {
    pizza: Pizza
}

const SpecialOffer: React.FC<Props> = ({ pizza }) => {
    return (
        <div className={SpecialOfferCss.container}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <WithAddToCartRenderProps children={
                ({addToCart}) => {
                    return (
                        <button type="button" onClick={() => addToCart({ id: pizza.id, name: pizza.name, price: pizza.price })}>
                            Add to Cart
                        </button>
                    )
                }
            } />

        </div>);
};

export default SpecialOffer;