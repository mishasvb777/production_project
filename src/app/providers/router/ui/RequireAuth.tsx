import { getUserAuthData } from "entites/User";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RoutePatch } from "shared/config/routeConfig/routeConfig";

export function RequireAuth({ children }: {children: JSX.Element}){
  let auth = useSelector(getUserAuthData)
  let location = useLocation() 

  if(!auth) {
    return <Navigate to={RoutePatch.main} state={{ from: location}} replace/> // Navigate компонент для перенаправления 
  } 

  return children
}