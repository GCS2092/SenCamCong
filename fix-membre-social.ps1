$path = "src\app\membres\[id]\page.tsx"
$content = Get-Content -LiteralPath $path -Raw

$oldBlock = @'
            {/* Social */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Reseaux sociaux</h3>
              <div className="flex gap-3">
                <a href="#" className="flex-1 px-4 py-3 bg-zinc-800 rounded-lg hover:bg-green-500 transition-colors text-white text-center">
                  Instagram
                </a>
                <a href="#" className="flex-1 px-4 py-3 bg-zinc-800 rounded-lg hover:bg-yellow-500 transition-colors text-white text-center">
                  Twitter
                </a>
              </div>
            </div>
'@

$newBlock = @'
            {/* Social */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Reseaux sociaux</h3>
              <div className="flex gap-3">
                
                  href="https://www.instagram.com/sencamcong/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-zinc-800 rounded-lg hover:bg-green-500 transition-colors text-white text-center"
                >
                  Instagram
                </a>
              </div>
            </div>
'@

$content = $content.Replace($oldBlock, $newBlock)
[System.IO.File]::WriteAllText("$PWD\$path", $content, [System.Text.Encoding]::UTF8)
Write-Output "Fichier membre (social) mis a jour"