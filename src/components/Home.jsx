import React from "react";
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { coolButton } from './button.module.scss'
import './Home.scss'




const Home  = () => {
    return ( <div className="Home__main">
        <h1 className="Home__welcome">Welcome to the smoothie bar</h1>
        <div className="Home__promotion-container">
            <div className="Home__text_container">
            <p className="Home__title">Nutritious and oh, so good!</p>
            <p className="Home__description">Our smoothies are made to order. each cup is filled to the rim with fruit, 
                      veggies, juice, grains, nuts and berries. packed with vitamins, essential nutrients and natural energy!</p>
                      </div>
            <img className="Home__picture" src="../static/smoothie.png" alt="picture"/>
            
        </div>
        <div className="Home__promotion-container-reverse">
            <div className="Home__text_container">
            <p className="Home__title">Suspiciously tasty!</p>
            <p className="Home__description">SX is based on the pretty simple philosophy that "if it doesn't taste good, 
            we won't sell it". we live flavor first and take pride in making healthy food so good it almost makes you wonder...</p>
                      </div>
            <img className="Home__picture" src="../static/smoothie-different.jpg" alt="picture"/>
             </div>
             <div className="Home__promotion-container">
            <div className="Home__text_container">
            <p className="Home__title">SPECIAL OFFER!</p>
            <p className="Home__description">Super mixes  which are 10% cheaper than in constructor</p>
            <Link to="/special-smoothie"> <Button className={'button ' + coolButton}>GET IT NOW</Button></Link>
                      </div>
            <img className="Home__picture" src="../static/special-smoothie.jpg" alt="picture"/>
             </div>


</div>
    )
}

export default Home