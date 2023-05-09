import React, { useRef, useState } from "react";

function UserOptionsModal({ user }) {
  const { userId, username, image } = user;
  const imgInputRef = useRef(null);
  const [profileImg, setProfileImg] = useState({
    img: null,
  });
  const modalCheckRef = useRef(null);
  
  const modalToggle = () => {
    modalCheckRef.current.checked = !modalCheckRef.current.checked;
  };

  return (
    <>
      <input ref={modalCheckRef} type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <form className="modal-box">
          <input 
            type="file"
            className="hidden"
            accept="image/*"
            ref={imgInputRef}
          />
            <button className="btn btn-sm btn-primary" onClick={modalToggle} type="submit">update profile img</button>

          <div className="modal-action">
            <button onClick={modalToggle} >close</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserOptionsModal;
