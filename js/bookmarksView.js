import View from "./view.js";
import icons from "url:../img/icons.svg";
import previewView from "./previewView.js";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks_list");
  _errorMessage = "No bookmark yet, find a recipe and bookmark it :(";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarkView();
