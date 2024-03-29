import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Layouts/Spinner';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItems from './ProfileItems';
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, []);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className='large text-primary'>Developers</h1>
					<p class='lead'>
						<i class='fab fa-connectdevelop'></i> Browse and connect with developers
					</p>
					<div class='profiles'>
						{profiles.length > 0 ? (
							profiles.map((profile) => (
								<ProfileItems key={profile._id} profile={profile} />
							))
						) : (
							<h4> No profile found</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profiles.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
