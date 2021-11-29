const conn = require('./conn');
var ObjectId = require('mongodb').ObjectId;
const DATABASE = 'myKitchenDB';
const RECIPES = 'recipes';


async function create(recipe){
    const connectiondb = await conn.getConnection();
    const recipes = await connectiondb
                        .db(DATABASE)
                        .collection(RECIPES)
                        .insertOne(recipe);
    return recipe;
}

async function retrieveAllRecipes(){
    const connectiondb = await conn.getConnection();
    const recipes = await connectiondb
                        .db(DATABASE)
                        .collection(RECIPES)
                        .find()
                        .toArray();    
    return recipes;
}

async function retrieveById(id){
    const connectiondb = await conn.getConnection();
    const recipes = await connectiondb
                        .db(DATABASE)
                        .collection(RECIPES)
                        .findOne({ '_id': ObjectId(id) });    
    return recipes;
}

async function retrieveByUserCode(userCode){
    const connectiondb = await conn.getConnection();
    const recipes = await connectiondb
                        .db(DATABASE)
                        .collection(RECIPES)
                        .find({ 'userCode': userCode });    
    return recipes;
}

async function retrieveByIngredients(ingredients){
    const connectiondb = await conn.getConnection();
    const recipes = await connectiondb
                        .db(DATABASE)
                        .collection(RECIPES)
                        .find({'ingredients': {'$in': ingredients}})
                        .toArray();
    return recipes;
}


async function update(id, recipe){
    let query = {'_id':ObjectId(id)};
    delete recipe._id;
    const connectiondb = await conn.getConnection();
    const response = await connectiondb
                        .db(DATABASE)
                        .collection(RECIPES)
                        .updateOne(query,{$set : recipe},{ upsert: true });
    return retrieveById(id);
}

async function deleteRecipe(id){
    const connectiondb = await conn.getConnection();
    const result =  await connectiondb
                        .db(DATABASE)
                        .collection(RECIPES)
                        .deleteOne({'_id':ObjectId(id)});
    return result;
}

module.exports = {create, retrieveAllRecipes, retrieveById, retrieveByUserCode, retrieveByIngredients, update, deleteRecipe};