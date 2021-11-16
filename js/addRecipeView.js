import View from "./view.js";
import icons from "url:../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");

  _message = "Recipe was successfully uploaded? :)";

  _window = document.querySelector(".add_recipe-window");

  _overlay = document.querySelector(".overlay");

  _btnOpen = document.querySelector(".nav_btn-add-recipe");

  _btnClose = document.querySelector(".btn_close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  toggleWindow() {
    this._window.classList.toggle("hidden");

    this._overlay.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));

    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();

      //We get all the data in the upload form using FormData
      const dataArr = [...new FormData(this)];

      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }
}

export default new AddRecipeView();
