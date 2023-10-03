const getSmoothieImage = (selectedIngredients) => {
    const citrusIngredients = ["orange", "lemon", "lime"];
    const carrotIngredients = ["carrot"];
    const mangoPineappleIngredients = ["mango", "pineapple"];
    const broccoliIngredients = ["broccoli"];
  
    const citrusIngredientsCount = selectedIngredients.filter((ingredient) =>
    citrusIngredients.includes(ingredient.id)).length;
    const carrotIngredientsCount = selectedIngredients.filter(ingredient => carrotIngredients.includes(ingredient.id)).length;
    const mangoPineappleIngredientsCount = selectedIngredients.filter(ingredient => mangoPineappleIngredients.includes(ingredient.id)).length;
    const broccoliIngredientsCount = selectedIngredients.filter(ingredient => broccoliIngredients.includes(ingredient.id)).length;

    
  
    if (citrusIngredientsCount >= 3) {
      return "../../../static/smoothie-2.png"

    } else if (carrotIngredientsCount >= 3) {
      return "../../../static/smoothie-carrot.png";
      
    } else if (mangoPineappleIngredientsCount >= 3) {
      return "../../../static/mango smoothie.png";
  } 
  else if (broccoliIngredientsCount >= 3) {
    return "../../../static/smoothie-broccoli.png";
} 
    else {
      return "../../../static/smoothie.png";
    }
  };
  
  export default getSmoothieImage;