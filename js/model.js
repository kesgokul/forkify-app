import { API_KEY, API_URL } from "./config";
import { getJSON, sendJSON } from "./helper";
import { API_URL } from "./config";
import { PER_PAGE } from "./config";
import { TIMEOUT_SEC } from "./config";
import { requestTimeout } from "./helper";

export const state = {
  // recepie on display
  recepie: {},
  // search results
  search: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE,
  },
  //user bookmarks
  bookmarks: [],
};

// function to fetch results form api based on search query
export const loadSearch = async function (keyword) {
  try {
    const recepies = await getJSON(`${API_URL}?search=${keyword}`);

    if (!recepies.results) {
      throw new Error(`No recipes found`);
    }

    // storing the search results as objects in the state
    state.search.results = recepies.data.recipes.map((result) => {
      return {
        publisher: result.publisher,
        image: result.image_url,
        id: result.id,
        title: result.title,
      };
    });
  } catch (err) {
    //throwing the error again so it can be handled by the controller
    throw err;
  }
};

const createRecepieObject = function (recepie) {
  return {
    id: recepie.id,
    image: recepie.image_url,
    cookingTime: recepie.cooking_time,
    publisher: recepie.publisher,
    source: recepie.source_url,
    title: recepie.title,
    servings: recepie.servings,
    ingredients: recepie.ingredients,
  };
};
// Function to fetch the recepie from the api and store it in the state
export const loadRecepie = async function (id) {
  try {
    const result = await getJSON(`${API_URL}/${id}`);
    console.log(result);
    const recepie = result.data.recipe;
    state.recepie = createRecepieObject(recepie);
  } catch (err) {
    throw err;
  }
};

// Function to return the search results to be displayed based on the page requested
export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

// Function to update the servings and ing quantity in the state based on user input
export const updateServings = function (servingTo) {
  state.recepie.ingredients.forEach((ing) => {
    ing.quantity =
      ing.quantity === null
        ? null
        : +ing.quantity * (servingTo / state.recepie.servings); // formula for the new ing quant
  });
  state.recepie.servings = servingTo;
};

// Function to add/remove a recepie to/form the bookmarks[] in the state
export const toggleBookmark = function (recepie = state.recepie) {
  // new bk object based on the recepie
  const bookmark = {
    id: recepie.id,
    image: recepie.image,
    source: recepie.source,
    title: recepie.title,
  };

  // Finding if the recepie already exits in the state
  const existingBookmark = state.bookmarks.find((bk) => bk.id === bookmark.id);

  // Removing the recepie from bookmarks
  if (existingBookmark) {
    const index = state.bookmarks.indexOf(existingBookmark);
    state.bookmarks.splice(index, 1);
  } else {
    // add recepie to bookmarks
    state.bookmarks.push(bookmark);
  }
  //store bookmarks in local storage
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

// Function to fetch the bookmarks from localstorage and update state when the page loads
export const loadBookmarks = function () {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  if (!bookmarks) return;
  state.bookmarks = bookmarks;
};

export const uploadRecepie = async function (formdata) {
  try {
    const ingredients = formdata
      .filter((data) => data[0].startsWith("ingredient") && data[1] !== "")
      .map((ing) => {
        const [quantity, unit, desc] = ing[1].split(",");
        return {
          quantity: quantity === "" ? null : +quantity,
          unit: unit,
          description: desc,
        };
      });

    // rest of the info
    // const recepie = formdata.map(data);
    const rest = Object.fromEntries(
      formdata.filter((data) => !data[0].startsWith("ingredient"))
    );
    // console.log(rest);
    const recepie = {
      image_url: rest.image,
      cooking_time: +rest.CookingTime,
      publisher: rest.publisher,
      source_url: rest.url,
      title: rest.title,
      servings: +rest.servings,
      ingredients: ingredients,
      description: "",
    };
    const data = await sendJSON(
      `${API_URL}?search=${recepie.title}&key=${API_KEY}`,
      recepie
    );
    // console.log(data);
    if (data.status == "success") {
      const recepieObj = createRecepieObject(data.data.recipe);
      toggleBookmark(recepieObj);
    }
  } catch (err) {
    console.error(err);
  }
};
