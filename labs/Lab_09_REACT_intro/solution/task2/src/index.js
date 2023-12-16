import React, { useState } from "react";
import reactDom from "react-dom"
import "bootstrap/dist/css/bootstrap.css"
import "./index.css";

const Post = ({ username, text, likes, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(!isLiked);
  };

  return (  
    <div className={isLiked ? "post liked" : "post"}>
      <h3>{username}</h3>
      <p>{text}</p>
      <button onClick={handleLike} class="btn btn-light">
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
    </div>
);
};

const PostList = () => {
  const [posts, setPosts] = useState([
    { username: 'Author 1', text: 'text', likes: 0 },
    { username: 'Author 2', text: 'text', likes: 0 },
    { username: 'Author 3', text: 'text', likes: 0 },
    { username: 'Author 4', text: 'text', likes: 0 },
  ]);

  const handleLike = (index, isLiked) => {
    const updatedPosts = [...posts];
    if (isLiked) {
      updatedPosts[index].likes += 1; 
    } else {
      updatedPosts[index].likes -= 1; 
    }
    setPosts(updatedPosts);
  };

  return (
<div className="container">
  <div className="row">
    {posts.map((post, index) => (
      <div className="col-md-6" key={index}>
        <Post
          username={post.username}
          text={post.text}
          likes={post.likes}
          onLike={(isLiked) => handleLike(index,  isLiked)}
        />
      </div>
    ))}
  </div>
</div>
  );
};
export default PostList;

reactDom.render(<PostList />, document.getElementById("root"));