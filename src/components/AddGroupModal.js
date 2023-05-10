import React, { useRef, useState } from "react";
import api from "../api/AxiosInterceptors";

function AddGroupModal({ refreshGroupsList }) {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const modalCheckRef = useRef(null);
  const [errors, setErrors] = useState({});

  const modalToggle = () => {
    modalCheckRef.current.checked = !modalCheckRef.current.checked;
  };

  const clearFormFields = () => {
    nameRef.current.value = "";
    descriptionRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGroup = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    };

    try {
      await api.post("/groups/", newGroup);
      modalToggle();
      clearFormFields();
      setErrors({});
    } catch (error) {
      console.error("Error creating task:", error);
      if (error.response.data) {
        setErrors(error.response.data);
      }
    } finally {
      refreshGroupsList();
    }
  };

  return (
    <>
      <label htmlFor="add-group-modal" className="btn btn-primary">
        create new group
      </label>
      {/* Put this part before </body> tag */}
      <input
        ref={modalCheckRef}
        type="checkbox"
        id="add-group-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <form className="modal-box" onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg mb-3">Create new task</h3>

          <label className="input-group input-group-vertical mb-3">
            <span>name</span>
            <input
              ref={nameRef}
              name="name"
              type="text"
              placeholder="add a name here"
              className="input input-bordered"
            />
            {errors.name &&
              errors.name.map((error, index) => (
                <>
                  <div className="alert alert-warning shadow-lg">
                    <div>
                      <span className=" bg-transparent">{error}.</span>
                    </div>
                  </div>
                </>
              ))}
          </label>

          <label className="input-group input-group-vertical mb-7">
            <span>Description</span>
            <textArea
              ref={descriptionRef}
              className="resize-none textarea textarea-bordered h-24"
              name="description"
              placeholder="give your task some extra content (optional)"
            ></textArea>
          </label>

          <div className="modal-action">
            <label htmlFor="add-group-modal">
              <a className="btn btn-outline"
                 onClick={() => setErrors({})}
              >cancel</a>
            </label>
            <label>
              <button
                htmlFor="add-group-modal"
                className="btn btn-primary"
                type="submit"
              >
                Create Group
              </button>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddGroupModal;
