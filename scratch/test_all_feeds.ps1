Add-Type -AssemblyName System.Web

$feeds = @(
    @{ name="FreightWaves"; url="https://www.freightwaves.com/feed" },
    @{ name="gCaptain"; url="https://gcaptain.com/feed/" },
    @{ name="The Loadstar"; url="https://theloadstar.com/feed/" },
    @{ name="Supply Chain Dive"; url="https://www.supplychaindive.com/feeds/news/" },
    @{ name="Supply Chain Brain"; url="https://feeds.feedburner.com/SupplyChainBrain" },
    @{ name="Hellenic Shipping"; url="https://www.hellenicshippingnews.com/feed/" },
    @{ name="Seatrade Maritime"; url="https://www.seatrade-maritime.com/rss.xml" },
    @{ name="Splash247"; url="https://splash247.com/feed/" },
    @{ name="Logistics Management"; url="https://www.logisticsmgmt.com/rss" },
    @{ name="Journal of Commerce"; url="https://www.joc.com/rss/all" }
)

foreach ($f in $feeds) {
    try {
        $u = "https://api.rss2json.com/v1/api.json?rss_url=" + [System.Web.HttpUtility]::UrlEncode($f.url)
        $res = Invoke-RestMethod -Uri $u -TimeoutSec 8
        $hasImgCount = 0
        foreach ($item in $res.items) {
            $img = $item.thumbnail
            if (-not $img) { $img = $item.enclosure.link }
            if (-not $img -and $item.description) {
                if ($item.description -match 'src=["'']([^"'']+)["'']') { $img = $Matches[1] }
            }
            if ($img) { $hasImgCount++ }
        }
        Write-Host "$($f.name) -> Status: $($res.status), Total Items: $($res.items.Count), Items with Image: $hasImgCount"
    } catch {
        Write-Host "$($f.name) -> ERROR: $_"
    }
}
