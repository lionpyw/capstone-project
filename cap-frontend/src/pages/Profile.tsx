import React, { ChangeEvent, useRef, useState } from "react"
import useProfileMutate, { useProfileImageMutate } from "../hooks/useProfileMutate"
import { useConsultantUser } from "../hooks/useConsultants"


const Profile = () => {
    const [info, setInfo] = useState({})
    const changeImage = useProfileImageMutate()
    const profileMutate = useProfileMutate()

    const titleRef = useRef<HTMLInputElement>(null)
    const aboutRef = useRef<HTMLInputElement>(null)
    const chargeRef = useRef<HTMLInputElement>(null)

    const {data: con} = useConsultantUser()

    const img = "http://127.0.0.1:8000/" + con?.profile_img

    const handleImage = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.files) return;
        
        const image = e.target.files[0]
        console.log(image);
        
        if (typeof image === 'undefined') return;

        const formData = new FormData()
        formData.append('profile_img', image); 
        formData.append('session_charge', `${con?.session_charge}`);
        // console.log(formData)
        changeImage.mutate(formData)
        
    }

    const handleChange = () => {
        setInfo({
        'title': titleRef.current?.value,
        'about' : aboutRef.current?.value,
        'session_charge' : chargeRef.current?.value
        });
    }

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        setInfo({
                'title': titleRef.current?.value,
                'about' : aboutRef.current?.value,
                'session_charge' : chargeRef.current?.value
        });
        
        profileMutate.mutate(info)
    }

return(
    <div className="container p-10">
        <div className="mb-10">
            <div className="w-80 rounded">
            <img src={img} />
            </div>
        </div>    
        <input type="file"
        onChange={handleImage}
        className="file-input file-input-bordered w-full max-w-xs" />       
        <div className="collapse my-5">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                <strong>Title: </strong>{con?.title}<p className="text-xs">tap to edit</p>
            </div>
            <div className="collapse-content"> 
            <input type="text" placeholder="Type here" name="title" ref={titleRef}
            defaultValue={con?.title} onChange={handleChange}
            className="input input-bordered input-success w-full max-w-xs" />
            </div>
        </div>
        <div className="collapse my-5">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                <strong>About: </strong>{con?.about}<p className="text-sm">tap to edit</p>
            </div>
            <div className="collapse-content"> 
            <input name="about" 
            type="text" defaultValue={con?.about} onChange={handleChange} ref={aboutRef}
            className="input input-bordered input-success w-full max-w-xs md:max-w-4xl" placeholder={con?.about}/>
            </div>
        </div>
        <div className="collapse my-5">
            <input type="checkbox" /> 
            <div className="collapse-title text-xl font-medium">
                <strong>Session Charge: </strong>${con?.session_charge}<p className="text-xs">tap to edit</p>
            </div>
            <div className="collapse-content"> 
            <input type="text" placeholder={"$" + con?.session_charge} name="session_charge"
            defaultValue={con?.session_charge} onChange={handleChange} ref={chargeRef}
            className="input input-bordered input-success w-full max-w-xs" />
            </div>
        </div>
        <button onClick={handleSubmit}
        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Submit</button>
    </div>
  )
}

export default Profile