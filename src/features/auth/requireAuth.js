import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles } = useAuth()

    // console.log(roles)
    const content = (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )

    // const content = <Outlet/>
    return content
}
export default RequireAuth