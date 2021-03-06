import React from 'react';
import * as actions from '../actions/userActions';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { IMyUser } from '../reducers/myUserReducer';
import './styles/LoginPage.css';

interface IProps {
	saveToken: (token: string) => void;
	saveMyUser: (myUser: IMyUser) => void;
}

const Login: React.FC<IProps> = (props) => {
	const [ email, setEmail ] = React.useState<string>('');
	const [ password, setPassword ] = React.useState<string>('');
	const [ error, setError ] = React.useState('');

	const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.currentTarget.value);
		setError('');
	};

	const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.currentTarget.value);
		setError('');
	};

	const getToken = () => {
		if (email && password) {
			fetch('http://localhost:3000/api/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			}).then((res) => {
				if (res.ok) {
					res.text().then((token) => {
						localStorage.setItem('token', token);
						props.saveToken(token);
						const decode = jwt.decode(token);
						console.log(decode);
						if (typeof decode !== 'string' && decode !== null) {
							props.saveMyUser(decode);
						}
					});
				}
			});
		} else {
			setError('You have to introduce your email and password');
		}
	};

	return (
		<div className="BackgroundImageLogin">
			<div className="container-fluid">
				<div className="row">
					​
					<div className="col-md-6 col-lg-2 justify-content-center">
						​
						<div className="card-login">
							​
							<div className="card-body-login mx-4">
								​
								<img className="logo" src="images/LogoLabtex.png" alt="" width="90" height="58" />
								<div className="text-center">
									<h3 className="dark-grey-text mb-5" />
								</div>
								​
								<div className="md-form">
									<input
										type="text"
										id="Form-email1"
										className="form-control"
										value={email}
										onChange={updateEmail}
									/>
									<label className="label1" htmlFor="Form-email1">
										Your email
									</label>
								</div>
								​
								<div className="md-form pb-3">
									<input
										type="password"
										id="Form-pass1"
										className="form-control"
										value={password}
										onChange={updatePassword}
									/>
									<label className="label2" htmlFor="Form-pass1">
										Your password
									</label>
									<p className="font-small blue-text d-flex justify-content-end" id="forgot">
										Forgot{' '}
										<a href="#" className="blue-text ml-1" id="azul1">
											Password?
										</a>
									</p>
								</div>
								​
								<div className="text-center mb-3">
									<button
										type="submit"
										className="btn blue-gradient btn-block btn-rounded z-depth-1a waves-effect waves-light"
										onClick={getToken}
									>
										Sign in
									</button>
									{error && <div className="div">{error}</div>}
								</div>
								​ ​
							</div>
							​
							<div className="modal-footer mx-5 pt-3 mb-1">
								<p className="font-small grey-text d-flex justify-content-end" id="member">
									Not a member?{' '}
									<a href="#" className="blue-text ml-1" id="azul2">
										Sign Up
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = {
	saveToken: actions.saveToken,
	saveMyUser: actions.saveMyUser
};

export default connect(null, mapDispatchToProps)(Login);
