import { fetchInstagramPosts } from '@/lib/instagram';
import InstagramCard from './InstagramCard';
import Carousel from './Carousel';

export default async function InstagramFeed() {
  const posts = await fetchInstagramPosts(20);

  return (
    <Carousel>
      {posts.map((post) => (
        <InstagramCard key={post.id} post={post} />
      ))}
    </Carousel>
  );
}
