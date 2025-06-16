import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.rol !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
