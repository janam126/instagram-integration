import type { NextRequest } from 'next/server';
import { refreshInstagramToken, InstagramAPIError } from '@/lib/instagram';
import { getTokenAge } from '@/lib/token-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const ageDays = await getTokenAge();
    const newToken = await refreshInstagramToken();

    return Response.json({
      ok: true,
      previousAgeDays: ageDays !== null ? Math.round(ageDays) : null,
      expiresIn: '60 days',
      tokenPreview: `${newToken.slice(0, 8)}...`,
    });
  } catch (error) {
    if (error instanceof InstagramAPIError) {
      return Response.json({ error: error.message }, { status: error.statusCode });
    }
    return Response.json({ error: 'Token refresh failed' }, { status: 500 });
  }
}
