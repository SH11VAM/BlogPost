import { useState, useEffect } from "react";
import React from "react";
import service from "../appwrite/majorConfig";
import PostCard from "../components/PostCard";
import Container from "../components/container/Container";
function AllPost() {
  const [post, setPost] = useState([{}]);

  useEffect(() => {
    
      
      console.log(service.getPost([]));

      service.getPost([]).then((posts) => {
        if (posts) {
          setPost(posts.documents);
          
        }
      });

  
  }, []);

  console.log(post);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          
          {post.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
          <h1> No Post </h1>
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
