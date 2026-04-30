import { unstable_cache } from 'next/cache';

const INSTAGRAM_API_BASE = 'https://graph.instagram.com/v21.0';

export type InstagramPost = {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  permalink: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  like_count: number;
  comments_count: number;
  timestamp: string;
  username: string;
};

type GraphAPIResponse = {
  data: InstagramPost[];
};

type GraphAPIError = {
  error: {
    message: string;
    type: string;
    code: number;
  };
};

export type InstagramProfile = {
  id: string;
  name: string;
  username: string;
  profile_picture_url: string;
  biography?: string;
  followers_count: number;
};

export class InstagramAPIError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = 'InstagramAPIError';
  }
}

const fetchPostsCached = unstable_cache(
  async (limit: number): Promise<InstagramPost[]> => {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN!;

    const url = new URL(`${INSTAGRAM_API_BASE}/me/media`);
    url.searchParams.set(
      'fields',
      'id,media_url,thumbnail_url,caption,permalink,media_type,like_count,comments_count,timestamp,username',
    );
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('access_token', token);

    const res = await fetch(url.toString());

    if (!res.ok) {
      let message = `Instagram API responded with ${res.status}`;
      try {
        const body: GraphAPIError = await res.json();
        if (body.error?.message) {
          message = body.error.message;
        }
      } catch {
        // ignore parse errors, keep generic message
      }
      throw new InstagramAPIError(message, res.status);
    }

    const json: GraphAPIResponse = await res.json();

    return json.data;
  },
  ['instagram-posts'],
  { revalidate: 3600 },
);

const fetchProfileCached = unstable_cache(
  async (): Promise<InstagramProfile> => {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN!;

    const url = new URL(`${INSTAGRAM_API_BASE}/me`);
    url.searchParams.set(
      'fields',
      'id,name,username,profile_picture_url,biography,followers_count',
    );
    url.searchParams.set('access_token', token);

    const res = await fetch(url.toString());

    if (!res.ok) {
      let message = `Instagram API responded with ${res.status}`;
      try {
        const body: GraphAPIError = await res.json();
        if (body.error?.message) {
          message = body.error.message;
        }
      } catch {
        // ignore parse errors, keep generic message
      }
      throw new InstagramAPIError(message, res.status);
    }

    return res.json();
  },
  ['instagram-profile'],
  { revalidate: 3600 },
);

export async function fetchInstagramPosts(limit = 10): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    throw new Error('INSTAGRAM_ACCESS_TOKEN environment variable is not set');
  }

  return fetchPostsCached(limit);
}

export async function fetchInstagramProfile(): Promise<InstagramProfile> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    throw new Error('INSTAGRAM_ACCESS_TOKEN environment variable is not set');
  }

  return fetchProfileCached();
}
