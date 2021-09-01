import { useState } from "react";
import React, { createContext } from "react";
import { useContext } from "react";

interface CartItem {
    id: number
    name: string,
    price: number, 
    quantity: number
}

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
export const useSetState = () => {
    const setState = useContext(AppSetStateContext)
    if (!setState)
        throw new Error("useSetState was call outside of the AppSetStateContext provider")
    return setState
}

//reducer section ------------------------------------------------------------------------------------------------------------------------
interface ActionType<T> {
    type: T
}
interface AddToCartAction extends ActionType<'ADD_TO_CART'>{
    payload: {
        item: CartItem
    }
}
const reducer = (state: AppStateValue, action: AddToCartAction) =>{
    if (action.type === 'ADD_TO_CART'){

    }
    return state
}
//reducer section ------------------------------------------------------------------------------------------------------------------------


// 4.2) create another context provider for 'setState'
export const AppSetStateContext = createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined)
const AppStateProvider: React.FC = ({ children }) => {
    const [state, setState] = useState(defaultStateValue);
    // {children}: wrap children components in AppStateContext (a provider) so all childs will have state share by AppStateContext
    return (
        <AppStateContext.Provider value={state}>
            <AppSetStateContext.Provider value={setState}>
                {children}
            </AppSetStateContext.Provider>
        </AppStateContext.Provider>
    )
}
export default AppStateProvider;