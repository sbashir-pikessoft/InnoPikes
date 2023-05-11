import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
const Signup = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    const router = useRouter();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [IsAgree, setIsAgree] = useState(false)
    
    async function handleSignup(event: any) {
        if(IsAgree){      
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "text/plain");

        const raw = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "emailAddress": emailAddress,
            "password": password
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        try{           
            let response = await fetch(`${apiUrl}/api/account`, requestOptions)

            if (response.status === 200) {
                localStorage.setItem("UserPassword",password);
                localStorage.setItem("UserEmail",emailAddress);
                router.push(`/account/validateEmail`)
            } else {
                let result = await response.json();
                let fLen = result.length;

                let text = "";
                for (let i = 0; i < fLen; i++) {
                    text += "<p style=color:red>* " + result[i] + "</p>";
                }
                
                let ErrorMsg= document.getElementById("errorMsges");
                if(ErrorMsg !=null){
                    ErrorMsg.innerHTML = text;
                }
            }
        }
    catch (error) {
        if (error instanceof Response) {
            alert(error.statusText);
        }
    }
}
else{
    let ErrorMsg= document.getElementById("errorMsges");
    if(ErrorMsg !=null){
        ErrorMsg.innerHTML = "<p style=color:red>* Please Agree to the Terms and Conditions!</p>";
    }
}
    }

    return (
        <>
            <Head>
                <title>Innopikes | Signup</title>
                <meta name="description" content="Innopikes" />
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
                                    <h4 className="card-title " style={{textTransform:"none", textAlign: "center", fontSize: 30, fontWeight: 500, color: "white" }}>
                                    Register New Account
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <form asp-action="SignUp">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="tim-icons icon-single-02"></i>
                                                </div>
                                            </div>
                                            <input type="text" className="form-control" onChange={(event) => setFirstName(event.target.value)} value={firstName} asp-for="FirstName" placeholder="First Name" />
                                        </div>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="tim-icons icon-single-02"></i>
                                                </div>
                                            </div>
                                            <input type="text" onChange={(event) => setLastName(event.target.value)} value={lastName} className="form-control" asp-for="LastName" placeholder="Last Name" />
                                        </div>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="tim-icons icon-email-85"></i>
                                                </div>
                                            </div>
                                            <input type="email" onChange={(event) => setEmailAddress(event.target.value)} value={emailAddress} placeholder="Email" asp-for="Email" className="form-control" />
                                        </div>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="tim-icons icon-lock-circle"></i>
                                                </div>
                                            </div>
                                            <input type="Password" className="form-control" asp-for="Password" onChange={(event) => setPassword(event.target.value)} value={password} placeholder="Password" />
                                        </div>
                                        <div className="input-group">
                                            <div id="errorMsges" >
                                            </div>
                                        </div>
                                        <div className="form-check text-left">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="checkbox" onClick={(event) => setIsAgree(!IsAgree)} />
                                                <span className="form-check-sign"></span>
                                                I agree to the
                                                <a href={"https://innopike.com/Terms"} className="ml-1"  target="_blank">terms and conditions</a>.
                                            </label>
                                        </div>                                     
                                    </form>
                                </div>
                                <div className="card-footer text-center m-0 pb-0">
                                <input type="submit" onClick={handleSignup} value="Create Account" className="btn btn-info btn-round btn-lg btn-block" /><br />
                                    </div>
                            </div>
                            <div className="pull-left m-3">
                            already have an account  , 
                                    <Link href={'/account/login'} className="ml-1">Login</Link>
                                </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup
Signup.getLayout = function PageLayout(page: JSX.Element) {
    return (
        <>{page}</>
    )
}