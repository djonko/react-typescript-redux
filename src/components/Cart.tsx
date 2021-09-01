import React from "react";
import CartCss from './Cart.module.css'
import { FiShoppingCart } from 'react-icons/fi'
import { AppStateContext } from "./AppState";

interface Props {

}
interface State {
    isOpen: boolean;
}

class Cart extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
    }

    render() {
        return (
            <AppStateContext.Consumer>
                {(state) => {
                    const itemsCount = state.cart.items.reduce((sum, item) => { return sum + item.quantity}, 0)
                    return (
                        <div className={CartCss.cartContainer} >
                            <button className={CartCss.button} type="button" onClick={this.handleClick} >
                                <FiShoppingCart /><span>{itemsCount} pizza(s)</span>
                            </button>
                            <div className={CartCss.cartDropDown} style={{
                                display: this.state.isOpen ? 'block' : 'none'
                            }}>
                                <ul>
                                    {state.cart.items.map( (cart) => {
                                        return <li key={cart.id }>{cart.name} &times; {cart.quantity}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                }}
            </AppStateContext.Consumer>
        )
    }
}

export default Cart