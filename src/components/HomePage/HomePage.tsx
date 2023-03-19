import AboutUs from '../AboutUs/AboutUs';
import ChefOfTheWeek from '../ChefOfTheWeek/ChefOfTheWeek';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';
import IconMenu from '../IconMenu/IconMenu';
import NavBar from '../NavBar/NavBar';
import PopularRestaurants from '../PopularRestaurants/PopularRestaurants';
import SignatureDish from '../SignatureDish/SignatureDish';
import './HomePage.css';
const Home: React.FC = () => {
	return (
		<div id="homePage">
			<NavBar />
			<Hero />
			<PopularRestaurants />
			<SignatureDish />
			<IconMenu />
			<ChefOfTheWeek />
			<AboutUs />
			<Footer />
		</div>
	);
};

export default Home;
