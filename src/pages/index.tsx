import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const router = useRouter()
    const OpenInfoModal = () => {
        const modal = document.getElementById("exampleModal");
        if (modal) {
            modal.style.display = 'block';
            modal.classList.add('show');
        }
    }
    const OpenPdfModal = async () => {
        getPdfDetails();
        const modal = document.getElementById("pdfModal");
        if (modal) {
            modal.style.display = 'block';
            modal.classList.add('show');
        }
    }
    const OpenRequirementModal = () => {
        PdfModalDismiss();
        const modal = document.getElementById("requirementModal");
        if (modal) {
            modal.style.display = 'block';
            modal.classList.add('show');
        }
    }

    const getInfo = async () => {
        const token = localStorage.getItem("token")

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        try {
            const memberInfo = await fetch(`${apiUrl}/api/account/memberInfoRequirement`, requestOptions);

            if (memberInfo.status == 200) {
                let result=await memberInfo.json();
                let username=result.member.firstName+" "+result.member.lastName;
                setName(username);
                if(result.memberInfo == null){
                    OpenInfoModal();
                    PdfModalDismiss();
                    RequirementModalDismiss();
                }
                else if(result.memberRequirement==null){
                    InfoModalDismiss();
                    PdfModalDismiss();
                    OpenRequirementModal();
                }                
            }
            else if (memberInfo.status == 401) {
                router.push('/account/login')
            }
            else {
                console.log("not added!");
                OpenInfoModal();
            }
        }
        catch (error) {
            if (error instanceof Response) {
                alert(error.statusText);
            }
        }

    }
    const getPdfDetails = async () => {
        const token = localStorage.getItem("token")

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const raw = JSON.stringify({
            "receivingPartyName": name,
            "receivingPartyDate": new Date().toLocaleDateString(),
            "disclosingPartyDate": new Date().toLocaleDateString(),
            "effectiveDate": new Date().toLocaleDateString(),
            "address": address,
            "companyName": company
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const memberInfo = await fetch(`${apiUrl}/api/account/downloadNDA`, requestOptions);
        let info = await memberInfo.text();
        console.log(info);
        let data = document.getElementById('AppFrame');
        if (data != undefined) {
            data.setAttribute("src", apiUrl + "/" + info);          
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        document.getElementById('exampleModal')
        if (!token) {
            router.push('/account/login')
        }
        getInfo();
    }, [getInfo, router])

    const AddInfo = async () => {
        const token = localStorage.getItem("token")

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        if(name==""||company==""||number==""||address==""){
            let ErrorList= document.getElementById("ErrorList");
                if(ErrorList !=null){
                    ErrorList.innerHTML = "* All fields are mandatory!";
                }            
            }
        else{
            const raw = JSON.stringify({
                "name": name,
                "company": company,
                "number": number,
                "address": address
            });
    
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };    
            const memberInfo = await fetch(`${apiUrl}/api/account/addInfo`, requestOptions);
            const result = await memberInfo.json()
            if (memberInfo.status === 200) {
                InfoModalDismiss();
                OpenPdfModal();
            }
            else {
                alert(result.error);
            }
        }
     
    }
    const AddRequirements = async () => {
        let data = document.querySelector('input[name=speciality]');
        if (data != undefined) {
            const speciality = document.querySelectorAll<HTMLInputElement>('input[name="speciality"]:checked');
            const SpecialityValues = Array.from(speciality).map(Speciality => Speciality.value);
            const Speciality = SpecialityValues.join(',');
            /////
            const programmingLanguages = document.querySelectorAll<HTMLInputElement>('input[name="programmingLanguages"]:checked');
            const ProgrammingLanguagesValues = Array.from(programmingLanguages).map(ProgrammingLanguages => ProgrammingLanguages.value);
            const ProgrammingLanguages = ProgrammingLanguagesValues.join(',');
            /////
            const technologies = document.querySelectorAll<HTMLInputElement>('input[name="technologies"]:checked');
            const TechnologiesValues = Array.from(technologies).map(Technologies => Technologies.value);
            const Technologies = TechnologiesValues.join(',');
            /////
            const languages = document.querySelectorAll<HTMLInputElement>('input[name="languages"]:checked');
            const LanguagesValues = Array.from(languages).map(languages => languages.value);
            const Languages = LanguagesValues.join(',');
            if(speciality.length==0 || programmingLanguages.length==0 || technologies.length==0|| languages.length==0){
                let RequirementError= document.getElementById("RequirementError");
                if(RequirementError !=null)RequirementError.innerHTML = "* Each section must have at least one choice!";                
            }
            else{
                let RequirementError= document.getElementById("RequirementError");
                if(RequirementError !=null)RequirementError.innerHTML = "";
                
                const token = localStorage.getItem("token")

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", `Bearer ${token}`);
    
                const raw = JSON.stringify({
                    "Specialities": Speciality,
                    "ProgrammingLanguages": ProgrammingLanguages,
                    "Technologies": Technologies,
                    "Languages": Languages,
                });
    
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                };
                const addRequirement = await fetch(`${apiUrl}/api/account/addRequirement`, requestOptions);
                const result = await addRequirement.json()
                if (addRequirement.status == 200) {
                    RequirementModalDismiss();
                    alert("Data Submitted!");
                }
                else {
                    alert(result.error);
                }
            }           
        }
    }

    const InfoModalDismiss = () => {
        const modal = document.getElementById("exampleModal");
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    }
    const PdfModalDismiss = () => {
        const modal = document.getElementById("pdfModal");
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    }
    const RequirementModalDismiss = () => {
        const modal = document.getElementById("requirementModal");
        if (modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    }
    return (
        <>
            <Head>
                <title>Innopikes | Home</title>
                <meta name="description" content="Innopikes" />
            </Head>
            {/* Info Model */}
            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog mt-0 mb-0" role="document">
                    <div className="modal-content">

                        <div className="card">
                            <div className="card-header">
                                <h3 className="modal-title mb-3" id="exampleModalLabel">Just a few details</h3>
                                <button type="button" className="close" onClick={InfoModalDismiss} aria-label="Close" style={{ fontSize: "1.5rem", padding: "10px" }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="card-body">
                                <form className="form">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <p className="category">Your Name : </p>
                                                <input type="text" onChange={(event) => setName(event.target.value)} value={name} id="name" className="form-control" placeholder="Your Name" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-1">
                                            <div className="form-group">
                                                <p className="category">Your Company : </p>
                                                <input type="text" onChange={(event) => setCompany(event.target.value)} className="form-control" placeholder="Your Company" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-1">
                                            <div className="form-group">
                                                <p className="category">Company Number : </p>
                                                <input type="number" onChange={(event) => setNumber(event.target.value)} className="form-control" placeholder="Number" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-1">
                                            <div className="form-group">
                                                <p className="category">Address : </p>
                                                <input type="text" onChange={(event) => setAddress(event.target.value)} className="form-control" placeholder="Address" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-1">
                                        <span id='ErrorList' className="text-danger"></span>
                                        </div>
                                    </div>
                                </form>
                                <a onClick={AddInfo} className="btn btn-primary pull-right" style={{ color: "white" }}>Next</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pdf Model */}
            <div className="modal fade" id="pdfModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen"
                    style={{
                        width: "100vw",
                        maxWidth: "none",
                        height: "100%",
                        margin: "0",
                        transform: "none"
                    }}>
                    <div className="modal-content h-100">

                        <div className="card h-100">
                            <div className="card-header">
                                <h3 className="modal-title mb-3" id="exampleModalLabel">NON-DISCLOSURE AGREEMENT</h3>
                            </div>
                            <div className="card-body  text-center">
                                <iframe id='AppFrame' style={{ width: "-webkit-fill-available", height: "100%" }} />


                            </div>
                            <div className='card-footer' style={{ padding: "15px", paddingTop: "0px" }}>
                                <a onClick={OpenRequirementModal} className="btn btn-primary pull-right" style={{ color: "white" }}>Next</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="modal-dialog modal-fullscreen" role="document">

                     <div className="modal-content">

                        <div className="card">
                            <div className="card-header">
                                <h3 className="modal-title mb-3" id="exampleModalLabel">NON-DISCLOSURE AGREEMENT</h3>
                            </div>
                            <div className="card-body  text-center">
                                <iframe id='AppFrame' style={{ width: "-webkit-fill-available", height: "320px" }} />


                            </div>
                            <div className='card-footer' style={{ padding: "15px", paddingTop: "0px" }}>
                                <a onClick={OpenRequirementModal} className="btn btn-primary pull-right" style={{ color: "white" }}>Next</a>
                            </div>
                        </div>
                    </div> 
                </div>*/}
            </div>
            {/* Requirement Model */}
            <div className="modal fade" id="requirementModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog mt-0 mb-0" role="document" >
                    <div className="modal-content">

                        <div className="card">
                            <div className="card-header">
                                <h3 className="modal-title mb-3" id="exampleModalLabel">Who do you need?</h3>
                                <button type="button" className="close" onClick={RequirementModalDismiss} aria-label="Close" style={{ fontSize: "1.5rem", padding: "10px" }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="card-body p-2" style={{ paddingBottom: "0px!Important" }}>
                                <div className="card-body pt-0">
                                    <div className="row">
                                        <div className="pt-0">
                                            <div className="row pt-2">
                                                <div className="col-md-12">
                                                    <h4 className='m-1'> Speciality</h4>
                                                </div>
                                                <div className="col-md-12">
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="speciality" value="BackendDeveloper" />
                                                        <span className="PillList-label">
                                                            Backend Developer
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="speciality" value="FrontEndDeveloper" />
                                                        <span className="PillList-label">
                                                            FrontEnd Developer
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="speciality" value="Designer" />
                                                        <span className="PillList-label">
                                                            Designer
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="speciality" value="Manager" />
                                                        <span className="PillList-label">
                                                            Manager
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="speciality" value="QA" />
                                                        <span className="PillList-label">
                                                            QA
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row pt-2">
                                                <div className="col-md-12">
                                                    <h4 className='m-1'> Programming Languages</h4>
                                                </div>
                                                <div className="col-md-12">
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="programmingLanguages" value="PHP" />
                                                        <span className="PillList-label">
                                                            PHP
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="programmingLanguages" value="Python" />
                                                        <span className="PillList-label">
                                                            Python
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="programmingLanguages" value="Java" />
                                                        <span className="PillList-label">
                                                            Java
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="programmingLanguages" value="C#" />
                                                        <span className="PillList-label">
                                                            C#
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="programmingLanguages" value="ASP.Net" />
                                                        <span className="PillList-label">
                                                            ASP.Net
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="programmingLanguages" value="GoLang" />
                                                        <span className="PillList-label">
                                                            GoLang
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="programmingLanguages" value="MySQL" />
                                                        <span className="PillList-label">
                                                            MySQL
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="programmingLanguages" value="MySQL" />
                                                        <span className="PillList-label">
                                                            MySQL
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row pt-2">
                                                <div className="col-md-12">
                                                    <h4 className='m-1'> Technologies</h4>
                                                </div>
                                                <div className="col-md-12">
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="technologies" value="CI/CD" />
                                                        <span className="PillList-label">
                                                            CI/CD
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="technologies" value="Docker" />
                                                        <span className="PillList-label">
                                                            Docker
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="technologies" value="Denkines" />
                                                        <span className="PillList-label">
                                                            Denkines
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="technologies" value="Git" />
                                                        <span className="PillList-label">
                                                            Git
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row pt-2">
                                                <div className="col-md-12">
                                                    <h4 className='m-1'> Languages</h4>
                                                </div>
                                                <div className="col-md-12">
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="languages" value="English" />
                                                        <span className="PillList-label">
                                                            English
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="languages" value="French" />
                                                        <span className="PillList-label">
                                                            French
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                    <label className="PillList-item">
                                                        <input type="checkbox" name="languages" value="Arabic" />
                                                        <span className="PillList-label">
                                                            Arabic
                                                            <span className="Icon Icon--checkLight Icon--smallest"><i className="fa fa-check"></i></span>

                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pt-2'>
                                        <span id='RequirementError' className="text-danger"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card-footer mt-0' style={{ padding: "5px", paddingTop: "0px" }}>
                                <a onClick={AddRequirements} className="btn btn-primary pull-right" style={{ color: "white" }}>Save</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}