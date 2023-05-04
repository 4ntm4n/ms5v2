import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

function GroupDetailPage() {
  const { id } = useParams();
  const drawerRef = useRef();

  const handleDrawerToggle = () => {
    drawerRef.current.checked = !drawerRef.current.checked;
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" ref={drawerRef} />
      <div className="drawer-content">
        {/* Page content here */}
        <button className="btn" onClick={handleDrawerToggle}>open drawer</button>
        <BottomNav openDrawer={handleDrawerToggle}/>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GroupDetailPage;
