import React from "react";
import { useEffect, useState } from "react";
import service from "../appwrite/majorConfig";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
function Home() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    service.getPost().then((post) => {
      if (post) {
        setPost(post.documents);
      }
    });
  }, []);

  return post.length > 0 ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {post.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          <h1 className="text-2xl font-bold hover: bg-slate-500">
            {" "}
            Please Login and No Post Found{" "}
          </h1>
        </div>
      </Container>
    </div>
  );
}

export default Home;
