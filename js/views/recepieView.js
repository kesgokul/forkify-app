import View from "./view";
import icons from "../../img/icons.svg";
import { Fraction } from "fractional";

class RecepieView extends View {
  _parentEl = document.querySelector(".recepie");

  // Handler function for servings button and add bookmark button clicks
  servingsHandler(handlerServings, handlerBookmark) {
    this._parentEl.addEventListener("click", function (e) {
      const btnServing = e.target.closest(".btn--tiny"); // servings + / - buttons
      const btnBookmark = e.target.closest(".btn-bookmark"); // add/remove bookmark button
      if (btnServing) {
        const servingTO = +btnServing.dataset.serving;
        handlerServings.call(this, servingTO); // controlServings()
      }
      if (btnBookmark) {
        handlerBookmark(); // controlBookmark()
      }
    });
  }

  // Funciton to update the ingredients based on the servings change input
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newRecepie = Array.from(newDom.querySelectorAll("*"));
    const currRecepie = Array.from(this._parentEl.querySelectorAll("*"));

    // Comparing both the node lists to find nodes that have changed
    currRecepie.forEach((ele, i, currRecepie) => {
      const newEle = newRecepie[i];
      //checking for inequality and nodes that have only text content that have to changed
      if (
        !ele.isEqualNode(newEle) &&
        newEle.firstChild?.nodeValue.trim() !== ""
      ) {
        ele.textContent = newEle.firstChild?.nodeValue.trim();
      }

      // changing the data-serving attribute in the new ele to be able to further update servings
      if (!ele.isEqualNode(newEle)) {
        Array.from(newEle.attributes).forEach((attr) =>
          ele.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  // function to toggle the bookmark icon on click
  toggleBookmarkRender() {
    this._parentEl
      .querySelector(".btn-bookmark")
      .classList.toggle("btn-bookmark--active");
  }

  _generateMarkup() {
    const html = `<figure class="recepie__figure">
  <img src="${this._data.recepie.image}" alt="" class="recepie__img">
            <div class="img-filter"></div>
  <h1 class="recepie__title">
    <span>${this._data.recepie.title}</span>
  </h1>
</figure>
<div class="recepie__details">
  <div class="recepie__info">
    <svg class="recepie__info-icon">
      <use href="${icons}#icon-clock"></use>
    </svg>
    <span class="recepie__info-data recepie__info-data--minutes"
      >${this._data.recepie.cookingTime}</span
    >
    <span class="recepie__info-text">minutes</span>
  </div>
  <div class="recepie__info">
    <svg class="recepie__info-icon">
      <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recepie__info-data recepie__info-data--people">${
      this._data.recepie.servings
    }</span>
    <span class="recepie__info-text">servings</span>

    <div class="recepie__info-buttons">
      <button data-serving="${
        this._data.recepie.servings === 1 ? 1 : this._data.recepie.servings - 1
      }" class="btn--tiny btn--increase-servings">
        <svg>
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
      </button>
      <button data-serving="${
        this._data.recepie.servings + 1
      }" class="btn--tiny btn--increase-servings">
        <svg>
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
  </div>
  <button class="btn-bookmark ${
    this._data.bookmarks.find((bk) => bk.id === this._data.recepie.id)
      ? `btn-bookmark--active`
      : ""
  }">
    <svg width="100%" height="100%" class="">
      <use href="${icons}#icon-bookmark-fill"></use>
    </svg>
  </button>
</div>
<div class="ingredients">
  <h1 class="ingredients__title">Recepie Ingredients</h1>
  <ul class="ingredients-list">
  ${this._data.recepie.ingredients
    .map((ing) => {
      return `<li class="ingredient">
    <svg class="ingredient__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="ingredient__quantity">${
      ing.quantity === null ? "" : new Fraction(ing.quantity)
    }</div>
    <div class="ingredient__desc">
      <span class="ingredient__unit">${ing.unit}</span>
      ${ing.description} 
    </div>
  </li>`;
    })
    .join("")}
  </ul>
</div>
<div class="direction">
  <h2 class="direction__header">How to cook it</h2>
  <p class="direction__desc">
    This recepie was carefully designed and tested by
    <span class="direction__author">Closet cooking</span>
    Please check out the directions at their website.
  </p>
  <button class="direction__btn" data-src="${
    this._data.recepie.source
  }">Directions &rightarrow;</button>
</div>`;
    return html;
  }
}

export default new RecepieView();
