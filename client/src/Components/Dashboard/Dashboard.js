import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import DashboardAction from './DashboardAction';
import Spinner from '../Layouts/Spinner';
import Education from './Experience';
import Experience from './Education';

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
	deleteAccount,
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);
	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i>Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardAction />
					<Education experience={profile.experience} />
					<Experience education={profile.education} />

					<div className='my-2'>
						<button className=' btn btn-danger' onClick={() => deleteAccount()}>
							<i className='fas fa-user-minus'></i>Delete my account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet set up a profile, please add some info</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
);
