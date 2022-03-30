import { Carousel } from '../sections/index';
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';

export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-12 mb-8 mt-20">
      <div className="grid grid-cols-1 mt-6 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          <Carousel />
        </div>
        <div className="lg:col-span-4 col-span-1 row-span-2">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        
      </div>
    </div>
      
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}

