import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import SearchView from "./views/searchView";
import ResultsView from "./views/resultsView";
import RecepieView from "./views/recepieView";
import PaginationView from "./views/paginationView";
import BookmarksView from "./views/bookmarksView";
import UploadRecepieView from "./views/uploadRecepieView";
import icons from "../img/icons.svg";
import uploadRecepieView from "./views/uploadRecepieView";

// import recepieView from "./views/recepieView";

// selectors
const searchForm = document.querySelector(".search-form");
const searchResults = document.querySelector(".search-results");
const recepieContainer = document.querySelector(".recepie");

if (module.hot) {
  module.hot.accept();
}

//function to fetch and render the recepie details from the server
async function renderRecepie(id) {
  renderSpinner(recepieContainer);

  //clear the existing contenst of recepieContainer
  recepieContainer.innerHTML = "";

  //append the html to recepieContainer
  recepieContainer.insertAdjacentHTML("afterbegin", html);
}

const controlSearch = async function (e) {
  e.preventDefault();
  try {
    searchResults.classList.add("search-results-active");
    recepieContainer.classList.add("search-results-active");

    const ingredient = searchForm.querySelector(".search__input").value;

    //call loadSearch from model
    ResultsView.renderSpinner();
    await model.loadSearch(ingredient);
    ResultsView.render(model.getSearchResultPage());
    PaginationView.render(model.state.search);
    // console.log(model.state);

    //clear input and result fields
    searchForm.querySelector(".search__input").value = "";
  } catch (err) {
    alert(err);
  }
};

const controlRecepie = async function (e) {
  try {
    e.preventDefault();
    searchResults.classList.remove("search-results-active");
    recepieContainer.classList.remove("search-results-active");
    const recepieId = window.location.hash.slice(1);
    console.log(recepieId);
    if (!recepieId) return;

    RecepieView.renderSpinner();
    await model.loadRecepie(recepieId);
    RecepieView.render(model.state);
  } catch (err) {
    console.error(err);
  }
};

const controlBookmarks = function () {
  //1 add the receip to state.bookmarks in model.
  model.toggleBookmark();

  //2 Toggling Bookmark icon on the recepie page
  RecepieView.toggleBookmarkRender();
  console.log(model.state.bookmarks);
};

const controlShowBookmark = function () {
  //1 add visibility to the bookmarks div
  BookmarksView.showBookmarksContainer();

  //3 render the bookmarks or error message
  BookmarksView.render(model.state.bookmarks);
};

const controlServings = function (servingTo) {
  // console.log(servingTO);

  //1 Update servings in the state
  model.updateServings(servingTo);

  //2 Update the ing/servings in the DOM
  RecepieView.update(model.state);
};

const controlPagination = function (goTo) {
  //1 get the search results to be rendered based on the page requested from the button click
  const resultsOnPage = model.getSearchResultPage(goTo);

  //2 Render the results
  ResultsView.render(resultsOnPage);

  //3 render new buttons
  PaginationView.render(model.state.search);
};

const controlUpload = function (formdata) {
  model.uploadRecepie(formdata);
};

const loadfromStorage = function () {
  window.addEventListener("load", function () {
    model.loadBookmarks();
  });
};

const init = function () {
  SearchView.renderHandler(controlSearch);
  ResultsView.renderHandler(controlRecepie);
  PaginationView.clickHandler(controlPagination);
  RecepieView.servingsHandler(controlServings, controlBookmarks);
  SearchView.bookmarksHandler(controlShowBookmark);
  UploadRecepieView.uploadHandler(controlUpload);
};
init();
loadfromStorage();
