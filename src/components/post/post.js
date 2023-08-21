import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import bgImg from "../../assets/background.jpg";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postsSlice";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  async function handleLiked() {
    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    );
  }
  return (
    <>
      <div className="Post">
        <div className="heading" onClick={() => navigate(`/profile/${post.owner._id}`)}>
          <Avatar src={post.owner?.avatar?.url} />
          <h4>{post.owner?.name}</h4>
        </div>
        <div className="content">
          <img src={post.image.url} alt="" />
        </div>
        <div className="footer">
          <div className="likes" onClick={handleLiked}>
            {post.isLiked ? (
              <AiFillHeart style={{color :'red'}} className="icon" />
            ) : (
              <AiOutlineHeart className="icon" />
            )}

            <h4>{`${post.likesCount} Likes`}</h4>
          </div>
          <h6 className="caption">{post?.caption}</h6>
          <h6 className="time-ago">{post?.timeAgo}</h6>
        </div>
      </div>
    </>
  );
}

export default Post;
