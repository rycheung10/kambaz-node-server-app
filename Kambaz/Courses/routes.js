import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
export default function CourseRoutes(app) {
    app.get("/api/courses", async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    });
    app.delete("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.deleteCourse(courseId);
        res.send(status);
    });

    app.put("/api/courses/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    });

    app.get("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

    app.post("/api/courses/:courseId/modules", async (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = await modulesDao.createModule(module);
        res.send(newModule);
    });

    app.post("/api/courses", async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    });

    app.post("/api/courses/:courseId/folders", async (req, res) => {
        const { courseId } = req.params;
        const { name } = req.body;
        const status = await dao.addFolderToCourse(courseId, name);
        res.json(status);
      });
    
      app.delete("/api/courses/:courseId/folders", async (req, res) => {
        const { courseId } = req.params;
        const { name } = req.body;
        const status = await dao.removeFolderFromCourse(courseId, name);
        res.json(status);
      });
    
      app.put("/api/courses/:courseId/folders", async (req, res) => {
        const { courseId } = req.params;
        const { oldName, newName } = req.body;
        const status = await dao.renameFolderInCourse(courseId, oldName, newName);
        res.json(status);
      });

      app.get("/api/courses/:cid", async (req, res) => {
        const { cid } = req.params;
        try {
          const course = await dao.findCourseById(cid);
          if (!course) {
            return res.status(404).send("Course not found");
          }
          res.json(course);
        } catch (err) {
          res.status(500).send(err.message);
        }
      });
}
