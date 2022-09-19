import View from "./view";
import { PER_PAGE } from "../config";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");
  _resultPerPage = PER_PAGE; // number of recepies to be shown in the results column

  // Event handler to handle pagination button clicks and then call controlPagination in the controller
  clickHandler(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btnTo = e.target.closest(".btn-pag");
      if (!btnTo) return;

      //Get the number of the requested page from the data attribute
      const goTo = btnTo.dataset.goto;
      console.log(goTo);
      handler.call(this, goTo);
    });
  }

  _generateMarkup() {
    const page = +this._data.page;
    const length = this._data.results.length;

    //4 on 1st page with more pages i.e only next button
    if (length / this._resultPerPage > 1 && page === 1) {
      return `<button data-goTO="${
        page + 1
      }" class="btn-pag btn-pag--next">Page ${page + 1} &rightarrow;</button>`;
    }

    //2 more than one page i.e both buttons
    if (page > 1 && page < Math.ceil(length / this._resultPerPage)) {
      return `<button data-goTO="${
        page - 1
      }" class="btn-pag btn-pag--prev">&leftarrow;Page ${page - 1}</button>
          <button data-goTO="${page + 1}" class="btn-pag btn-pag--next">Page${
        page + 1
      } &rightarrow;</button>`;
    }

    //3 last page i.e only prev button
    if (page === Math.ceil(length / this._resultPerPage)) {
      return `<button data-goTO="${
        page - 1
      }" class="btn-pag btn-pag--prev">&leftarrow;Page ${page - 1}</button>`;
    }

    //1 only one page i.e no buttons
    if (length / this._resultPerPage > 1) {
      return "";
    }

    // <button class="btn-pag btn-pag--prev">&leftarrow; Page 1</button>
    //       <button class="btn-pag btn-pag--next">Page 3 &rightarrow;</button>
  }
}

export default new PaginationView();
