import React, { useEffect, useState } from 'react';
import RestaurantCard from '../PopularRestaurants/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import { Rootstate } from '../../store/store';
import ImageChef from '../ImageCard/ImageCard';
import { removeChef } from '../../store/slices/chefSlice';
import './OneChef.css';
import { IChef } from '../ChefPage/ChefPage';
import { IRestaurants } from '../RestaurantPage/RestaurantPage';
import { ObjectId, Types } from 'mongoose';
import AddRest from '../AddRest/AddRest';

const OneChef: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const restaurantsData = useSelector(
		(state: Rootstate) => state.restaurants.filteredValue
	);
	const chefData = useSelector((state: Rootstate) => state.chef.filteredValue);
	const [deleteChefed, setDeleteChefed] = useState<any>(null);
	let { id } = useParams<string>();
	const data = JSON.parse(sessionStorage.getItem('data') || '{}');
	const IdNum: IChef | undefined = chefData?.find((rest: IChef) => {
		return rest._id?.toString() === id;
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		setDeleteChefed(IdNum);
	}, [chefData, IdNum]);

	const deletechef = async (id: string, _id: string) => {
		try {
			const response = await fetch(`http://localhost:8000/chef`, {
				method: 'DELETE',
				body: JSON.stringify({
					id: id,
					userId: Types.ObjectId.createFromHexString(_id),
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message);
			}

			dispatch(removeChef(data.data));
			window.location.reload();
			navigate('/chefsPage');
		} catch (err) {
			console.error(err);
			throw err;
		}
	};
	const handleRegister = async (id: string) => {
		if (window.confirm(`Are you sure you want to delete?`)) {
			await deletechef(id, data._id);
		}
	};
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div id="restaurant-page ">
			<NavBar />
			<div id="information-page">
				{data._id === '640dae4cd58da0771cc7b736' && (
					<div>
						<button
							id="delete"
							onClick={() => handleRegister(deleteChefed._id)}>
							DELETE
						</button>
						<button
							id="add-rest"
							type="submit"
							onClick={openModal}>
							ADD REST
						</button>
					</div>
				)}

				<div id="chef-of-the-page">
					{IdNum ? (
						<ImageChef
							name={IdNum.name}
							img={IdNum.img}
							id={IdNum.id}
							key={IdNum.id}
							_id={IdNum._id}
						/>
					) : (
						<p>chef not found</p>
					)}
				</div>

				<div id="chef-restaurants">
					{IdNum?.restaurant?.map((chef: ObjectId) => {
						const data = restaurantsData.filter(
							(rest: IRestaurants) => rest._id === chef
						);
						if (data.length === 0) {
							return null; // or some other fallback if there are no matching restaurants
						}
						return data.map((restData: IRestaurants) => (
							<RestaurantCard
								img={restData.img}
								name={restData.name}
								chef={restData.chef}
								rating={restData.rating}
								title={'chef-rest-page'}
								id={restData.id}
								titleStar={'restautant-page-stars'}
								titleImg={'chef-rest-image'}
								key={restData.id}
								_id={restData._id}
							/>
						));
					})}
				</div>
			</div>

			<Footer />
			{isModalOpen && <AddRest closeButton={closeModal} />}
		</div>
	);
};

export default OneChef;
