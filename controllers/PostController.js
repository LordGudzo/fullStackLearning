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

export const getAll = async (req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    } catch(err){
        console.log(err);
        res.status(500).json("failed to get posts");
    }
}

export const getOne = (req, res) => {
    try{
        const postId = req.params.id;

        PostModel.findOneAndUpdate(
            { _id: postId }, //find post by id
            {$inc: { viewsCont: 1 }}, //add count
            { new: true }) //return doc after i++ count
            .then(doc => {
                if (!doc) {
                    return res.status(404).json({
                        message: "post was not found"
                    });
                }
                res.json(doc);
            })
        
    } catch(err){
        console.log(err);
        res.status(500).json("failed to get post");
    }
}

export const remove = (req, res) => {
    try{
        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId
        })

        .then(doc => {
            if(!doc) {
                return res.status(404).json({
                    message: "post was not found"
                }); 
            }
        })
        res.json({
            success: true
        })

    } catch(err){
        console.log(err);
        res.status(500).json("failed to delete post");
    }
}

export const update = async (req, res) => {
    try{
        const postId = req.params.id;

        await PostModel.updateOne({
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imgageUrl,
                tags: req.body.tags,
                user: req.userId  
            }
        );

        res.json({
            success: true
        })
    } catch(err){
        console.log(err);
        res.status(500).json("failed to update post");
    }
}