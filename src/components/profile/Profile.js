import React, { useEffect, useState } from "react";
import Post from "../post/post";
import "./Profile.scss";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../createPost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { followUnfollow } from "../../redux/slices/feedSlice";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const feedData = useSelector((state) => state.feedReducer.feedData);

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsMyProfile(myProfile._id === params.userId);
    setIsFollowing(
      feedData.followings?.find((item) => item._id === params.userId)
    );
  }, [myProfile, params.userId , feedData]);

  function handleUserFollow() {
    dispatch(
      followUnfollow({
        userIdToFollow: params.userId,
      })
    );
  }

  return (
    <>
      <div className="Profile">
        <div className="container">
          <div className="left-side">
            {isMyProfile && <CreatePost />}
            {userProfile?.posts?.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
          <div className="right-side">
            <div className="profile-card">
              <img className="user-img" src={userProfile?.avatar?.url} alt="" />
              <h3 className="user-name">{userProfile?.name}</h3>
              <p className="user-bio">{userProfile?.bio}</p>
              <div className="follower-info">
                <h4>{`${userProfile?.followers?.length} Followers`}</h4>
                <h4>{`${userProfile?.followings?.length} Followings`}</h4>
              </div>
              {!isMyProfile && (
                <h5
                  style={{ marginTop: "10px" }}
                  onClick={handleUserFollow}
                  className={
                    isFollowing ? "follow-link hover-link" : "btn-primary"
                  }
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </h5>
              )}
              {isMyProfile && (
                <button
                  className="update-btn btn-sec"
                  onClick={() => {
                    navigate("/updateprofile");
                  }}
                >
                  Update Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
