// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// const Page = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     fetch('/api/blogs/')
//       .then(response => response.json())
//       .then(data => setBlogs(data));
//   }, []);

//   return (
//     <div>
//       <h1>These are the lists of Blogs</h1>
//       <ul>
//         {blogs.map(blog => (
//           <li key={blog.id}>
//             <a href={`/dashboard/blogs/${blog.id}`}>{blog.title}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Page;