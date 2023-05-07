import React, { useRef, useState } from "react";
import api from "../api/AxiosInterceptors";

function AddTaskModal({ groupId, updateTasks }) {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const modalCheckRef = useRef(null);

  const modalToggle = () => {
    modalCheckRef.current.checked = !modalCheckRef.current.checked;
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
    } catch (error) {
      console.error("Error creating task:", error);
    }finally{
        
        updateTasks();
    }
  };

  return (
    <>
      {/* Put this part before </body> tag */}
      <input ref={modalCheckRef} type="checkbox" id="add-task-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <form className="modal-box" onSubmit={handleSubmit}>
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
            <label htmlFor="add-task-modal">
              <a className="btn btn-outline">cancel</a>
            </label>
            <label >
              <button htmlFor="add-task-modal" className="btn btn-primary" type="submit">
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
