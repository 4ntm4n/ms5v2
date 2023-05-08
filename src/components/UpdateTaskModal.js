import React, { useRef, useState } from "react";

function UpdateTaskModal({taskInfo, handleUpdate}) {
    const {id, title, description } = taskInfo;
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
        <input type="checkbox" id={`edit-task-modal${id}`} className="modal-toggle" ref={modalCheckRef} />
        <div className="modal modal-bottom sm:modal-middle">
          <form className="modal-box" onSubmit={handleUpdate}>
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
              <label htmlFor={`edit-task-modal${id}`}>
                <a className="btn btn-outline">cancel</a>
              </label>
              <label>
                <button
                  htmlFor={`edit-task-modal${id}`}
                  className="btn btn-primary"
                  type="submit"
                  onClick={modalToggle}
                >
                  Update Task info
                </button>
              </label>
            </div>
          </form>
        </div>
      </>
    );
  }

export default UpdateTaskModal;
