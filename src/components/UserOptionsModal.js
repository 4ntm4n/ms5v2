import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function UserOptionsModal() {
  const { user, setUser } = useAuth();
  const imgInputRef = useRef(null);
  const [profileImg, setProfileImg] = useState({
    img: null,
  });

  const modalCheckRef = useRef(null);

  const modalToggle = () => {
    modalCheckRef.current.checked = !modalCheckRef.current.checked;
  };

  const triggerImgChoice = () => {
    if (imgInputRef.current) {
      imgInputRef.current.click();
    }
  };

  const handleImagePick = (event) => {
    setProfileImg({
      img: event.target.files[0],
    });
  };

  const renderImagePreview = () => {
    if (!profileImg.img) return null;

    const imageUrl = URL.createObjectURL(profileImg.img);
    return (
      <img
        src={imageUrl}
        alt="profile image preview"
        className="w-full h-full object-cover inset-0"
      />
    );
  };

  const resetForm = () => {
    setProfileImg({ img: null });
    if (imgInputRef.current) {
      imgInputRef.current.value = "";
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (!profileImg.img) {
      //console.log("No image selected");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", profileImg.img);
    console.log(user.userId);
    try {
      
      const { data } = await api.patch(`/profiles/${user.userId}/`, formData);
  
      // Update the user and localStorage
      localStorage.setItem("profileImage", data.image);
  
      const updatedUser = {
        userId: data.id,
        username: data.owner,
        image: data.image,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log(updatedUser);
      setUser(updatedUser);
  
      // Reset the profile image state and clear the input field
      resetForm();
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        ref={modalCheckRef}
        type="checkbox"
        id="my-modal-6"
        className="modal-toggle"
      />

      <div className="modal modal-bottom sm:modal-middle">
        <form className="modal-box" onSubmit={handleUpload}>
          <div className="flex flex-col place-items-center gap-4">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={imgInputRef}
              onChange={handleImagePick}
            />
            <h3>choose a new profile picture</h3>
            <div
              className="w-[150px] 
                       h-[150px] 
                     text-white 
                     bg-slate-400
                     flex 
                     place-items-center
                     justify-center
                     cursor-pointer
                     relative 
                     overflow-hidden
                     rounded-full
                     "
              onClick={triggerImgChoice}
            >
              {!renderImagePreview() ? "choose image" : renderImagePreview()}
            </div>
          </div>
          <div className="modal-action justify-self-end">
            <button className="btn btn-outline" onClick={modalToggle}>
              close
            </button>
            <button
              className="btn btn-md btn-primary"
              onClick={modalToggle}
              type="submit"
            >
              update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserOptionsModal;
