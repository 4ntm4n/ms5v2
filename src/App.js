import "./App.css";
import { Route, Routes, useParams } from "react-router-dom";
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
import Page404 from "./pages/errorPages/Page404";


function App() {
  return (
    <>
      <Navbar>
        <Routes>
          {/* routes for all */}
          <Route path="/" element={<HomePage />} />
          <Route path="/404" element={<Page404 />} />
            {/* unprotected routes */}
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* protected routes here */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/groups">
              <Route index element={<ListGroupsPage /> } />
              <Route path=":id" element={<GroupDetailPage /> } >
                <Route index id={useParams()} element={<UnAssigned />} />
                <Route path="active" element={< InProgress />} />
                <Route path="completed" element={<Completed />} />
              </Route>
            </Route>
            <Route path="/tasks" element={<TaskPage /> } />
          </Route>
          {/* dynamic 404 redirect */}
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </Navbar>
    </>
  );
}

export default App;
