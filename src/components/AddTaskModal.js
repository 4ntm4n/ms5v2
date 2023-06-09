import React, { useRef, useState } from "react";
import api from "../api/AxiosInterceptors";

function AddTaskModal({ groupId, updateTasks }) {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const modalCheckRef = useRef(null);
  const [errors, setErrors] = useState({});

  const modalToggle = () => {
    modalCheckRef.current.checked = !modalCheckRef.current.checked;
  };

  const clearFormFields = () => {
    titleRef.current.value = "";
    descriptionRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      owning_group: groupId,
      owner: null,
      in_progress: false,
      completed: false,
    };

    try {
      await api.post("/tasks/create/", newTask);
      modalToggle();
      clearFormFields();
      setErrors({});
    } catch (error) {
      console.error("Error creating task:", error.response.data);
      if (error.response.data) {
        setErrors(error.response.data);
      }
    } finally {
      updateTasks();
    }
  };

  return (
    <>
      {/* Put this part before </body> tag */}
      <input
        ref={modalCheckRef}
        type="checkbox"
        id="add-task-modal"
        className="modal-toggle"
      />

      <div className="modal modal-bottom sm:modal-middle">
        <form className="modal-box" onSubmit={handleSubmit}>
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
          <h3 className="font-bold text-lg mb-3">Create new task</h3>

          <label className="input-group input-group-vertical mb-3">
            <span>Title</span>
            <input
              ref={titleRef}
              name="title"
              type="text"
              placeholder="add a title here"
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
              ref={descriptionRef}
              className="resize-none textarea textarea-bordered h-24"
              name="description"
              placeholder="give your task some extra content (optional)"
            ></textarea>
          </label>

          <div className="modal-action">
            <label htmlFor="add-task-modal">
              <a className="btn btn-outline" onClick={() => setErrors({})}>
                cancel
              </a>
            </label>
            <label>
              <button
                htmlFor="add-task-modal"
                className="btn btn-primary"
                type="submit"
              >
                Add Task
              </button>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTaskModal;
