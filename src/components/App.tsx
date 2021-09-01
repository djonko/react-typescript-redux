import React from 'react'
import pizzas from '../data/pizzas.json'
import Pizza from './Pizza'
import AppCss from './App.module.css'
import PizzaSvg from '../svg/pizza.svg'
import Cart from './Cart'
import AppStateProvider from './AppState'
const App = () => {
    return (
        <AppStateProvider>
            <div className={AppCss.container} >
            <div className={AppCss.header} >
                <PizzaSvg width={120} height={120} />
                <div className={AppCss.siteTitle} > Delicious Pizza </div>
                <Cart/>
            </div>
            <ul>
                {pizzas.map((p) => { return <Pizza key={p.id} pizza={p} ></Pizza> })}
            </ul>
        </div>
        </AppStateProvider>
    )
}

export default App;