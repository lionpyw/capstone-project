import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Consultants } from "../types/Consultants"


const ConsultantProfile = () => {
    const [dr, setDr] = useState<Consultants>();
    const params=useParams();

    useEffect(()=>{
        axios.get<Consultants>(`consult/consultant/${params.id}`)
        .then(res => setDr(res.data))
        .catch(err=>console.log(err))
    },[params.id]);
    
    console.log(dr);
    // const { state } = useLocation();

  return (
    <>
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={dr?.profile_img}
         className="max-w-sm rounded-lg shadow-2xl" />
        <div>
        <h1 className="text-4xl font-bold">{dr?.title}</h1>
        <h2 className="text-3xl font-bold">Dr {dr?.consultant.first_name}{" "}{dr?.consultant.last_name}</h2>
        <p className="py-6">{dr?.about}</p>
        <Link to={"req_app"}><button className="btn btn-primary">Request Appointment</button></Link>
        </div>
        </div>
    </div>
    </>
  )
}

export default ConsultantProfile