import { getDrinks } from "./cocktailAPI.js";

function PRNG(seed, modulo) {
    let str = `${(2 ** 31 - 1 & Math.imul(48271, seed)) / 2 ** 31}`
        .split('')
        .slice(-10)
        .join('') % modulo

    return str
}
function addZero(number, obj, property) {
    if (number / 10 < 1) {
        obj[property] *= 10;
    }
}
function generateSeed(date) {
    const seedObj = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
    addZero(seedObj.month, seedObj, "year")
    addZero(seedObj.day, seedObj, "month")
    return +(seedObj.year.toString() + seedObj.month.toString() + seedObj.day.toString())
}
export const getDrinkIndex = async ()=>{
    const drinks = await getDrinks();
    return PRNG(generateSeed(new Date()), drinks.length)
}
