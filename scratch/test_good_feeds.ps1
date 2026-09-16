Add-Type -AssemblyName System.Web

$goodFeeds = @(
    @{ name="FreightWaves"; url="https://www.freightwaves.com/feed" },
    @{ name="Seatrade Maritime"; url="https://www.seatrade-maritime.com/rss.xml" },
    @{ name="Splash247"; url="https://splash247.com/feed/" },
    @{ name="Supply Chain Dive"; url="https://www.supplychaindive.com/feeds/news/" },
    @{ name="Maritime Executive"; url="https://maritime-executive.com/rss" },
    @{ name="Air Cargo News"; url="https://www.aircargonews.net/feed/" }
)

foreach ($f in $goodFeeds) {
    try {
        $u = "https://api.rss2json.com/v1/api.json?rss_url=" + [System.Web.HttpUtility]::UrlEncode($f.url)
        $res = Invoke-RestMethod -Uri $u -TimeoutSec 8
        Write-Host "$($f.name) -> Status: $($res.status), Items: $($res.items.Count)"
    } catch {
        Write-Host "$($f.name) -> ERROR: $_"
    }
}
