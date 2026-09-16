Add-Type -AssemblyName System.Web

$feeds = @(
    @{ name="FreightWaves"; url="https://www.freightwaves.com/feed" },
    @{ name="Seatrade Maritime"; url="https://www.seatrade-maritime.com/rss.xml" },
    @{ name="Splash247"; url="https://splash247.com/feed/" },
    @{ name="Supply Chain Dive"; url="https://www.supplychaindive.com/feeds/news/" }
)

$realArticles = @()

foreach ($f in $feeds) {
    try {
        $u = "https://api.rss2json.com/v1/api.json?rss_url=" + [System.Web.HttpUtility]::UrlEncode($f.url)
        $res = Invoke-RestMethod -Uri $u -TimeoutSec 10
        if ($res.status -eq 'ok' -and $res.items) {
            foreach ($item in $res.items) {
                $img = $item.thumbnail
                if (-not $img) { $img = $item.enclosure.link }
                if (-not $img -and $item.description) {
                    if ($item.description -match 'src=["'']([^"'']+)["'']') { $img = $Matches[1] }
                }
                if (-not $img -and $item.content) {
                    if ($item.content -match 'src=["'']([^"'']+)["'']') { $img = $Matches[1] }
                }
                if ($img -and $item.link -and $item.title) {
                    $desc = ($item.description -replace '<[^>]+>', '').Trim()
                    if ($desc.Length -gt 200) { $desc = $desc.Substring(0, 200) + "..." }
                    
                    $realArticles += @{
                        title = $item.title
                        link = $item.link
                        imageUrl = $img
                        source = $f.name
                        pubDate = $item.pubDate
                        desc = $desc
                    }
                }
            }
        }
    } catch {
        Write-Host "Error fetching $($f.name): $_"
    }
}

Write-Host "Total real articles found with verified images:" $realArticles.Count
$realArticles | Select-Object -First 10 | ConvertTo-Json -Depth 3 | Out-File -FilePath "D:\Antigravity Projects\nexus-knowledge-hub\scratch\real_rss_articles.json" -Encoding utf8
