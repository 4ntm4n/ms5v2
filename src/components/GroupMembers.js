import React from "react";

function GroupMembers({ members }) {
    console.log(members[0]);
    return (
      <div>
        {/* members area */}
        <div className="grid grid-cols-3 overflow-auto pb-9 max-h-96 place-items-center w-64 ml-6 pr-10 gap-1">
          {members.map((member) => (
            
              <div key={member.id} className="avatar py-1">
                <div className="rounded-full w-16">
                  <img
                    className="rounded-full"
                    src={member.image}
                    alt="Profile"
                  />
                </div>
              </div>
            
          ))}
        </div>
      </div>
    );
}

export default GroupMembers;
