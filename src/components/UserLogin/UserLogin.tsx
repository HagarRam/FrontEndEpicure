import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import './UserLogin.css';
const UserLogin: React.FC = () => {
	const data = JSON.parse(sessionStorage.getItem('data') || '{}');

	const navigate = useNavigate();
	const logOut = (e: React.MouseEvent) => {
		e.preventDefault();
		navigate('/');
		sessionStorage.clear();
	};
	return (
		<div id="log-out">
			<NavBar />
			<div id="sign-in-container">
				<div id="log-out-title">
					{`HELLO ${data.firstName} ${data.lastName}`}{' '}
				</div>
				<button
					id="logout"
					onClick={(e) => logOut(e)}>
					Log Out
				</button>
			</div>
			<Footer />
		</div>
	);
};

export default UserLogin;
