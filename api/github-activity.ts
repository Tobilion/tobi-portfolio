import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch("https://api.github.com/users/Tobilion/events?per_page=30", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const events = await response.json();
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.status(200).json(events);
}
