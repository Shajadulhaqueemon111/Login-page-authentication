import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../Firebase/Firebase.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
  
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setLoginError('');
    setSuccess('');

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setSuccess('Successfully logged in');
      })
      .catch((error) => {
        console.log('error', error);
        setLoginError(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log('Please enter your email');
      return;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      console.log('Please write a valid email');
      return;
    }

   

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent');
        alert('please check your email')
        setSuccess('Password reset email sent');

      })

      .catch((error) => {
        console.log('Error sending password reset email', error);
        setLoginError('Error sending password reset email');
      });
  };
    
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
     <form onSubmit={handleLogin}>
     <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" name='email'ref={emailRef} required className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
        <div className='relative' >
        <input type={showPassword?'text':"password"} 
        placeholder="password" 
        required  name='password' 
        className="input input-bordered w-full" />
          <span className='text-red-400 absolute right-2 mt-3' onClick={()=>setShowPassword(!showPassword)}>{
              showPassword?<FaEyeSlash className='text-black'></FaEyeSlash>:<FaEye className='text-black'></FaEye>
            } 
          </span>
        </div>
          <label onClick={handleForgetPassword} className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
     </form>
     {
        loginError && <p className='text-red-500'>{loginError}</p>
     }
     {
        success && <p className='text-red-500'>{success}</p>
     }
     <p>New to this website please? <Link to='/register'>register</Link></p>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;