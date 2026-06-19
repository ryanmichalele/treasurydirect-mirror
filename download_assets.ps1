$baseUrl = "https://www.treasurydirect.gov"
$mirrorDir = "C:\Users\SAM\OneDrive\Desktop\TREASURY DIRECT\treasurydirect-mirror"

# Create required directories
$dirs = @(
    "styles",
    "scripts",
    "images\icons",
    "images\content",
    "log-in",
    "research-center",
    "mailing-lists",
    "news",
    "news\2026",
    "about",
    "forms",
    "help-center",
    "contact-us",
    "savings-bonds",
    "savings-bonds\buy-a-bond",
    "savings-bonds\gift-a-bond",
    "savings-bonds\cashing-a-bond",
    "savings-bonds\savings-bond-calculator",
    "savings-bonds\manage-bonds",
    "savings-bonds\manage-bonds\changing-information-ee-or-i-bonds",
    "savings-bonds\manage-bonds\lost-stolen-destroyed-ee-or-i-bonds",
    "savings-bonds\forms",
    "savings-bonds\treasury-hunt",
    "savings-bonds\ee-bonds",
    "savings-bonds\i-bonds",
    "marketable-securities",
    "marketable-securities\treasury-bills",
    "marketable-securities\treasury-bonds",
    "marketable-securities\treasury-notes",
    "marketable-securities\tips",
    "marketable-securities\floating-rate-notes",
    "marketable-securities\strips",
    "marketable-securities\forms",
    "auctions",
    "auctions\how-auctions-work",
    "auctions\when-auctions-happen",
    "auctions\reopenings",
    "auctions\announcements-data-results",
    "auctions\announcements-data-results\buy-backs",
    "auctions\announcements-data-results\announcement-results-press-releases\treasury-marketable",
    "auctions\upcoming",
    "auctions\results",
    "auctions\auction-query",
    "laws-and-regulations",
    "laws-and-regulations\auction-regulations-uoc",
    "laws-and-regulations\collateral-programs",
    "laws-and-regulations\trades",
    "laws-and-regulations\fraud",
    "laws-and-regulations\gsa",
    "laws-and-regulations\gsa\lpr-reports",
    "laws-and-regulations\buyback-rules",
    "laws-and-regulations\marketable-securities-laws-and-regulations",
    "laws-and-regulations\savings-bond-regulations",
    "laws-and-regulations\treasury-direct-regulations",
    "government",
    "government\federal-investments-program",
    "government\slgs",
    "government\security-liquidation-proceeds",
    "government\federal-borrowings-program",
    "government\treasury-managed-accounts",
    "government\funds-management-program-reports",
    "government\historical-debt-outstanding",
    "government\public-debt-reports",
    "government\interest-rates-and-prices",
    "legal-information",
    "legal-information\foia",
    "legal-information\privacy",
    "legal-information\terms",
    "legal-information\data-quality",
    "legal-information\developers",
    "legal-information\accessibility",
    "1099",
    "rss",
    "indiv\help\treasurydirect-help",
    "indiv\help\treasurydirect-help\user-guide\001-010",
    "indiv\help\treasurydirect-help\user-guide\011-020",
    "indiv\help\treasurydirect-help\user-guide\601-610",
    "RS"
)

foreach ($dir in $dirs) {
    $fullPath = Join-Path $mirrorDir $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Host "Created: $fullPath"
    }
}

Write-Host "`n=== Downloading Static Assets ==="

# Download CSS
Write-Host "Downloading styles/style.css..."
try {
    Invoke-WebRequest -Uri "$baseUrl/styles/style.css" -OutFile "$mirrorDir\styles\style.css" -UseBasicParsing -ErrorAction Stop
    Write-Host "  OK"
} catch { Write-Host "  FAILED: $_" }

# Download JS files
$jsFiles = @(
    @{url="/scripts/jquery.min.js"; file="jquery.min.js"},
    @{url="/scripts/bootstrap.bundle.min.js"; file="bootstrap.bundle.min.js"},
    @{url="/scripts/components.js"; file="components.js"},
    @{url="/scripts/back-to-top.js"; file="back-to-top.js"}
)
foreach ($js in $jsFiles) {
    Write-Host "Downloading scripts/$($js.file)..."
    try {
        Invoke-WebRequest -Uri "$baseUrl$($js.url)" -OutFile "$mirrorDir\scripts\$($js.file)" -UseBasicParsing -ErrorAction Stop
        Write-Host "  OK"
    } catch { Write-Host "  FAILED: $_" }
}

# Download images
$images = @(
    "/images/favicon.svg",
    "/images/logo-treasurydirect-color.svg",
    "/images/logo-fedinvest.svg",
    "/images/logo-slgsafe.svg",
    "/images/homepage-stage-bg-1.jpg",
    "/images/content/circle-paperbond.png",
    "/images/icons/us_flag_small.png",
    "/images/icons/icon-dot-gov.svg",
    "/images/icons/icon-https.svg"
)
foreach ($img in $images) {
    $relPath = $img.TrimStart('/')
    $outFile = Join-Path $mirrorDir $relPath
    Write-Host "Downloading $relPath..."
    try {
        Invoke-WebRequest -Uri "$baseUrl$img" -OutFile $outFile -UseBasicParsing -ErrorAction Stop
        Write-Host "  OK"
    } catch { Write-Host "  FAILED: $_" }
}

Write-Host "`n=== Downloading HTML Pages ==="

$pages = @(
    @{path="/log-in/"; file="log-in\index.html"},
    @{path="/research-center/"; file="research-center\index.html"},
    @{path="/mailing-lists/"; file="mailing-lists\index.html"},
    @{path="/news/"; file="news\index.html"},
    @{path="/about/"; file="about\index.html"},
    @{path="/forms/"; file="forms\index.html"},
    @{path="/help-center/"; file="help-center\index.html"},
    @{path="/contact-us/"; file="contact-us\index.html"},
    @{path="/savings-bonds/"; file="savings-bonds\index.html"},
    @{path="/savings-bonds/buy-a-bond/"; file="savings-bonds\buy-a-bond\index.html"},
    @{path="/savings-bonds/gift-a-bond/"; file="savings-bonds\gift-a-bond\index.html"},
    @{path="/savings-bonds/cashing-a-bond/"; file="savings-bonds\cashing-a-bond\index.html"},
    @{path="/savings-bonds/savings-bond-calculator/"; file="savings-bonds\savings-bond-calculator\index.html"},
    @{path="/savings-bonds/manage-bonds/"; file="savings-bonds\manage-bonds\index.html"},
    @{path="/savings-bonds/forms/"; file="savings-bonds\forms\index.html"},
    @{path="/savings-bonds/treasury-hunt/"; file="savings-bonds\treasury-hunt\index.html"},
    @{path="/savings-bonds/ee-bonds/"; file="savings-bonds\ee-bonds\index.html"},
    @{path="/savings-bonds/i-bonds/"; file="savings-bonds\i-bonds\index.html"},
    @{path="/savings-bonds/manage-bonds/changing-information-ee-or-i-bonds/"; file="savings-bonds\manage-bonds\changing-information-ee-or-i-bonds\index.html"},
    @{path="/savings-bonds/manage-bonds/lost-stolen-destroyed-ee-or-i-bonds/"; file="savings-bonds\manage-bonds\lost-stolen-destroyed-ee-or-i-bonds\index.html"},
    @{path="/marketable-securities/"; file="marketable-securities\index.html"},
    @{path="/marketable-securities/treasury-bills/"; file="marketable-securities\treasury-bills\index.html"},
    @{path="/marketable-securities/treasury-bonds/"; file="marketable-securities\treasury-bonds\index.html"},
    @{path="/marketable-securities/treasury-notes/"; file="marketable-securities\treasury-notes\index.html"},
    @{path="/marketable-securities/tips/"; file="marketable-securities\tips\index.html"},
    @{path="/marketable-securities/floating-rate-notes/"; file="marketable-securities\floating-rate-notes\index.html"},
    @{path="/marketable-securities/strips/"; file="marketable-securities\strips\index.html"},
    @{path="/marketable-securities/forms/"; file="marketable-securities\forms\index.html"},
    @{path="/auctions/"; file="auctions\index.html"},
    @{path="/auctions/how-auctions-work/"; file="auctions\how-auctions-work\index.html"},
    @{path="/auctions/when-auctions-happen/"; file="auctions\when-auctions-happen\index.html"},
    @{path="/auctions/reopenings/"; file="auctions\reopenings\index.html"},
    @{path="/auctions/announcements-data-results/"; file="auctions\announcements-data-results\index.html"},
    @{path="/auctions/announcements-data-results/buy-backs/"; file="auctions\announcements-data-results\buy-backs\index.html"},
    @{path="/auctions/upcoming/"; file="auctions\upcoming\index.html"},
    @{path="/auctions/results/"; file="auctions\results\index.html"},
    @{path="/auctions/auction-query/"; file="auctions\auction-query\index.html"},
    @{path="/auctions/announcements-data-results/announcement-results-press-releases/treasury-marketable/"; file="auctions\announcements-data-results\announcement-results-press-releases\treasury-marketable\index.html"},
    @{path="/laws-and-regulations/"; file="laws-and-regulations\index.html"},
    @{path="/laws-and-regulations/auction-regulations-uoc/"; file="laws-and-regulations\auction-regulations-uoc\index.html"},
    @{path="/laws-and-regulations/collateral-programs/"; file="laws-and-regulations\collateral-programs\index.html"},
    @{path="/laws-and-regulations/trades/"; file="laws-and-regulations\trades\index.html"},
    @{path="/laws-and-regulations/fraud/"; file="laws-and-regulations\fraud\index.html"},
    @{path="/laws-and-regulations/gsa/"; file="laws-and-regulations\gsa\index.html"},
    @{path="/laws-and-regulations/gsa/lpr-reports/"; file="laws-and-regulations\gsa\lpr-reports\index.html"},
    @{path="/laws-and-regulations/buyback-rules/"; file="laws-and-regulations\buyback-rules\index.html"},
    @{path="/laws-and-regulations/marketable-securities-laws-and-regulations/"; file="laws-and-regulations\marketable-securities-laws-and-regulations\index.html"},
    @{path="/laws-and-regulations/savings-bond-regulations/"; file="laws-and-regulations\savings-bond-regulations\index.html"},
    @{path="/laws-and-regulations/treasury-direct-regulations/"; file="laws-and-regulations\treasury-direct-regulations\index.html"},
    @{path="/government/"; file="government\index.html"},
    @{path="/government/federal-investments-program/"; file="government\federal-investments-program\index.html"},
    @{path="/government/slgs/"; file="government\slgs\index.html"},
    @{path="/government/security-liquidation-proceeds/"; file="government\security-liquidation-proceeds\index.html"},
    @{path="/government/federal-borrowings-program/"; file="government\federal-borrowings-program\index.html"},
    @{path="/government/treasury-managed-accounts/"; file="government\treasury-managed-accounts\index.html"},
    @{path="/government/funds-management-program-reports/"; file="government\funds-management-program-reports\index.html"},
    @{path="/government/historical-debt-outstanding/"; file="government\historical-debt-outstanding\index.html"},
    @{path="/government/public-debt-reports/"; file="government\public-debt-reports\index.html"},
    @{path="/government/interest-rates-and-prices/"; file="government\interest-rates-and-prices\index.html"},
    @{path="/legal-information/foia/"; file="legal-information\foia\index.html"},
    @{path="/legal-information/privacy/"; file="legal-information\privacy\index.html"},
    @{path="/legal-information/terms/"; file="legal-information\terms\index.html"},
    @{path="/legal-information/data-quality/"; file="legal-information\data-quality\index.html"},
    @{path="/legal-information/developers/"; file="legal-information\developers\index.html"},
    @{path="/legal-information/accessibility/"; file="legal-information\accessibility\index.html"},
    @{path="/1099/"; file="1099\index.html"},
    @{path="/rss/"; file="rss\index.html"},
    @{path="/indiv/help/treasurydirect-help/"; file="indiv\help\treasurydirect-help\index.html"},
    @{path="/indiv/help/treasurydirect-help/user-guide/001-010/"; file="indiv\help\treasurydirect-help\user-guide\001-010\index.html"},
    @{path="/indiv/help/treasurydirect-help/user-guide/011-020/"; file="indiv\help\treasurydirect-help\user-guide\011-020\index.html"},
    @{path="/indiv/help/treasurydirect-help/user-guide/601-610/"; file="indiv\help\treasurydirect-help\user-guide\601-610\index.html"},
    @{path="/news/2026/release-06-04-strips/"; file="news\2026\release-06-04-strips\index.html"},
    @{path="/news/2026/release-05-06-strips/"; file="news\2026\release-05-06-strips\index.html"},
    @{path="/news/2026/release-05-01-rates/"; file="news\2026\release-05-01-rates\index.html"},
    @{path="/news/2026/release-04-06-strips/"; file="news\2026\release-04-06-strips\index.html"},
    @{path="/news/2026/release-03-05-strips/"; file="news\2026\release-03-05-strips\index.html"},
    @{path="/news/2026/release-02-05-strips/"; file="news\2026\release-02-05-strips\index.html"},
    @{path="/news/2026/release-01-07-strips/"; file="news\2026\release-01-07-strips\index.html"}
)

foreach ($page in $pages) {
    $outFile = Join-Path $mirrorDir $page.file
    $pageDir = Split-Path $outFile -Parent
    if (-not (Test-Path $pageDir)) {
        New-Item -ItemType Directory -Path $pageDir -Force | Out-Null
    }
    Write-Host "Downloading $($page.path)..."
    try {
        Invoke-WebRequest -Uri "$baseUrl$($page.path)" -OutFile $outFile -UseBasicParsing -ErrorAction Stop
        Write-Host "  OK"
    } catch {
        Write-Host "  FAILED: $_"
        # Try with index.html appended
        try {
            Invoke-WebRequest -Uri "$baseUrl$($page.path)index.html" -OutFile $outFile -UseBasicParsing -ErrorAction Stop
            Write-Host "  OK (with index.html)"
        } catch {
            Write-Host "  FAILED again: $_"
        }
    }
}

Write-Host "`n=== Download Complete ==="
