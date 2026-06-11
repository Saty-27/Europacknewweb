import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's a verification file ending in .html
  if (pathname.toLowerCase().endsWith('.html')) {
    const filename = pathname.substring(1); // Remove leading slash
    
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
      console.error("Error serving verification file in middleware:", err);
    }
    
    // If request ended in .html but was not found in API, return 404
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
