const express = require('express');
const router = express.Router();

const commentController = require('../controllers/CommentController');

router.get('/:LID', commentController.index);
router.get(
  '/commentChapter/:LID/:chapter',
  commentController.getCommentChapter
);

router.post('/create', commentController.create);
router.post('/update/:id', commentController.update);
router.delete('/delete/:id', commentController.destroy);

module.exports = router;
