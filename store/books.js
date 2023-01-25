export const actions = {
  selectBook({ commit }, params) {
    return this.$axios.$get(
      "https://books.v2202107122785158474.goodsrv.de/books/",
      { params }
    );
  },
  deleteBook({ commit }, id) {
    return this.$axios.$delete(
      `https://books.v2202107122785158474.goodsrv.de/books/${id}/`
    );
  },
  addBook({ commit }, bo) {
    return this.$axios.$post(
      `https://books.v2202107122785158474.goodsrv.de/books/`,
      bo
    );
  },

  updateBook({ commit }, book) {
    return this.$axios.$put(
      `https://books.v2202107122785158474.goodsrv.de/books/${book.id}/`,
      book
    );
  },
};
