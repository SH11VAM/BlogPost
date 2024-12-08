import React from "react";
import service from "../appwrite/majorConfig";
import { useEffect, useState } from "react";
import PostForm from "../components/post-form/PostForm";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from "../components/container/Container";
function EditPost() {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((posts) => {
        setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
