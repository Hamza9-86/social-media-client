import React, { useEffect, useState } from "react";
import userImg from "../../assets/user.png";
import "./UpdateProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateMyProfile } from "../../redux/slices/appConfigSlice";

function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setName(myProfile?.name || '');
    setBio(myProfile?.bio || '');
    setUserImg(myProfile?.avatar?.url || '');
  }, [myProfile]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result)
        console.log('image data', fileReader.result);
      }
    };
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(updateMyProfile({
      name,
      bio,
      userImg
    }));
  }

  return (
    <div className="updateProf">
      <div className="container">
        <div className="left-side">
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userImg} alt={name} />
            </label>
            <input
              className="inputImg"
              type="file"
              accept="image/*"
              id="inputImg"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="right-side">
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              value={bio}
              type="text"
              placeholder="Your Bio"
              onChange={(e) => setBio(e.target.value)}
            />
            <input className="btn-primary hover-link" type="submit" onClick={handleSubmit}/>
          </form>
          <button className="delete-btn btn-primary">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
