import React, { useState, useEffect } from "react";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollow } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";

function Follower({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState();
  const feedData = useSelector((state) => state.feedReducer.feedData);

  useEffect(() => {
    setIsFollowing(feedData.followings.find((item) => item._id === user._id));
  }, [feedData]);

  function handleUserFollow(){
    dispatch(followUnfollow({
      userIdToFollow : user._id
    }))
  }
  return (
    <>
      <div className="follower">
        <div className="user-info" onClick={() => navigate(`profile/${user._id}`)}>
          <Avatar src={user?.avatar?.url} />
          <h4 className="name">{user?.name}</h4>
        </div>
        <h5 onClick={handleUserFollow} className={isFollowing? "follow-link hover-link" : "btn-primary"}>
          {isFollowing ? "Unfollow" : "Follow"}
        </h5>
      </div>
    </>
  );
}

export default Follower;
