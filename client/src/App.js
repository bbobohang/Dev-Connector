import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Layouts/Navbar';
import Landing from './Components/Layouts/Landing';
import Register from './Components/Auth/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import CreateProfile from './Components/profile-forms/CreateProfile';
import EditProfile from './Components/profile-forms/EditProfile';
import AddExperience from './Components/profile-forms/AddExperience';
import Login from './Components/Auth/Login';
import PrivateRoute from './Components/Routing/PrivateRoute';
import Profiles from './Components/Profiles/Profiles';
import Alert from './Components/Layouts/Alert';
import Profile from './Components/Profile/Profile';
import Posts from './Components/Posts/Posts';
import Post from './Components/Post/Post';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import AddEducation from './Components/profile-forms/AddEducation';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Fragment>
					<Navbar />
					<Routes>
						<Route exact path='/' element={<Landing />} />
					</Routes>
					<section className='container'>
						<Alert />
						<Routes>
							<Route exact path='/register' element={<Register />} />
							<Route exact path='/login' element={<Login />} />
							<Route exact path='/profiles' element={<Profiles />} />
							<Route exact path='/profile/:id' element={<Profile />} />
							<Route
								path='dashboard'
								element={<PrivateRoute component={Dashboard} />}
							/>
							<Route
								path='create-profile'
								element={<PrivateRoute component={CreateProfile} />}
							/>
							<Route
								path='edit-profile'
								element={<PrivateRoute component={EditProfile} />}
							/>
							<Route
								path='add-experience'
								element={<PrivateRoute component={AddExperience} />}
							/>
							<Route
								path='add-education'
								element={<PrivateRoute component={AddEducation} />}
							/>
							<Route path='/posts' element={<PrivateRoute component={Posts} />} />
							<Route path='/post/:id' element={<PrivateRoute component={Post} />} />
						</Routes>
					</section>
				</Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
