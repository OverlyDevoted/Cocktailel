//maybe users could have a better guessing experience if instead of seperating every ingredient string into individual words and creating an array of unique words but checking against full ingredient strings and if some amount of letters matches then we get a guess
import { getDrinks, getIngredientList } from "../cocktailAPI.js";
import { getDrinkIndex } from "../gameId.js";
import { GameState } from "../gameState.js";


const drinks = await getDrinks();
const drinkIdx = await getDrinkIndex();
const drinkOfTheDay = drinks[drinkIdx];
const fullDrinkRes = await fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkOfTheDay.idDrink}`)
const fullDrinkJson = await fullDrinkRes.json();
const fullDrinkInfo = fullDrinkJson.drinks[0];

const getWordList = (array) => {
    const wordList = [];
    for (let i = 0; i < array.length; i++) {
        let ingredientArr = array[i].split(" ");
        ingredientArr = ingredientArr.map((val) => val.toLowerCase())
        wordList.push(...ingredientArr);
    }
    return wordList;
}
const replaceWordsFromWordlist = (paragraph, wordlist) => {
    let words = paragraph.split(" ");
    words = words.map((word) => {
        const processedWord = word.toLowerCase().replace(/[\p{P}]/gu, "")
        if (wordlist.some((wordListWord) => wordListWord === processedWord)) {
            const returnWord = word.replace(/[^\p{P}]/gu, "\u2589")
            return `<span class="reveal">${returnWord}</span>`;
        }
        return word;
    })
    return words.join(" ");
}
const generateInputs = (array, placeholders, gameState, callback, ...args) => {
    const inputs = [];
    array.forEach((val, idx) => {
        const li = document.createElement("li");

        const input = document.createElement("input");
        li.appendChild(input);
        input.setAttribute("placeholder", placeholders[idx]);
        if (gameState.today.answers[idx].toLowerCase() === val.toLowerCase()) {
            input.setAttribute("disabled", null);
            input.classList.add("correct-guess")
            input.setAttribute("value", val);
        }
        input.addEventListener("input", (e) => {
            if (e.target.value.toLowerCase() === val.toLowerCase()) {
                const seperateWords = e.target.value.toLowerCase().split(" ");
                if (callback)
                    callback(seperateWords);
                e.target.setAttribute("disabled", null);
                e.target.classList.add("correct-guess")
                gameState.saveAnswer(idx, e.target.value)
            }
        })
        inputs.push(li);
    })
    return inputs;
}
const removeFromArray = (array, ...args) => {
    array = array.filter((val) => ![...args[0]].some((arg) => val === arg))
    return array
}
const replaceParagraph = () => {
    const instructionParagraph = document.getElementById("recipe-instruction");

    return (paragraph, uniqueIngredients) => {
        const elements = replaceWordsFromWordlist(paragraph, uniqueIngredients);
        instructionParagraph.innerHTML = elements
    }
}
// MAIN

//setup score
// const maxScore = 1000;
// let currentScore = maxScore;
// const scoreContainer = document.getElementById("score");
// const updateGameState = (decrease) => {
//     currentScore -= decrease ? decrease : 0;
//     scoreContainer.textContent = currentScore;
// }
// updateGameState();

//get ingredients and other info
let ingredientList = getIngredientList(fullDrinkInfo);
const measures = ingredientList.map((val) => val.measure);
ingredientList = ingredientList.map((ingredient) => ingredient.ingredient);

//check game state
const gameState = new GameState(drinkIdx, ingredientList.length, () => {
    return () => {
        const winScreen = document.getElementById("win-screen")
        winScreen.style.display = "flex";
    }
});

//get unique ingredients
let uniqueIngredients = [...new Set(getWordList(ingredientList))];
const drinkImg = document.getElementById("drink-img");
drinkImg.src = fullDrinkInfo.strDrinkThumb;
const drinkName = document.getElementById("drink-name");
drinkName.textContent = fullDrinkInfo.strDrink;


//initial paragraph generation
const paragraphReplacer = replaceParagraph();
const answered = [...new Set(getWordList(gameState.today.answers))];
uniqueIngredients = removeFromArray(uniqueIngredients, answered)
paragraphReplacer(fullDrinkInfo.strInstructions, uniqueIngredients);

//game logic
const correctGuess = (ingredientList) => {
    uniqueIngredients = removeFromArray(uniqueIngredients, ingredientList);
    paragraphReplacer(fullDrinkInfo.strInstructions, uniqueIngredients);
}

//input logic
const inputForm = document.getElementById("inputs");
inputForm.append(...generateInputs(ingredientList, measures, gameState, correctGuess));