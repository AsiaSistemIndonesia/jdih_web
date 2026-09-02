// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function proxy(request: NextRequest) {
//   const queryToken = request.nextUrl.searchParams.get('access_token')
//   const cookieToken = request.cookies.get('jdih_access')?.value

//   // Izinkan akses API internal Next.js dan file statis
//   if (request.nextUrl.pathname.startsWith('/_next') ||
//     request.nextUrl.pathname.startsWith('/api') ||
//     request.nextUrl.pathname.match(/\.(png|jpg|jpeg|svg|ico)$/)) {
//     return NextResponse.next()
//   }

//   // Jika URL memiliki token yang benar, kita buat cookie untuk mengingatnya
//   if (queryToken === process.env.WEBSITE_ACCESS_TOKEN) {
//     // Hapus parameter access_token dari URL agar terlihat lebih bersih di browser
//     const url = new URL(request.url)
//     url.searchParams.delete('access_token')

//     const response = NextResponse.redirect(url)
//     // Set cookie yang berlaku selama sesi browser
//     response.cookies.set('jdih_access', 'granted', {
//       path: '/',
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 60 * 60 * 24 * 7 // Berlaku 7 hari
//     })
//     return response
//   }

//   const hasValidCookie = cookieToken === 'granted'

//   // Jika diakses lokal (localhost) untuk development, izinkan sementara
//   const isLocalhost = request.headers.get('host')?.includes('localhost') ||
//     request.headers.get('host')?.includes('127.0.0.1')

//   if (!hasValidCookie && !isLocalhost) {
//     return new NextResponse(
//       `<!DOCTYPE html>
// <html lang="id">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Akses Ditolak - JARINGAN DOKUMENTASI DAN INFORMASI HUKUM </title>
//   <meta name="robots" content="noindex, nofollow">
//   <style>
//     :root {
//       --primary: #0b29c2;
//       --primary-light: #e6eaff;
//       --text-dark: #1e293b;
//       --text-light: #64748b;
//       --danger: #ef4444;
//       --danger-light: #fef2f2;
//     }
//     body {
//       font-family: 'Inter', system-ui, -apple-system, sans-serif;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       min-height: 100vh;
//       margin: 0;
//       background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
//       color: var(--text-dark);
//     }
//     .container {
//       background: white;
//       padding: 3rem 3rem;
//       border-radius: 1.5rem;
//       box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
//       max-width: 450px;
//       width: 85%;
//       text-align: center;
//       border-top: 6px solid var(--primary);
//     }
//     .icon-container {
//       width: 72px;
//       height: 72px;
//       background-color: var(--danger-light);
//       border-radius: 50%;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       margin: 0 auto 1.5rem;
//     }
//     .icon-container svg {
//       width: 32px;
//       height: 32px;
//       color: var(--danger);
//     }
//     h1 {
//       font-size: 1.5rem;
//       font-weight: 800;
//       margin-bottom: 0.75rem;
//       color: var(--text-dark);
//       letter-spacing: -0.025em;
//     }
//     p {
//       color: var(--text-light);
//       line-height: 1.6;
//       margin-bottom: 2rem;
//       font-size: 0.95rem;
//     }
//     .footer {
//       border-top: 1px solid #f1f5f9;
//       padding-top: 1.5rem;
//       font-size: 0.8rem;
//       color: #94a3b8;
//     }
//     .hospital-name {
//       font-weight: 800;
//       color: var(--primary);
//       letter-spacing: 0.05em;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="icon-container">
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
//         <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//       </svg>
//     </div>
//     <h1>Area Terbatas</h1>
//     <p>Anda mencoba mengakses halaman internal JDIH. Silakan masuk menggunakan akun yang memiliki hak akses untuk melanjutkan.</p>
//     <div class="footer">
//       Sistem Terpadu &bull; <span class="hospital-name">JARINGAN DOKUMENTASI DAN INFORMASI HUKUM</span>
//     </div>
//   </div>
// </body>
// </html>`,
//       {
//         status: 403,
//         headers: {
//           'Content-Type': 'text/html',
//           'X-Robots-Tag': 'noindex, nofollow'
//         }
//       }
//     )
//   }

//   // Set header keamanan tambahan
//   const response = NextResponse.next()
//   response.headers.set('X-Frame-Options', 'DENY')
//   response.headers.set('X-Robots-Tag', 'noindex, nofollow')

//   return response
// }

// export const config = {
//   // Terapkan middleware ke semua rute kecuali _next/static, dll
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // =========================================================
  // PROXY HANYA AKTIF DI PRODUCTION
  // =========================================================
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next()
  }

  const queryToken = request.nextUrl.searchParams.get('access_token')
  const cookieToken = request.cookies.get('jdih_access')?.value

  // Izinkan akses API internal Next.js dan file statis
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.match(/\.(png|jpg|jpeg|svg|ico)$/)
  ) {
    return NextResponse.next()
  }

  // =========================================================
  // JIKA URL MEMILIKI ACCESS TOKEN YANG BENAR
  // =========================================================
  if (queryToken === process.env.WEBSITE_ACCESS_TOKEN) {
    // Hapus parameter access_token dari URL
    const url = new URL(request.url)
    url.searchParams.delete('access_token')

    const response = NextResponse.redirect(url)

    // Set cookie akses
    response.cookies.set('jdih_access', 'granted', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    })

    return response
  }

  // =========================================================
  // CEK COOKIE
  // =========================================================
  const hasValidCookie = cookieToken === 'granted'

  // =========================================================
  // JIKA TIDAK ADA COOKIE → 403
  // =========================================================
  if (!hasValidCookie) {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Akses Ditolak - JARINGAN DOKUMENTASI DAN INFORMASI HUKUM</title>
  <meta name="robots" content="noindex, nofollow">
  <style>
    :root {
      --primary: #0b29c2;
      --primary-light: #e6eaff;
      --text-dark: #1e293b;
      --text-light: #64748b;
      --danger: #ef4444;
      --danger-light: #fef2f2;
    }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      color: var(--text-dark);
    }

    .container {
      background: white;
      padding: 3rem 3rem;
      border-radius: 1.5rem;
      box-shadow:
        0 20px 25px -5px rgba(0, 0, 0, 0.05),
        0 8px 10px -6px rgba(0, 0, 0, 0.01);
      max-width: 450px;
      width: 85%;
      text-align: center;
      border-top: 6px solid var(--primary);
    }

    .icon-container {
      width: 72px;
      height: 72px;
      background-color: var(--danger-light);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto 1.5rem;
    }

    .icon-container svg {
      width: 32px;
      height: 32px;
      color: var(--danger);
    }

    h1 {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 0.75rem;
      color: var(--text-dark);
      letter-spacing: -0.025em;
    }

    p {
      color: var(--text-light);
      line-height: 1.6;
      margin-bottom: 2rem;
      font-size: 0.95rem;
    }

    .footer {
      border-top: 1px solid #f1f5f9;
      padding-top: 1.5rem;
      font-size: 0.8rem;
      color: #94a3b8;
    }

    .hospital-name {
      font-weight: 800;
      color: var(--primary);
      letter-spacing: 0.05em;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="icon-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>

    <h1>Area Terbatas</h1>

    <p>
      Anda mencoba mengakses halaman internal JDIH.
      Silakan masuk menggunakan akun yang memiliki hak akses
      untuk melanjutkan.
    </p>

    <div class="footer">
      Sistem Terpadu &bull;
      <span class="hospital-name">
        JARINGAN DOKUMENTASI DAN INFORMASI HUKUM
      </span>
    </div>
  </div>
</body>
</html>`,
      {
        status: 403,
        headers: {
          'Content-Type': 'text/html',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    )
  }

  // =========================================================
  // HEADER KEAMANAN
  // =========================================================
  const response = NextResponse.next()

  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')

  return response
}

// =========================================================
// MATCHER
// =========================================================
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
