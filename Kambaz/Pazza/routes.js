import * as dao from "./dao.js";
import model from "./model.js";

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
    app.put("/api/pazza/posts/:pid", async (req, res) => {
        const { pid } = req.params;
        const updated = await model.findByIdAndUpdate(pid, req.body, { new: true });
        res.json(updated);
    });

    app.delete("/api/pazza/posts/:pid", async (req, res) => {
        const { pid } = req.params;
        const status = await model.deleteOne({ _id: pid });
        res.json(status);
    });


}

