import React, { useState } from 'react';
import './BlogPost.css'
import { AiFillLike, AiFillDislike } from 'react-icons/ai';


const BlogPost = ({ post, onRate }) => {
    const { title, date, body, username, rating } = post

    return (
        <div className="blog-post">
            <h2 className="post-title">{title}</h2>
            <p className="post-date">{date}</p>
            <p className="post-body">{body}</p>
            <p className="post-username">Posted by: {username}</p>
            <div className="like-dislike-buttons">
                <button onClick={() => onRate(post, 1)}>
                    <AiFillLike />
                </button>
                <span>{rating?.likeCount || 0}</span>
                <button onClick={() => onRate(post, -1)}>
                    <AiFillDislike />
                </button>
                <span>{rating?.dislikeCount || 0}</span>
            </div>
        </div>
    );
};

export default BlogPost;