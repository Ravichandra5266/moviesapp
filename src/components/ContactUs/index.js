import "./index.css";

import {AiFillTwitterCircle , AiFillYoutube} from 'react-icons/ai'

import {BsFacebook , BsInstagram} from 'react-icons/bs'

const ContactUs = () => (
	<div className="contact">
		<h1 className="contact-title">Contact Us</h1>
        <div className="contact-flex">
            <AiFillTwitterCircle className="cont-icons"/>
            <AiFillYoutube className="cont-icons"/>
            <BsFacebook className="cont-icons"/>
            <BsInstagram className="cont-icons"/>
        </div>
	</div>
);

export default ContactUs;
