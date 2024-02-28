import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate()

    const [info, setInfo] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        re_password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('auth/users/',{
            username:info.username,
            email:info.email,
            first_name:info.first_name,
            last_name:info.last_name,
            password:info.password,
            re_password:info.re_password
        })
        .then(res=> {console.log(res);
            alert("Registration Successfull.");
                        navigate('/login')})
        .catch(err => {console.log(err); navigate('/register')})

       
    }

    return (
        <>
            <div className='grid place-items-start mt-8'>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5 lg:w-96">
                <div className="text-2xl font-mono font-medium mb-4 lg:mb-16">Registeration Form</div>
                <input
                    type="text"
                    required
                    minLength={3}
                    name="username"
                    placeholder="Username"
                    value={info.username}
                    onChange={handleChange}
                    className="input input-bordered input-info w-full max-w-x"
                />
                <input
                    type="text"
                    required
                    name="email"
                    placeholder="Email"
                    value={info.email}
                    onChange={handleChange}
                    className="input input-bordered input-info w-full max-w-x"
                />
                <input
                    type="text"
                    required
                    name="first_name"
                    placeholder="First name"
                    value={info.first_name}
                    onChange={handleChange}
                    className="input input-bordered input-info w-full max-w-x"
                />
                <input
                    type="text"
                    required
                    name="last_name"
                    placeholder="Last name"
                    value={info.last_name}
                    onChange={handleChange}
                    className="input input-bordered input-info w-full max-w-x"
                />
                <input
                    type="password"
                    required
                    minLength={8}
                    name="password"
                    placeholder="Password"
                    value={info.password}
                    onChange={handleChange}
                    className="input input-bordered input-info w-full max-w-x"
                />
                <input
                    type="password"
                    required
                    minLength={8}
                    name="re_password"
                    placeholder="Re Password"
                    value={info.re_password}
                    onChange={handleChange}
                    className="input input-bordered input-info w-full max-w-x"
                />
                <input type="submit" value="Register" className="btn btn-sm btn-accent self-end"/>
            </form>
        </div >
    </>
  );
};

export default RegisterForm;
