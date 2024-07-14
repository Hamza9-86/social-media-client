import React, { useRef, useState } from "react";
import "./Navbar.scss";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { BiLogOut, BiSolidHandLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";
import toast from "react-hot-toast";

function Navbar() {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector(state => state.appConfigReducer.myProfile);

async function handleLogout(){
    try {
      dispatch(setLoading(true));
      await axiosClient.post('/auth/logout');
      toast.success('Logged Out Successfully')
      removeItem(KEY_ACCESS_TOKEN);
      navigate('/login');
      dispatch(setLoading(false));
    } catch (e) {
      
    }
  }
  
  return (
    <>
      <div className="Navbar">
        <div className="container">
          <div
            className="banner hover-link"
            onClick={() => {
              navigate("/");
            }}
          >
            <h2>Social Media</h2>
          </div>
          <div className="right-side">
            <div
              className="profile hover-link"
              onClick={() => {
                navigate(`/profile/${myProfile?._id}`);
              }}
            >
              <Avatar src={myProfile?.avatar?.url}/>
            </div>
            <div className="logout hover-link" onClick={handleLogout}>
              <BiLogOut />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
