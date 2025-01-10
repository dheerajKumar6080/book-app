// bookSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types/bookTypes";

const initialState = {
  books: [] as Book[],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      const newBook = { ...action.payload, read: false }; // Set read to false
      state.books.push(newBook);
    },
    updateBook: (state, action: PayloadAction<{ index: number; book: Book }>) => {
      const { index, book } = action.payload;
      state.books[index] = book;
    },
    removeBook: (state, action: PayloadAction<number>) => {
      state.books.splice(action.payload, 1);
    },
    toggleRead: (state, action: PayloadAction<number>) => {
      const book = state.books[action.payload];
      if (book) {
        book.read = !book.read; // Toggle read status
      }
    },
  },
});

export const { addBook, updateBook, removeBook, toggleRead } = bookSlice.actions;
export default bookSlice.reducer;
