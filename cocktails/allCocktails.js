const getDrinks = async (alcoholic = true) => {
    const drinkRes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholic ? "Alcoholic" : "Non_Alcoholic"}`);
    const drinksJson = await drinkRes.json();
    return drinksJson.drinks;
}
const getAllDrinks = async (limit) => {
    let alcoholicDrinks = await getDrinks();
    alcoholicDrinks = alcoholicDrinks.map((drink) => { return { ...drink, alcoholic: true } })
    let nonDrinks = await getDrinks(false);
    nonDrinks = nonDrinks.map((drink) => { return { ...drink, alcoholic: false } })
    const allDrinks = [...alcoholicDrinks, ...nonDrinks];
    allDrinks.sort((a, b) => a.idDrink - b.idDrink)
    return allDrinks;
}
let curRendered = 0;
const maxPerPage = 12;
const allDrinks = await getAllDrinks();
console.log(allDrinks)
const renderDrinkCard = (drink) => {
    const drinkContainer = document.createElement("article");

    const photoContainer = document.createElement("section");
    const photoEl = document.createElement("img")
    photoEl.src = drink.strDrinkThumb;
    photoContainer.append(photoEl);

    const infoContainer = document.createElement("section");
    const drinkNameEl = document.createElement("span")
    drinkNameEl.textContent = drink.strDrink;
    infoContainer.append(drinkNameEl);

    drinkContainer.addEventListener("click", () => {
        window.location.assign(window.location.origin + "?cocktail=" + drink.idDrink);
    })
    drinkContainer.classList.add(drink.alcoholic?"alcoholic":"non")
    drinkContainer.append(photoContainer, infoContainer);
    return drinkContainer
}
const drinkContainer = document.getElementById("drinks");
const renderMoreDrinks = () => {
    let run = false;
    for (let i = 0; i < Math.min(Math.max(allDrinks.length - curRendered, 0), maxPerPage); i++) {
        if (!run)
            run = !run;
        drinkContainer.append(renderDrinkCard(allDrinks[i + curRendered]));
    }
    if (!run)
        return;
    curRendered += maxPerPage;
    console.log(curRendered)
}
renderMoreDrinks();
const renderMoreBtn = document.getElementById("render-more-btn");
renderMoreBtn.addEventListener("click", () => {
    renderMoreDrinks();
})