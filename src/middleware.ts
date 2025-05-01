import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Desteklenen diller
const locales = ['tr', 'en', 'de', 'ru'];
// Varsayılan dil
export const defaultLocale = 'tr';

// En iyi eşleşen dili belirle
function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locales = ['tr', 'en', 'de', 'ru'];

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // URL'den mevcut path'i al
  const pathname = request.nextUrl.pathname;

  // Belirli uzantılara sahip dosyaları atla
  const shouldSkip =
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/videos/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.xml') ||
    pathname.includes('.ico') ||
    pathname.includes('.jpg') ||
    pathname.includes('.jpeg') ||
    pathname.includes('.png') ||
    pathname.includes('.svg') ||
    pathname.includes('.webp') ||
    pathname.includes('.js') ||
    pathname.includes('.css');

  if (shouldSkip) {
    return NextResponse.next();
  }

  // Kullanıcının tercih ettiği dili belirle
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Eğer path'te dil belirtilmemişse, kullanıcının tercih ettiği dile yönlendir
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // Özel durumlar için yönlendirmeler
    if (pathname === '/' || pathname === '') {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    // Diğer tüm durumlar için dil parametresi ekle
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|videos|images).*)'],
};
