import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ListGroupsPage from "./pages/groups/ListGroupsPage";
import PublicRoutes from "./utils/PublicRoutes";
import TaskPage from "./pages/tasks/TaskPage";
import GroupDetailPage from "./pages/groups/GroupDetailPage";
import UnAssigned from "./pages/groups/grouptasks/UnAssigned";
import Completed from "./pages/groups/grouptasks/Completed";
import InProgress from "./pages/groups/grouptasks/InProgress";


function App() {
  return (
    <>
      <Navbar>
        <Routes>
          {/* unprotected routes */}
          <Route path="/" element={<HomePage />} />
          
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* protected routes here */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/groups">
              <Route index element={<ListGroupsPage /> } />
              <Route path=":id" element={<GroupDetailPage /> } >
                <Route index element={<UnAssigned />} />
                <Route path="active" element={< InProgress />} />
                <Route index="completed" element={<Completed />} />
              </Route>
            </Route>
            <Route path="/tasks" element={<TaskPage /> } />
          </Route>
        </Routes>
      </Navbar>
    </>
  );
}

export default App;
