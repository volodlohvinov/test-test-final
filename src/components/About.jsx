import React from "react";

import Header from './Header.jsx'
import Footer from "./Footer.jsx";
import { Button } from 'antd';
import { linkButton } from './button.module.scss'
import './About.scss'


    

const About = () => {
    

    const toTelegram = () => {
        window.open ('https://t.me/NeveRolll', '_blank');
       };

       const toInstagram = () => {
        window.open ('https://www.instagram.com/nxrdw4y/', '_blank');
       };

       const toGmail = () => {
        window.open ('https://mail.google.com/mail/u/0/', '_blank');
       };

    return(<div >
        <Header />
        <div className="About__wrapper">
            <div className="About__container">
                <div className="About__text-container">
                    <p className="About__title">About us</p>
                    <p className="About__description">It takes a lot to be called the best tasting smoothie on the Planet!, and we’re proud of our history, team members, 
                        and product innovations. Smoothie® is dedicated to the proposition that all smoothies are not created equal. 
                        We are focused on delivering great-tasting products in a wide variety of options to fit the unique needs that your taste and 
                        lifestyle demand. Smoothie® mission, vision, 
                        and values below are what drive us to deliver an awesome smoothie experience to you each and every time.</p>
                </div>
                <img className="About__picture" src="../static/people-drink.jpg" alt="picture"/>
            </div>
            <div className="About__container-reverse">
                <div className="About__text-container">
                    <p className="About__title">Our goal</p>
                    <p className="About__description">
                    To make every guest’s day better by serving great-tasting products as a celebration of health and happiness.</p>
                </div>
                <img className="About__picture" src="../static/drink.jpg" alt="picture"/>
            </div>
            <h1> Our contacts</h1>
        <div className="About__cards">
            <div className="About__card">
            <img className="About__logo" src="../static/telegram logo.png" alt="telegram" />
                <p className="">Telegram</p>
                <Button onClick={toTelegram} className={'button ' + linkButton}>Contact</Button>
                <p>Text us in Telegram</p>

            </div>
            <div className="About__card">
            <img className="About__logo" src="../static/instagram-logo.png" alt="instagram" />
                <p className="About__text">Instagram</p>
                <Button onClick={toInstagram}  className={'button ' + linkButton}>Contact</Button>
                <p>Text us in Instagram</p>
            </div>
            <div className="About__card">
            <img className="About__logo" src="../static/email logo.png" alt="email" />
                <p className="About__text">Email</p>
                <Button onClick={toGmail} className={'button ' + linkButton}>Contact</Button>
                <p>Text us on Gmail</p>
                <p>vladimirpravda2@gmail.com</p>
            </div>
            
        </div>
        </div>

        <Footer />
        </div>
    )
}

export default About