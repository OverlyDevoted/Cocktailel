import { getDrinks } from "../cocktailAPI.js";
import { getDrinkIndex } from "../gameId.js";
import { getDrinkCard } from "../drinkCard.js";

const drinks = await getDrinks();
const drinkOfTheDay = drinks[await getDrinkIndex()];
const fullDrinkRes =  await fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkOfTheDay.idDrink}`)
const fullDrinkJson = await fullDrinkRes.json();
const fullDrinkInfo = fullDrinkJson.drinks[0];
console.log(fullDrinkInfo)
const gameContainer = document.getElementById("game-container");
gameContainer.innerHTML = "";
gameContainer.append(getDrinkCard(fullDrinkInfo));