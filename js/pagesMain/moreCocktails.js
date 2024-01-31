import { getDrinkCard } from "./../drinkCard.js";
import { getAllDrinks } from "./../cocktailAPI.js";

let curRendered = 0;
const maxPerPage = 12;
const allDrinks = await getAllDrinks();
// console.log(allDrinks)
const drinkContainer = document.getElementById("drinks");
const renderMoreDrinks = () => {
    let run = false;
    for (let i = 0; i < Math.min(Math.max(allDrinks.length - curRendered, 0), maxPerPage); i++) {
        if (!run)
            run = !run;
        drinkContainer.append(getDrinkCard(allDrinks[i + curRendered]));
    }
    if (!run)
        return;
    curRendered += maxPerPage;
    // console.log(curRendered)
}
renderMoreDrinks();
const renderMoreBtn = document.getElementById("render-more-btn");
renderMoreBtn.addEventListener("click", () => {
    renderMoreDrinks();
})