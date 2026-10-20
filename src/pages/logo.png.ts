import { logoPng } from '../lib/card';
export const GET = () => new Response(logoPng(), { headers: { 'Content-Type': 'image/png' } });
