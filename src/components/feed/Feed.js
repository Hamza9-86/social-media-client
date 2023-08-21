import React, { useEffect } from "react";
import "./Feed.scss";
import Post from "../post/post";
import Follower from "../follower/Follower";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";
function Feed() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);
  const feedData = useSelector((state) => state.feedReducer.feedData);
  return (
    <>
      <div className="Feed">
        <div className="container">
          <div className="left-side">
            {feedData?.posts?.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
          <div className="right-side">
            <div className="following">
              <div className="title">
                <h4>Followings</h4>
                {feedData?.followings?.map((user) => (
                  <Follower key={user._id} user={user} />
                ))}
              </div>
            </div>

            <div className="suggestion">
              <div className="title">
                <h4>Suggested for you</h4>
              </div>
              {feedData?.suggestions?.map((user) => (
                <Follower key={user._id} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feed;
