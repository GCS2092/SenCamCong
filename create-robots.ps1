$content = @'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://sencamcong.com/sitemap.xml',
  }
}
'@

[System.IO.File]::WriteAllText("$PWD\src\app\robots.ts", $content, [System.Text.Encoding]::UTF8)
Write-Output "robots.ts cree avec succes"