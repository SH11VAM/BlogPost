import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/majorConfig";
import { Button } from "../components/index";
import Container from "../components/container/Container";
import parse from 'html-react-parser';
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(" ");
  const [url, setUrl] = useState("No url");
  const [content , setContent]= useState(" ");
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  async function ImageUrl(post) {
    const imageurl = await service.getFilePreview(post?.requiredimage, {
      width: 300,
      heigth: 200,
    });
    if (imageurl) {
      setUrl(imageurl);
    }
  }

  async function GetPost(slug) {
    const Post = await service.getPost(slug);
    ImageUrl(Post);
    Post ? setPost(Post): <div> ------No Post Yet----- </div>

    const article =  parse(Post.content).props.children;
    article ? setContent(article) : "Please wait "
  }

  useEffect(() => {
    if (slug) {
      GetPost(slug);
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.requiredimage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={url}
            alt={post.title}
            className="rounded-xl w-1/2 h-96 border border-black p-2 object-cover"
            loading="lazy"
            placeholder="blur"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div >{content}</div>
      </Container>
    </div>
  ) : (
    <h1>.....post not </h1>
  );
}
