import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function ConfirmCode() {

    let navigate=useNavigate();

    async function verifyCode(values){
        let toastid =toast.loading("wait....")
        try {
            const options={
                url:"https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                method:"POST",
                data:values
            }
            let {data}=await axios.request(options);
            toast.success("success");
            setTimeout(()=>{
                navigate("/reset")
            },2000)
        } catch (error) {
            toast.error("the code isn't valid")
            
            
        }
        finally{
            toast.dismiss(toastid)
        }
        
    }

    const formik=useFormik({
        initialValues:{
            "resetCode":""
        },
        onSubmit:verifyCode
    })


    return <>
    <h2 className='text-3xl font-bold text-black my-10'>Reset code sent to your email</h2>
    <form action="" onSubmit={formik.handleSubmit}> 
    <div className='grow flex flex-col my-3'>
    <input onChange={formik.handleChange}  name='resetCode' type="text" placeholder='Enter your code' value={formik.values.resetCode} className='InputForm' />
    </div>
    <button type='submit' className='btn'>Verify</button>
    </form>
    </>
}

export default ConfirmCode
