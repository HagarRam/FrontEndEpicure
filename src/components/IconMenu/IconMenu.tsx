import React from 'react';
import './IconMenu.css';
import vegan from '../../assets/vegan.svg';
import spicy from '../../assets/spicy.svg';
import Vegitarian from '../../assets/Vegitarian.svg';

const IconMenu: React.FC = () => {
	return (
		<div id="menuIcon">
			<div id="iconsContainer">
				<div id="menuTitle">THE MEANING OF OUR ICONS:</div>
				<div id="allTheIcons">
					<div className="Icon">
						<img
							src={spicy}
							alt="spice"
						/>
						<div id="titleIcon">Spicy</div>
					</div>
					<div className="Icon">
						<img
							src={Vegitarian}
							alt="Vegitarian"
						/>
						<div id="titleIcon">Vegitarian</div>
					</div>
					<div className="Icon">
						<img
							src={vegan}
							alt="vegan"
						/>
						<div id="titleIcon">Vegan</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IconMenu;
