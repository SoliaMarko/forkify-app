import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addhandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = +this._data.page;

    console.log('numPages', numPages);

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }

    // Page 1, and there are NO other pages
    if (curPage === 1 && numPages === 1) {
      return '';
    }

    // Last page
    if (curPage === numPages) {
      return this._generateMarkupButton('prev');
    }

    // Other pages
    if (curPage > 1 && curPage < numPages) {
      return (
        this._generateMarkupButton('prev') + this._generateMarkupButton('next')
      );
    }
  }

  _generateMarkupButton(side = 'prev') {
    const curPage = +this._data.page;
    const destPage = side === 'prev' ? curPage - 1 : curPage + 1;

    return `
      <button data-goto="${destPage}" class="btn--inline pagination__btn--${side}">
        <svg class="search__icon">
          <use href="${icons}.svg#icon-arrow-${
      side === 'prev' ? 'left' : 'right'
    }"></use>
        </svg>
        <span>Page ${destPage}</span>
      </button>
    `;
  }
}

export default new PaginationView();
