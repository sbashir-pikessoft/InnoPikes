import Link from "next/link";
import Head from "next/head";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";


const ValidateEmail = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    let [emailAddress, setEmailAddress] = useState("")
    const [otp, setOtp] = useState("")
    const router = useRouter();

    useEffect(() => {
        const email = localStorage.getItem("UserEmail");
        if(email!=undefined){
            setEmailAddress(email);
        }    
    }, [router])

    const handleAuth = () => {
        if (emailAddress != "") {
            let ErrorMsg = document.getElementById("errorMsges");
            if (ErrorMsg != null) {
                ErrorMsg.innerHTML = "";
            }
            sendOtp();
        }
        else {
            let ErrorMsg = document.getElementById("errorMsges");
            if (ErrorMsg != null) {
                ErrorMsg.innerHTML = "<p style=color:red>* Please Enter a valid Email!</p>";
            }
        }
    }
    const sendOtp = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "text/plain");
        const raw = JSON.stringify({
            "emailAddress": emailAddress,
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        try {
            let response = await fetch(`${apiUrl}/api/mail/sendVerifyLink`, requestOptions)
            
            if (response.status === 200) {
                alert("A Link has been sent to you please check your email!");                
            }
            else if (response.status === 400) {
                alert("Email not Found!");

            } else if (response.status == 401) {
                router.push('/account/login')
            }
        }
        catch (error) {
            if (error instanceof Response) {
                alert(error.statusText);
            }
        }
    }

    return (
        <>
            <Head>
                <title>Innopikes | Validate Email</title>
                <meta name="description" content="Validate Email" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="page-header">
                <div className="page-header-image"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-12 mx-auto">
                            <div className="card card-register">
                                <div className="card-header p-3">
                                    <h4 className="card-title " style={{ textTransform: "none", textAlign: "center", fontSize: 30, fontWeight: 500, color: "white" }}>
                                      Validate Email
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <form >
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="tim-icons icon-email-85"></i>
                                                </div>
                                            </div>
                                            <input type="text" className="form-control"
                                             onChange={(event) => setEmailAddress(event.target.value)} 
                                             value={emailAddress} placeholder="Email" id="userEmail"/>
                                        </div>
                                        <div className="input-group d-none" id="secOTP">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="tim-icons icon-lock-circle"></i>
                                                </div>
                                            </div>
                                            <input type="number" onChange={(event) => setOtp(event.target.value)} value={otp} className="form-control" placeholder="Otp code" />
                                        </div>
                                        <div className="input-group">
                                            <div id="errorMsges" className="text-danger">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center m-0 pb-0">
                                    <input type="submit" onClick={handleAuth} id="SubmitData" value="Send Otp" className="btn btn-info btn-round btn-lg btn-block" /><br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ValidateEmail
ValidateEmail.getLayout = function PageLayout(page: JSX.Element) {
    return (
        <>{page}</>
    )
}