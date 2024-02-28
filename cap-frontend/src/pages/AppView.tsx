import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import useUser from "../hooks/useUser"
import { useAppointment } from "../hooks/useAppointments"
import useStore from "../state-managemant/store"

const AppView = () => {
    const { id } = useParams() as { id: string }
    const { data: app, error } = useAppointment(parseInt(id))
    const { data: user } = useUser()
    const { charges, duration, notes, prescription,
        setDuration, setCharges, setNotes, setPrescription } = useStore()

    const setInfo = () => {
        setNotes(app?.notes);
        setPrescription(app?.prescription);
        setDuration(app?.duration);
        setCharges(app?.charges);
    }
    
    const b= new Date(app ? app?.appointment.s_time : "").valueOf()
    const a =  Math.floor((Date.now() - b)/ 60000 )< 60 && Math.floor((Date.now() - b)/ 60000 )>0

    useEffect(() => {
        const controller = new AbortController();
        setInfo();
        return () => controller.abort()
    }, [app])

    const handleClick = () => {
        console.log(app, notes, duration, prescription, charges);
        axios
            .put(`consult/appointment/${id}/`, {
                'appointment': app?.appointment.id,
                'notes': notes,
                'prescription': prescription,
                'charges': charges,
                'duration': duration
            })
            .then(res => {
                console.log(res.data);
                alert("update success")
            })
            .catch(e => console.log(e))
    }

    if (error) return <p>{error.message}</p>

    return (
        <div className="container p-10 font-serif" data-theme="business">
            <div className="my-3 space-y-7">
                <h1 className="text-4xl underline">Consultant</h1>
                <h1 className="text-2xl ml-3">{app?.appointment.consultant.title}{" "}
                    {app?.appointment.consultant.consultant.first_name}{" "}{app?.appointment.consultant.consultant.last_name}</h1>
                <h1 className="text-4xl mt-5 underline">Appointment Details</h1>
                <div className="m-3">
                    <h1 className="text-2xl mt-5 underline">Client Details</h1>
                    <h4 className="text-xl"><span className="font-light">Fullname: </span>{app?.appointment.client.client.last_name}{" "}
                        {app?.appointment.client.client.first_name}</h4>
                    <h4 className="text-xl"><span className="font-light">Date of Birth:</span> {app?.appointment.client.birth_date}</h4>
                </div>
            </div>
            {(user?.is_service_provider && !app?.expired) ? <>
                <div className="mb-3">
                    <h1 className="text-4xl mt-10 mb-5">Appointment Notes</h1>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Appointment notes</span>
                        </div>
                        <textarea defaultValue={notes} name="notes"
                            onChange={(e) => setNotes(e.target.value)}
                            className="textarea textarea-bordered h-24" placeholder="Notes"></textarea>
                    </label>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Appointment Prescriptions</span>
                        </div>
                        <textarea defaultValue={prescription} name="prescription"
                            onChange={(e) => setPrescription(e.target.value)}
                            className="textarea textarea-bordered h-24" placeholder="Prescriptions"></textarea>
                    </label>
                </div>
                <div className="mb-3">
                    <h1 className="text-4xl mt-10 mb-5">Appointment Details</h1>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Appointment Charges</span>
                        </div>
                        <input type="number" placeholder="Type here" defaultValue={charges}
                            onChange={(e) => setCharges(parseInt(e.target.value))}
                            className="input input-bordered w-full max-w-xs" name="charges" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Appointment Duration</span>
                        </div>
                        <input type="text" placeholder="Type here" defaultValue={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="input input-bordered w-full max-w-xs" name="duration" />
                    </label>
                </div>
            </> : <>
                <div className="text-xl p-3 space-y-2">
                    <p className="font-semibold">Scheduled Time: <span className="font-medium">{app?.appointment.s_time}</span></p>
                    {app?.notes && <p className="font-semibold">Appointment Notes: <span className="font-medium">{notes}</span></p>}
                    {app?.prescription && <p className="font-semibold">Prescription: <span className="font-medium">{prescription}</span></p>}
                    <p className="font-semibold">Appointment Charges: <span className="font-medium">{charges}</span></p>
                    <p className="font-semibold">Appointment Duration: <span className="font-medium">{duration}</span></p>
                </div>

            </>}
            <div className="mt-5 flex justify-start space-x-5">
                {user?.is_service_provider && !app?.expired && <><button onClick={handleClick}
                    className="btn btn-active btn-primary">Save</button></>}
                {!a && <Link to={'live'} target='_blank'><button className="btn btn-active btn-accent">Live</button></Link>}
                <Link to={'/appointment'}><button className="btn btn-active btn-secondary">Close</button></Link>
            </div>

        </div>
    )
}

export default AppView
