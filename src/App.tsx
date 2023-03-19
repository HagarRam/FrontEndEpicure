import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import RestaurantPage from './components/RestaurantPage/RestaurantPage';
import ChefsPage from './components/ChefPage/ChefPage';
import OneRest from './components/OneRest/OneRest';
import SignInPage from './components/SignInPage/SignInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import OneChef from './components/OneChef/OneChef';
import CheckOut from './components/CheckOut/CheckOut';
import UserLogin from './components/UserLogin/UserLogin';

function App() {
	return (
		<div className="body">
			{
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<HomePage />}
						/>
						<Route
							path="/restaurant"
							element={<RestaurantPage />}
						/>
						<Route
							path="/ChefsPage"
							element={<ChefsPage />}
						/>
						<Route
							path="/ChefsPage/:id"
							element={<OneChef />}
						/>
						<Route
							path="/restaurant/:dishID"
							element={<OneRest />}
						/>
						<Route
							path="/SignIn"
							element={<SignInPage />}
						/>
						<Route
							path="/SignUp"
							element={<SignUpPage />}
						/>
						<Route
							path="/CheckOut"
							element={<CheckOut />}
						/>
						<Route
							path="/log-out"
							element={<UserLogin />}
						/>
					</Routes>
				</BrowserRouter>
			}
		</div>
	);
}

export default App;
