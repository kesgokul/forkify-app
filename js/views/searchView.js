import View from "./view.js";

class SearchView extends View {
  _parentEl = document.querySelector(".nav");

  // Event handler for search form
  renderHandler(handlerSearch) {
    //submitting the search form -- calls controlSearch()
    document
      .querySelector(".search-form")
      .addEventListener("submit", handlerSearch);
  }

  // Event handler for mouse enter on the Bookmarks and add recepie buttons in the nav
  bookmarksHandler(handlerBookmark, handlerAddRecepie) {
    document
      .querySelector(".features__btn-bookmark")
      .addEventListener("mouseenter", function (e) {
        //bookmarks button
        const bookmarkbtn = e.target.closest(".features__btn-bookmark");
        if (bookmarkbtn) {
          console.log(bookmarkbtn);
          handlerBookmark.call(this);
        }
      });
  }

  // addRecepieHandler(handler) {
  //   this._parentEl.addEventListener("click", function (e) {
  //     const addRecepieBtn = e.target.closest(".features__btn-add-recepie");
  //     if (!addRecepieBtn) return;
  //     handler.call(this);
  //   });
  // }
}
export default new SearchView();
