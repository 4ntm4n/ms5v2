import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
import api from "../../api/AxiosInterceptors";
import GroupMembers from "../../components/GroupMembers";
import AddGroupMembers from "../../components/AddGroupMembers";

function GroupDetailPage() {
  const { id } = useParams();
  const drawerRef = useRef();
  const [group, setGroup] = useState();
  const [addMember, setAddMember] = useState(false);

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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerRef}
      />
      <div className="drawer-content">
        {/* Page content here */}
        <button className="btn" onClick={handleDrawerToggle}>
          open drawer
        </button>
        <BottomNav openDrawer={handleDrawerToggle} />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 bg-base-100 text-base-content">
          {/* Sidebar content here */}
          <div className="btn-group flex justify-center">
            <button 
                onClick={showMembers} 
                className="btn px-8 btn-active">
                members</button>
            <button 
                onClick={showAddMember} 
                className="btn">
              add members
            </button>
          </div>
          <div className="divider"></div>
          <div>
            {addMember ? (
              <AddGroupMembers />
            ) : (
                group && <GroupMembers members={ group.members} />
            )}
            <div className="divider"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetailPage;
