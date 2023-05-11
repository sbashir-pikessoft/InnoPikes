import { useState,useEffect } from "react";
import { useRouter } from "next/router";
const mailValidate=()=>{
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    const [mytoken,setMytoken]=useState('');
    const mytoken1 = router.query.token;
    console.log(mytoken1);
    useEffect(() => {             
        mailValidate1();          
    })

    const mailValidate1 = async () => {
        console.log("hit");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "text/plain");
        const email = localStorage.getItem("UserEmail");  
             
        const raw = JSON.stringify({
            "emailAddress": email,
            "token":mytoken1
        });
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        try {
            let response = await fetch(`${apiUrl}/api/mail/validateLink`, requestOptions)
            
            if (response.status === 200) {
                loginUser();                
            }
            else if (response.status === 400) {
                router.push(`/account/validateEmail`);
                localStorage.setItem("ValidationErrors","Email not Found!");

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

    const loginUser=async()=>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "text/plain");
        const email = localStorage.getItem("UserEmail");       
        const pass=localStorage.getItem("UserPassword");
        const raw = JSON.stringify({
            "emailAddress": email,
            "password": pass
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
                 window.location.href = "/";
            } else {
                router.push(`/account/validateEmail`)
            }
        }
        catch (error) {
            if (error instanceof Response) {
                alert(error.statusText);
            }
        }
    }
}
export default mailValidate;
mailValidate.getLayout = function PageLayout(page: JSX.Element) {
    return (
        <>{page}</>
    )
}
