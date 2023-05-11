import Head from 'next/head'
import Link from 'next/link';
const Navbar=()=>{
    return(
        <>
            <Head>
                <title>InnoPikes | Home</title>
                <meta name="description" content="InnoPikes|Home" />
            </Head>
            <nav className="navbar active position-fixed p-0 m-0" style={{height: "100%",width: "12%"}}>
                <div className="navbar-container pl-0">
                    <div className="navbar-logo-div">
                        <a className="navbar-logo-link" href={'/'}>
                            <span style={{fontWeight: "600 !IMPORTANT"}} className='ml-2'>Inno Pikes</span>
                        </a>
                        <button className="navbar-toggler"><i className='fas fa-solid fa-bars' style={{ color: "white" }}></i></button>
                    </div>
                    <ul className="menu-list">
                        <li className="menu-item">
                        <Link href="/" className="menu-link">
                            <i className="fas fa-solid fa-table"></i>
                                <span className="menu-link-text">Home</span>
                            </Link>                         
                        </li>
                        <li className="menu-item">
                        <Link href="/chat" className="menu-link">
                        <i className="fas fa-comments"></i>
                                <span className="menu-link-text">Chat</span>
                            </Link>                           
                        </li>
                        <li className="menu-item">
                        <Link href="/checkout" className="menu-link">

                        <i className="fas fa-money-bill-alt"></i>
                                <span className="menu-link-text">Checkout</span>
                            </Link>                           
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};
export default Navbar;