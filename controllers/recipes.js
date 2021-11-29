const { json } = require('express');
const recipes = require('../data/recipes');

async function getRecipes(){    
    return recipes.retrieveAllRecipes();
}

async function getRecipesByIngredients(ingredients){  
    let ingredientes = ingredients.split(',');
    return recipes.retrieveByIngredients(ingredientes);  
}

async function retrieveByMultipleIds(ids){  
    let idList = ids.split(',');
    return recipes.retrieveByMultipleIds(idList);  
}

async function getRecipeById(recipeId){    
    return recipes.retrieveById(recipeId);
}

async function getRecipeByUserCode(userCode){    
    return recipes.retrieveByUserCode(userCode);
}

async function createRecipe(recipe){
    let ingredients = getIngredients(recipe.ingredientsQuantity)
    recipe.ingredients = ingredients;
    return recipes.create(recipe);
}

async function updateRecipe(id, recipe){  
    recipe.ingredients = getIngredients(recipe.ingredientsQuantity);
    return recipes.update(id, recipe);
}

async function deleteRecipe(id){
    return recipes.deleteRecipe(id);
}

function getIngredients (ingredientsQuantity){
    let ingredients = [];
    ingredientsQuantity.forEach(element => {
        ingredients.push(element.ingredient);
    });
    return ingredients;
}

module.exports = {getRecipes,getRecipesByIngredients, getRecipeById, getRecipeByUserCode, retrieveByMultipleIds, createRecipe, updateRecipe, deleteRecipe};