import { useQuery } from "@tanstack/react-query"
import useUser from "../hooks/useUser"
import axios from "axios"
import { Client } from "../types/Client"
import { useState } from "react"

const ClientDetail = () => {
    const {data:user} = useUser()
    const [info, setInfo] = useState({})
    const {data: person} = useQuery<Client>({
        queryKey:["client"],
        queryFn: async()=>{
            const res = await axios.get<Client>('consult/client/me')
            return res.data
        },
        enabled: !!user?.id
    })
    
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInfo({...info,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = () => {
        console.log(info)
        axios.put('consult/client/me/', info)
        .then(res =>  {res.status===200 ? alert("success") : alert('failed')})
        .catch(e => console.log(e))
    }

  return (
    <div className="container p-10">
        <h1 className="text-4xl m-5">Client Details</h1>
        <div className="collapse my-5">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                <strong>Birth Date: </strong>{person?.birth_date}<p className="text-sm">tap to edit</p>
            </div>
            <div className="collapse-content"> 
            <input name="birth_date" 
            type="text" onChange={handleChange}  placeholder={"YYYY-MM-DD"}
            className="input input-bordered input-success w-full max-w-xs"/>
            </div>
        </div>
        <div className="collapse my-5">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                <strong>Gender: </strong>
                {person?.gender=== "M" ? "Male" : "Female"}
                <p className="text-sm">tap to edit</p>
            </div>
            <div className="collapse-content"> 
            <input name="gender" 
            type="text" onChange={handleChange}  placeholder={"M/F 1 letter only"}
            className="input input-bordered input-success w-full max-w-xs"/>
            </div>
        </div>
        <div className="collapse my-5">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                <strong>Phone Number: </strong>00{person?.phone}<p className="text-xs">tap to edit</p>
            </div>
            <div className="collapse-content"> 
            <input type="text" placeholder={person?.phone} name="phone"
            defaultValue={person?.phone} onChange={handleChange} 
            className="input input-bordered input-success w-full max-w-xs" />
            </div>
        </div>
        <button onClick={handleSubmit}
        className="btn btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg m-5">Submit</button>
    </div>
  )
}

export default ClientDetail