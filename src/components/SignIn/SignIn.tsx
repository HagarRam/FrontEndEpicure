import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rootstate } from '../../store/store';
import { setActiveUsers } from '../../store/slices/usersSlice';
import './Signin.css';
import axios from 'axios';

const SignIn: React.FC = () => {
	const data = useSelector((state: Rootstate) => state.users.value);
	const filter = useSelector((state: Rootstate) => state.users.filteredValue);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [connect, setconnect] = useState<boolean>(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setActiveUsers({ email: email }));
	}, [email]);
	const logInUser = async () => {
		console.log(email);
		try {
			const userReq = await axios.post('http://localhost:8000/users/create/', {
				email: email,
				password: password,
			});
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
	const add = () => {
		const id = {
			_id: '640dae4cd58da0771cc7b736',
			firstName: 'yuval',
			lastName: 'weiss',
			email: 'yuval@gmail.com',
			password: '$2b$10$gqymgX/oTZMT.hmPZh4NvuRhw0O6ZvxB/0pjDfN/bu.9kj/lxjaJu',
			__v: 0,
			token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQwZGFlNGNkNThkYTA3NzFjYzdiNzM2IiwiZW1haWwiOiJ5dXZhbEBnbWFpbC5jb20iLCJpYXQiOjE2Nzg2MTgxODksImV4cCI6MTY3ODYyNTM4OX0.DDuNCB1tU4h9amu1795OlLjgnXsHHq-Qc9eAFHhrz70',
		};
		sessionStorage.setItem('data', JSON.stringify(id));
	};
	const navigate = useNavigate();
	return (
		<div id="sign-in-page">
			{' '}
			<form onSubmit={handleRegister}>
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
						<button
							id="add"
							onClick={add}>
							{' '}
							add
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
