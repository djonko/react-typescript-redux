import React from "react";
import CartCss from './Cart.module.css'
import { FiShoppingCart } from 'react-icons/fi'
import { AppStateContext } from "./AppState";
import { createRef } from "react";

interface Props {

}
interface State {
    isOpen: boolean;
}

class Cart extends React.Component<Props, State>{
    #containerRef: React.RefObject<HTMLDivElement>;
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.#containerRef = createRef()
    }
    handleOutsideClick = (e: MouseEvent) => {
        if (this.#containerRef.current && !this.#containerRef.current.contains(e.target as Node))
            this.setState({ isOpen: false })
    }

     // use mount and unmount  or useEffect
    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick)
    }
    // remove on unmount to prevent memory leak

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick)
    }


    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
    }


    render() {

        return (
            <AppStateContext.Consumer>
                {(state) => {
                    const itemsCount = state.cart.items.reduce((sum, item) => { return sum + item.quantity }, 0)
                    return (
                        <div className={CartCss.cartContainer} ref={this.#containerRef} >
                            <button className={CartCss.button} type="button" onClick={this.handleClick} >
                                <FiShoppingCart /><span>{itemsCount} pizza(s)</span>
                            </button>
                            <div className={CartCss.cartDropDown} style={{
                                display: this.state.isOpen ? 'block' : 'none'
                            }}>
                                <ul>
                                    {state.cart.items.map((cart) => {
                                        return <li key={cart.id}>{cart.name} &times; {cart.quantity}</li>
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
/*
            useEffect(() => {
            document.addEventListener('mousedown', this.handleOutsideClick);
            return () => {
                document.removeEventListener('mousedown', this.handleOutsideClick)
            }
        }, []);

    */