import { configureStore } from "@reduxjs/toolkit";
import copperPlateReducer from "state/slices/copperPlateSlice";
import canvasReducer from "state/slices/canvasSlice";
import blackLetterReducer from "state/slices/blackLetterSlice";

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    copperplate: copperPlateReducer,
    blackLetter: blackLetterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
