import model from "./model.js";

export const createPost = (post) => model.create(post);


export const findAllPosts = () => model.find().sort({ createdAt: -1 });

export const findPostsByCourse = (cid) => model.find({ course: cid }).sort({ createdAt: -1 });
