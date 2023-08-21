import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/getUserProfile", body);
      console.log("user profile", response);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const likeAndUnlikePost = createAsyncThunk(
  "post/likeAndUnlike",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/posts/like", body);
      console.log("user profile", response);
      return response.result.post;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    isLoading: false,
    userProfile: {},
  },
  extraReducers: (builders) => {
    builders
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        
        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id == post._id
        );
        console.log('like post ', post , index);
        if (index!=undefined && index != -1) {
          state.userProfile.posts[index] = post;
        }
      });
  },
});
export default postsSlice.reducer;
