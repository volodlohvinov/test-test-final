const getSmoothieName = (selectedIngredients) => {
    const citrusIngredients = ["orange", "lemon", "lime"];
    const carrotIngredients = ["carrot"];
    const mangoPineappleIngredients = ["mango", "pineapple"];
    const broccoliIngredients = ["broccoli"];

    const citrusIngredientsCount = selectedIngredients.filter(ingredient => citrusIngredients.includes(ingredient.id)).length;
    const carrotIngredientsCount = selectedIngredients.filter(ingredient => carrotIngredients.includes(ingredient.id)).length;
    const mangoPineappleIngredientsCount = selectedIngredients.filter(ingredient => mangoPineappleIngredients.includes(ingredient.id)).length;
    const broccoliIngredientsCount = selectedIngredients.filter(ingredient => broccoliIngredients.includes(ingredient.id)).length;

    if (citrusIngredientsCount >= 3) {
        return "Citrus gang";
        
    } else if (carrotIngredientsCount >= 3) {
        return "Carrot Crunch";
    } 
    else if (mangoPineappleIngredientsCount >= 3) {
        return "Mango Pineapple";
    } 
    else if (broccoliIngredientsCount >= 3) {
        return "Broccoli mix";
    } 
    else {
        return "Default Smoothie";
    }
    
};

export default getSmoothieName;