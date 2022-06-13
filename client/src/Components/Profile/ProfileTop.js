import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
	profile: {
		location,
		company,
		status,
		website,
		social,
		user: { name, avatar },
	},
}) => {
	return (
		<div class='profile-top bg-primary p-2'>
			<img class='round-img my-1' src={avatar} alt='' />
			<h1 class='large'>{name}</h1>
			<p class='lead'>{company && <span>at {company} </span>}</p>
			<p>{location && <span>at {location} </span>}</p>
			<div class='icons my-1'>
				{website && (
					<a href={website} target='_blank' rel='noopener noreferrer'>
						<i class='fas fa-globe fa-2x'></i>
					</a>
				)}
				{social
					? Object.entries(social)
							.filter(([_, value]) => value)
							.map(([key, value]) => (
								<a key={key} href={value} target='_blank' rel='noopener noreferrer'>
									<i className={`fab fa-${key} fa-2x`}></i>
								</a>
							))
					: null}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile: PropTypes.object,
};

export default ProfileTop;
