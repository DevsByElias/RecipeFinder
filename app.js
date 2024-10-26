const searchButton = document.getElementById("Search");
const mealList = document.getElementById("result-section");
const mealDetailsContent = document.querySelector(".meal-details-content");
const closeButton = document.getElementById("close-btn");

mealList.addEventListener("click", getMealRecipe);
searchButton.addEventListener("click", getMealList);
closeButton.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

function getMealList() {
  let searchInputTxt = document.getElementById("ingredient").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class="meal-item" data-id="${meal.idMeal}">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="food">
              </div>
              <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Get Recipe</a>
              </div>
            </div>
          `;
        });
        mealList.classList.remove("no-meals-message");
      } else {
        html = `<div class="no-meals-message">Sorry, we didn't find any meals!</div>`;
        mealList.classList.add("no-meals-message");
      }
      mealList.innerHTML = html;
    });
}

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];

  let html = `
    <h2>${meal.strMeal}</h2>
    <h3>${meal.strCategory}</h3>
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    <img src="${meal.strMealThumb}" alt="Food" />
  `;

  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
