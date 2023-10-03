import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  removeAllIngredients,
} from "../store/reducers/smoothieSlice.js";
import { v4 as getUniqId } from "uuid";
import ingredientsData from "../../server/server/data/ingredients.mjs";
import portionSizes from "../../server/server/data/portionSizes.mjs";
import { addToCart } from "../store/reducers/cartSlice.js";
import { Button } from 'antd';
import { addButton } from './button.module.scss'
import "./Constructor.scss";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Smoothie = () => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(portionSizes[0].size);
  const selectedIngredients = useSelector(
    (state) => state.smoothie.selectedIngredients
  );
  const [selectedFruit, setSelectedFruit] = useState("");
  const [selectedVegetable, setSelectedVegetable] = useState("");
  const [isSmoothieAdded, setIsSmoothieAdded] = useState(false);

  const calculateTotalPrice = useMemo(() => {
    const ingredientsPrice = selectedIngredients.reduce((total, ingredient) => {
      const ingredientInfo =
        ingredientsData.fruits.find((fruit) => fruit.id === ingredient.id) ||
        ingredientsData.vegetables.find(
          (vegetable) => vegetable.id === ingredient.id
        );
      if (ingredientInfo) {
        const ingredientPrice =
          (ingredientInfo.literPrice / 1000) * selectedSize; 
        return total + ingredientPrice;
      }
      return total;
    }, 0);

    const sizePrice =
      portionSizes.find((sizeOption) => sizeOption.size === selectedSize)
        ?.price || 0;
    return ingredientsPrice + sizePrice;
  }, [selectedIngredients, selectedSize]);
  const handleAddToCart = () => {
    if (selectedIngredients.length > 0) {
      const smoothieData = {
        id:getUniqId(),
        ingredients: selectedIngredients,
        size: selectedSize,
        totalPrice: calculateTotalPrice,
      };
  
      
      dispatch(addToCart(smoothieData));
      
      setIsSmoothieAdded(true);
      setTimeout(() => {
        setIsSmoothieAdded(false);
        setSelectedFruit("");
        setSelectedVegetable("");
        dispatch(removeAllIngredients());
      }, 2000);
    }
  };

  const handleAddFruit = () => {
    if (selectedIngredients.length < 5) {
      const fruit = ingredientsData.fruits.find(
        (fruit) => fruit.id === selectedFruit && fruit.isAvailable
      );
      if (fruit) {
        dispatch(addIngredient(fruit));
        setSelectedFruit("");
        
      }
    } else {
      alert("You can add only 5 ingredients");
    }
  };

  const handleAddVegetable = () => {
    if (selectedIngredients.length < 5) {
      const vegetable = ingredientsData.vegetables.find(
        (vegetable) =>
          vegetable.id === selectedVegetable && vegetable.isAvailable
      );
      if (vegetable) {
        dispatch(addIngredient(vegetable));
        setSelectedVegetable("");
      }
    } else {
      alert("You can add only 5 ingredients");
    }
    
  };
  const handleRemoveIngredient = (ingredientId) => {
    dispatch(removeIngredient(ingredientId));
  };
  const getSmoothieInfo = () => {
    const ingredientsList = selectedIngredients
      .map((ingredient) => ingredient.name)
      .join(", ");
    return `Your smoothie: ${ingredientsList} (${selectedSize} ml)`;
  };

  return (
    <div>
      <Header />
      <div className="Constructor__main">
        <h1 className="Constructor__title">Super cool smoothie constructor</h1>
      <h2 className="Constructor__text">Ingredients (you can add a maximum of 5)</h2>
<div className="Constructor__wrapper">
<div className="Constructor__container">
  <div className="Constructor__ingredients-container">
  <label>Fruits:</label>
      <div className="Constructor__fruit-container Constructor__select">
        
        <select
          value={selectedFruit}
          onChange={(e) => setSelectedFruit(e.target.value)}
        >
          <option value="">Select a fruit</option>
          {ingredientsData.fruits.map((fruit) => (
            <option
              key={fruit.id}
              className={
                fruit.isAvailable ? "" : "Constructor__transparent-ingredient"
              }
              value={fruit.id}
              disabled={!fruit.isAvailable}
            >
              {fruit.name}
            </option>
          ))}
        </select>
        <Button className={"button " + addButton} onClick={handleAddFruit}>Add</Button>
      </div>
      <label>Vegetables:</label>
      <div className="Constructor__vegetables-container Constructor__select">
        
        <select
          value={selectedVegetable}
          onChange={(e) => setSelectedVegetable(e.target.value)}
        >
          <option value="">Select a vegetable</option>
          {ingredientsData.vegetables.map((vegetable) => (
            <option
              key={vegetable.id}
              className={
                vegetable.isAvailable
                  ? ""
                  : "Constructor__transparent-ingredient"
              }
              value={vegetable.id}
              disabled={!vegetable.isAvailable}
            >
              {vegetable.name}
            </option>
          ))}
        </select>
        <Button className={"button " + addButton} onClick={handleAddVegetable}>Add</Button>
      </div>
      <label >Smoothie Size:</label>
      <div className="Constructor__volume Constructor__select"  >
      
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(parseInt(e.target.value, 10))}
        >
          {portionSizes.map((sizeOption) => (
            <option key={sizeOption.id} value={sizeOption.size}>
              {sizeOption.name} - {sizeOption.size} ml
            </option>
            
          ))}
        </select>
        </div>
        </div>
      </div>
      
      <div className="Constructor__chosen-container">
      <h3>Chosen ingredients:</h3>
      <ul className="Constructor__chosen-ingredients">
      {selectedIngredients.length === 0 && <p>No ingredients selected yet.</p>}
        {selectedIngredients.map((ingredient, index) => (
          <li className="Constructor__ingredients-list" key={index}>
            {ingredient.name}
            <Button className="Constructor__button" type="primary" danger onClick={() => handleRemoveIngredient(ingredient.id)}>
              Remove
            </Button>
          </li>
          
        ))}
      </ul>
      </div>
      <div className="Constructor__total">
        {selectedIngredients.length > 0 && <p>{getSmoothieInfo()}</p>}
        <h3>Total Price: ${calculateTotalPrice.toFixed(2)}</h3>
      </div>
      {isSmoothieAdded && <p className="Constructor__added">Smoothie has been added to cart!</p>}
      <Button className={"button " + addButton} onClick={handleAddToCart}>Add to Basket</Button>
      </div>
      
      </div>
      <Footer />
    </div>
    
  );
};

export default Smoothie;
