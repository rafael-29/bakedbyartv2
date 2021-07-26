import React from 'react'
import {Link} from 'react-router-dom'

import Footer from './Footer';


const Home = ({contactOpen, setContactOpen}) => {



return (
<div className="home-page page">
    <div className="front-page">
        <img src="/images/bigwallpaper.jpg" alt="bakedbyart" className="fp-img" />
        <div className="hp-desc">
            <h1 className="welcome">Baked.By.Art</h1>

            <div className="banana-cookies">
                <Link className="bc-links" to="/banana">Banana Breads</Link>
                <Link className="bc-links" to="/cookies">Classic Cookies</Link>
            </div>
        </div>
    </div>
    
    <div className="categories" id="allmenu">
        <h2 className="c-title">Our Product</h2>

        <div className="categ">
            <div className="categ-bx">
                <Link to="/banana" style={{textDecoration: 'none'}}>
                <h2 className="categ-name" style={{background: '#d4bca3'}}>Banana Breads</h2>
                <div className="c-imgbx">
                <img src="./images/collectiontwo.jpg" alt="bakedbyart" className="categ-img" />
                </div>
                </Link>
            </div>
            <div className="categ-bx" >
                <Link to="/cookies" style={{textDecoration: 'none'}}>
                <h2 className="categ-name" style={{background: '#9e8153'}}>Cookies</h2>
                <div className="c-imgbx">
                <img src="./images/collectionthree.jpg" alt="bakedbyart" className="categ-img" />
                </div>
                </Link>
            </div>
        </div>
    </div>

    <div className="our-story" id="aboutus">
        <div className="os-left">
            <img src="./images/testwallone.jpg" className="story-img" alt="bakedbyart" />
        </div>
        <div className="os-right">
            <h2 className="os-ttle">Our Story</h2>
            <h3 className="os-ttle-two">MADE BY HAND, FROM SCRATCH, WITH LOVE</h3>
            <p className="os-desc">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

            </p>

        </div>
    </div>

    <Footer contactOpen={contactOpen} setContactOpen={setContactOpen} />
</div>
)
}

export default Home
