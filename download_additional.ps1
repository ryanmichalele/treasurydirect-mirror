$baseUrl = "https://www.treasurydirect.gov"
$mirrorDir = "C:\Users\SAM\OneDrive\Desktop\TREASURY DIRECT\treasurydirect-mirror"

# All additional assets to download
$assets = @(
    # Images
    "/images/content/abstract-graph.jpg",
    "/images/content/bank-teller-meeting.jpg",
    "/images/content/circle-forms.png",
    "/images/content/grandma-and-daughter.jpg",
    "/images/content/logo-fedinvest.svg",
    "/images/content/logo-slgs-safe.png",
    "/images/content/logo-td.svg",
    "/images/content/man-silhouette-sitting.jpg",
    "/images/content/man-with-smartphone.jpg",
    "/images/content/Paper-bond-info.png",
    "/images/content/penny-on-gray-background.jpg",
    "/images/content/shutterstock_1050436808.png",
    "/images/content/shutterstock_1075401791.png",
    "/images/content/shutterstock_735743374.png",
    "/images/content/woman-at-laptop.jpg",
    "/images/content/woman-at-laptop-2.jpg",
    
    # Content icons
    "/images/content-icons/icon-building-gray.svg",
    "/images/content-icons/icon-chevron-orange.svg",
    "/images/content-icons/icon-circle-bond.svg",
    "/images/content-icons/icon-circle-book.svg",
    "/images/content-icons/icon-circle-calc.svg",
    "/images/content-icons/icon-circle-coins.svg",
    "/images/content-icons/icon-circle-envelope.svg",
    "/images/content-icons/icon-circle-form.svg",
    "/images/content-icons/icon-circle-gavel.svg",
    "/images/content-icons/icon-circle-govt.svg",
    "/images/content-icons/icon-circle-graph.svg",
    "/images/content-icons/icon-circle-help.svg",
    "/images/content-icons/icon-circle-info.svg",
    "/images/content-icons/icon-circle-lock.svg",
    "/images/content-icons/icon-circle-manage.svg",
    "/images/content-icons/icon-circle-news.svg",
    "/images/content-icons/icon-circle-thumbsup.svg",
    "/images/content-icons/icon-envelope-blue.svg",
    "/images/content-icons/icon-phone-green.svg",
    "/images/content-icons/icon-question-green.svg",
    "/images/content-icons/icon-TTD.svg",
    
    # Additional images from CSS
    "/images/bg-callout-subscribe.jpg",
    "/images/content-icons/sm-help.gif",
    
    # Heritage images
    "/images/government/historical-debt-outstanding/our-heritage-001.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-002.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-003.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-004.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-005.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-006.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-007.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-008.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-009.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-010.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-011.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-012.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-013.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-014.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-015.jpg",
    "/images/government/historical-debt-outstanding/our-heritage-016.jpg",
    
    # User guide images
    "/images/indiv/help/treasurydirect-help/user-guide/013-calendar-ex.gif",
    
    # Gift bond images
    "/images/saving-bonds/gift-announcements/buying-gift-bond.png",
    "/images/saving-bonds/gift-announcements/delivering-gift-bond.png",
    "/images/saving-bonds/gift-announcements/gift-balloons.png",
    "/images/saving-bonds/gift-announcements/gift-bday.png",
    "/images/saving-bonds/gift-announcements/step-by-step-instructions.png",
    
    # Video poster
    "/videos/tools/about/td-about-video.jpg",
    
    # JavaScript files
    "/scripts/auctions-section/annceresult.js",
    "/scripts/auctions-section/auctionQuery.js",
    "/scripts/auctions-section/auctWidget.js",
    "/scripts/auctions-section/institAnnceResWidget.js",
    "/scripts/auctions-section/press_secannpr.js",
    "/scripts/chart.min.js",
    "/scripts/datatables/buttons.html5.min.js",
    "/scripts/datatables/buttons.print.min.js",
    "/scripts/datatables/datatables.js",
    "/scripts/datatables/dataTables-buttons.js",
    "/scripts/datatables/daterangepicker.js",
    "/scripts/datatables/flash-buttons.js",
    "/scripts/datatables/jquery-ui.js",
    "/scripts/datatables/jszip.min.js",
    "/scripts/graphs.js",
    "/scripts/jqwidgets/jqxbuttons.js",
    "/scripts/jqwidgets/jqxcalendar.js",
    "/scripts/jqwidgets/jqxcheckbox.js",
    "/scripts/jqwidgets/jqxcore.js",
    "/scripts/jqwidgets/jqxdata.export.js",
    "/scripts/jqwidgets/jqxdata.js",
    "/scripts/jqwidgets/jqxdatetimeinput.js",
    "/scripts/jqwidgets/jqxdropdownlist.js",
    "/scripts/jqwidgets/jqxgrid.columnsresize.js",
    "/scripts/jqwidgets/jqxgrid.export.js",
    "/scripts/jqwidgets/jqxgrid.filter.js",
    "/scripts/jqwidgets/jqxgrid.grouping.js",
    "/scripts/jqwidgets/jqxgrid.js",
    "/scripts/jqwidgets/jqxgrid.pager.js",
    "/scripts/jqwidgets/jqxgrid.selection.js",
    "/scripts/jqwidgets/jqxgrid.sort.js",
    "/scripts/jqwidgets/jqxlistbox.js",
    "/scripts/jqwidgets/jqxmenu.js",
    "/scripts/jqwidgets/jqxscrollbar.js",
    "/scripts/papaparse/papaparse.js",
    "/scripts/public-debt-reports/splitgas.js",
    "/scripts/xlsx-0.20.0/package/xlsx.js",
    
    # CSS files
    "/datatables/css/dataTables.css",
    "/scripts/datatables/buttons.dataTables.min.css",
    "/scripts/datatables/jquery.dataTables.min.css",
    "/scripts/datatables/jquery-ui.css",
    "/scripts/jqwidgets/styles/jqx.base.css",
    
    # RSS feeds
    "/rss/mspd.xml",
    "/rss/sbpro.xml"
)

$total = $assets.Count
$current = 0

foreach ($asset in $assets) {
    $current++
    $relPath = $asset.TrimStart('/')
    $outFile = Join-Path $mirrorDir $relPath
    $outDir = Split-Path $outFile -Parent
    
    if (-not (Test-Path $outDir)) {
        New-Item -ItemType Directory -Path $outDir -Force | Out-Null
    }
    
    Write-Host "[$current/$total] Downloading $relPath..."
    try {
        Invoke-WebRequest -Uri "$baseUrl$asset" -OutFile $outFile -UseBasicParsing -ErrorAction Stop
        Write-Host "  OK"
    } catch {
        Write-Host "  FAILED: $_"
    }
}

Write-Host "`n=== Download Complete - Downloaded $total additional assets ==="
