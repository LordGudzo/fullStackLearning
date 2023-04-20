import PostModel from "../models/Post.js";

export const create = async (req, res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imgageUrl,
            tags: req.body.tags,
            user: req.userId
        });

        const post = await doc.save();

        res.json(post);
    } catch(err){
        console.log(err);
        res.status(500).json("not succesfull post create")
    }
}