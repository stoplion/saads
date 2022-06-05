import "./styles/app.css";
import "./styles/loader.css";
import "./styles/pagination.css";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { incPageNumber, setActivePosts } from "../state/posts";
import { Card } from "./Card";

export default function App() {
  const pageNumber = useSelector((state: RootState) => state.posts.pageNumber);
  const posts = useSelector((state: RootState) => state.posts.postsCollection);
  const dispatch = useDispatch();

  const totalPost = React.useRef();

  function paginate(direction: number) {
    if (pageNumber === 0 && direction === -1) {
      alert("no more");
      return;
    }
    // if (direction === 1) {
    // }

    dispatch(incPageNumber(direction));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  React.useEffect(() => {
    const POST_PER_PAGE = 20;
    const POSTS_URI = `https://jsonplaceholder.typicode.com/posts?_start=${pageNumber}&_limit=${POST_PER_PAGE}`;

    async function fetchPosts() {
      const response = await fetch(POSTS_URI);
      totalPost.current = response.headers.get("X-Total-Count");
      const data = await response.json();
      dispatch(setActivePosts(data));
    }

    fetchPosts();
  }, [pageNumber]);

  if (true)
    return (
      <div className="loader-screen">
        <div className="loader" />
      </div>
    );

  return (
    <div className="container">
      Page — {pageNumber} / {totalPost.current}
      <section className="posts-wrapper">
        {posts.map((post) => {
          return (
            <Card
              title={post.title}
              body={post.body}
              key={post.id}
              userId={post.userId}
            />
          );
        })}
      </section>
      <nav className="pagination">
        <div className="pagination-item">
          <button onClick={() => paginate(-1)}>&larr;</button>
        </div>
        <div className="pagination-item">
          <button onClick={() => paginate(1)}>&rarr;</button>
        </div>
      </nav>
    </div>
  );
}
