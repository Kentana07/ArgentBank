import { Link } from 'react-router-dom';
import logo from "../../img/argentBankLogo.webp";
import "./style.css"
import Loginandout from '../../components/Log-in_out';

function Header(){
    return (
        <header>
            <nav className='main-nav'>
                <Link to="/"className='logo-link'><img src={logo} alt="logo argent bank" className='logo' />
                </Link>
                <div>
                    <Loginandout/>
                </div>
            </nav>
        </header>
    )
}


export default Header