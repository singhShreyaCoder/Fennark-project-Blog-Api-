import Post from "../model/blog.js";

export async function getAllPost(req, res) {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getAllPost controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getPostById(req, res) {
  try {
    const foundPost = await Post.findById(req.params.id);

    if (!foundPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(foundPost);
  } catch (error) {
    console.log("Error in getPostById controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createPost(req, res) {
  try {
    const { Title, Content } = req.body;

    const newPost = new Post({
      Title,
      Content,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error("CREATE POST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

export async function updatePost(req, res) {
  try {
    const { Title, Content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { Title, Content },
      { returnDocument: "after" },
    );

    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log("Error in updatePost controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deletePost(req, res) {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost)
      return res.status(404).json({ message: "Post Not Found" });
    res.status(200).json({ message: "Post Deleted Sucessfully" });
  } catch (error) {
    console.log("Error in deletePost controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
