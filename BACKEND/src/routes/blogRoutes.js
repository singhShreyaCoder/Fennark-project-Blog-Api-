import express from "express";
import {
  getAllPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/blogcontroller.js";

const router = express.Router();

router.get("/", getAllPost);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
