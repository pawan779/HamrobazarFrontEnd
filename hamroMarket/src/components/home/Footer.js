import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <MDBFooter  className="font-small pt-4 mt-4 footer">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title text-center">HamroMarket</h5>
            <p className="text-center">
             Welcome to Hamro Market. Nepals no1 second selling and buying shop online. You can buy and sell any items in this website.
            </p>
          </MDBCol>
          <MDBCol md="6" className="text-center">
            <h5 className="title text-center">Links</h5>
            <ul>
              <li className="list-unstyled text-center">
                <Link to="/">Home</Link>
              </li>
              <li className="list-unstyled text-center">
               <Link to="/about">About us</Link>
              </li>
              <li className="list-unstyled text-center">
              <Link to="/contact">Contact us</Link>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <Link to="/">Hamromarket.com</Link>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;