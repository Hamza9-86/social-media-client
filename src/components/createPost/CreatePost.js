import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import backgroundDummy from "../../assets/background.jpg";
import "./CreatePost.scss";
import { BsCardImage } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { getUserProfile } from "../../redux/slices/postsSlice";

function CreatePost() {
  const [postImg, setPostImg] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImg(fileReader.result);
        console.log("post img data", fileReader.result);
      }
    };
  }

  const handlePostSubmit = async () => {
    try {
      dispatch(setLoading(true));
      const result = await axiosClient.post("/posts", {
        caption,
        postImg,
      });
      console.log("post added", result);
      dispatch(getUserProfile({
        userId: myProfile._id
      }));
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
      setCaption("");
      setPostImg("");
    }
  };
  return (
    <div className="create-post">
      <div className="left-side-post">
        <Avatar />
      </div>
      <div className="right-side-post">
        <input
          value={caption}
          type="text"
          className="caption-input"
          placeholder="What's on your mind?"
          onChange={(e) => setCaption(e.target.value)}
        />
        {postImg && (
          <div className="img-container">
            <img className="post-img" src={postImg} alt="post-img" />
          </div>
        )}

        <div className="bottom-part">
          <div className="input-post-img">
            <label htmlFor="inputImg" className="labelImg">
              <BsCardImage />
            </label>
            <input
              className="inputImg"
              type="file"
              accept="image/*"
              id="inputImg"
              onChange={handleImageChange}
            />
          </div>
          <button className="post-btn btn-primary" onClick={handlePostSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
