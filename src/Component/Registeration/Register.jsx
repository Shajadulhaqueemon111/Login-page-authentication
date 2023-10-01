import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../Firebase/Firebase.config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Register = () => {

    const [registerError,setRegisterError]=useState()
    const [success,setSuccess]=useState([''])
    const [showPassword,setPassword]=useState(false)

  
    
    const handelRegister = (e) => { // Add 'e' as a parameter
        e.preventDefault();
         const name=e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted=e.target.terms.checked;

        console.log(name,email,password,accepted)
        setSuccess([''])
        setRegisterError([''])


        if(password.length<6){
            setRegisterError('Password should be at least 6 characters (auth/weak-password).')
        }else if(!/[A-Z]/.test(password)){
         setRegisterError('plase should ba at least one upper case')
            return;
        }else if(!accepted){
            setRegisterError('please accept our terns and condition')
            return;
        }
      
        createUserWithEmailAndPassword(auth,email,password)

        .then((result=>{
            console.log(result.user)
            setSuccess('Successfully login')

            sendEmailVerification(result.user)

            .then(()=>{
                console.log('please cheack your email veryfied your account')
            })

        }))

        .catch((error) => {
            console.log('error',error)
            setRegisterError(error.message)
            
          });

        // Now you can use the 'email' and 'password' variables as needed
    };
    

    return (
        <div className='border'>
            <div className='mx-auto md:w-1/2 justify-center'>
                <h2 className="text-3xl w-3/4">Please Register</h2>
                <form onSubmit={handelRegister}>
                    <input className='w-full mb-4  bg-slate-100 mt-4 px-4 py-2' placeholder='name' type="name" name="name"  id="" required />
                    <br />
                    <input className='w-full mb-4  bg-slate-100 mt-4 px-4 py-2' placeholder='Email address' type="email" name="email"  id="" required />
                    <br />
                    <div className='relative '>
                    <input className='w-full bg-slate-100 px-4 py-2' type={showPassword ?"tetx":"password"} placeholder='Your password' name="password" id="" required/>
                    <span className='text-white absolute top-3 right-2' onClick={()=>setPassword(!showPassword)}>{
                              showPassword?<FaEyeSlash className='text-black'></FaEyeSlash>:<FaEye className='text-black'></FaEye>
                                            }  </span>
                    </div>
                    <br />
                    <input type="checkbox" name="terms" id="" />
                    <label className='ml-2 mb-4' htmlFor="terms" >Accept our <a href="">terms and condition</a></label>
                    <input className='btn btn-secondary w-full' type="submit" value="Register" />
                </form>
                {
                registerError&&<p className='text-red-700'>{registerError}</p>
                }
                {
                    success&& <p className='text-green-500'>{success}</p>

                }
                <p>Already have an account ?<Link to='/login'>Please login</Link></p>
            </div>
        </div>
    );
};

export default Register;
