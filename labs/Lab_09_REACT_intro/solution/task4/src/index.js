import React, { useState, useContext } from "react";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const TagContext = React.createContext([]);

const Post = ({ username, text, likes, tags, onLike, onDelete }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(!isLiked);
  };

  return (
    <div className={isLiked ? "post liked" : "post"}>
      <h3>{username}</h3>
      <p>{text}</p>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <button onClick={handleLike} className="btn btn-light">
        {isLiked ? (
          <>
            <span>❤️</span>
            Unlike
          </>
        ) : (
          <>
            <span>🤍</span>
            Like
          </>
        )}
      </button>
      <button onClick={onDelete} className="btn btn-danger">
        Delete
      </button>
    </div>
  );
};

const PostList = () => {
  const [posts, setPosts] = useState([
    { username: "Author 1", text: "text", likes: 0, tags: ["🎅"] },
    { username: "Author 2", text: "text", likes: 0, tags: ["🎅", "🎄"] },
    { username: "Author 3", text: "text", likes: 0, tags: ["📆", "🎅"] },
    { username: "Author 4", text: "text", likes: 0, tags: ["😻", "📆", "🎄"] },
    { username: "Author 5", text: "ЦМКО", likes: 0, tags: ["☠"] },
    { username: "Author 6", text: "Урааа НГ", likes: 0, tags: ["🍷", "🍸", "🍹", "🍺" ] },
  ]);
  const [usernameInput, setUsernameInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const handleLike = (index, isLiked) => {
    const updatedPosts = [...posts];
    if (isLiked) {
      updatedPosts[index].likes += 1;
    } else {
      updatedPosts[index].likes -= 1;
    }
    setPosts(updatedPosts);
  };

  const handleDelete = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const addPost = () => {
    const username = usernameInput;
    const text = textInput;
    const likes = 0;
    const tags = tagInput.split(",").map((tag) => tag.trim());
    const newPost = {
      username,
      text,
      likes,
      tags,
    };
    setPosts([...posts, newPost]);
    setUsernameInput("");
    setTextInput("");
    setTagInput("");
  };

  const allTags = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };


  return (
    <div className="container">
      <div className="row">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Enter your post text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Enter tags separated by commas"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button onClick={addPost} className="btn btn-secondary" size="lg">
          Add Post
        </button>
        <div className="tags-container">
          <p className="tags-label">All tags:</p>
          {allTags.map((tag, index) => (
            <div
              key={index}
              className={selectedTags.includes(tag) ? "tag selected" : "tag"}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <TagContext.Provider value={selectedTags}>
          {posts
            .filter((post) =>
              selectedTags.length === 0
                ? true
                : post.tags.some((tag) => selectedTags.includes(tag))
            )
            .map((post, index) => (
              <div className="col-md-6" key={index}>
                <Post
                  username={post.username}
                  text={post.text}
                  likes={post.likes}
                  tags={post.tags}
                  onLike={(isLiked) => handleLike(index, isLiked)}
                  onDelete={() => handleDelete(index)}
                />
              </div>
            ))}
        </TagContext.Provider>
      </div>
    </div>
  );
};

export default PostList;

  reactDom.render(<PostList />, document.getElementById("root"));