import { configureStore } from '@reduxjs/toolkit';
import chefReducer from './slices/chefSlice';
import restaurantsReducer from './slices/restaurantsSlice';
import userReducer from './slices/usersSlice';
import dishesReducer from './slices/dishesSlice';
import { IChefState } from '../components/ChefPage/ChefPage';
import { IDishes } from '../components/SignatureDish/DishCard';
import { IrestaurantsState } from '../components/RestaurantPage/RestaurantPage';
import { IUser } from './slices/usersSlice';

export interface Rootstate {
	users: IuserState;
	chef: IChefState;
	restaurants: IrestaurantsState;
	dishes: IDishesState;
}

export interface IDishesState {
	value: IDishes[];
}

export interface IuserState {
	[x: string]: any;
	value: IUser[];
}

export default configureStore({
	reducer: {
		chef: chefReducer,
		restaurants: restaurantsReducer,
		dishes: dishesReducer,
		users: userReducer,
	},
});
