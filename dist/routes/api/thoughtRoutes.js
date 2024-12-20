import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addTag, removeTag } from '../../controller/thoughtController.js';
router.route('/').get(getThoughts).post(createThought);
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
router.route('/:thoughtnId/tags').post(addTag);
router.route('/:thoughtId/tags/:tagId').delete(removeTag);
export default router;
