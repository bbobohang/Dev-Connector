const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/');

//Middleware
const auth = require('../../middleware/auth');

//Models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/post
// @descr create a post
// @acess private
router.post(
	'/',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();
			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route GET api/post
// @descr GET all post
// @acess private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route GET api/post/:id
// @descr GET post by id
// @acess private
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.json(post);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route DELETE api/post/:id
// @descr DELETE post by id
// @acess private
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Check that the post is same as the user
		if (post.user.toString() !== req.user.id) {
			res.status(401).json({ msg: 'User not authorized' });
		}

		if (!post) {
			return res.status(404).json({ msg: 'Post not found' });
		}
		await post.remove();
		res.json({ msg: 'Post is deleted' });
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route PUT api/post/like/:id
// @descr Like a post by id
// @acess private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Check if the post has been liked
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
		) {
			return res.status(400).json({ msg: 'Post already liked' });
		}

		post.likes.unshift({ user: req.user.id });
		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route PUT api/post/like/:id
// @descr Unlike a post by id
// @acess private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		//Check if the post has been liked
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id).length == 0
		) {
			return res.status(400).json({ msg: 'Post has not been liked' });
		}

		//Get remove index
		const removedIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);

		post.likes.splice(removedIndex, 1);

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route POST api/post/comment/:id
// @descr Comment on a post
// @acess private
router.post(
	'/comment/:id',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			const post = await Post.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			};

			post.comments.unshift(newComment);
			await post.save();
			res.json(post.comments);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route Delete api/post/comment/:id/:comment_id
// @descr Delete comment
// @acess private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		//Getting post
		const post = await Post.findById(req.params.id);

		//Getting comment
		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);

		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		//Check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		const removedIndex = post.comments
			.map((comment) => comment.user.toString())
			.indexOf(req.user.id);

		post.comments.splice(removedIndex, 1);

		await post.save();

		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
module.exports = router;
