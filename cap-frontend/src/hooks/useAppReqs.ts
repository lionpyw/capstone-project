import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import useUser from "./useUser"
import { AppRequest } from "../types/AppRequest"

const useAppReqs = () => {

  const {data:user} = useUser()
  const fetchAppReq = async ()=>{
      if (user?.is_service_provider){
        const res = await axios.get<AppRequest[]>('consult/list_requests/')
        return res.data}
      else{
        const res = await axios.get<AppRequest[]>('consult/app_req/')
        return res.data
      }
    }

  return useQuery<AppRequest[], Error>({
    queryKey:['requests'],
    queryFn: fetchAppReq,
    enabled: !!user
  })
}

export default useAppReqs