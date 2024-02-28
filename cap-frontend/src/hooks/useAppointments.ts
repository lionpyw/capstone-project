import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Appointment } from "../types/Appointment"


export const useAppointment = (id:number) =>{
  
  return useQuery<Appointment, Error>({
    queryKey:['appview', id],
    queryFn: () => axios
    .get<Appointment>(`consult/appointment/${id}/`)
    .then(res => res.data),
    staleTime: 60*1000*2
   })
}

const useAppointments = () => {

  const fetchApp = async() => {
    const res = await axios.get<Appointment[]>('consult/appointment/')
    return res.data
  }

  return useQuery<Appointment[]>({
    queryKey:['appointments'],
    queryFn: fetchApp
  })
}

export default useAppointments