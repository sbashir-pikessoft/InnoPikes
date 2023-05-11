import Head from "next/head";
import { useState } from "react";
import Link from "next/link";

const Index = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    const [emailAddress, setEmailAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "text/plain");

        const raw = JSON.stringify({
            "emailAddress": emailAddress,
            "password": password
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        try {
            let response = await fetch(`${apiUrl}/api/account/login`, requestOptions)
            if (response.status === 200) {
                const token = await response.text();
                localStorage.setItem("token", token);
                setPassword("");
                setEmailAddress("");
                 window.location.href = "/";
            } else {
                const result = await response.json();
                let ErrorMsg= document.getElementById("ErrorList");
                if(ErrorMsg !=null){
                    ErrorMsg.innerHTML = "*" + result.error;
                }
                console.log(result.error);
            }
        }
        catch (error) {
            if (error instanceof Response) {
                alert(error.statusText);
            }
        }
    }
    const ForgotPass=async()=>{
        if(emailAddress==""){
            let ErrorMsg= document.getElementById("ErrorList");
            if(ErrorMsg !=null){
                ErrorMsg.innerHTML = "* Please enter a valid email!";
            }
        }
        else{
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
                let response = await fetch(`${apiUrl}/api/account/sendresetPasswordLink`, requestOptions)
                if (response.status === 200) {
                    localStorage.setItem("EmailAddress",emailAddress);
                    alert("A Link has been sent to you please check your email!");                
                } else {
                    const result = await response.json();
                    let ErrorMsg= document.getElementById("ErrorList");
                    if(ErrorMsg !=null){
                        ErrorMsg.innerHTML = "*" + result.error;
                    }
                    console.log(result.error);
                }
            }
            catch (error) {
                if (error instanceof Response) {
                    alert(error.statusText);
                }
            }
        }
    }
    return (
        <>
            <Head>
                <title>Innopikes | Login</title>
                <meta name="description" content="Login" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="page-header">
                <div className="page-header-image"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-8 col-sm-12 mx-auto">
                            <div className="card card-login">
                                <form asp-action="Login">
                                    <div className="card-header p-3">
                                        <h4 className="card-title" style={{ textTransform: "none", textAlign: "center", fontSize: 50, fontWeight: 500, color: "white" }}>
                                            Login
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="input-group input-lg">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="tim-icons icon-single-02"></i></span>
                                            </div>
                                            <input type="email" asp-for="EmailAddress" onChange={(event) => setEmailAddress(event.target.value)} value={emailAddress} className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="input-group input-lg">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="tim-icons icon-lock-circle"></i></span>
                                            </div>
                                            <input type="password" asp-for="Password" onChange={(event) => setPassword(event.target.value)} value={password} className="form-control" placeholder="Password" />
                                        </div>
                                        <div className="input-group input-lg">
                                        <a href="#" onClick={ForgotPass} className="ml-1">Forgot Password?</a>
                                        </div>
                                        <span id='ErrorList' className="text-danger"></span>
                                    </div>
                                    <div className="card-footer text-center">
                                        <input type="submit" onClick={handleSubmit} value="Login" className="btn btn-primary btn-round btn-lg btn-block" />
                                    </div>
                                </form>
                            </div>
                            <div className="pull-left m-3">
                                Don&apos;t have an account ? 
                                <Link href={'/account/signup'} className="ml-1">Create Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Index

Index.getLayout = function PageLayout(page: JSX.Element) {
    return (
        <>
            {page}
        </>
    )
}