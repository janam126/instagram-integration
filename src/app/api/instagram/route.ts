import type { NextRequest } from 'next/server';
import { fetchInstagramPosts, InstagramAPIError } from '@/lib/instagram';

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get('limit');
  const limit = limitParam
    ? Math.max(1, Math.min(parseInt(limitParam, 10) || 10, 50))
    : 10;

  try {
    const posts = await fetchInstagramPosts(limit);
    return Response.json({ posts });
  } catch (error) {
    if (error instanceof Error && error.message.includes('INSTAGRAM_ACCESS_TOKEN')) {
      return Response.json(
        { error: 'Server configuration error: missing access token' },
        { status: 500 },
      );
    }

    if (error instanceof InstagramAPIError) {
      return Response.json(
        { error: error.message },
        { status: error.statusCode === 401 ? 401 : 502 },
      );
    }

    return Response.json(
      { error: 'Failed to fetch Instagram posts' },
      { status: 502 },
    );
  }
}
