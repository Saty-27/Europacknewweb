import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept root-level .html files (e.g. Google / Bing verification files)
  if (pathname.toLowerCase().endsWith('.html') && pathname.split('/').length === 2) {
    const filename = pathname.substring(1);
    try {
      const apiBaseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:5002/api'
        : (process.env.NEXT_PUBLIC_API_URL || 'https://europackindia.com/api');

      const res = await fetch(`${apiBaseUrl}/site-settings/file/${filename}`, {
        next: { revalidate: 60 }
      });

      if (res.ok) {
        const htmlContent = await res.text();
        return new NextResponse(htmlContent, {
          headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'public, max-age=60, s-maxage=60'
          }
        });
      }
    } catch (err) {
      console.error('Middleware verification file error:', err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
