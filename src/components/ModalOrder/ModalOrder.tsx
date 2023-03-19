import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import vector from './images/Vector.svg';
import './ModalOrder.css';
import { Rootstate } from '../../store/store';
import DishModalOrder from '../DishModalOrder/DishModalOrder';
import icon from '../DishOrder/image/bold-price.svg';
import { IDishes } from '../SignatureDish/DishCard';

interface IModal {
	time: number;
	closeButton: Function;
}
interface IComment {
	comment: string;
	number: number;
}
const ModalOrder: React.FC<IModal> = (props: IModal) => {
	const dishesData = useSelector((state: Rootstate) => state.dishes.value);
	const data = JSON.parse(sessionStorage.getItem('orders') || '[]');
	const dishData = data?.map((dish: any) => {
		return dish.IdNum._id;
	});
	const orderData: IDishes[] =
		dishesData?.filter((rest: IDishes) => {
			return dishData?.includes(rest._id);
		}) ?? [];

	const number = Array.isArray(data)
		? data.map((comment: IComment) => comment.number)
		: [];

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		window.scrollTo(0, 0);
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);
	let totalPrice = 0;
	return (
		<div className="restaurants-card">
			<div
				id="restaurants-card-Modal"
				className="modal">
				<div className="content-modal">
					<span
						id="closeButton"
						onClick={() => props.closeButton()}
						className="close">
						&times;
					</span>
					<img
						alt="vector"
						id="vector"
						src={vector}
					/>
					<div id="order-recived">ORDER RECIVED</div>
					<div id="your-food">Your food is in process</div>
					<div id="time">
						<div id="hour-time">Arrive in</div>
						<div id="hour">{props.time}:00</div>
						<div id="hour-time">mins</div>
					</div>
					<div id="alltheorder">
						{data?.length > 0 ? (
							<div id="order-information">
								{orderData?.map((dish: IDishes, index: number) => {
									const numberForDish = number?.[index] ?? 0;
									const totalprice2 = dish.price * numberForDish;
									totalPrice += totalprice2;
									return (
										<DishModalOrder
											id={0}
											name={dish.name}
											price={dish.price}
											quantity={numberForDish}
											key={dish.id}
										/>
									);
								})}
							</div>
						) : (
							<p></p>
						)}
					</div>
					<div id="total-price">
						TOTAL -{' '}
						<img
							src={icon}
							alt="icon-price"
						/>{' '}
						{totalPrice}{' '}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalOrder;
