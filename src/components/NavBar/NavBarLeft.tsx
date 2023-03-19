import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { setAllchefs } from '../../store/slices/chefSlice';
import { setAllRestuarants } from '../../store/slices/restaurantsSlice';
import logo from './imageNavBar/logo.svg';
import titleLogo from './imageNavBar/TitleLogo.svg';

const NavBarLeft: React.FC = () => {
	const data = JSON.parse(sessionStorage.getItem('data') || '{}');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<div className="navbarleft">
			<div
				id="logoImage"
				onClick={() => navigate('/')}>
				<img
					alt="titleLogo"
					id="logo"
					src={logo}
				/>
				<img
					alt="titleLogo"
					id="titleLogo"
					src={titleLogo}
				/>
			</div>
			<div id="allTheButton">
				<NavLink
					onClick={() => dispatch(setAllRestuarants())}
					to="/Restaurant"
					id="restaurantButton"
					className={({ isActive }) => (isActive ? 'on-page' : 'not-on-page')}>
					Restaurants
				</NavLink>
				<NavLink
					onClick={() => dispatch(setAllchefs())}
					to="/chefsPage"
					id="chefButoon"
					className={({ isActive }) => (isActive ? 'on-page' : 'not-on-page')}>
					Chefs
				</NavLink>
			</div>
		</div>
	);
};

export default NavBarLeft;
