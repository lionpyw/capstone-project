import useAppointments from "../hooks/useAppointments"
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";

const Appointments = () => {
  const {data:app} = useAppointments();
  const{data:user, error} = useUser()
  const art = app?.filter(a => !a.expired)
  if (error) return <p>{error.message}</p>

  return (
    <div >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      {art?.map(a => <div key={a.id} className="card h-80 w-64 bg-neutral text-neutral-content">
      <div className="card-body">
      <h2 className="card-title">
      {user?.is_service_provider ? <p>{a.appointment.client.client.last_name}{" "} 
      {a.appointment.client.client.first_name}</p>: <p>{a.appointment.consultant.consultant.last_name} {" "}
      {a.appointment.consultant.consultant.first_name}</p>}
      </h2>
      <p>Scheduled Time:<br/> {a.appointment.s_time}</p>
      <p>Booked: <br/>{a.booking}</p>
      <div className="card-actions justify-center">
        <Link to={`${a.id}`}><button className="btn btn-accent">View</button></Link>
      </div>
    </div>
  </div>)}</div>
</div>
  )
}

export default Appointments

