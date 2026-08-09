# --- concerts/page.tsx ---
$concertsPath = "src\app\concerts\page.tsx"
$concertsContent = Get-Content -LiteralPath $concertsPath -Raw
$concertsMetadata = @"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Concerts",
  description: "Decouvrez les prochaines dates et concerts de SenCamCong a travers la France et l'Europe.",
}

"@
$concertsContent = $concertsContent -replace "(import Navigation from '@/components/Navigation')", "`$1`n$concertsMetadata"
[System.IO.File]::WriteAllText("$PWD\$concertsPath", $concertsContent, [System.Text.Encoding]::UTF8)
Write-Output "concerts/page.tsx mis a jour"

# --- membres/page.tsx ---
$membresPath = "src\app\membres\page.tsx"
$membresContent = Get-Content -LiteralPath $membresPath -Raw
$membresMetadata = @"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Nos Membres",
  description: "Decouvrez les artistes de SenCamCong, musiciens venus du Senegal, du Cameroun et du Congo.",
}

"@
$membresContent = $membresContent -replace "(import Navigation from '@/components/Navigation')", "`$1`n$membresMetadata"
[System.IO.File]::WriteAllText("$PWD\$membresPath", $membresContent, [System.Text.Encoding]::UTF8)
Write-Output "membres/page.tsx mis a jour"

# --- galerie/page.tsx ---
$galeriePath = "src\app\galerie\page.tsx"
$galerieContent = Get-Content -LiteralPath $galeriePath -Raw
$galerieMetadata = @"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Galerie",
  description: "Revivez les meilleurs moments de SenCamCong en concert : photos, videos et coulisses.",
}

"@
$galerieContent = $galerieContent -replace "(import Navigation from '@/components/Navigation')", "`$1`n$galerieMetadata"
[System.IO.File]::WriteAllText("$PWD\$galeriePath", $galerieContent, [System.Text.Encoding]::UTF8)
Write-Output "galerie/page.tsx mis a jour"

# --- contact/page.tsx ---
$contactPath = "src\app\contact\page.tsx"
$contactContent = Get-Content -LiteralPath $contactPath -Raw
$contactMetadata = @"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez SenCamCong pour vos demandes de booking, presse ou partenariats.",
}

"@
$contactContent = $contactContent -replace "(import Navigation from '@/components/Navigation')", "`$1`n$contactMetadata"
[System.IO.File]::WriteAllText("$PWD\$contactPath", $contactContent, [System.Text.Encoding]::UTF8)
Write-Output "contact/page.tsx mis a jour"

Write-Output "Toutes les pages ont ete mises a jour avec succes"