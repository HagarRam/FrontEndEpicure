import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../store/slices/usersSlice';
import { Rootstate } from '../../store/store';
import './SignUp.css';

const SignUp: React.FC = () => {
	const usersData = useSelector(
		(state: Rootstate) => state.users.filteredValue
	);
	const [users, setUsers] = useState<any>(usersData);
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [connect, setconnect] = useState<boolean>(false);
	const registerUser = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) => {
		try {
			await fetch('http://localhost:8000/users/', {
				method: 'POST',
				body: JSON.stringify({
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setUsers((newUsers: IUser[]) => [...newUsers, data]);
					setFirstName('');
					setLastName('');
					setEmail('');
					setPassword('');
					navigate('/SignIn');
				});
		} catch (err) {
			alert('please try again');
			console.log(err);
		}
	};

	const navigate = useNavigate();
	const handleRegister = (e: any) => {
		e.preventDefault();
		console.log('registering user', firstName, lastName, email, password);
		registerUser(firstName, lastName, email, password);
		setconnect(true);
	};

	return (
		<div id="sign-Up-container">
			<div id="sign-up-title">
				<div id="sign-up">SIGN UP</div>
			</div>
			<div id="sign-up-information">
				<form onSubmit={handleRegister}>
					<input
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						id="input-sign-up-information"
						placeholder="First Name"
						type={'text'}
					/>
					<input
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						id="input-sign-up-information"
						placeholder="Last Name"
						type={'text'}
					/>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						id="input-sign-up-information"
						placeholder="Email"
						type={'text'}
					/>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						id="input-sign-up-information"
						placeholder="Password"
						type={'password'}
					/>{' '}
					<button id="submit-button">SUBMIT</button>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
