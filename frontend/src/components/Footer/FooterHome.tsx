import { Facebook, Instagram } from "react-bootstrap-icons"
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="container text-white">
        <footer className="d-flex flex-wrap justify-content-between aling-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex aling-items-center">
                <a href="/" className="mb-3 me-2 mb-md-0 text-decoration-none 1h-1">RINCON VIAJERO</a>
                <span className="mb-3 mb-md-0">&copy; 2023 Argentina Programa 4.0, EPICA</span>
            </div>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li className="ms-3"><a href="#"><Facebook /></a></li>
                <li className="ms-3"><a href="#"><Instagram /></a></li>
                <li className="ms-3"><a href="#"><FaXTwitter /></a></li>
            </ul>

        </footer>
    </div>
  )
}

export default Footer