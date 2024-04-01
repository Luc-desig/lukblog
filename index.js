import express from "express";
import bodyParser  from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.render("home.ejs", {posts: posts});
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
})

// post form 

// Data Center
let posts = [];

// Post Constructor
function Post(title, content) {
  this.title = title;
  this.content = content;
  this.rawDate = new Date();
  this.date = this.rawDate.toLocaleString();
}

// Add Post
function addPost(title, content) {
  let post = new Post(title, content);
  posts.push(post);
}

// Delete Post
function deletePost(index) {
  posts.splice(index, 1);
}
// Edit Post
function editPost(index, title, content) {
  posts[index] = new Post(title, content);
}

// View Post
app.get("/view/:id", (req, res) => {
  let index = req.params.id;
  let post = posts[index];
  res.render("view.ejs", {postId: index, title: post.title, content: post.content});
});

// Delete Post
app.post("/delete", (req, res) => {
  let index = req.body["postId"];
  deletePost(index);
  res.redirect("/");
});

// Edit Post Page
app.get("/edit/:id", (req, res) => {
  let index = req.params.id;
  let post = posts[index];
  res.render("create.ejs", {postId: index, title: post.title, content: post.content});
});

// Update
app.post("/update", (req, res) => {
  let title = req.body["title"];
  let content = req.body["content"];
  let index = req.body["index"];
  editPost(index, title, content);
  res.redirect("/");
});

// Save Post
app.post("/save", (req, res) => {
  let title = req.body["title"];
  let content = req.body["content"];
  
  addPost(title, content);
  res.redirect("/");
});

// Todo Listen thing
app.listen(port, () => {
  addPost("The Power of Secrets: Encryption in Modern Web Development", "Secrets and encryption form the backbone of secure web development. Delve into the intricate world of protecting data, exploring the power that encryption holds in safeguarding information and maintaining the integrity of online systems.")
  addPost("Struggles in Coding: Debugging and Resolving Conflicts", "Coding projects often involve power struggles in the form of bugs, conflicts, and errors. Learn effective strategies for debugging and resolving coding conflicts, gaining insights into maintaining the balance and harmony of your codebase.")
  addPost("Unlocking the Hidden Power of JavaScript Libraries", "Within the vast landscape of JavaScript libraries lies untapped potential waiting to be harnessed. Join us on a journey to discover the secrets behind unlocking the hidden power of these libraries, propelling your projects to new heights.")
  addPost("Empowering Dev Teams: The Collective Strength of Collaboration", "True power in the programming world lies in collaborative efforts. Explore the transformative impact of teamwork on development projects, featuring stories of development teams that have harnessed the collective strength of collaboration for success.")
  addPost("Code Shift: When Legacy Systems Take a Turn", "In the world of programming, legacy systems often play by their own rules. Explore the challenges and triumphs of developers as they navigate the complexities of legacy code, witnessing the surprising turns that can occur when modernization meets the past.")
  addPost("The Future of Programming: Navigating Paradigm Shifts in Tech", "Programming is an ever-evolving field with paradigm shifts that shape its future. Join us in exploring the current and upcoming trends, technologies, and shifts that are defining the future of programming and influencing the tech landscape.")
})

