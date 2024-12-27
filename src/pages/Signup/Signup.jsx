import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

function Signup() {

    const navegate= useNavigate();
    const [acountErorr,setAcountErorr]=useState(null);

    const passwordregex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    const phoneregex = /^(02)?01[0251][0-9]{8}$/;

    const validationSchema = object({
        name: string().required("name is required").min(3, "the name must be at least 3 char").max(25, "name can not be more than 20 char"),
        email: string().required("Email must be required").email("email is valid"),
        password: string().required("the password must be required").matches(passwordregex, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
        rePassword: string().required("confirm yor password ").oneOf([ref("password")]),
        phone: string().required("the phone must be required").matches(phoneregex, "egyptians numbers only ")
    })


    async function sendDataToRegister(values) {

       


        const loadingToastId=toast.loading('loading.....');
            try{
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/auth/signup" ,
                    method: "POST" ,
                    data: values,
                }
                let {data}=await axios.request(options)
                console.log(data);
                if (data.message=='success'){
                    toast.success('acount is created')
                    setTimeout(() => {
                        navegate("/login")
                    }, 2000);
                }
            }
            catch(erorr){
                setAcountErorr(erorr.response.data.message);
                toast.error(erorr.response.data.message)
                
            }
            finally{
                toast.dismiss( loadingToastId);
            }
            
        
        
    }

    const formik = useFormik({
        initialValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },

        validationSchema,
        
        onSubmit: sendDataToRegister,
    })

    return <>

        <h1 className='capitalize text-xl text-slate-800 font-semibold'>
            register now:
        </h1>
        <form className='p-4' onSubmit={formik.handleSubmit}>
            <div className='flex p-2 flex-col space-y-1'>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" className='InputForm grow' type="text" placeholder='Enter your Name' value={formik.values.name} />
                {formik.errors.name && formik.touched.name && (<p className="text-red-600 text-sm ps-2">{formik.errors.name}</p>)}
            </div>
            <div className='flex flex-col space-y-1 p-2'>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" className='InputForm grow' type="email" placeholder='Enter your Email' value={formik.values.email} />
                {formik.errors.email && formik.touched.email && (<p className="text-red-600 text-sm ps-2">{formik.errors.email}</p>)}
                {acountErorr&&<p className="text-red-600 text-sm ps-2">{acountErorr}</p>}
            </div>
            <div className='flex flex-col space-y-1 p-2'>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" className='InputForm grow' type="password" placeholder='Enter your Password' value={formik.values.password} />
                {formik.errors.password && formik.touched.password && (<p className="text-red-600 text-sm ps-2">{formik.errors.password}</p>)}
            </div>
            <div className='flex flex-col space-y-1 p-2'>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="rePassword" className='InputForm grow' type="password" placeholder=' Repassword' value={formik.values.rePassword} />
                {formik.errors.rePassword && formik.touched.rePassword && (<p className="text-red-600 text-sm ps-2">{formik.errors.rePassword}</p>)}
            </div>
            <div className='flex flex-col space-y-1 p-2'>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" className='InputForm grow' type="text" placeholder=' Enter your telephone number ' value={formik.values.phone} />
                {formik.errors.phone && formik.touched.phone && (<p className="text-red-600 text-sm ps-2">{formik.errors.phone}</p>)}
            </div>
            <div className='flex p-2'>
                <button type="submit" className='btn grow'>Register</button>
            </div>
        </form>
    </>
}

export default Signup
