import React from "react";
import { useDispatch } from "react-redux";
import Header from './Header.jsx'
import Footer from "./Footer.jsx";
import smoothieData from "../../server/server/data/specialSmoothie.mjs";
import { addToCart } from "../store/reducers/cartSlice.js";
import './Special.scss'

const Special = () => {
  const dispatch = useDispatch();

 
    return( <div >
        < Header />
        <h1>Special mixes</h1>
      <ul className="Special__container">
        
        {smoothieData.map((smoothie) => (
          <li className="Special__card" key={smoothie.id}>
           <img
              className="Special__image"
              src={smoothie.image}
              alt={smoothie.name}
              />
            <h2>{smoothie.name}</h2>
            
            <p className="Special__ingredients">{smoothie.ingredients.fruits.map(fruit => fruit.id).join(", ")} {smoothie.ingredients.vegetables.map(vegetable => vegetable.id).join(", ")}</p>
            <p>Price: ${smoothie.price}</p>
            
          </li>
        ))}
          
          </ul>
        <Footer />
        </div>
        
    )
}
export default Special