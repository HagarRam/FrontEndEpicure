import React from 'react';
import star5 from '../../assets/stars/star5.svg';
import star4 from '../../assets/stars/star4.svg';
import star3 from '../../assets/stars/star3.svg';
import star2 from '../../assets/stars/star2.svg';
import star1 from '../../assets/stars/star1.svg';
import { useNavigate } from 'react-router-dom';
import { IRestaurants } from '../RestaurantPage/RestaurantPage';

const RestaurantCard: React.FC<IRestaurants> = (props: IRestaurants) => {
	const starsEnum: { [key: number]: string } = {
		1: star1,
		2: star2,
		3: star3,
		4: star4,
		5: star5,
	};

	const { img, rating, name, title, chef, _id, titleImg, titleStar } = props;

	const starsImg: string = starsEnum[Number(rating)];
	const navigate = useNavigate();
	return (
		<div
			className={title}
			onClick={() => navigate(`/Restaurant/${_id}`)}>
			<img
				className={titleImg}
				alt="dish"
				src={img}></img>
			<div id="card-information">
				<div className="rest-name">{name}</div>
				<div id="chef-name">{chef}</div>
				<img
					alt="title"
					className={titleStar}
					src={starsImg}></img>
			</div>
		</div>
	);
};

export default RestaurantCard;
