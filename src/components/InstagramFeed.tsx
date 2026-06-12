import { fetchInstagramPosts, fetchInstagramProfile } from '@/lib/instagram';
import InstagramCard from './InstagramCard';
import Carousel from './Carousel';

export default async function InstagramFeed() {
  const [posts, profile] = await Promise.all([
    fetchInstagramPosts(20),
    fetchInstagramProfile(),
  ]);

  return (
    <Carousel>
      {posts.map((post, i) => (
        <InstagramCard key={post.id} post={post} profilePictureUrl={profile.profile_picture_url} priority={i < 4} />
      ))}
    </Carousel>
  );
}
