import React, { useState } from 'react';
import './BlogPost.css'
import { AiFillLike, AiFillDislike } from 'react-icons/ai';


const BlogPost = ({ post }) => {
    const { title, date, body, username } = post
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleDislike = () => {
        setDislikes(dislikes + 1);
    };

    return (
        <div className="blog-post">
            <h2 className="post-title">{title}</h2>
            <p className="post-date">{date}</p>
            <p className="post-body">{body}</p>
            <p className="post-username">Posted by: {username}</p>
            <div className="like-dislike-buttons">
                <button onClick={handleLike}>
                    <AiFillLike />
                </button>
                <span>{likes}</span>
                <button onClick={handleDislike}>
                    <AiFillDislike />
                </button>
                <span>{dislikes}</span>
            </div>
        </div>
    );
};

export default BlogPost;