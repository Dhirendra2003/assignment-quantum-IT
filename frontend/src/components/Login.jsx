import { MdEmail,MdPassword } from "react-icons/md";
import { PiLineVertical } from "react-icons/pi";
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
        email: email.current.value,
      password: password.current.value
    };
    axios.post('http://localhost:5000/login', user)
      .then(response => {
        console.log('Response:', response.data);
        if(response.data.status==="success")
        localStorage.setItem('userToken',JSON.stringify(response.data.token));
        navigate('/home');
      })
      .catch(error => {
        console.error('Error:', error.message);

      })
    }
  return (
    <>
    <div className=' min-w-72 w-80  m-[auto]  m-5 bg-[#1D2C4F]/70 place-content-center mt-40 rounded-lg '>
      <div className='text-center grid place-content-center  -my-12 rounded-lg'>
        <h2 className='bg-[#00F5E1] w-30 m-[auto] z-10 relative top-8 p-3 text-lg text-center'>SIGN IN</h2>
        <div className='bg-waves  h-40 w-80'></div>
      <BsPersonCircle size={100} className='relative -top-14 m-[auto] z-10'  color='lightgray' />
      </div>
      <form onSubmit={handleSubmit} className='p-5  grid place-content-center' >
        

       

        <div className='flex bg-zinc-800/60 m-2 p-3 flex gap-2 align-items-center rounded-lg'>
        <MdEmail color='lightgray' className='my-[auto]'/>
        <PiLineVertical color='gray' className='my-[auto]' size={20}/>
          <input ref={email} className='bg-transparent text-white' type="text" placeholder='email' />
        </div>

        <div className='flex bg-zinc-800/60 m-2 p-3 flex gap-2 align-items-center rounded-lg'>
        <MdPassword color='lightgray' className='my-[auto]'/>
        <PiLineVertical color='gray' className='my-[auto]' size={20}/>
          <input ref={password} className='bg-transparent text-white' type="password" placeholder='password' />
        </div>

     
        
        <button type='submit'  className='bg-[#00F5E1] m-2 rounded-lg   p-3 text-lg text-center'>LOGIN</button>
      </form>
    </div>
    <div className='   w-80 h-1 m-[auto] base-shadow'></div>
    </>
  )
}





