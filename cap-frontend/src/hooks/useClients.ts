import {  useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { Client } from "../types/Client"

const useClients = (arr: number[]) => {   
  const [client, setClient]= useState<Client[]>([])
  const fetchClients = (arr: number[]) => {
    const clientfet =()=>{  arr.forEach(async(a) => {
        const res =await axios.get<Client>(`consult/client/${a}`);
        const nextClient = res.data;
        const clients = client.filter(c => c.id !== nextClient.id);
        setClient([...clients, nextClient]);
    })}
    clientfet();
    // const clients = Array.from(new Set(client.map(JSON.stringify))).map(JSON.parse);
    return client
    }


    return useQuery<Client[], Error>({
        queryKey: arr ? ['client', arr] : [],
        queryFn: ()=> fetchClients(arr),
        enabled:!!arr,
        staleTime: 60*1000*10
    })
}

export default useClients