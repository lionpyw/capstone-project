import axios from "axios"
import { useQuery } from "@tanstack/react-query";
import { Consultants } from "../types/Consultants";


export const useConsultantUser = () => {
  return useQuery<Consultants>({
    queryKey:["consultant"],
    queryFn:() => axios
    .get<Consultants>('consult/consultant/me/')
    .then(res => (res.data))
})
}

const useConsultant = () => {
   const fetchCons = async () => {
   const res = await axios.get<Consultants[]>('consult/consultant/');
   return res.data
}

return useQuery<Consultants[]>({
    queryKey: ['consultants'],
    queryFn: fetchCons,
    staleTime: 60*1000*10
  })
}

export default useConsultant;