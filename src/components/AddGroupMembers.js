import React, { useEffect, useRef, useState } from "react";
import api from "../api/AxiosInterceptors";

function AddGroupMembers({ groupId, members, groupOwner }) {
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const searchInputRef = useRef("");

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  const fetchProfiles = async (query) => {
    try {
      const { data } = await api.get(`/profiles/?search=${query}`);
      setProfiles(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query !== null) {
      fetchProfiles(query);
    }
    console.log(query);
  }, [query]);

  const handleAddRemove = async (id) => {
    try {
      await api.put(`/groups/${groupId}/members/`, { profile_id: id });
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div>
      <div className="form-control">
        <label className="input-group input-group-sm">
          <span>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            ref={searchInputRef}
            onChange={handleChange}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-sm"
          />
        </label>
      </div>
      {/* search component result card */}

      {profiles.length
        ? profiles.map((profile) => {
            /*
             *
             * exclude group owner from search results and compare group members
             * to search results to decide if member should be addable of removable
             * */
            const memberMatch = members.find(
              (member) => member.owner === profile.owner
            );
            //group owner excluded here
            if (profile.owner == groupOwner) return null;

            return (
              <div
                key={profile.id}
                onClick={() => handleAddRemove(profile.id)}
                className="card bg-base-100 shadow-md my-2 transition-transform duration-300 transform-gpu group hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="avatar self-start">
                    <div className="w-10 rounded-full">
                      <img
                        src={profile.image}
                        alt={`${profile.owner}'s profile image`}
                      />
                    </div>
                  </div>
                  <p className="self-center flex-1 text-center">
                    {profile.owner}
                  </p>
                  <button className="group-hover:bg-violet-700 rounded-full w-7 h-7 m-1.5 self-end ml-auto bg-gray-500 hover:bg-violet-700 text-white">
                    {memberMatch ? (
                      <>
                        <span className="sr-only">Remove</span>-
                      </>
                    ) : (
                      <>
                        <span className="sr-only">Add</span>+
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        : "search for a profile to add or remove from this group"}
    </div>
  );
}

export default AddGroupMembers;
