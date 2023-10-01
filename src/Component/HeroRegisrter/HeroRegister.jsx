import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Correct import
import auth from '../Firebase/Firebase.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const HeroRegister = () => {
  const [heroRegisterError, setHeroRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleHeroRegister = (e) => {
    e.preventDefault();
    console.log('submit form');
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setHeroRegisterError('');
    setSuccess('');

    if (password.length < 6) {
      setHeroRegisterError('Password should be at least 6 characters (auth/weak-password).');
      return;
    } else if (!/[A-Z]/.test(password)) {
      setHeroRegisterError('Password should have at least one uppercase letter');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password) // Use createUserWithEmailAndPassword from firebase/auth
      .then((result) => {
        const user = result.user;
        setSuccess('User created successfully');
        console.log(user);
      })
      .catch((error) => {
        console.log('error', error);
        setHeroRegisterError(error.message);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleHeroRegister}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className='relative'>
                  <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" className="input input-bordered w-full" required />
                  <span className='text-white absolute top-3 right-2' onClick={()=>setShowPassword(!showPassword)}>{
                              showPassword?<FaEyeSlash className='text-black'></FaEyeSlash>:<FaEye className='text-black'></FaEye>
                                            }  </span>
                  </div>
                                          
                   
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Register</button>
                </div>
              </form>
              {heroRegisterError && <p className='text-red-500'>{heroRegisterError}</p>}
              {success && <p className='text-green-500'>{success}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
