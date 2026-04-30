import Image from 'next/image';
import type { InstagramPost } from '@/lib/instagram';

function formatTimestamp(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function InstagramCard({
  post,
  profilePictureUrl,
  priority = false,
}: {
  post: InstagramPost;
  profilePictureUrl: string;
  priority?: boolean;
}) {
  const imgSrc =
    post.media_type === 'VIDEO'
      ? (post.thumbnail_url ?? post.media_url)
      : post.media_url;

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col w-full rounded-2xl overflow-hidden border border-zinc-100 bg-white hover:shadow-md transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Image
          src={profilePictureUrl}
          alt={post.username}
          width={28}
          height={28}
          className="rounded-full object-cover flex-shrink-0"
        />
        <span className="text-sm font-semibold text-zinc-900 truncate">
          {post.username}
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={imgSrc}
          alt={post.caption ?? ''}
          fill
          sizes="(max-width: 1400px) 25vw, 350px"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-1.5 px-3 py-3">
        <div className="flex items-center gap-3 text-zinc-700">
          <span className="flex items-center gap-1 text-sm">
            <HeartIcon />
            {post.like_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <CommentIcon />
            {post.comments_count.toLocaleString()}
          </span>
        </div>

        {post.caption && (
          <p className="text-sm text-zinc-800 line-clamp-2 leading-snug">
            <span className="font-semibold">{post.username}</span>{' '}
            {post.caption}
          </p>
        )}

        <p className="text-xs text-zinc-400">{formatTimestamp(post.timestamp)}</p>
      </div>
    </a>
  );
}
