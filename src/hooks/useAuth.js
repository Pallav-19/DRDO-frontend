import { useContext } from "react";
import { EmployeeContext } from "../Context/EmployeeProvider";
const useAuth = () => {
    return useContext(EmployeeContext);
}
export default useAuth;