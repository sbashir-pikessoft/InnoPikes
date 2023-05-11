import {useRouter} from "next/navigation";
import Link from 'next/link';
const Header = () => {
    const router = useRouter()
    const logout = () => {
        localStorage.removeItem("token");
        router.push('/account/login')
    }
    return (
        <>
            <div className="row justify-content-end m-0 bg-primary" style={{position:"static"}} >
                <div className="col-1 p-0">
                    <ul className="nav p-2">
                        <li className="nav-item">
                        <Link href={'/profile'} className="nav-link  pl-0" style={{color:"white"}} title="User Profile">
                            <i className="fas fa-solid fa-user"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a onClick={logout} className="nav-link  pl-0" style={{color:"white"}} title="Logout">
                            <i className="fas fa-sign-out-alt"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>           
        </>
    )
}
export default Header;