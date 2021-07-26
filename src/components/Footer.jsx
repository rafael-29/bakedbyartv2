import React from 'react'


const Footer = ({contactOpen, setContactOpen}) => {
return (
<div style={{position: 'relative'}}>

    <footer>
        <div className="footer-logobx">
            <img src="/images/april.png" alt="baked.by.art" 
            className="footer-logoimg"/>
        </div>
    
        <div className="custom-tell">
            <div className="cst-one">
            <p className="custom-head">CUSTOM ORDERS</p>
            <p className="custom-cnt">Would you like to place a Custom Order or have a special request? </p>
            <a href="mailto:aprilbtupas@gmail.com" className="footer-a">message us</a>
            </div>
    
            <div className="cst-two">
            <p className="custom-head">WE LOVE TO HEAR FROM YOU</p>
            <p className="custom-cnt">Have feedback about our products or service? Please contact us directly at:</p>
            <a href="mailto:aprilbtupas@gmail.com" className="footer-a">aprilbtupas@gmail.com</a>
            </div>
        </div>
    
        <div className="footer-categ">
            <ul className="footer-nav">
                <li className="footer-li">
                <a href="http://localhost:3000/#aboutus" className="footer-a">ABOUT</a>
                </li>
                <li className="footer-li">
                    <a href="http://localhost:3000/#allmenu" className="footer-a">MENU</a>
                </li>
                <li className="footer-li" onClick={() => setContactOpen(!contactOpen)}>
                    <span style={{cursor: 'pointer'}} className="footer-a">CUSTOM ORDER</span>
                </li>
            </ul>
        </div>
    
    </footer>
    <div className="copyright">
    <p className="p-copyright">Copyright © Baked.By.Art 2020</p>
    </div>
            
</div>
)
}

export default Footer
