import icons from "../../img/icons.svg";
export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._renderResults(markup);
  }

  renderSpinner() {
    this._clear();
    const markup = `<div class="spinner">
        <svg class="ingredient__icon">
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _renderResults(markup) {
    //clear the existing search results
    this._clear();
    //insert the html
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  //to clear the parent element
  _clear() {
    this._parentEl.innerHTML = "";
  }
}
