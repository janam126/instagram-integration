import Image from 'next/image';
import type { InstagramPost } from '@/lib/instagram';
import Link from 'next/link';

export default function InstagramCard({ post }: { post: InstagramPost }) {
  const imgSrc =
    post.media_type === 'VIDEO'
      ? (post.thumbnail_url ?? post.media_url)
      : post.media_url;

  return (
    <Link
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl"
    >
      <Image
        src={imgSrc}
        alt={post.caption ?? ''}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {post.caption && (
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="line-clamp-3 text-sm leading-snug text-white">
            {post.caption}
          </p>
        </div>
      )}
    </Link>
  );
}
