import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function UserOptionsModal() {
  const {user} = useAuth();
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

  return (
    <>
      <input
        ref={modalCheckRef}
        type="checkbox"
        id="my-modal-6"
        className="modal-toggle"
      />
        
      <div className="modal modal-bottom sm:modal-middle">
        <form className="modal-box ">
            <div className="flex flex-col place-items-center gap-4" >
          <input
            type="file"
             className="hidden" 
            accept="image/*"
            ref={imgInputRef}
            onChange={handleImagePick}
          />
            <h3>choose a new profile picture</h3>
          <div
            className="w-[120px] 
                       h-[120px] 
                     text-white 
                     bg-slate-400
                     flex 
                     place-items-center
                     justify-center
                     "
          >
            choose image
          </div>
         
          
          </div>
          <div className="modal-action justify-self-end">
            <button className="btn btn-outline" onClick={modalToggle}>close</button>
            <button
            className="btn btn-md btn-primary"
            onClick={modalToggle}
            type="submit"
          >
            update profile img
          </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserOptionsModal;
