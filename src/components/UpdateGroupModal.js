import React, { useRef, useState } from "react";

function UpdateGroupModal({ groupInfo, handleUpdate }) {
  const { name, description } = groupInfo;
  const [input, setInput] = useState({
    name,
    description,
  });
  const modalCheckRef = useRef(null);

  const modalToggle = () => {
    modalCheckRef.current.checked = !modalCheckRef.current.checked;
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    
  };

  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="edit-group-modal" className="modal-toggle" ref={modalCheckRef} />
      <div className="modal modal-bottom sm:modal-middle">
        <form className="modal-box" onSubmit={handleUpdate}>
          <h3 className="font-bold text-lg mb-3"></h3>

          <label className="input-group input-group-vertical mb-3">
            <span>name</span>
            <input
              value={input.name}
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="add a name here"
              className="input input-bordered"
            />
          </label>

          <label className="input-group input-group-vertical mb-7">
            <span>Description</span>
            <textarea
              onChange={handleChange}
              className="resize-none textarea textarea-bordered h-24"
              name="description"
              value={input.description}
            ></textarea>
          </label>

          <div className="modal-action"> 
            <label htmlFor="edit-group-modal">
              <a className="btn btn-outline">cancel</a>
            </label>
            <label>
              <button
                htmlFor="edit-group-modal"
                className="btn btn-primary"
                type="submit"
                onClick={modalToggle}
              >
                Update Group info
              </button>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateGroupModal;
