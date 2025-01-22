'use client'
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import  supabase from "../utils/supabase";
import Form from "@components/Form";
import Nav from "@components/Nav";

const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    photoName: '',
    priceDetails: '',
  });

  useEffect(() => {
    const getPostDetails = async () => {
      const { data, error } = await supabase
        .from('photos')
        .select()
        .eq('id', postId);

      if (error) {
        console.error(error);
      } else {
        setPost({
          photoName: data[0].photo_name,
          priceDetails: data[0].price_details,
        });
      }
    };

    if (postId) getPostDetails();
  }, [postId]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert('Post ID not found');

    try {
      const { data, error } = await supabase
        .from('photos')
        .update({
          id: postId,
          photo_name: post.photoName,
          price_details: post.priceDetails,
        });

      if (error) {
        console.error(error);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <Nav/>
   
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleUpdatePost}
    />
     </div>
  );
};

export default UpdatePost;

