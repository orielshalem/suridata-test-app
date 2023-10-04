import React from 'react';
import './BlogPost.css'

const BlogPost = ({ post }) => {
    const { title, date, body, username } = post
    return (
        <div className="blog-post">
            <h2 className="post-title">{title}</h2>
            <p className="post-date">{date}</p>
            <p className="post-body">{body}</p>
            <p className="post-username">Posted by: {username}</p>
        </div>
    );
};

export default BlogPost;