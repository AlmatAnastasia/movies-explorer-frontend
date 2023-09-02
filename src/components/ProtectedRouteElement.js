import React from "react";
import { Navigate } from "react-router-dom";
// HOC— компонент для защититы роута /,
// чтобы на него не смогли перейти неавторизованные пользователи
const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return props.islogged ? (
    <Component {...props} />
  ) : (
    <Navigate to="/ " replace />
  );
};

export default ProtectedRouteElement;
