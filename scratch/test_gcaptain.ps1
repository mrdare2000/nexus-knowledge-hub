$url = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fgcaptain.com%2Ffeed%2F"
$res = Invoke-RestMethod -Uri $url
Write-Host "gCaptain Status:" $res.status
foreach ($item in $res.items | Select-Object -First 3) {
    Write-Host "Title:" $item.title
    Write-Host "Thumbnail:" $item.thumbnail
    Write-Host "Enclosure link:" $item.enclosure.link
    Write-Host "Description:" $item.description
    Write-Host "Content:" $item.content
    Write-Host "----------------------------------"
}
