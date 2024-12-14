import React from 'react'
import service from '../appwrite/majorConfig'
import { Link } from 'react-router-dom';


function PostCard({post}) {
  return (
  <Link to={`/post/${post.$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={service.getFilePreview(post.requiredimage)} alt={post.title} className='rounded-xl'/>

        </div>
        <h2 className='font-bold text-gray-200'>{post.title}</h2>
    </div>
  </Link>
  )
}

export default PostCard