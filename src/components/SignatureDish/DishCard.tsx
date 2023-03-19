import React, { useState } from 'react';
import vegan from '../../assets/vegan.svg';
import vegitarian from '../../assets/Vegitarian.svg';
import spicy from '../../assets/spicy.svg';
import iconPrice from '../../assets/iconprice.svg';
import ModalRest from '../ModalRestaurant/ModalRest';
import { ObjectId, Types } from 'mongoose';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeDish } from '../../store/slices/dishesSlice';

export interface IDishes {
	_id: ObjectId;
	id: number;
	name: string;
	time?: string[];
	about: string;
	price: number;
	allergan?: string[];
	icons: string[];
	sides?: string[];
	changes?: string[];
	img: string;
	signatureDish?: boolean;
	title?: string;
	dishtitle: string;
	key: number;
}

const DishCard: React.FC<IDishes> = (props: IDishes) => {
	const typesEnum: { [key: string]: string } = {
		spicy: spicy,
		vegitarian: vegitarian,
		vegan: vegan,
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const data = JSON.parse(sessionStorage.getItem('data') || '{}');
	const { img, icons, name, about, price, _id, title, dishtitle } = props;
	const [deletedDish, setDeletedDish] = useState<any>(null);
	const handleDishClick = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	const deleteDishes = async (id: string, _id: string) => {
		try {
			// Check that _id is in the correct format
			if (!/^[0-9a-fA-F]{24}$/.test(_id)) {
				throw new Error('Invalid _id format');
			}

			const response = await fetch(`http://localhost:8000/dishes/`, {
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

			dispatch(removeDish(data.data));
			navigate('/');
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	const deleteDish = async (id: any) => {
		if (window.confirm(`Are you sure you want to delete?`)) {
			await deleteDishes(id, data._id);
		}
	};

	return (
		<>
			<div
				className={dishtitle}
				onClick={handleDishClick}>
				<img
					className="img-rest"
					alt="dish"
					src={img}
				/>
				<span
					id="closeButton"
					onClick={(e) => deleteDish({ _id })}
					className="close">
					&times;
				</span>
				<div id={title}>
					<div className="dish-name">{name}</div>
					<div className="dishTypes">
						{icons.map((type: string) => (
							<img
								className="dish-img"
								alt="dish-type"
								src={typesEnum[String(type)]}
								key={type}
							/>
						))}
					</div>
					<div className="description">{about}</div>
					<div id="price-container">
						<hr id="hr-left" />
						<div id="price-with-icon">
							<img
								src={iconPrice}
								id="icon-price"></img>
							<div>{price}</div>
						</div>

						<hr id="hr-right" />
					</div>
				</div>
			</div>
			{isModalOpen && _id && (
				<ModalRest
					id={_id}
					closeButton={closeModal}
					key={price}
					closeBag={closeModal}
				/>
			)}
		</>
	);
};

export default DishCard;
