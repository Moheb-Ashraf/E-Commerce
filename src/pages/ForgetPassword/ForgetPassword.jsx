import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {

    let navigate=useNavigate();

    const formik=useFormik({
        initialValues:{
            "email":""
        },

        onSubmit:forgetPassword,
    })

    async function forgetPassword(values){
        let toastid=toast.loading("wait....")
       try {
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            method:"POST",
            data:
                values
            
        }

        let {data}=await axios.request(options);
        if(data.statusMsg=="success"){
            toast.success(data.message)
            setTimeout(()=>{navigate("/verifycode")},2000)
        }
        console.log(data);
       } catch (error) {
        console.log(error);
        
       }finally{
        toast.dismiss(toastid)
       }
        
    }


    return <>
    <h2 className='text-3xl font-bold text-black my-10'>please enter your verification code</h2>
    <form action="" onSubmit={formik.handleSubmit}> 
    <div className='grow flex flex-col my-3'>
    <input onChange={formik.handleChange}  name='email' type="email" placeholder='Enter your Email' value={formik.values.email} className='InputForm' />
    </div>
    <button type='submit' className='btn'>Verify</button>
    </form>
    
    </>
}

export default ForgetPassword
