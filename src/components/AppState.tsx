
import React, { createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { CartItem } from "../Types";



//2) let descripe the state of pizza we want to share between our component
interface AppStateValue {
    cart: {
        items: CartItem[]
    }
}
// 3) set initiale value of PizzaState
const defaultStateValue: AppStateValue = { cart: { items: [] } }

//1) Create an appContext to save state of pizza
export const AppStateContext = createContext(defaultStateValue);

//useContext is a Hook to get value from context 
export const useStateDispatchAction = () => {
    const dispatchAction = useContext(AppDispatchActionContext)
    if (!dispatchAction)
        throw new Error("useDispatchAction was call outside of the AppSetStateContext provider")
    return dispatchAction
}

//reducer section ------------------------------------------------------------------------------------------------------------------------
interface ActionType<T> {
    type: T
}
interface AddToCartAction extends ActionType<'ADD_TO_CART'> {
    payload: {
        item: Omit<CartItem, 'quantity'>
    }
}
interface InitializeCartAction extends ActionType<'INITIALIZE_CART'> {
    payload: {
        cart: AppStateValue['cart']
    }
}
const reducer = (state: AppStateValue, action: AddToCartAction | InitializeCartAction) => {
    if (action.type === 'ADD_TO_CART') {
        const itemToAdd = action.payload.item
        const itemExists = state.cart.items.find((item) => item.id === itemToAdd.id)
        return {
            cart: {
                items:
                    itemExists ? // if true
                        state.cart.items.map((item) => {
                            if (item.id === itemToAdd.id) {
                                return { ...item, quantity: itemExists.quantity + 1 }
                            }
                            return item
                        })
                        : [ //if false
                            ...state.cart.items, { ...itemToAdd, quantity: 1 }]
            }
        }
    } else if (action.type === 'INITIALIZE_CART') {
        const cartToAdd = action.payload.cart
        return { ...state, cart: cartToAdd }
    }
    return state
}
//reducer section ------------------------------------------------------------------------------------------------------------------------


// 4.2) create another context provider for 'setState'
export const AppDispatchActionContext = createContext<React.Dispatch<AddToCartAction> | undefined>(undefined)
const AppStateProvider: React.FC = ({ children }) => {
    const [state, dispatchAction] = useReducer(reducer, defaultStateValue);

   
    // useEffect to retrieve data from local
    useEffect(() => {
        const carte = window.localStorage.getItem('cart')
        if(carte){
            const obCarte = JSON.parse(carte)
            dispatchAction({type: 'INITIALIZE_CART', payload: {cart: obCarte}})
        }
    }, []);

     // useEffect to save
     useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart]);
    // end useEffect

    // {children}: wrap children components in AppStateContext (a provider) so all childs will have state share by AppStateContext
    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchActionContext.Provider value={dispatchAction}>
                {children}
            </AppDispatchActionContext.Provider>
        </AppStateContext.Provider>
    )
}
export default AppStateProvider;