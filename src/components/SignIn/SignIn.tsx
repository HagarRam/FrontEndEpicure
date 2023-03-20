import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Rootstate } from '../../store/store';
import { setActiveUsers } from '../../store/slices/usersSlice';
import './Signin.css';
import axios from 'axios';

const SignIn: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setActiveUsers({ email: email }));
	}, [email, dispatch]);

	const logInUser = async () => {
		console.log('pass');
		try {
			const userReq = await axios.post(
				'https://backendepicure.onrender.com/users/create/',
				{
					email: email,
					password: password,
				}
			);
			sessionStorage.setItem('data', JSON.stringify(userReq.data));
			dispatch(setActiveUsers(email));
			setEmail('');
			setPassword('');
			navigate('/');
		} catch (error: any) {
			alert(error.response.data);
			return [];
		}
	};

	const handleRegister = async () => {
		await logInUser();
	};
	const navigate = useNavigate();
	return (
		<div id="sign-in-page">
			{' '}
			<div id="sign-in-container">
				<div id="sign-in-title">
					<div id="sign-in">SIGN IN</div>
					<div>To continue the order, please sign in</div>
				</div>
				<div id="user-information">
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						id="input-information"
						placeholder="Email adress"
						type={'text'}
					/>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						id="input-information"
						placeholder="Password"
						type={'password'}
					/>
				</div>

				<div id="login-button">
					<button
						onClick={handleRegister}
						id="button-login"
						type="submit">
						LOGIN
					</button>
					<button id="forget-password-button">Forget password?</button>{' '}
					<div id="or-container">
						<hr className="hr-left" />
						<div id="or-letter">or</div>
						<hr className="hr-right" />
					</div>
					<button
						id="sign-up-button"
						onClick={() => navigate('/SignUp')}>
						SIGN UP
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
