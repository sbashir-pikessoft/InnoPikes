import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from "react";

const Reset = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [Pass, setPass] = useState<string>("");
  const [ConfirmPass, setConfirmPass] = useState<string>("");

  const router = useRouter();
  const token = router.query.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const email = localStorage.getItem("EmailAddress");
    if(email!=undefined){
        setEmailAddress(email);
    }    
}, [router])

  const Submithandler = async() => {
    if (Pass != ConfirmPass) {
      let ErrorMsg = document.getElementById("errorMsges");
      if (ErrorMsg != null) {
        ErrorMsg.innerHTML = "* Password and confirm password should be same!";
      }
    }
    else{
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "text/plain");
      const raw = JSON.stringify({
          "emailAddress": emailAddress,
          "token":token,
          "password":Pass

      });
      const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
      };
      try {
        debugger;
          let response = await fetch(`${apiUrl}/api/account/resetPassword`, requestOptions)
          
          if (response.status === 200) {
              alert("Password changed successfully!");               
              router.push('/account/login') 
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
  }

  return (
    <>
      <Head>
        <title>Innopikes | Reset Password</title>
        <meta name="description" content="Reset Password" />
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
                    Reset Password
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
                        value={emailAddress} placeholder="Email" id="userEmail" />
                    </div>
                    <div className="input-group" id="pass">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="tim-icons icon-lock-circle"></i>
                        </div>
                      </div>
                      <input type="password" onChange={(event) => setPass(event.target.value)} value={Pass} className="form-control" placeholder="Password" />
                    </div>
                    <div className="input-group" id="confirmPass">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="tim-icons icon-lock-circle"></i>
                        </div>
                      </div>
                      <input type="password" onChange={(event) => setConfirmPass(event.target.value)} value={ConfirmPass} className="form-control" placeholder="Confirm assword" />
                    </div>
                    <div className="input-group">
                      <div id="errorMsges" className="text-danger" >
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center m-0 pb-0">
                  <input type="submit" onClick={Submithandler} id="SubmitData" value="Submit" className="btn btn-info btn-round btn-lg btn-block" /><br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reset;
Reset.getLayout = function PageLayout(page: JSX.Element) {
  return (
    <>{page}</>
  )
}