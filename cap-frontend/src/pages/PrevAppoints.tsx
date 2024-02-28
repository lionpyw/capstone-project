import { Link } from "react-router-dom";
import useAppointments from "../hooks/useAppointments"
import useUser from "../hooks/useUser";


const PrevAppoints = () => {const {data:app} = useAppointments();
const{data:user, error} = useUser()

const art = app?.filter(a => a.expired)
if (error) return <p>{error.message}</p>

return (
<div >
  <div className="grid grid-cols-1 md:grid-rows-2 gap-6 mt-16">
    {art?.map((a,index) => 
      <div className="overflow-x-auto" key={a.id}>
      <table className="table">
        <thead>
          <tr>
            <th>Nr.</th>
            <th>{user?.is_service_provider ? "Client" : "Consultant"}</th>
            <th>Scheduled Time</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover">
            <th>{index+1}</th>
            <td>{user?.is_service_provider ? 
            a.appointment.client.client.last_name+" "+a.appointment.client.client.first_name :
            a.appointment.consultant.consultant.last_name+" "+a.appointment.consultant.consultant.first_name}
            </td>
            <td>{a.appointment.scheduled_time}</td>
            <td><Link to={`/appointment/${a.id}`}><button className="btn btn-info">View</button></Link></td>
          </tr>
        </tbody>
      </table>
    </div>)
    }
  </div>
</div>
)
}


export default PrevAppoints