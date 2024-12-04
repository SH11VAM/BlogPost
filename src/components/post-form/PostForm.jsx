import React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../index";
import SelectBtn from "../SelectBtn";
import RTE from "../RTE";
import service from "../../appwrite/majorConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({post}) {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug:post?.slug || "",
        content:post?.content || "",
        status:post?.status || "active",
      },
    });

    const navigate= useNavigate();
    const userData= useSelector( state => state.user.userData);

    const submit = async(data)=>{

      if(post){
        const file = data.image[0] ? service.uploadFile(data.image[0]): null
      }

      if(file){
        service.deleteFile(post.requiredImage)
      }

      const dbPost= await service.up
    }

    

  return <div>PostForm</div>;
}

export default PostForm;
