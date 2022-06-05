import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types";

type PostsState = {
  postsCollection: Post[];
  pageNumber: number;
};

const initialState: PostsState = {
  postsCollection: [],
  pageNumber: 0
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    incPageNumber: (state: PostsState, action: PayloadAction<number>) => {
      state.pageNumber += action.payload;
    },
    setActivePosts: (state: PostsState, action: PayloadAction<Post[]>) => {
      state.postsCollection = action.payload;
    }
  }
});

export const { incPageNumber, setActivePosts } = postsSlice.actions;

export default postsSlice.reducer;
