import View from "./view.js";
import icons from "url:../img/icons.svg";
import { Fraction } from "fractional";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one!";
  _message = "";

  addHandlerRender(handler) {
    ["load", "hashchange"].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn_update-servings");

      if (!btn) return;

      const updateTo = +btn.dataset.updateTo;

      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn_bookmark");

      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    return ` <figure class="recipe_fig">
          <img src="${this._data.image}" alt="Tomato" class="recipe_img" />
          <h1 class="recipe_title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe_details">
          <div class="recipe_info">
            <svg class="recipe_info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe_info-data recipe_info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe_info-text">minutes</span>
          </div>

          <div class="recipe_info">
            <svg class="recipe_info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe_info-data recipe_info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe_info-text">servings</span>

            <div class="recipe_info-buttons">
              <button class="btn_tiny btn_update-servings" data-update-to="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>

              <button class="btn_tiny btn_update-servings" data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe_user-generated ${this._data.key ? "" : "hidden"}">
             <svg>
                <use href="${icons}#icon-user"></use>
             </svg>
          </div>

          <button class="btn_round btn_bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe_ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>

          <ul class="recipe_ingredient-list">
            ${this._data.ingredients
              .map((ing) => {
                return `
                <li class="recipe_ingredient">
                  <svg class="recipe_icon">
                   <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe_quantity">${
                    ing.quantity ? new Fraction(ing.quantity).toString() : ""
                  }</div>
                  <div class="recipe_description">
                    <span class="recipe_unit">${ing.unit}</span>
                    ${ing.description}
                  </div>
                </li>`;
              })
              .join("")}
          </ul>
        </div>

        <div class="recipe_directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe_directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe_publisher">${
              this._data.publisher
            }</span>. Please
            check out directions at their website.
          </p>
          <a
            class="btn_small recipe_btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search_icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }
}

export default new RecipeView();
