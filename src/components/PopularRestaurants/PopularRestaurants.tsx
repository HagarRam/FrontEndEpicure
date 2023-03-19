import React from 'react';
import './PopularRestaurants.css';
import RestaurantCard from './RestaurantCard';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setAllRestuarants } from '../../store/slices/restaurantsSlice';
import { Rootstate } from '../../store/store';
import { IRestaurants } from '../RestaurantPage/RestaurantPage';

const PopularRestaurants: React.FC = () => {
	const restaurantsData = useSelector(
		(state: Rootstate) => state.restaurants.value
	);
	let index: number = 0;

	function dispatch(arg0: {
		payload: undefined;
		type: 'restaurants/setAllRestuarants';
	}): void {
		throw new Error('Function not implemented.');
	}

	return (
		<div id="restaurant-card ">
			<div id="titlecard">POPULAR RESTAURANT IN EPICURE:</div>
			<div id="allthecard">
				<div id="restaurantCard">
					{restaurantsData.map((restaurant: IRestaurants) => {
						if (index < 3 && restaurant.popular) {
							index += 1;
							return (
								<RestaurantCard
									img={restaurant.img}
									name={restaurant.name}
									chef={restaurant.chef}
									rating={restaurant.rating}
									title={'rest-card-element'}
									id={restaurant.id}
									titleStar={'stars'}
									titleImg={'img-rest'}
									key={restaurant.id}
									_id={restaurant._id}
								/>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
			<NavLink
				onClick={() => dispatch(setAllRestuarants())}
				to="/Restaurant"
				id="all-the-Restaurants-button"
				className={({ isActive }) => (isActive ? 'on-page' : 'not-on-page')}>
				All Restaurants {'>>'}
			</NavLink>
		</div>
	);
};

export default PopularRestaurants;
