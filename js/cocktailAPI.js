export const getDrinks = async (alcoholic = true) => {
    const drinkRes = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholic ? "Alcoholic" : "Non_Alcoholic"}`);
    const drinksJson = await drinkRes.json();
    return drinksJson.drinks;
}
export const getAllDrinks = async () => {
    let alcoholicDrinks = await getDrinks();
    alcoholicDrinks = alcoholicDrinks.map((drink) => { return { ...drink, strAlcoholic: "Alcoholic" } })
    let nonDrinks = await getDrinks(false);
    nonDrinks = nonDrinks.map((drink) => { return { ...drink, strAlcoholic: "Non-alcoholic" } })
    const allDrinks = [...alcoholicDrinks, ...nonDrinks];
    allDrinks.sort((a, b) => a.idDrink - b.idDrink)

    return allDrinks;
}
