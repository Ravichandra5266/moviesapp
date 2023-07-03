import { useState } from "react";

import Cookies from "js-cookie";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import "./index.css";

const LoginPage = (props) => {
	const [username, setUserName] = useState("");

	const [password, setPassword] = useState("");

	const [errorMsg, setErrorMsg] = useState("");

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const onchangeUserid = (event) => {
		setUserName(event.target.value);
	};

	const onchangePassword = (event) => {
		setPassword(event.target.value);
	};

	const onsubmitForm = async (event) => {
		event.preventDefault();
		const url = "https://apis.ccbp.in/login";

		const options = {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
		};


		const req = await fetch(url, options);


		const res = await req.json();

		if (req.ok) {
			Cookies.set("jwt_token", res.jwt_token, { expires: 30 });
      const {history} = props
     history.replace('/')
		} else {
			setErrorMsg(res.error_msg);
			setIsFormSubmitted(true);

		}
	};

	const token = Cookies.get('jwt_token')

	if(token !== undefined){
		return <Redirect to = '/'/>
	}

	return (
		<div className="login-bg-container">
			<div className="login-container">
				<h1 className="login-logo-name">MOVIES</h1>
				<form onSubmit={onsubmitForm} className="login-form">
					<h1 className="login-form-logo">Login</h1>
					<label htmlFor="userid" className="login-labels">
						UserName
					</label>
					<input
						type="text"
						placeholder="Username"
						id="userid"
						className="login-inputs"
						onChange={onchangeUserid}
					/>
					<label htmlFor="password" className="login-labels">
						Password
					</label>
					<input
						type="password"
						placeholder="Password"
						id="password"
						className="login-inputs"
						onChange={onchangePassword}
					/>

					{isFormSubmitted ? <p className="error-msg">{errorMsg}</p> : ""}

					<button type="submit" className="login-form-btn">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
