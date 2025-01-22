"use client"
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import supabase from '../utils/supabase';
import NoSearchResult from './NoSearchResult';
import _ from 'lodash';
import NotConnected from './NotConnected';

const ProductCardList = ({ data }) => {
  return (
    <div className="row shadow ">
      {data.map((post, index) => (
        <div key={index} className="column">
          <ProductCard post={post} />
        </div>
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const offset = posts.length; 
    const limit = 10; 

    try {
      const { data, error } = await supabase
        .from('photos')
        .select('*, photo_url_small, photo_url_medium, photo_url_large')
        .range(offset, offset + limit);

      if (error) {
        setError(error);
      } else {
        setPosts([...posts, ...data]); 
        setAllPosts([...allPosts, ...data]);
        setHasMore(data.length === limit); 
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [posts, allPosts]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight * 0.8) {
        fetchPosts(); 
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [posts]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, 'i');
    return allPosts.filter((item) => regex.test(item.photo_name));
  };

  const debouncedSearch = _.debounce((searchText) => {
    const searchResult = filterPrompts(searchText);
    setSearchedResults(searchResult);
  }, 500);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a Product"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {error ? (
        <NotConnected />
      ) : (
        searchText ? (
          searchedResults.length > 0 ? (
            <ProductCardList data={searchedResults} />
          ) : (
            <NoSearchResult />
          )
        ) : (
          <ProductCardList data={posts} />
        )
      )}
    </section>
  );
};

export default Feed;
