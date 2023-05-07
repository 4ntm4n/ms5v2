import React from "react";

function AddTaskModal() {
  return (
    <>
      <label htmlFor="add-task-modal">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="add-task-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <form className="modal-box">
          <h3 className="font-bold text-lg mb-3">Create new task</h3>

          <label className="input-group input-group-vertical mb-3">
            <span>Title</span>
            <input
              name="title"
              type="text"
              placeholder="add a title here"
              className="input input-bordered"
            />
          </label>

          <label className="input-group input-group-vertical mb-7">
            <span >Description</span>
            <textArea
              className="resize-none textarea textarea-bordered h-24"
              name="description"
              placeholder="give your task some extra content (optional)"
            ></textArea>
          </label>

          <div className="modal-action">
            <label htmlFor="add-task-modal">
              <button className="btn btn-outline" >cancel</button>
              
            </label>
            <label htmlFor="add-task-modal">
              <button className="btn btn-primary" type="submit">Add Task</button>
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTaskModal;
