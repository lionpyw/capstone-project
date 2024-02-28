import React, { useState } from "react";
import {  LiveVideoRequest, retrieveLiveVideoRequest } from "../api/backend";
import VideoShoppingModal from "../components/VideoShoppingModal";
import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useAppointment } from "../hooks/useAppointments";


const LiveRequestPage: React.FC = () => {
  const [liveRequests, setLiveRequests] = useState<LiveVideoRequest>()
  const [activeLiveVideoRequest, setActiveLiveVideoRequest] = useState<LiveVideoRequest>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const {id} =useParams() as { id: string }
  const { data:user } =useUser()
  const {data:app, error} = useAppointment(parseInt(id))
  
  
  const startMeeting = (videoRequest: LiveVideoRequest) => {
    setActiveLiveVideoRequest(videoRequest);
    setShowModal(true)
  }
  const consultant = app?.appointment.consultant.consultant.id
  const type = consultant === user?.id
  const getliveRequests = async () => {
    const resp = await retrieveLiveVideoRequest(app?.appointment.consultant.id);
    setLiveRequests(resp)
    console.log(app, resp)
  }
  const b= new Date(app ? app?.appointment.s_time : "").valueOf()
  const a =  Math.floor((Date.now() - b)/ 60000 )< 60 && Math.floor((Date.now() - b)/ 60000 )>0


  if (error) return <p>{error?.message}</p>

  return (
    <>
      <div className="max-w-lg flex flex-col h-screen space-y-4 mx-auto rounded">
        <div className="self-center my-20">
          {!a && <button
            onClick={() => getliveRequests()}
            className="btn btn-lg bg-indigo-500 hover:bg-indigo-700 text-white font-bold">
            Connect
          </button>}
        </div>
      {liveRequests === undefined ? <div className="flex flex-col items-center gap-y-2">
        <div className="text-slate-500 text-xl">Make video request</div>
        </div> 
        :
        <div className="p-5 border flex flex-row justify-between">
          <div className="text-xl font-bold place-self-center mr-3">{liveRequests.status}</div>
          <div>
            <button onClick={() => startMeeting(liveRequests)} 
            className="btn bg-indigo-600 text-white px-3 py-2">
              Join</button>
          </div>
        </div>        
        }

        {liveRequests && showModal && activeLiveVideoRequest &&
          <VideoShoppingModal
            onClose={() => setShowModal(false)}
            liverequest={liveRequests.id}
            type={type}
          />
        }
      </div>
    </>
  )
}

export default LiveRequestPage