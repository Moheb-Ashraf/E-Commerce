import amazonLogo from "../../assets/images/amazon-pay.png";
import americanExpress from "../../assets/images/American-Express-Color.png";
import appstorelogo from "../../assets/images/get-apple-store.png";
import googleplaylogo from "../../assets/images/get-google-play.png";
import mastercard from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";

function Footer() {
    return <>
    <footer className="bg-slate-100 py-6">
        <div className="container space-y-4">
            <div className=" py-4 max-md:p-2">
            <h2 className="text-slate-950 capitalize font-bold">get the FreshCart app</h2>
            <p className=" opacity-50">
                we will send you a link , open it on your phone to download the app.
            </p>
            </div>
            <div className="flex gap-4 max-md:flex-col max-md:px-2">
                <input className="InputForm grow" type="email"  placeholder='Email'/>
                <button className="btn  capitalize px-5">share app link</button>
            </div>
            <div className="flex max-lg:flex-col items-center justify-between border-solid border-slate-300 border-y-2 py-5 border-opacity-50">
            <div className="flex max-md:flex-col  items-center gap-5 ">
                <h3>
                    payment partners
                </h3>
                <img className="w-20" src={amazonLogo} alt="amazonLogo" />
                <img className="w-20" src={americanExpress} alt="americanExpresslogo" />
                <img className="w-14" src={mastercard} alt="mastercardlogo" />
                <img className="w-20" src={paypal} alt="paypallogo" />
            </div>

            <div className="flex max-sm:flex-col   items-center gap-5 ">
                <h3>
                    get deliveries with FreshCart
                </h3>
                <img className="w-20" src={appstorelogo} alt="appstorelogo" />
                <img className="w-20" src={googleplaylogo} alt="googleplaylogo" />
            </div>
            </div>
        </div>
    </footer>
    </>
}

export default Footer
