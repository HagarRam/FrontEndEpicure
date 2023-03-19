import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rootstate } from '../../store/store';
import DishOrder from '../DishOrder/DishOrder';
import { IDishes } from '../SignatureDish/DishCard';
import './YourOrder.css';
import emptyBag from './Image/empty-bag.svg';

interface IOrder {
	closeButton: Function;
}
interface IComment {
	comment: string;
	number: number;
}

const YourOrder: React.FC<IOrder> = (props: IOrder) => {
	const data = JSON.parse(sessionStorage.getItem('orders') || '[]');
	const navigate = useNavigate();
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
	const number = Array.isArray(data)
		? data.map((comment: IComment) => comment.number)
		: [];

	return (
		<div id="your-order">
			<span
				id="closeOrder"
				onClick={() => props.closeButton()}
				className="close-order">
				x
			</span>
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
							onClick={() => navigate(`/CheckOut`)}>
							Checkout
						</button>
						<button
							type="submit"
							id="history-order">
							Order history
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default YourOrder;
