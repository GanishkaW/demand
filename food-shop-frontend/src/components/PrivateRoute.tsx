import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { JSX } from "react/jsx-runtime";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  return isAuthenticated() ? children : <Navigate to="/signin" />;
}
