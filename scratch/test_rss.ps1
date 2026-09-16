$url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.freightwaves.com%2Ffeed"
$res = Invoke-RestMethod -Uri $url
Write-Host "Status:" $res.status
Write-Host "Items count:" $res.items.Count
foreach ($item in $res.items | Select-Object -First 3) {
    Write-Host "Title:" $item.title
    Write-Host "Thumbnail:" $item.thumbnail
    Write-Host "Enclosure:" $item.enclosure
    Write-Host "Description:" ($item.description -replace '<[^>]+>', '').Substring(0, 100)
    Write-Host "----------------------------------"
}
