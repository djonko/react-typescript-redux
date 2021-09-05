import React, { ReactText } from "react";
import { useStateDispatchAction } from "./AppState";
import { CartItem } from "../Types";

export interface AddToCartProps {
    addToCart: (item: Omit<CartItem, 'quantity'>) => void; 
}

export function withAddToCart<OriginalProps extends AddToCartProps>(ChildComponent: React.ComponentType<OriginalProps>) {

    //keyof AddToCartProps: is to omit all properties of AddToCartProps
    const AddTocartHOC = (props: Omit<OriginalProps, keyof AddToCartProps>) => {
        const dispatchAction = useStateDispatchAction()
        //to infer definition from the props use AddToCartProps['addToCart'] as type of handleAddToCartClick
        const handleAddToCartClick: AddToCartProps['addToCart'] = (item) => {
            dispatchAction({
                type: 'ADD_TO_CART',
                payload: {
                    item,
                }
            })
        };
        return (<ChildComponent {...props as OriginalProps} addToCart={handleAddToCartClick} />)
    }
    return AddTocartHOC
}