import React, { useRef, useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import api from "../../api/AxiosInterceptors";
import GroupMembers from "../../components/GroupMembers";
import AddGroupMembers from "../../components/AddGroupMembers";
import GroupTabs from "../../components/GroupTabs";
import { useAuth } from "../../contexts/AuthContext";
import GroupInfo from "../../components/GroupInfo";

function GroupDetailPage() {
  const { user } = useAuth();
  const { id } = useParams();
  const drawerRef = useRef();
  const [group, setGroup] = useState();
  const [addMember, setAddMember] = useState(false);
  const [membersChanged, setMembersChanged] = useState(false);
  const [userIsOwner, setUserIsOwner] = useState(false);
  const navigate = useNavigate();

  const updateMembers = () => {
    setMembersChanged((prevMembersChanged) => !prevMembersChanged);
  };

  const handleDrawerToggle = () => {
    drawerRef.current.checked = !drawerRef.current.checked;
  };

  const showAddMember = () => {
    setAddMember(true);
  };

  const showMembers = () => {
    setAddMember(false);
  };

  const fetchGroup = async () => {
    try {
      const { data } = await api.get(`/groups/${id}/`);
      setGroup(data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate("/404", { replace: true });
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [membersChanged]);

  useEffect(() => {
    group && setUserIsOwner(user.userId === group.group_owner.id);
  }, [group]);

  return (
    <>
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          ref={drawerRef}
        />

        <div className="drawer-content flex place-content-center">
          {/* Page content here */}
          <div className="flex flex-col flex-1">
            <GroupTabs />
            <Outlet />
          </div>
          <BottomNav openDrawer={handleDrawerToggle} />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* Sidebar content here */}
            {userIsOwner ? (
              <>
                <div className="btn-group flex justify-center">
                  <button onClick={showMembers} className={`btn px-8 ${!addMember && "btn-active"} `}>
                    members
                  </button>
                  <button onClick={showAddMember}  className={`btn ${addMember && "btn-active"}`}>
                    add members
                  </button>
                </div>
                <div className="divider"></div>
                <div>
                  {addMember ? (
                    <AddGroupMembers
                      groupId={id}
                      groupOwner={group.group_owner.owner}
                      members={group.members}
                      updateMembers={updateMembers}
                    />
                  ) : (
                    group && <GroupMembers members={group.members} />
                  )}
                  <div className="divider"></div>
                </div>

                <div className="divider">group info</div>
                <GroupInfo group={group} />
              </>
            ) : (
              group && 
              <>
              <div className="divider">members</div>
                <div className="btn-group flex justify-center"></div>
                
                <div>
                  <GroupMembers members={group.members} />
                  <div className="divider"></div>
                </div>
                <div className="divider">group info</div>
                <GroupInfo group={group} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupDetailPage;
