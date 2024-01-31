export const getDrinkCard = (drink) => {
    const drinkContainer = document.createElement("article");
    drinkContainer.classList.add("drink-card")
    const photoContainer = document.createElement("section");
    const photoEl = document.createElement("img")
    photoEl.src = drink.strDrinkThumb;
    photoContainer.append(photoEl);

    const infoContainer = document.createElement("section");
    const drinkNameEl = document.createElement("span")
    drinkNameEl.textContent = drink.strDrink;
    infoContainer.append(drinkNameEl);

    drinkContainer.addEventListener("click", () => {
        const aNavigator = document.createElement("a");
        aNavigator.href = `./../?cocktail=${drink.idDrink}`
        aNavigator.click(); 
    })
    drinkContainer.classList.add(drink.strAlcoholic=="Alcoholic" ? "alcoholic" : "non")
    drinkContainer.append(photoContainer, infoContainer);
    return drinkContainer
}