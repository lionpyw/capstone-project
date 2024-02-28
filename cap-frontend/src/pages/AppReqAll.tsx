import axios from "axios"
import useAppReqs from "../hooks/useAppReqs"
import useUser from "../hooks/useUser"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAppReqMutate, { useAppReqDelete } from "../hooks/useAppReqMutate"


const AppReqAll = () => {
  const [view, setView] = useState(0)
  const [info, setInfo] = useState({})
  const {data:app, error} = useAppReqs()
  const {data:user,error:err} = useUser()
  const delAppReq = useAppReqDelete()
  const modifyAppReq = useAppReqMutate()
  const navigate = useNavigate()
  const areq = app?.filter(a => !a.accepted)
  console.log(err)
  
  const handleAccept = (id:number) =>{
    const make_app = async() => {
      try{
        const res = await axios
                          .post('consult/appointment/',{'appointment': id,
                                      'duration' : 30*60,
                                      'charges' : 0
  })
    console.log(res.data)
      }catch(error){ 
        console.log(error)}
   }
    const accept = async() =>{
      try{
        const res = await axios.put(`consult/app_req/${id}/`, {"accepted": true})
        console.log(res.data);
      }catch(e){ console.log(e) }
    }
    make_app();
    accept();
    navigate("/appointment/");
  }
  
  const handleCancel = (id:number) =>{
    delAppReq.mutate(id)
  }
  const handleSubmit =(id:number) =>{
    console.log(info)
    modifyAppReq.mutate({
      id:id,
      info:info
    })
  }
  const handleView = (id:number, con:number,scheduled_time: string,request_note: string) => {
    if (view === id){setView(0)}else{
      setInfo({'consultant': con,"scheduled_time": scheduled_time,
               "request_note" : request_note})
      setView(id)
    }
    
  }
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    setInfo({...info,
    [e.target.name]: e.target.value
    })
  }
if (error) return <p>{error.message}</p> 

return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-7 mb-16 p-10">
  {areq?.map(a => <div className={view!==a.id ? "card w-64 h-72 bg-neutral text-neutral-content" : 
        "card md:card-side bg-base-100 shadow-xl"} key={a.id}>
    <div className="card-body items-center text-center">
      {user?.is_service_provider ? <h2 className="card-title">{a.client.client.last_name}{" "}
      {a.client.client.first_name}</h2> : 
      <h2 className="card-title"> {a.consultant.consultant.last_name}{" "}
      {a.consultant.consultant.first_name} </h2>}
      <p>Schedule: {a.s_time ? a.s_time : "Not assigned"}</p>
      {(user?.is_service_provider && view===a.id) && <><div className="collapse">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                <strong>Schedule: </strong>{a.s_time}<p className="text-sm">tap to edit</p>
            </div>
            <div className="collapse-content"> 
            <input name="scheduled_time" 
            type="datetime-local" onChange={handleChange}  placeholder={"select date and time for appointment"}
            className="input input-bordered input-success w-full max-w-xs"/>
            </div>
        </div>
        </>}{ (!user?.is_service_provider && view===a.id) && <div className="collapse my-5">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                <strong>Request Note: </strong><p className="text-sm">tap to edit</p>
            </div>
            <div className="collapse-content"> 
            <input name="request_note" 
            type="text" onChange={handleChange}  placeholder={"short request note for appointment"}
            className="input input-bordered input-success w-full max-w-xs"/>
            </div>
        </div>}
      <p>Proposed Appointment: {a.p_time}</p>
      {(a.request_note && view===a.id) && <div className="tooltip lg:font-semibold font-mono" data-tip={a.request_note}>
                          <button className="btn">Hover for note</button>
                          </div>}
      <div className="card-actions justify-end">
        {(a.scheduled_time && !user?.is_service_provider) &&
        <button className="btn btn-accent btn-circle text-xs" 
        onClick={() => handleAccept(a.id)}>Accept</button> }
        <button className="btn btn-accent btn-circle" 
        onClick={() => handleView(a.id, a.consultant.id, a.scheduled_time,a.request_note)}>View</button>
        <button className="btn btn-warning btn-circle text-xs" 
        onClick={() => handleCancel(a.id)}>Cancel</button>
        {view===a.id && <button className="btn btn-primary btn-circle text-sm" 
        onClick={() => handleSubmit(a.id)}>Submit</button>}
      </div>
    </div>
  </div>)}
</div>
  )
}

export default AppReqAll