import { Thought, User } from '../models/index.js';
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.ThoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'Thought created, but found no user with that ID',
            });
        }
        res.json('Created the thought 🎉');
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        const user = await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'Thought created but no user with this id!',
            });
        }
        res.json({ message: 'Thought successfully deleted!' });
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const addTag = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { tags: req.body } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that id!' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
export const removeTag = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { tags: { tagId: req.params.tagId } } }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
