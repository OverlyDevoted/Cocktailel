//maybe users could have a better guessing experience if instead of seperating every ingredient string into individual words and creating an array of unique words but checking against full ingredient strings and if some amount of letters matches then we get a guess
import { getDrinks, getIngredientList } from "../cocktailAPI.js";
import { getDrinkIndex } from "../gameId.js";

const drinks = await getDrinks();
const drinkOfTheDay = drinks[await getDrinkIndex()];
const fullDrinkRes = await fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkOfTheDay.idDrink}`)
const fullDrinkJson = await fullDrinkRes.json();
const fullDrinkInfo = fullDrinkJson.drinks[0];

// console.log(fullDrinkInfo);
// console.log(fullDrinkInfo.strInstructions)
let ingredientList = getIngredientList(fullDrinkInfo);
ingredientList = ingredientList.map((ingredient) => ingredient.ingredient);

const getWordList = (array) => {
    const wordList = [];
    for (let i = 0; i < array.length; i++) {
        let ingredientArr = ingredientList[i].split(" ");
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
const generateInputs = (array, callback, ...args) => {
    const inputs = [];
    array.forEach((val) => {
        const input = document.createElement("input");
        input.setAttribute("placeholder", val);
        input.addEventListener("input", (e) => {
            if (e.target.value.toLowerCase() === val.toLowerCase()) {
                const seperateWords = e.target.value.toLowerCase().split(" ");
                console.log(seperateWords)
                if (callback)
                    callback(...args, seperateWords);
            }
        })
        inputs.push(input);
    })
    return inputs;
}
const removeFromArray = (array, ...args) => {
    console.log(array)
    console.log([...args[0]])
    array = array.filter((val) => ![...args[0]].some((arg) => val === arg))
    console.log(array)
}
const replaceParagraph = () => {
    const instructionParagraph = document.getElementById("recipe-instruction");
    return (paragraph, uniqueIngredients) => {
        instructionParagraph.innerHTML = replaceWordsFromWordlist(paragraph, uniqueIngredients)
    }
}
const uniqueIngredients = [...new Set(getWordList(ingredientList))];
const drinkImg = document.getElementById("drink-img");
const paragraphReplacer = replaceParagraph();

paragraphReplacer(fullDrinkInfo.strInstructions, uniqueIngredients);
drinkImg.src = fullDrinkInfo.strDrinkThumb;

const inputForm = document.getElementById("inputs");
inputForm.append(...generateInputs(ingredientList, removeFromArray, uniqueIngredients));
