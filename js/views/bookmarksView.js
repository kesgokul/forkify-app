import View from "./view";

class BookmarkView extends View {
  _parentEl = document.querySelector(".bookmarks-list");
  _bookmarksContainer = document.querySelector(".bookmarks"); //need to render the parent div

  constructor() {
    super();
    // To close the bookmarks div when the mouse leaves it
    this._parentEl.addEventListener(
      "mouseleave",
      this.closeBookmarksContainer.bind(this)
    );
  }

  _generateMarkup() {
    if (this._data.length === 0) return ""; // render error message here
    const markups = this._data.map((bookmark) => {
      return `<li class="bookmarks__row" data-id="${bookmark.id}">
                <a href="#" class="bookmark-link">
                  <figure class="bookmark-img">
                    <img
                      src="${bookmark.image}"
                      alt="recepie preview image"
                      
                    />
                  </figure>
                  <div class="bookmark-link-data">
                    <h4 class="bookmark-data-title">
                      ${bookmark.title}
                    </h4>
                    <p class="bookmark-data-author">closet cooking</p>
                  </div>
                </a>
              </li>`;
    });
    return markups.join("");
  }

  //open and close the bookmars(parent) container.
  showBookmarksContainer() {
    this._bookmarksContainer.classList.add("bookmarks--active");
  }

  closeBookmarksContainer() {
    this._bookmarksContainer.classList.remove("bookmarks--active");
  }
}
export default new BookmarkView();
