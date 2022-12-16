//search recipe by the name

let recipe = document.getElementById('recipe');
let recipeSearchButton = document.getElementById('recipe-search-btn');

let url1 = 'https://thecocktaildb.com/api/json/v1/1/search.php?s=';

function getRecipe() {
    let userCocktailName = document.getElementById('cocktail-name-input').value;
    if (userCocktailName.length == 0) {
        recipe.innerHTML = `<p class='uncorrect-name'>Please type a name of cocktail</p>`
    } else {
        fetch(url1 + userCocktailName)
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                let usersDrink = data.drinks[0];

                let ingredients = [];
                let counter = 1;

                for (let i in usersDrink) {
                    let ingredient = '';
                    let ingredientQty = '';

                    if (i.startsWith('strIngredient') && usersDrink[i]) {
                        ingredient = usersDrink[i];
                        if (usersDrink[`strMeasure` + counter]) {
                            ingredientQty = usersDrink[`strMeasure` + counter];
                        } else {
                            ingredientQty = '';
                        }
                        counter++;
                        ingredients.push(`${ingredientQty} ${ingredient}`)
                    }
                }

                recipe.innerHTML = `
                <img src='${usersDrink.strDrinkThumb}' alt='cocktail'>
                <h1>${usersDrink.strDrink}</h1>
                <p>${usersDrink.strAlcoholic} cocktail</p>
                <h2>Ingredients:</h2>
                <ul id='ingredientList'></ul>
                <h2>How to cook:</h2> 
                <p>${usersDrink.strInstructions}</p>
                `
                let ingredientList = document.getElementById('ingredientList');
                for (let item of ingredients) {
                    let ingredientListItem = document.createElement('li');
                    ingredientList.appendChild(ingredientListItem);
                    ingredientListItem.innerHTML = item;
                }
            })
            .catch(() => {
                recipe.innerHTML = `<p class='uncorrect-name'>Please type correct name of cocktail</p>`;
            });
    }
};

recipeSearchButton.onclick = getRecipe;

//search all by the first letter

let firstLetterSearchBtn = document.getElementById('first-letter-search-btn');
let listByFirstLetter = document.getElementById('listByFirstLetter');
let url2 = 'https://thecocktaildb.com/api/json/v1/1/search.php?f='

function getListByFirstLetter() {
    let userLetter = document.getElementById('first-letter-input').value;
    if (userLetter.length == 0) {
        listByFirstLetter.innerHTML = `<p>Please type any first letter</p>`
    } else {
        fetch(url2 + userLetter)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                listByFirstLetter.innerHTML = `<ul id='cocktailList'></ul>`

                let ulByFirstLetter = document.getElementById('cocktailList');

                for (let i in data.drinks) {
                    let itemByFirstLetter = document.createElement('li');
                    ulByFirstLetter.appendChild(itemByFirstLetter);
                    itemByFirstLetter.innerHTML = `${data.drinks[i].strDrink}`;
                }
            })
            .catch(() => listByFirstLetter.innerHTML = `<p>Please type correct first letter</p>`)
    }
}

firstLetterSearchBtn.onclick = getListByFirstLetter;
