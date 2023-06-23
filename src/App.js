import React, { useState, useEffect } from "react";
import Post from "./components/Post";
import Pagination from "./components/Pagination";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    console.log("console 1");
    const fetchData = async () => {
      setLoading(true);
      const apiData = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      console.log(apiData);
      setPost(apiData.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  //to get current posts
  const lastPost = currentPage * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = posts.slice(firstPost, lastPost);

  //change page
  const paginate = (pageNumber) => setCurentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Pagination</h1>
      <Post posts={currentPost} loading={loading} />
      <Pagination
        postsPerPage={postPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
