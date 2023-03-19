import { ObjectId } from 'mongoose';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rootstate } from '../../store/store';
import { IChef } from '../ChefPage/ChefPage';
import { IRestaurants } from '../RestaurantPage/RestaurantPage';

const ChefCard: React.FC<IChef> = (props: IChef) => {
	const navigate = useNavigate();
	const restaurantData = useSelector(
		(state: Rootstate) => state.restaurants.value
	);
	const chef = {
		img: props.img,
		name: props.name,
		description: props.description,
		restaurant: props.restaurant,
	};
	const chefRest: IRestaurants[] = restaurantData.filter(
		(rest: IRestaurants) => {
			return chef.restaurant?.some(
				(chefrest: ObjectId) => chefrest.toString() === rest._id.toString()
			);
		}
	);
	const restaurantName: string = `${chef.name}'s Restaurants`;

	return (
		<div>
			<div id="chef-image">
				<img
					id="img-chef"
					alt="chef"
					src={chef.img}
				/>
				<div id="chefName">{chef.name}</div>
				<div id="chef-information">{chef.description}</div>
			</div>
			<div>
				<div id="chefs-restaurants">{restaurantName}</div>
				<div id="allthecard">
					<div id="restaurants-card">
						{chefRest.map((restaurant: IRestaurants, index: number) => (
							<div
								onClick={() => navigate(`/Restaurant/${restaurant._id}`)}
								id="chefs-restaurant-card"
								key={index}>
								<img
									id="restaurant-Img"
									src={restaurant.img}
									alt="restaurant-Img"
								/>
								<div id="restaurant-name">{restaurant.name}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChefCard;
