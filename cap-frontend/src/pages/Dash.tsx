import useAppReqs from "../hooks/useAppReqs"
import useAppointments from "../hooks/useAppointments"
import useUser from "../hooks/useUser"


const Dash = () => {

    const { data: user } = useUser()
    const { data: app_r } = useAppReqs()
    const { data: apps } = useAppointments()
    const app_today = apps?.filter(a => a.today === true)
    const app_next = apps?.filter(a => a.expired === false && a.today=== false)
    const app_req = app_r?.filter(a => !a.accepted)
    const datum = new Date()

    return (
        <div className="grid grid-cols-1">
            <h1 className="text-4xl font-serif justify-center m-10">
                Welcome {user?.first_name}{" "}{user?.last_name}</h1>
            <div className="stats stats-vertical lg:stats-horizontal shadow">

                <div className="stat place-items-center">
                    <div className="stat-title font-bold text-xl">Appointment Requests</div>
                    <div className="stat-value text-primary">{app_req?.length}</div>
                    <div className="stat-desc"></div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title font-bold text-xl">Appointments Today</div>
                    <div className="stat-value text-success">{app_today?.length}</div>
                    <div className="stat-desc text-warning">{datum.toUTCString()}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title font-bold text-xl">Total Appointments</div>
                    <div className="stat-value">{apps?.length}</div>
                    <div className="stat-desc text-accent">Upcoming: {app_next?.length}</div>
                </div>

            </div>
        </div>
    )
}

export default Dash