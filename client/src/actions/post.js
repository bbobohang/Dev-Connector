import {
	DELETE_POST,
	GET_POSTS,
	POST_ERRORS,
	UPDATE_LIKES,
	ADD_POST,
	GET_POST,
	ADD_COMMENT,
	REMOVE_COMMENT,
} from './types';

import axios from 'axios';
import { setAlert } from './alert';

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/post');

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERRORS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Add Likes
export const addLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/post/like/${postId}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERRORS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Un Likes
export const removeLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/post/unlike/${postId}`);

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERRORS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Delete post
export const deletePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/post/${postId}`);

		dispatch({
			type: DELETE_POST,
			payload: postId,
		});

		dispatch(setAlert('Post removed', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERRORS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//add post
export const addPost = (formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/api/post`, formData, config);

		dispatch({
			type: ADD_POST,
			payload: res.data,
		});

		dispatch(setAlert('Post created', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERRORS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//add post
export const getPost = (postId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/post/${postId}`);

		dispatch({
			type: GET_POST,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERRORS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//add comment
export const addComment = (postId, formData) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(`/api/post/comment/${postId}`, formData, config);

		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		});

		dispatch(setAlert('Comment added', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERRORS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.delete(`/api/post/comment/${postId}/${commentId}`);

		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId,
		});

		dispatch(setAlert('Comment removed', 'success'));
	} catch (err) {
		dispatch({
			type: POST_ERRORS,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
