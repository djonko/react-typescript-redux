import React from 'react'
import pizzas from '../data/pizzas.json'
import Pizza from './Pizza'
import AppCss from './App.module.css'
import PizzaSvg from '../svg/pizza.svg'
import Cart from './Cart'
import AppStateProvider from './AppState'
import SpecialOffer from './SpecialOffer'
import PizzaItem from './Pizza'
const App = () => {
    const specialOfferPizza = pizzas.find((p)=> p.specialOffer );
    
    return (
        <AppStateProvider>
            <div className={AppCss.container} >
            <div className={AppCss.header} >
                <PizzaSvg width={120} height={120} />
                <div className={AppCss.siteTitle} > Delicious Pizza </div>
                <Cart/>
            </div>
            {specialOfferPizza && <SpecialOffer pizza={specialOfferPizza} />}
            <ul className= {AppCss.pizzaList}>
                {pizzas.map((p) => { return <PizzaItem key={p.id} pizza={p} ></PizzaItem> })}
            </ul>
        </div>
        </AppStateProvider>
    )
}

export default App;