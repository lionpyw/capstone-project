import axios from "axios"
import { ChangeEvent, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


const AppRequest = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [info,setInfo] = useState({
    proposed_time:"",
    request_note:"",
    consultant: params.id,
})
const handleSubmit =(e:React.FormEvent) => {
    e.preventDefault()
    axios.post('consult/app_req/',{
        proposed_time:info.proposed_time,
        scheduled_time: null,
        cancel_request: false,
        request_note:info.request_note,
        consultant: info.consultant,
    }).then(res=> {
        console.log(res);
        alert('request success');
        navigate('/')})
    .catch(err => {console.log(err)})
}
const onCancel = ()=>{};
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInfo({
        ...info,
        [e.target.name]: e.target.value,
    });
}

  return (
    <div className='mt-24'>
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5 lg:w-96">
    <label htmlFor="proposed_time">Proposed time (date and time):</label>
     <input type="datetime-local" id="proposed_time" name="proposed_time" onChange={handleChange}
      className="input input-bordered input-info w-full max-w-x"/>
    <label htmlFor="request"> Request Note:</label>
    <input
      type="textArea" id="request"
      name="request_note"
      placeholder="Request note"
      value={info.request_note}
      onChange={handleChange}
      className="textarea textarea-info textarea-lg w-full max-w-x"
    />
    
    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
      Submit Request
    </button>
    <button type="button" onClick={onCancel} className="bg-blue-500 text-white p-2 rounded-md">
      Cancel</button>
  </form>
  
  </div>
  )
}

export default AppRequest