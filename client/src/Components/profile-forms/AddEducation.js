import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const { school, degree, fieldofstudy, from, to, description, current } =
		formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<Fragment>
			<h1 class='large text-primary'>Add Your Education</h1>
			<p class='lead'>
				<i class='fas fa-graduation-cap'></i> Add any school, bootcamp, etc that you
				have attended
			</p>
			<small>* = required field</small>
			<form
				class='form'
				onSubmit={(e) => {
					e.preventDefault();
					addEducation(formData, navigate);
				}}
			>
				<div class='form-group'>
					<input
						type='text'
						placeholder='* School or Bootcamp'
						name='school'
						required
						value={school}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						placeholder='* Degree or Certificate'
						name='degree'
						required
						value={degree}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div class='form-group'>
					<input
						type='text'
						placeholder='Field Of Study'
						name='fieldofstudy'
						value={fieldofstudy}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div class='form-group'>
					<h4>From Date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div class='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							value={current}
							onChange={() => {
								setFormData({ ...formData, current: !current });
							}}
						/>{' '}
						Current School or Bootcamp
					</p>
				</div>
				<div class='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						value={to}
						onChange={(e) => onChange(e)}
						disabled={current}
					/>
				</div>
				<div class='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Program Description'
						value={description}
						onChange={(e) => onChange(e)}
					></textarea>
				</div>
				<input type='submit' class='btn btn-primary my-1' />
				<Link to='/dashboard' class='btn btn-light my-1'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
