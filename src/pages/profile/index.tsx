import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const Profile = () => {
    const router = useRouter();
    const formData = new FormData();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push('/account/login')
        }
        GetProfile();
        GetCompanyInfo();
    }, [router])

    const [userId, setUserId] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("Male")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [picture, setPicture] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png");

    const [companyName, setCompanyName] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [progress, setProgress] = useState("0%")
    const GetProfile = async () => {
        const token = localStorage.getItem("token");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        try {
            let response = await fetch(`${apiUrl}/api/account/profile`, requestOptions)

            if (response.status === 200) {
                const result = await response.json();
                setFirstName(result.member.firstName);
                setLastName(result.member.lastName);
                setEmailAddress(result.member.emailAddress);
                setUserId(result.member.id);
                setProgress("60%");
                if (result.memberProfile != null) {

                    setPhoneNumber(result.memberProfile.phoneNumber);
                    setGender(result.memberProfile.gender);
                    setAddress(result.memberProfile.address);
                    setPreviewUrl(apiUrl + "/" + result.memberProfile.picture);
                    setProgress("100%");
                }
            }
            else if (response.status == 401) {
                router.push('/account/login')
            }
            else {
                let result = await response.json();
                console.log(result);
            }
        }
        catch (error) {
            if (error instanceof Response) {
                alert(error.statusText);
            }
        }
    }

    const UpdateProfile = async () => {
        const token = localStorage.getItem("token");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", " multipart/form-data");
        myHeaders.append("Authorization", `Bearer ${token}`);

        // setting data
        if (picture) {
            formData.append('File', picture);
        }
        else {
            formData.append('File', "");
        }
        formData.append('Address', address);
        formData.append('PhonNumber', phoneNumber);
        formData.append('Gender', gender);


        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData
        };

        try {
            let response = await fetch(`${apiUrl}/api/account/memberProfile`, requestOptions)
            if (response.status === 200) {
                alert("profile updated successfully!")
            }
            else if (response.status == 401) {
                router.push('/account/login')
            }
            else {
                const result = await response.json();
                alert(result.error);
            }
        }
        catch (error) {
            if (error instanceof Response) {
                alert(error.statusText);
            }
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];
        if (file) {
            setPicture(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const GetCompanyInfo = async () => {
        const token = localStorage.getItem("token");
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        try {
            let response = await fetch(`${apiUrl}/api/account/memberInfo`, requestOptions)

            if (response.status === 200) {
                const result = await response.json();
                setCompanyName(result.company);
                setLocation(result.address);
                setPhone(result.number);
                SetNDAurl();                
            }
            else if (response.status == 401) {
                router.push('/account/login')
            }
            else {
                let result = await response.json();
                console.log(result);
            }
        }
        catch (error) {
            if (error instanceof Response) {
                alert(error.statusText);
            }
        }
    }

    const SetNDAurl = async () => {
        const token = localStorage.getItem("token")

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        try {
            const memberInfo = await fetch(`${apiUrl}/api/account/memberInfo`, requestOptions);
            const result=await memberInfo.json();
            let data = document.getElementById('secNDA');
            let data1=document.getElementById('downloadNDA');

            if (memberInfo.status == 200) {
                if (data != undefined && data1!=undefined) {
                    data.classList.remove('d-none')          
                    data1.setAttribute("href", apiUrl + "/Uploads/" + result.company + "_NDA.pdf");          
                }
                               
            }
            else if (memberInfo.status == 401) {
                router.push('/account/login')
            }           
            else{
                if (data != undefined) {
                    data.classList.add('d-none')          
                }
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
                <title>Innopikes | Profile</title>
            </Head>
            <section className="section pb-0 pt-0" id="PersonalInfo">
                <div className="col-md-10 ml-auto mr-auto">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="section pb-3">
                                    <section className="text-center">
                                        <div className="fileinput fileinput-new text-center" >
                                            <div className="fileinput-new thumbnail img-circle img-raised">
                                                {previewUrl && <img src={previewUrl} alt="Preview" />}
                                            </div>
                                            <div className="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                                            <div>
                                                <span className="btn btn-raised btn-round btn-default btn-file">
                                                    <span className="fileinput-new">Edit Photo</span>
                                                    <span className="fileinput-exists">Change</span>
                                                    <input type="file" name="..." onChange={handleFileChange} />
                                                </span>
                                                <br />
                                                <a href="#pablo" className="btn btn-danger btn-round fileinput-exists btn-simple" data-dismiss="fileinput"><i className="tim-icons icon-simple-remove"></i> Remove</a>
                                            </div>
                                        </div>
                                        <h3 className="title">{firstName} {lastName}</h3>
                                    </section>
                                    <section>
                                        <ul className="nav flex-column" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-toggle="tab" href="#link1" role="tablist">
                                                    <i className="tim-icons icon-single-02"></i> General
                                                </a>
                                            </li>

                                            <hr className="line-primary" />
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#link2" role="tablist">
                                                    <i className="tim-icons icon-credit-card"></i> Billing
                                                </a>
                                            </li>
                                            <hr className="line-primary" />
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#link3" role="tablist">
                                                    <i className="tim-icons icon-lock-circle"></i> Company
                                                </a>
                                            </li>
                                        </ul>
                                    </section>
                                    <br />
                                    <br />
                                    <section>
                                        <div className="progress-container progress-primary">
                                            <span className="progress-badge">Profile Completion</span>
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-warning" style={{ width: progress }}>
                                                    <span className="progress-value">{progress}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className="col-md-8 ml-auto">
                                <div className="section pb-3">
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="link1">
                                            <div>
                                                <header>
                                                    <h2 className="text-uppercase">General information</h2>
                                                </header>
                                                <hr className="line-primary" />
                                                <br />
                                                <div className="row">
                                                    <div className="col-md-3 align-self-center">
                                                        <label className="labels">First Name</label>
                                                    </div>
                                                    <div className="col-md-9 align-self-center">
                                                        <div className="form-group">
                                                            <input onChange={(event) => setFirstName(event.target.value)} value={firstName} name="firstName" className="form-control" type="text" placeholder="Charlie" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 align-self-center">
                                                        <label className="labels">Last Name</label>
                                                    </div>
                                                    <div className="col-md-9 align-self-center">
                                                        <div className="form-group">
                                                            <input onChange={(event) => setLastName(event.target.value)} value={lastName} name="lastName" className="form-control" type="text" placeholder="Bailey" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 align-self-center">
                                                        <label className="labels">Gender</label>
                                                    </div>
                                                    <div className="col-md-9 d-flex" style={{ marginBottom: "10px" }} >
                                                        <div className="form-check form-check-radio m-0">
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="radio" onChange={(event) => setGender(event.target.value)} checked={gender === 'Male'} name="exampleRadios" id="exampleRadios1" value="Male" />
                                                                <span className="form-check-sign"></span>
                                                                Male
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-radio m-0 ml-2">
                                                            <label className="form-check-label">
                                                                <input className="form-check-input" type="radio" onChange={(event) => setGender(event.target.value)} checked={gender === 'Female'} name="exampleRadios" id="exampleRadios1" value="Female" />
                                                                <span className="form-check-sign"></span>
                                                                Female
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 align-self-center">
                                                        <label className="labels" >Email</label>
                                                    </div>
                                                    <div className="col-md-9 align-self-center">
                                                        <div className="form-group">
                                                            <input onChange={(event) => setEmailAddress(event.target.value)} value={emailAddress} name="email" className="form-control" type="email" placeholder="charlie.bailey@example.com" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 align-self-center">
                                                        <label className="labels" >Your Location</label>
                                                    </div>
                                                    <div className="col-md-9 align-self-center">
                                                        <div className="form-group">
                                                            <input onChange={(event) => setAddress(event.target.value)} value={address} name="location" className="form-control" type="text" placeholder="Sydney, A" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 align-self-center">
                                                        <label className="labels" >Phone Number</label>
                                                    </div>
                                                    <div className="col-md-9 align-self-center">
                                                        <div className="form-group">
                                                            <input onChange={(event) => setPhoneNumber(event.target.value)} value={phoneNumber} name="phone" className="form-control" type="tel" placeholder="+40 745 031 200" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-md-12">
                                                        <button onClick={UpdateProfile} className="btn btn-primary float-right" type="submit" >Update Profile</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="link2">
                                            <header>
                                                <h2 className="text-uppercase">Billing method</h2>
                                            </header>
                                            <hr className="line-primary" />
                                            <br />
                                            <table className="table align-items-center">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Card Type</th>
                                                        <th scope="col">Card Number</th>
                                                        <th scope="col">Payment Method</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">
                                                            <img alt="Image" src="https://demos.creative-tim.com/blk-design-system-pro/assets/img/visas.png" className="avatar" style={{ backgroundColor: "transparent", borderRadius: "0px" }} />
                                                        </th>
                                                        <td>
                                                            <span className="d-block">•••• •••• •••• 8372</span>
                                                            <small className="text-muted">Exp: 06/22</small>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="form-check form-check-radio">
                                                                <label className="form-check-label">
                                                                    <input className="form-check-input" type="radio" name="exampleRadios" id="Radios" value="option2" />
                                                                    <span className="form-check-sign"></span>
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button type="submit" className="btn btn-danger btn-sm btn-simple" >
                                                                <i className="tim-icons icon-simple-remove"></i> Remove card
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <img alt="Image" src="https://demos.creative-tim.com/blk-design-system-pro/assets/img/mastercard.png" className="avatar" style={{ backgroundColor: "transparent", borderRadius: "0px" }} />
                                                        </th>
                                                        <td>
                                                            <span className="d-block">•••• •••• •••• 1225</span>
                                                            <small className="text-muted">Exp: 07/21</small>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="form-check form-check-radio">
                                                                <label className="form-check-label">
                                                                    <input className="form-check-input" type="radio" name="exampleRadios" id="Radios" value="option1" />
                                                                    <span className="form-check-sign"></span>
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button type="submit" className="btn btn-danger btn-sm btn-simple" >
                                                                <i className="tim-icons icon-simple-remove"></i> Remove card
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="row mt-4">
                                                <div className="col-md-12">
                                                    <button className="btn btn-primary btn-sm float-right" >
                                                        <i className="tim-icons icon-simple-add"></i> Add card
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="link3">
                                            <div>
                                                <header>
                                                    <h2 className="text-uppercase">Company information</h2>
                                                </header>
                                                <hr className="line-primary" />
                                                <br />
                                                <div className="row">
                                                    <div className="col-md-3 align-self-center">
                                                        <label className="labels">Company Name</label>
                                                    </div>
                                                    <div className="col-md-9 align-self-center">
                                                        <div className="form-group">
                                                            <input onChange={(event) => setCompanyName(event.target.value)} value={companyName} id="CompanyName" name="companyName" className="form-control" type="text" placeholder="abc .Co" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 align-self-center">
                                                        <label className="labels" >Location</label>
                                                    </div>
                                                    <div className="col-md-9 align-self-center">
                                                        <div className="form-group">
                                                            <input onChange={(event) => setLocation(event.target.value)} value={location} id="location" name="location" className="form-control" type="text" placeholder="Sydney, A" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 align-self-center">
                                                        <label className="labels" >Phone Number</label>
                                                    </div>
                                                    <div className="col-md-9 align-self-center">
                                                        <div className="form-group">
                                                            <input onChange={(event) => setPhone(event.target.value)} value={phone} id="phone" name="phone" className="form-control" type="tel" placeholder="+40 745 031 200" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="row d-none" id="secNDA">
                                                    <div className="col-md-12  mt-3">                                                        
                                                    <a href="" id="downloadNDA" download rel="noopener noreferrer" target="_blank" className="mr-1">Click</a> 
                                                   to Download the NDA (NON-DISCLOSURE AGREEMENT) </div>                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Profile;