import React from 'react';
import './RangeBar.css';

const RangeBar: React.FC = () => {
	return (
		<div className="selects-container">
			<select
				id="select"
				value="Price Range">
				<option value="0">Price Range</option>
			</select>
			<select id="select">
				<option value="0">Distance</option>
			</select>
			<select id="select">
				<option value="0">Rating</option>
			</select>
		</div>
	);
};

export default RangeBar;
