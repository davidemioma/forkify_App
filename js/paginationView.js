import View from "./view.js";
import icons from "url:../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn_inline");

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const curPage = this._data.page;

    //Page 1 and other pages
    if (numPages > 1 && curPage === 1) {
      return `
         <button data-goto="${
           curPage + 1
         }" class="btn_inline pagination_btn-next">
            <span>Page ${curPage + 1}</span>
            <svg class="search_icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button> `;
    }

    //Other page
    if (numPages > 1 && curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn_inline pagination_btn-prev">
            <svg class="search_icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>

        <button data-goto="${
          curPage + 1
        }" class="btn_inline pagination_btn-next">
            <span>Page ${curPage + 1}</span>
            <svg class="search_icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button> `;
    }

    //Last page
    if (numPages > 1 && curPage === numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn_inline pagination_btn-prev">
            <svg class="search_icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>`;
    }

    //Page 1 and no other pages
    return "";
  }
}

export default new PaginationView();
