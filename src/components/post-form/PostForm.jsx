import React, { useEffect } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../index";
import SelectBtn from "../SelectBtn";
import RTE from "../RTE";
import service from "../../appwrite/majorConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log(data);

    
    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null;

      if (file) {
        service.deleteFile(post.requiredimage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        requiredimage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {

      const file = await service.uploadFile(data.image[0]);
      console.log(file);

      if (file) {
        const fileId = file.$id;
        data.requiredimage = fileId;
        const dbPost = await service.createPost({
          title:data.title,
          slug:data.slug,
          content:data.content,
          requiredimage:data.requiredimage,
          status:data.status,
          userId: userData.$id,
        });
console.log(dbPost);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value) {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-"); // Replace one or more spaces with a single dash
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
  <div className="w-2/3 px-2">
      <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
      />
      <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
      />
      <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
  </div>
  <div className="w-1/3 px-2">
      <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
      />
      {post && (
          <div className="w-1/2 mb-4">
              <img
                  src={appwriteService.getFilePreview(post.requiredimage)}
                  alt={post.title}
                  className="rounded-lg"
              />
          </div>
      )}
      <SelectBtn
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
      />
      <Button type="submit"  bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
      </Button>
  </div>
</form>
}

export default PostForm;
