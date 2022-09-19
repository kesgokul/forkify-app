import View from "./view.js";

class ResultsView extends View {
  _parentEl = document.querySelector(".results");

  //handler for clicks on search results to open the recepie
  renderHandler(handler) {
    window.addEventListener("hashchange", handler); // controlRecepie()
  }

  _generateMarkup() {
    const markups = this._data.map((recepie) => {
      const html = `<li class="results__row" data-id="${recepie.id}">
      <a href="#${recepie.id}" class="preview-link">
        <figure class="preview-img">
          <img
            src="${recepie.image}"
            alt="recepie preview image"
            
          />
        </figure>
        <div class="preview-link-data">
          <h4 class="preview-data-title">
            ${recepie.title}
          </h4>
          <p class="preview-data-author">${recepie.publisher}</p>
        </div>
      </a>
    </li>`;
      return html;
    });
    return markups.join("");
  }
}
export default new ResultsView();
