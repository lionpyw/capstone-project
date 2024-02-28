import { Link, Outlet } from 'react-router-dom'
import useUser from '../hooks/useUser'
// import { Footer, NavBar} from '../components'


const SideBar = () => {

  const {data:user, error} = useUser()
  console.log(error)
  return (
    <>
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-start mb-5">
    <label htmlFor="my-drawer-2" className="btn btn-xs btn-primary drawer-button lg:hidden">View My Sidebar</label>
    <Outlet/>  
  </div> 

    
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
      { (user?.username !== undefined && user?.is_service_provider) && 
      <ul className="menu p-4 w-40 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li><Link to={"home"}>My Home</Link></li>
      <li><Link to={"app_req_all"}>Appointment Requests</Link></li>
      <li><Link to={"appointment"}>Appointments</Link></li>
      <li><Link to={"previous"}>Previous Appointments</Link></li>
      <li><Link to={"profile"}>Profile Settings</Link></li>
    </ul>} 
    {(user?.username !== undefined && !user?.is_service_provider) && 
    <ul className="menu p-4 w-40 min-h-full bg-base-200 text-base-content">
      <li className='border-b-2 border-b-indigo-400 border-dotted'><Link to={"home"}>My Home</Link></li>
      <li className='border-b-2 border-b-indigo-400 border-dotted'><Link to={"consultants"}>New Appointment</Link></li>
      <li className='border-b-2 border-b-indigo-400 border-dotted'><Link to={"app_req_all"}>Appointment Requests</Link></li>
      <li className='border-b-2 border-b-indigo-400 border-dotted'><Link to={"appointment"}>Appointments</Link></li>    
      <li className='border-b-2 border-b-indigo-400 border-dotted'><Link to={"previous"}>Previous Appointments</Link></li>   
      <li className='border-b-2 border-b-indigo-400 border-dotted'><Link to={"mypage"}>My Details</Link></li>
    </ul>}
  </div>
</div>
    </>
  )
}

export default SideBar