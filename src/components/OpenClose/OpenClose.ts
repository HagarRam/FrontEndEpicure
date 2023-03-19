import { IRestaurants } from '../RestaurantPage/RestaurantPage';

const checkIfRestaurantIsOpen = (restaurant: IRestaurants) => {
	const date = new Date();
	const hour = date.getHours();
	const minutes = date.getMinutes();
	const currentTime = hour + minutes / 60;

	const openingTime = restaurant.openHours?.[0]
		? parseFloat(restaurant.openHours?.[0].replace(':', '.'))
		: undefined;
	const closingTime = restaurant.openHours?.[1]
		? parseFloat(restaurant.openHours?.[1].replace(':', '.'))
		: undefined;

	return (
		openingTime &&
		closingTime &&
		openingTime <= currentTime &&
		closingTime >= currentTime
	);
};

export default checkIfRestaurantIsOpen;
