import React from "react";
import LiveMeetingWrapper from "./LiveMeetingWrapper";



interface VideoShoppingModalProps {
  onClose: () => void,
  liverequest: number
  type: boolean
}

const VideoShoppingModal: React.FC<VideoShoppingModalProps> = ({ onClose, liverequest, type }) => {
  

  const renderMeeting = () => {
    if (type) {
      return <div className="flex-1 h-full rounded">
        <LiveMeetingWrapper id={liverequest} type="support" onMeetingEnd={onClose}></LiveMeetingWrapper>
      </div>
    }
     else  {
      return <div className="flex-1 h-full rounded">
        <LiveMeetingWrapper id={liverequest} type="user" onMeetingEnd={onClose}></LiveMeetingWrapper>
      </div>
    }
  }

  

  return (
    <div id="staticModal" className="fixed top-0 left-0 right-0 z-50 w-full h-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full">
      <div className="fixed top-0 left-0 w-full h-full opacity-80 bg-slate-200"></div>
      <div className="relative mx-auto my-auto w-full h-[90%] max-w-[80%] opacity-100 bg-white rounded-lg shadow p-5">
        <div className="flex-1 flex flex-row justify-center align-center h-full space-x-2">
          {renderMeeting()}
        </div>
      </div>
    </div>
  )
}

export default VideoShoppingModal;