import { Link } from "react-router-dom";
import useConsultant from "../hooks/useConsultants"
import { useState } from "react";
import useUser from "../hooks/useUser";


const Consultants = () => {
  const { data: user } = useUser()
  const { data: con, error } = useConsultant();
  const [sr, setSr] = useState("")

  const servicio = {
    MD: "Medical",
    LW: "Law",
    AD: "Alternative Medicine",
    OR: "Other"
  }
  const consult = con?.filter(sr ? c => c.service.category === sr : c => c.service.category === "MD"||"AD"||"LW"||"OR")
  console.log(consult)
  if (error) return <p>{error.message}</p>

  return (
    <>
      <h1 className="mt-5 mb-10 text-3xl font-semibold font-serif">Consultants</h1>
      <div className="row-span-1 mb-10 font-bold">
        <div className="badge badge-success mx-1 badge-lg cursor-pointer" onClick={() => setSr("")}>All</div>
        <div className="badge badge-error mx-1 badge-lg cursor-pointer" onClick={() => setSr("MD")}>Medical</div>
        <div className="badge badge-secondary mx-1 badge-lg cursor-pointer" onClick={() => setSr("LW")}>Law</div>
        <div className="badge badge-warning mx-1 badge-lg cursor-pointer" onClick={() => setSr("AD")}>Alternative Medicine</div>
        <div className="badge badge-nuetral mx-1 badge-lg cursor-pointer" onClick={() => setSr("OR")}>Other</div>
      </div>
      <h2 className="text-2xl mb-5 font-serif">{sr ? servicio[`${sr}`] :"All" + " Consultants"}</h2>
      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 rounded-box ml-3">
        {consult?.map((c) => <li key={c.id}>
          <div className="card w-72 lg:w-96 bg-base-200 shadow-xl border-x-stone-600 border-2">
            <div className="card-body">
              <h2 className="card-title">{c.title}{" "}{c.consultant.last_name}</h2>
              <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-lg font-medium">
                  Tap for detail
                </div>
                <div className="collapse-content">
                  <p>{c.about}</p>
                </div>
              </div>
              {(user?.is_service_provider === false) ? <div className="card-actions justify-end">
                <Link to={`${c.id}`} state={{ user: `${c.consultant.username}` }}><button className="btn btn-primary">Consult Now.</button></Link>
              </div> : <button onClick={() => { alert("Sign in as Client") }} className="btn btn-primary cursor-none">Consult Now.</button>}
            </div>
          </div>
        </li>)}
      </ul>
    </>
  )
}

export default Consultants