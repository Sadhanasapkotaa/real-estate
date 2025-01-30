// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// const BlogPage = () => {
//   const router = useRouter();
//   const { blogId } = router.query;
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {
//     if (blogId) {
//       fetch(`/api/blogs/${blogId}/`)
//         .then(response => response.json())
//         .then(data => setBlog(data));
//     }
//   }, [blogId]);

//   if (!blog) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{blog.title}</h1>
//       <p>{blog.content}</p>
//       <p><strong>Author:</strong> {blog.author}</p>
//       <p><strong>Designation:</strong> {blog.author_designation}</p>
//       <p><strong>Published:</strong> {blog.published ? 'Yes' : 'No'}</p>
//       <img src={blog.image} alt={blog.title} />
//     </div>
//   );
// }

// export default BlogPage;
