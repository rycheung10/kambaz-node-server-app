// import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
    //   return Database.courses;
    return model.find();
}

export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
        enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
}
export function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
}
export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

export async function addFolderToCourse(courseId, folderName) {
    return model.updateOne(
      { _id: courseId },
      { $push: { folders: folderName } } // avoids duplicates
    );
  }

  export async function removeFolderFromCourse(courseId, folderName) {
    return model.updateOne(
      { _id: courseId },
      { $pull: { folders: folderName } }
    );
  }

  export async function renameFolderInCourse(courseId, oldName, newName) {
    const course = await model.findById(courseId);
    if (!course) return { error: "Course not found" };
  
    const index = course.folders.indexOf(oldName);
    if (index === -1) return { error: "Folder not found" };
  
    course.folders[index] = newName;
    await course.save();
    return course;
  }
  
  export function findCourseById(courseId) {
    return model.findById(courseId);
  }