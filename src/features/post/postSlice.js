import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialEmoji = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
};

const initialState = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: initialEmoji,
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: initialEmoji,
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: initialEmoji,
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
