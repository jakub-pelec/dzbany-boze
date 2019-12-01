import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import Paragraph from '../textVariant/Paragraph';
import Header from '../textVariant/Header';
import {
	authenticateUser,
	showInformationAboutRegister,
	createDocumentInDb
} from '../../actions/actions';
import firebaseAuth from '../../firebase/firebaseAuth';
import './login-page-style.css';
import hello from '../../assets/Hello.svg';
import loginPageWave from '../../assets/login-page-wave.svg';

// eslint-disable-next-line max-lines-per-function
const LoginPage = ({
	authenticateUser: authenticateUserProps,
	errorMessage,
	showInformationAboutRegister: showInformationAboutRegisterProps,
	registerMessage,
	history
}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emptyFields, setEmptyFields] = useState(false);

	/**
	 * Handle user input.
	 * @param {event} event - html5 event
	 */
	const handleChange = event => {
		const { name, value } = event.target;
		switch (name) {
			case 'email':
				setEmail(value);
				if (emptyFields) {
					setEmptyFields(false);
				}
				break;
			case 'password':
				setPassword(value);
				if (emptyFields) {
					setEmptyFields(false);
				}
				break;
			default:
				break;
		}
	};

	/**
	 * Handles login and registration.
	 * @param {string} type - determines if user wants to register or login.
	 */
	const handleClick = type => {
		if (password && email) {
			if (type === 'register') {
				firebaseAuth(email, password);
				createDocumentInDb(email);
				showInformationAboutRegisterProps(true);
			} else {
				authenticateUserProps(email, password);
				history.push('/nickname');
			}
		} else {
			setEmptyFields(true);
		}
	};

	return (
		<div className='login-page-container'>
			<div className='container'>
				<section className='login-page-section'>
					<img className='logo' src={hello} alt='hello' />
					<p>please log in</p>
					<ul>
						<div class='input-container'>
							<TextField
								style={{
									marginBottom: '1em',
									width: '80%'
								}}
								// fullWidth="1"
								variant='outlined'
								color='secondary'
								placeholder='email'
								name='email'
								type='email'
								onChange={event => handleChange(event)}
								InputProps={{
									style: {
										color: 'white'
									}
								}}
							/>
							<TextField
								style={{
									marginBottom: '1em',
									width: '80%'
								}}
								variant='outlined'
								color='secondary'
								placeholder='password'
								name='password'
								type='password'
								fullWidth='1'
								onChange={event => handleChange(event)}
								InputProps={{
									style: {
										color: 'white'
									}
								}}
							/>
						</div>
						<div class='sign-in-btn-container'>
							<button
								onClick={() => handleClick('login')}
								className='sign-in-btn'>
								SIGN IN
							</button>

							<button
								onClick={() => handleClick('register')}
								className='register-btn'>
								register
							</button>
						</div>
					</ul>
				</section>
				{errorMessage && (
					<div className='error-message'>{errorMessage}</div>
				)}
				{registerMessage && (
					<div className='error-message'>Registered succesfully</div>
				)}
				{emptyFields && (
					<div className='error-message'>Register first!</div>
				)}
			</div>
			<img
				class='login-page-wave'
				src={loginPageWave}
				alt='loginpagewave'
			/>
			{/* <img src={require("../../assets/login-page-wave.svg")} alt="login-page-wave" class="login-page-wave"/>  */}
		</div>
	);
};

const mapStateToProps = state => ({
	errorMessage: state.authReducer.errorMessage,
	registerMessage: state.authReducer.userRegisteredMessage
});

LoginPage.propTypes = {
	authenticateUser: PropTypes.func.isRequired,
	errorMessage: PropTypes.string,
	showInformationAboutRegister: PropTypes.func,
	registerMessage: PropTypes.func,
	history: PropTypes.shape({
		push: PropTypes.func
	})
};

export default withRouter(
	connect(mapStateToProps, {
		authenticateUser,
		showInformationAboutRegister
	})(LoginPage)
);
