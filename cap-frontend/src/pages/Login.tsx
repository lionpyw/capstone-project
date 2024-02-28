import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../state-managemant/store';
import useUser from '../hooks/useUser';

const Login = () => {

    const navigate = useNavigate()
    const {username,password, setUsername,setPassword, setToken} = useStore();
    const {refetch} = useUser()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('api/token/', 
            { username, password });
            setToken(res.data);
            refetch();
            navigate('/home');

        } catch (err) {
            console.error(err);
        }
        
    };

    return (
    <div className='mt-24'>
    <form onSubmit={handleSubmit} className="flex flex-col space-y-5 lg:w-96">
    <input
      type="text"
      required
      name="username"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="input input-bordered input-info w-full max-w-x"
    />
    <input
      type="password"
      required
      name="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="input input-bordered input-info w-full max-w-x"
    />
    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
      Login
    </button>
  </form>
  <p> Don't have an account. <Link to={'/register'} className='text-blue-500'> Click</Link> to register</p>
  
  </div>
        );
    };
    
export default Login;