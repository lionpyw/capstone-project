import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface User{
    id: number
    username:string
    email: string
    first_name: string
    last_name: string
    is_service_provider: boolean
  }
  
const useUser = () => {
    const fetchUser = () =>
    axios
    .get<User>('auth/users/me/')
    .then((res) => res.data)

    return useQuery<User, Error>({
        queryKey: ['user'],
        queryFn: fetchUser,
        staleTime: 60*1000*5
      })
}

export default useUser;