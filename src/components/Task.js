import React from "react";

function Task() {
    return (
        <div className="border border-base-300 rounded-xl card w-full">
          <div tabIndex={0} className="collapse bg-base-100 rounded-xl">
            <div className="collapse-title rounded-t-xl p-3 flex justify-between items-center">
              <div className="text-xl font-medium">Task title</div>
              <div className="space-x-2">
                <button className="btn font-semibold px-2 py-1 rounded">
                  Take Ownership
                </button>
                <button className="btn btn-primary font-semibold px-2 py-1 rounded">
                  ...
                </button>
              </div>
            </div>
            <div className="collapse-content">
              <div className="min-w-0 p-3">
                <p className="flex-1">Description</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default Task;
