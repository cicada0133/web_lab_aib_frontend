import React, { useState } from "react";
import reactDom from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const Post = ({ username, text, likes, onLike, onDelete }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(!isLiked);
  };

  return (
    <div className={isLiked ? "post liked" : "post"}>
      <h3>{username}</h3>
      <p>{text}</p>
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
    { username: "Author 1", text: "text", likes: 0 },
    { username: "Author 2", text: "text", likes: 0 },
    { username: "Author 3", text: "text", likes: 0 },
    { username: "Author 4", text: "text", likes: 0 },
  ]);
  const [usernameInput, setUsernameInput] = useState(""); // состояние для значения username input
  const [textInput, setTextInput] = useState(""); //  состояние для значения text input

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
    const username = usernameInput; // Используется значение username input
    const text = textInput; // Используется значение text input
    const likes = 0;
    const newPost = {
      username,
      text,
      likes,
    };
    setPosts([...posts, newPost]);
    setUsernameInput(""); // Очищается значение username input
    setTextInput(""); // Очищается значение text input
  };

  return (
    <div className="container">
      <div className="row">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your username"
          value={usernameInput}  // Назначается значение username input из состояния
          onChange={(e) => setUsernameInput(e.target.value)}  // Обработчик изменений для обновления значения username input
        />
        <input
          type="text"
          className="form-control"
          placeholder="Enter your post text"
          value={textInput}  // Назначается значение text input из состояния
          onChange={(e) => setTextInput(e.target.value)}  // Обработчик изменений для обновления значения text input
        />
        <button onClick={addPost} className="btn btn-secondary" size="lg">
          Add Post
        </button>
      </div>
      <div className="row">
        {posts.map((post, index) => (
          <div className="col-md-6" key={index}>
            <Post
              username={post.username}
              text={post.text}
              likes={post.likes}
              onLike={(isLiked) => handleLike(index, isLiked)}
              onDelete={() => handleDelete(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

reactDom.render(<PostList />, document.getElementById("root"));