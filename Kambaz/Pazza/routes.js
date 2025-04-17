import * as dao from "./dao.js";

export default function PazzaRoutes(app) {
    app.post("/api/pazza/posts", async (req, res) => {
        const post = await dao.createPost(req.body);
        res.json(post);
    });

    app.get("/api/pazza/posts", async (req, res) => {
        const posts = await dao.findAllPosts();
        res.json(posts);
    });

    app.get("/api/pazza/posts/:cid", async (req, res) => {
        const { cid } = req.params;
        const posts = await dao.findPostsByCourse(cid);
        res.json(posts);
    });

}

