import React from 'react'
import service from '../appwrite/majorConfig'
import { Link } from 'react-router-dom';


function PostCard({$id , title, requiredImage}) {
  return (
  <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={service.getFilePreview(requiredImage)} alt={title} className='rounded-xl'/>

        </div>
        <h2 className='font-bold text-gray-200'>{title}</h2>
    </div>
  </Link>
  )
}

export default PostCard