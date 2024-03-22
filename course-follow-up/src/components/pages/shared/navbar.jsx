import logo from '../../assets/tecnico.png'
import tecLogo from '../../assets/tec.png'

function Navbar () {
    return(
        <nav style={{ backgroundColor: '#092D4E' }} className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container-fluid">
                <div className="navbar-brand d-flex align-items-center">
                <img src={logo} alt="Logo" height="60" width="170" className="mr-3" />
                </div>
                <div className="ml-auto d-flex align-items-center">
                <img src={tecLogo} alt="TEC_Logo" height="60" width="250" className="mr-3" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;