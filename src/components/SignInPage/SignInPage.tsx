import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import SignIn from '../SignIn/SignIn';
import './SignInPage.css';

const SignInPage: React.FC = () => {
	return (
		<div id="sign-in-page">
			<NavBar />
			<SignIn />
			<Footer />
		</div>
	);
};

export default SignInPage;
