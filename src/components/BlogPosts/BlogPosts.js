import React, { useState, useEffect } from 'react';
import { fetchBlogPosts } from '../../api.service';
import BlogPost from '../BlogPost/BlogPost';
import BlogPostFilter from '../BlogPostFilter/BlogPostFilter';
import Pagination from '../Pagination/Pagination';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import translateText from '../../translation.service';

const postsPerPage = 10;

const BlogPosts = () => {
    const [posts, setPosts] = useState([]);
    const [translatedPosts, setTranslatedPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('')
    const [lng, setLng] = useState('en')

    useEffect(() => {
        getBlogPosts()
    }, []);

    const handleFilterChange = (filterText) => {
        setQuery(filterText)
    }

    const handleLanguageChange = (lng) => {
        setLng(lng)
    }

    const getBlogPosts = async () => {
        try {
            const blogPosts = await fetchBlogPosts()
            setPosts(blogPosts)
            setTranslatedPosts(blogPosts)
            setCurrentPage(1);
        } catch (err) {
            console.error('Error fetching blog posts:', err)
        }
    }

    useEffect(() => {
        if (!query) {
            setFilteredPosts(translatedPosts);
        } else {
            const filtered = translatedPosts.filter(
                (post) =>
                    post.title.toLowerCase().includes(query.toLowerCase()) ||
                    post.body.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
        setCurrentPage(1);
    }, [query, translatedPosts])

    useEffect(() => {
        translatePosts()
    }, [lng, posts])


    const translatePosts = async () => {
        if (lng === 'en') {
            setTranslatedPosts(posts)
        } else {
            const postTexts = posts.map(post => post.body)
            const res = await translateText(postTexts, lng)
            const translatedPosts = posts.map((post, idx) => ({ ...post, body: res[idx].translations[0].text }))
            setTranslatedPosts(translatedPosts)
        }
    }

    if (!posts.length) return null

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);


    function sliceArrayById(arr, id) {
        const index = arr.findIndex(item => item.id === id);
        if (index === -1) {
            return [arr, []];
        }

        const firstPart = arr.slice(0, index);
        const secondPart = arr.slice(index + 1);

        return [firstPart, secondPart];
    }


    const onRate = (post, diff) => {
        const [firstPart, secondPart] = sliceArrayById(posts, post.id).filter(({ id }) => post.id !== id)
        const isLiked = diff > 0
        const currLikeCount = post.rating?.likeCount || 0
        const currDislikeCount = post.rating?.dislikeCount || 0
        const newPost = {
            ...post, rating: {
                likeCount: isLiked ? currLikeCount + 1 : currLikeCount,
                dislikeCount: !isLiked ? currDislikeCount + 1 : currDislikeCount
            }
        }
        setPosts([...firstPart, newPost, ...secondPart])
    }

    return (
        <div>
            <h1>Blog Posts</h1>
            <BlogPostFilter onFilterChange={handleFilterChange} />
            <LanguageSelector handleLanguageChange={handleLanguageChange} />
            {currentPosts.map((post) =>
                <BlogPost key={post.id} post={post} onRate={onRate} />
            )}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentPosts={currentPosts}
                postsPerPage={postsPerPage}
            />
        </div>
    );
}

export default BlogPosts;