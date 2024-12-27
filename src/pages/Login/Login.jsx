import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { userContext } from "../../components/Context/User.Context";


function Login() {

    let{setToken}=useContext(userContext)

    const navegate=useNavigate();

    const [acountErorr,setAcountErorr]=useState(null);


     async function sendDataToRegister(values) {
        const loadingId=toast.loading("loading...");
        try{
            const options= {
                url:"https://ecommerce.routemisr.com/api/v1/auth/signin" ,
                method:"POST",
                data:values,
            }
            let {data}=await axios.request(options)
            if(data.message=="success"){
                localStorage.setItem("token",data.token);
                setToken(data.token)
                toast.success("email is correct")
                setTimeout(() => {
                    navegate("/")
                }, 2000);
            }
        }
        catch(erorr){
            setAcountErorr(erorr.response.data.message)
            
            toast.error(erorr.response.data.message)
            
        }
        finally{
            toast.dismiss(loadingId)
        }
        
    }



    const passwordregex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;


    const validationSchema=object({
        email: string().required("email must be required").email("email is valid"),
        password: string().required("password must be required").matches(passwordregex, "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character")
    })

   const formik = useFormik(
    {
        initialValues:{
            "email":"",
            "password":""
        },
        validationSchema,

        onSubmit:sendDataToRegister,
    }
   )









    return <>
        <div className="section">
            <div className="container">
                <h1 className='text-2xl font-semibold'>
                    Register Now :
                </h1>
                <form action="" className='py-3' onSubmit={formik.handleSubmit}>
                    <div className='flex py-2 flex-col gap-1'>
                        <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                            type="email"
                            placeholder='Enter your Email'
                            className='InputForm grow'
                            value={formik.values.email}
                            name="email"
                        />
                        {formik.errors.email&&formik.touched.email &&<p className="text-red-600 text-sm ">{formik.errors.email}</p>}
                        {acountErorr &&<p className="text-red-600 text-sm ">{acountErorr}</p>}
                        
                    </div>
                    <div className='flex py-2 flex-col gap-1'>
                        <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                            type="password"
                            placeholder='Enter your password'
                            className='InputForm grow'
                            value={formik.values.password}
                            name="password"
                            />
                            {formik.errors.password && formik.touched.password &&(<p className="text-red-600 text-sm ">{formik.errors.password}</p>)}
                            {acountErorr &&<p className="text-red-600 text-sm ">{acountErorr}</p>}
                    </div>

                    <Link className="text-sm text-red-500 underline" to="/forgetpassword">Forget Your Password ?</Link>

                    <div className='flex py-2'>
                        <button type="submit" className='btn grow'>
                            Login
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </>
}

export default Login
