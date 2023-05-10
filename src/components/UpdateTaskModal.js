import React, { useRef, useState } from "react";

function UpdateTaskModal({ taskInfo, handleUpdate, errors, setErrors }) {
  const { id, title, description } = taskInfo;
  const [input, setInput] = useState({
    title,
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
      <input
        type="checkbox"
        id={`edit-task-modal${id}`}
        className="modal-toggle"
        ref={modalCheckRef}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <form className="modal-box" onSubmit={handleUpdate}>
          {errors.non_field_errors?.map((message, index) => {
            if (
              message ===
              "The fields owning_group, title must make a unique set."
            ) {
              message =
                "There is already a task with this title in this group :)";
            }

            return (
              <div key={index} className="alert alert-warning shadow-lg">
                <div>
                  <span className=" bg-transparent">{message}.</span>
                </div>
              </div>
            );
          })}

          <h3 className="font-bold text-lg mb-3"></h3>

          <label className="input-group input-group-vertical mb-3">
            <span>name</span>
            <input
              value={input.title}
              onChange={handleChange}
              name="title"
              type="text"
              placeholder="add a name here"
              className="input input-bordered"
            />

            {errors.title &&
              errors.title.map((error, index) => (
                <>
                  <div key={index} className="alert alert-warning shadow-lg">
                    <div>
                      <span className=" bg-transparent">{error}.</span>
                    </div>
                  </div>
                </>
              ))}
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
            
              <button
                htmlFor={`edit-task-modal${id}`}
                className="btn btn-primary"
                type="submit"
              >
                Update Task info
              </button>
                
              <label htmlFor={`edit-task-modal${id}`}>
              <a className="btn btn-outline">exit</a>
            </label>  
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateTaskModal;
