import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rootstate } from '../../store/store';
import DishOrder from '../DishOrder/DishOrder';
import ModalOrder from '../ModalOrder/ModalOrder';
import { IDishes } from '../SignatureDish/DishCard';
import emptyBag from './Image/empty-bag.svg';
import './YourOrderSubmit.css';
interface IComment {
	comment: string;
	number: number;
}

const YourOrderSubmit: React.FC = () => {
	const data = JSON.parse(sessionStorage.getItem('orders') || '[]');
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [homepage, sethomepage] = useState<boolean>(false);
	const SignatureDishData = useSelector(
		(state: Rootstate) => state.dishes.value
	);

	const dishData = data?.map((dish: any) => {
		return dish.IdNum._id;
	});

	const orderData: IDishes[] =
		SignatureDishData?.filter((rest: IDishes) => {
			return dishData?.includes(rest._id);
		}) ?? [];
	const comment = Array.isArray(data)
		? data.map((comment: IComment) => comment.comment).join(' | ')
		: '';
	console.log(comment);
	const number = Array.isArray(data)
		? data.map((comment: IComment) => comment.number)
		: [];

	const handleDishClick = () => {
		setIsModalOpen(true);
		// navigate('/', { state: isModalOpen, replace: true });
	};

	const closeModal = () => {
		sethomepage(true);
		setIsModalOpen(false);
	};
	useEffect(() => {
		if (homepage) {
			sessionStorage.clear();
			navigate('/');
		}
	}, [homepage]);

	return (
		<div id="your-check-out">
			<div id="order-card">
				<div id="title-order">YOUR ORDER</div>
				<div className="bag">
					{data?.length > 0 ? (
						<div id="order-information">
							{orderData?.map((dish: IDishes, index: number) => {
								const commentForDish = comment.split(' | ')[index] ?? '';
								const numberForDish = number?.[index] ?? 0;
								return (
									<DishOrder
										id={0}
										price={dish.price}
										img={dish.img}
										name={dish.name}
										comment={commentForDish}
										quantity={numberForDish}
										dishtitle={'dish-order-card-element'}
									/>
								);
							})}
						</div>
					) : (
						<img
							src={emptyBag}
							id="emptyBag"
							alt="empty-bag"
						/>
					)}
					<div id="comment-and-buttons-container">
						<div id="add-comment">Add A Comment</div>
						<input
							placeholder="Special requests, allergies, detary restrictions, etc."
							type={'text'}
							id="comment-input"
						/>
						<button
							id="check-out"
							type="submit"
							onClick={handleDishClick}>
							PAY
						</button>
					</div>
				</div>
			</div>{' '}
			{isModalOpen && (
				<ModalOrder
					closeButton={closeModal}
					time={90}
				/>
			)}
		</div>
	);
};

export default YourOrderSubmit;
