import React from 'react';
import RestaurantCard from '../PopularRestaurants/RestaurantCard';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../store/store';
import { IRestaurants } from '../RestaurantPage/RestaurantPage';

const RestaurantCardsPage: React.FC = () => {
	const restaurantsData = useSelector(
		(state: Rootstate) => state.restaurants.filteredValue
	);

	return (
		<div id="restaurant-page ">
			<div id="alltherestaurant">
				{restaurantsData.map((restaurant: IRestaurants) => {
					return (
						<RestaurantCard
							img={restaurant.img}
							name={restaurant.name}
							chef={restaurant.chef}
							rating={restaurant.rating}
							title={'page-card-element'}
							id={restaurant.id}
							titleStar={'stars'}
							titleImg={'img-rest'}
							key={restaurant.id}
							_id={restaurant._id}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default RestaurantCardsPage;
