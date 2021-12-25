import { useContext } from "react"
import { myContext } from "../context/AuthProvider"

const useAuth = () => {

    return useContext(myContext)

}

export default useAuth;