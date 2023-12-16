import React, { useState } from "react";
import reactDom from "react-dom"
import "bootstrap/dist/css/bootstrap.css"
import "./index.css";

const App=()=>{

  const Count = () => {
    const [count, setCount] = useState(0);
    
    return (
        <div>
          <h2>
            <span >{count === 0 ? "0" : count}</span>
          </h2>
          <div>
            <button
              onClick={() => setCount((prevState) => prevState - 1)}
            >
              -1
            </button>
            <button
              onClick={() => setCount((prevState) => prevState + 1)}
            >
              +1
            </button>
          </div>
        </div>
    );
  };

    return <Count  />;
}

reactDom.render(<App />, document.getElementById("root"));