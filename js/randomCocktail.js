const generateRecipe = async (id) => {
    let response;
    console.log(id)
    if (id) {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    }
    else
        response = await fetch("https://thecocktaildb.com/api/json/v1/1/random.php")
    const coctailContainer = document.getElementById("coctail-recipe");
    const { drinks } = await response.json()
    coctailContainer.querySelector("#coctail-name").textContent = drinks[0].strDrink;
    coctailContainer.querySelector("#coctail-instructions").textContent = drinks[0].strInstructions;

    coctailContainer.querySelector("img").src = drinks[0].strDrinkThumb;
    const ingredientList = Array(14).fill(undefined)
        .map((_, idx) => {
            let ingredient = { ingredient: drinks[0][`strIngredient${idx + 1}`], measure: drinks[0][`strMeasure${idx + 1}`] }
            return ingredient;
        })
        .filter(val => val.ingredient);

    const ingredientEl = coctailContainer.querySelector("#ingredients");
    ingredientEl.innerHTML = "";
    ingredientList.forEach((val) => {
        const li = document.createElement("li");
        li.textContent = `${val.measure || ""} ${val.ingredient}`
        ingredientEl.append(li)
    })

    coctailContainer.setAttribute("class", drinks[0].strAlcoholic.toLowerCase() === "alcoholic" ? "alcoholic" : "non")
}
const generateBtn = document.getElementById("generate-btn");
const loadingContainer = document.getElementById("coctail-name")
generateBtn.addEventListener("click", (e) => {
    loadingContainer.textContent = "Loading..."
    generateRecipe();
})

const urlParams = new URLSearchParams(window.location.search)

generateRecipe(urlParams.has("cocktail") ? urlParams.get("cocktail") : null);
