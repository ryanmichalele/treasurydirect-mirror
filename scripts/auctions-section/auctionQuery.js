var hostLocation = 'https://www.treasurydirect.gov';

if (!window.location.origin) {
	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
if (window.location.origin === 'https://acc.treasurydirect.gov' || window.location.origin === 'https://wwwdev5.fiscal.treasury.gov' || window.location.origin === 'https://wwwdev7.fiscal.treasury.gov'){
	hostLocation = 'https://acc.treasurydirect.gov';
}
function getFutureToday(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yyyy = today.getFullYear();
	return new Date((yyyy + 31), mm , dd);
}
function getParameter(paramName){
	"use strict";
	var searchString = window.location.search.substring(1), i, val, params = searchString.split("&");
	for (i=0;i<params.length;i++) {
		val = params[i].split("=");
		if (val[0] === paramName) {
			return unescape(val[1]);
		}
	}
	return null;
}
$(document).ready(function(){
	"use strict";
	$(".toggleText").hide();
	var screenWidth = $(document).width();
	if (screenWidth <= 1125){
		$("#content.HAQContent").css({ "overflow-x": "scroll", "white-space": "nowrap", "float": "none" });
	}
});
$(".toggMoreInfo").click(function(){
	"use strict";
	var a = $(this).siblings("span");
	$(a).toggle();
});
$(document).ready(function () {
	"use strict";
	$("#jqxlistboxSelectAll").hide();
	$("#jqxlistboxUnselectAll").hide();
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 2;
	var cusip = getParameter('cusip');
	var url = hostLocation + "/TA_WS/securities/jqsearch?format=jsonp";
	var urlExport = hostLocation + "/WS/common/export";
	var source = {
		datatype: "jsonp",
		datafields: [
			{name: 'cusip', type: 'string'},
			{name: 'securityType', type: 'string'},
			{name: 'securityTerm', type: 'string'},
			{name: 'auctionDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'issueDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'maturityDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'pricePer100', type: 'string'},
			{name: 'accruedInterestPer100', type: 'number'},
			{name: 'accruedInterestPer1000', type: 'number'},
			{name: 'adjustedAccruedInterestPer1000', type: 'number'},
			{name: 'adjustedPrice', type: 'number'},
			{name: 'allocationPercentage', type: 'number'},
			{name: 'allocationPercentageDecimals', type: 'number'},
			{name: 'announcedCusip', type: 'string'},
			{name: 'announcementDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'auctionFormat', type: 'string'},
			{name: 'averageMedianDiscountRate', type: 'number'},
			{name: 'averageMedianInvestmentRate', type: 'number'},
			{name: 'averageMedianPrice', type: 'string'},
			{name: 'averageMedianDiscountMargin', type: 'number'},
			{name: 'averageMedianYield', type: 'number'},
			{name: 'backDated', type: 'string'},
			{name: 'backDatedDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'bidToCoverRatio', type: 'number'},
			{name: 'callable', type: 'string'},
			{name: 'callDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'calledDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'cashManagementBillCMB', type: 'string'},
			{name: 'closingTimeCompetitive', type: 'string'},
			{name: 'closingTimeNoncompetitive', type: 'string'},
			{name: 'competitiveAccepted', type: 'number'},
			{name: 'competitiveBidDecimals', type: 'number'},
			{name: 'competitiveTendered', type: 'number'},
			{name: 'competitiveTendersAccepted', type: 'string'},
			{name: 'corpusCusip', type: 'string'},
			{name: 'cpiBaseReferencePeriod', type: 'string'},
			{name: 'currentlyOutstanding', type: 'number'},
			{name: 'datedDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'directBidderAccepted', type: 'number'},
			{name: 'directBidderTendered', type: 'number'},
			{name: 'estimatedAmountOfPubliclyHeldMaturingSecuritiesByType', type: 'number'},
			{name: 'fimaIncluded', type: 'string'},
			{name: 'fimaNoncompetitiveAccepted', type: 'number'},
			{name: 'fimaNoncompetitiveTendered', type: 'number'},
			{name: 'firstInterestPeriod', type: 'string'},
			{name: 'firstInterestPaymentDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'floatingRate', type: 'string'},
			{name: 'frnIndexDeterminationDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'frnIndexDeterminationRate', type: 'number'},
			{name: 'highDiscountRate', type: 'number'},
			{name: 'highInvestmentRate', type: 'number'},
			{name: 'highPrice', type: 'string'},
			{name: 'highDiscountMargin', type: 'number'},
			{name: 'highYield', type: 'number'},
			{name: 'indexRatioOnIssueDate', type: 'number'},
			{name: 'indirectBidderAccepted', type: 'number'},
			{name: 'indirectBidderTendered', type: 'number'},
			{name: 'interestPaymentFrequency', type: 'string'},
			{name: 'interestRate', type: 'number'},
			{name: 'lowDiscountRate', type: 'number'},
			{name: 'lowInvestmentRate', type: 'number'},
			{name: 'lowPrice', type: 'string'},
			{name: 'lowDiscountMargin', type: 'number'},
			{name: 'lowYield', type: 'number'},
			{name: 'maturingDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'maximumCompetitiveAward', type: 'number'},
			{name: 'maximumNoncompetitiveAward', type: 'number'},
			{name: 'maximumSingleBid', type: 'number'},
			{name: 'minimumBidAmount', type: 'number'},
			{name: 'minimumStripAmount', type: 'number'},
			{name: 'minimumToIssue', type: 'number'},
			{name: 'multiplesToBid', type: 'number'},
			{name: 'multiplesToIssue', type: 'number'},
			{name: 'nlpExclusionAmount', type: 'number'},
			{name: 'nlpReportingThreshold', type: 'number'},
			{name: 'noncompetitiveAccepted', type: 'number'},
			{name: 'noncompetitiveTendersAccepted', type: 'number'},
			{name: 'offeringAmount', type: 'number'},
			{name: 'originalCusip', type: 'string'},
			{name: 'originalDatedDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'originalIssueDate', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"},
			{name: 'originalSecurityTerm', type: 'string'},
			{name: 'pdfFilenameAnnouncement', type: 'string'},
			{name: 'pdfFilenameCompetitiveResults', type: 'string'},
			{name: 'pdfFilenameNoncompetitiveResults', type: 'string'},
			{name: 'primaryDealerAccepted', type: 'number'},
			{name: 'primaryDealerTendered', type: 'number'},
			{name: 'refCpiOnDatedDate', type: 'number'},
			{name: 'refCpiOnIssueDate', type: 'number'},
			{name: 'reopening', type: 'string'},
			{name: 'securityTermDayMonth'},
			{name: 'securityTermWeekYear'},
			{name: 'series', type: 'string'},
			{name: 'somaAccepted', type: 'number'},
			{name: 'somaHoldings', type: 'number'},
			{name: 'somaIncluded', type: 'string'},
			{name: 'somaTendered', type: 'number'},
			{name: 'spread', type: 'number'},
			{name: 'standardInterestPaymentPer1000', type: 'number'},
			{name: 'strippable', type: 'string'},
			{name: 'tiinConversionFactorPer1000', type: 'number'},
			{name: 'tips', type: 'string'},
			{name: 'totalAccepted', type: 'number'},
			{name: 'totalTendered', type: 'number'},
			{name: 'treasuryRetailAccepted', type: 'number'},
			{name: 'treasuryRetailTendersAccepted', type: 'string'},
			{name: 'unadjustedAccruedInterestPer1000', type: 'number'},
			{name: 'unadjustedPrice', type: 'number'},
			{name: 'xmlFilenameAnnouncement', type: 'string'},
			{name: 'xmlFilenameCompetitiveResults', type: 'string'}
		],
		url: url,
		beforeprocessing: function(data){
			source.totalrecords = data.totalResultsCount;
		},
		pager: function (pagenum, pagesize, oldpagenum){
			// callback called when a page or page size is changed.
		},
		sort: function(){
			// update the grid and send a request to the server.
			$("#jqxgrid").jqxGrid('updatebounddata', 'sort');
		},
		filter: function(){
			// update the grid and send a request to the server.
			$("#jqxgrid").jqxGrid('updatebounddata', 'filter');
		},
		root: "securityList"
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	var announceLink = function (row, column, value, defaultHtml, columnSettings, rowData) {
		var html = '<a href="/instit/annceresult/press/preanre/' + rowData.announcementDate.getFullYear() + '/' + value + '" target="_blank">' + value + '</a>';
		return html;
	};
	var auctionLink = function (row, column, value, defaultHtml, columnSettings, rowData) {
		var html = '<a href="/instit/annceresult/press/preanre/' + rowData.auctionDate.getFullYear() + '/' + value + '" target="_blank">' + value + '</a>';
		return html;
	};
	var nonCompPdfLink = function (row, column, value, defaultHtml, columnSettings, rowData) {
		var html = '<a href="/instit/annceresult/press/preanre/' + rowData.auctionDate.getFullYear() + '/' + value + '" target="_blank">' + value + '</a>';
		return html;
	};
	var xmlLink = function (row, column, value) {
		var html = '<a href="/xml/' + value + '" target="_blank">' + value + '</a>';
		return html;
	};
	// initialize jqxGrid
	$("#jqxgrid").jqxGrid({
		theme: 'td-2020',
		width: '100%',
		height: 500,
		columnsheight: 64,
		rowsheight: 54,
		source: dataAdapter,
		pageable: true,
		columnsresize: true,
		showfilterrow: true,
		sortable: true,
		autoshowfiltericon: true,
		filterable: true,
		showfiltercolumnbackground: true,
		altrows: true,
		pagesize: 100,
		pagesizeoptions:[
			'100',
			'250',
			'500',
			'1000',
			'2000'
		],
		virtualmode: true,
		ready: function(){
			if (null !== cusip && "" !== cusip){
				var filtergroup = new $.jqx.filter();
				var filtercondition = 'contains';
				var filter1 = filtergroup.createfilter('stringfilter', cusip, filtercondition);
				filtergroup.addfilter(0, filter1);
				$("#jqxgrid").jqxGrid('addfilter', 'cusip', filtergroup);
				$("#jqxgrid").jqxGrid('applyfilters');
			}
		},
		rendergridrows: function(){
			return dataAdapter.records;
		},
		columns:[
			{text: 'CUSIP', columntype: 'textbox', filtercondition: 'starts_with', datafield: 'cusip', width: 135},
			{text: 'Security Type', filtertype: 'checkedlist', filteritems: ['Bill', 'Note', 'Bond'], datafield: 'securityType', width: 150},
			{text: 'Security Term', columntype: 'textbox', datafield: 'securityTerm', width: 195},
			{text: 'Auction Date',  filtertype: 'range', datafield: 'auctionDate', width: 150, cellsformat: 'MM/dd/yyyy', createfilterwidget: function(column, columnelement, widget){widget.jqxDateTimeInput({min: new Date(1979, 0, 1), max: new Date(year, month, 1) });}},
			{text: 'Issue Date',  filtertype: 'range', datafield: 'issueDate', width: 150, cellsformat: 'MM/dd/yyyy', createfilterwidget: function(column, columnelement, widget){widget.jqxDateTimeInput({min: new Date(1979, 0, 1), max: new Date(year, month, 1) });}},
			{text: 'Maturity Date', filtertype: 'range', datafield: 'maturityDate', width: 150, cellsformat: 'MM/dd/yyyy', createfilterwidget: function(column, columnelement, widget){widget.jqxDateTimeInput({min: new Date(1979, 0, 1), max: getFutureToday() });}},
			{text: 'Price per $100', filterable: false, filtercondition: 'starts_with', datafield: 'pricePer100', width: 150},
			{text: 'Accrued Interest per $100', filterable: false, datafield: 'accruedInterestPer100', hidden: true, cellsformat: 'c9', width: 180},
			{text: 'Accrued Interest per $1,000', filterable: false, datafield: 'accruedInterestPer1000', hidden: true, cellsformat: 'c5', width: 180},
			{text: 'Adjusted Accrued Interest per $1,000', filterable: false, datafield: 'adjustedAccruedInterestPer1000', hidden: true, cellsformat: 'c5', width: 240},
			{text: 'Adjusted Price', filterable: false, datafield: 'adjustedPrice', hidden: true, cellsformat: 'd6', width: 120},
			{text: 'Allocation Percentage', filterable: false, datafield: 'allocationPercentage', hidden: true, cellsformat: 'p2', width: 150},
			{text: 'Allocation Percentage Decimals', filterable: false, datafield: 'allocationPercentageDecimals', hidden: true, width: 200},
			{text: 'Announced CUSIP', filterable: false, datafield: 'announcedCusip', hidden: true, width: 120},
			{text: 'Announcement Date', filterable: false, datafield: 'announcementDate', hidden: true, cellsformat: 'MM/dd/yyyy', width: 130},
			{text: 'Auction Format', filterable: false, datafield: 'auctionFormat', hidden: true, width: 120},
			{text: 'Average / Median Discount Rate', filterable: false, datafield: 'averageMedianDiscountRate', hidden: true, cellsformat: 'p3', width: 200},
			{text: 'Average / Median Investment Rate', filterable: false, datafield: 'averageMedianInvestmentRate', hidden: true, cellsformat: 'p3', width: 220},
			{text: 'Average / Median Price', filterable: false, datafield: 'averageMedianPrice', hidden: true, width: 150},
			{text: 'Average / Median Discount Margin', filterable: false, datafield: 'averageMedianDiscountMargin', hidden: true, cellsformat: 'p3', width: 220},
			{text: 'Average / Median Yield', filterable: false, datafield: 'averageMedianYield', hidden: true, cellsformat: 'p3', width: 150},
			{text: 'Back Dated', filterable: false, datafield: 'backDated', hidden: true, width: 100},
			{text: 'Back Dated Date', filterable: false, datafield: 'backDatedDate', hidden: true, cellsformat: 'MM/dd/yyyy', width: 120},
			{text: 'Bid-to-Cover Ratio', filterable: false, datafield: 'bidToCoverRatio', hidden: true, cellsformat: 'd2', width: 120},
			{text: 'Callable', filterable: false, datafield: 'callable', hidden: true, width: 80},
			{text: 'Call Date', filterable: false, datafield: 'callDate', hidden: true, cellsformat: 'MM/dd/yyyy', width: 80},
			{text: 'Called Date', filterable: false, datafield: 'calledDate', hidden: true, cellsformat: 'MM/dd/yyyy', width: 90},
			{text: 'Cash Management Bill (CMB)', filtertype: 'checkedlist', filteritems: ['Yes', 'No'], datafield: 'cashManagementBillCMB', hidden: true, width: 210},
			{text: 'Closing Time (ET) - Competitive', filterable: false, datafield: 'closingTimeCompetitive', hidden: true, cellsformat: "t", width: 240},
			{text: 'Closing Time (ET) - Noncompetitive', filterable: false, datafield: 'closingTimeNoncompetitive', hidden: true, cellsformat: "t", width: 240},
			{text: 'Competitive Accepted', filterable: false, datafield: 'competitiveAccepted', hidden: true, cellsformat: 'c', width: 160},
			{text: 'Competitive Bid Decimals', filterable: false, datafield: 'competitiveBidDecimals', hidden: true, width: 180},
			{text: 'Competitive Tendered', filterable: false, datafield: 'competitiveTendered', hidden: true, cellsformat: 'c', width: 160},
			{text: 'Competitive Tenders Accepted', filterable: false, datafield: 'competitiveTendersAccepted', hidden: true, width: 200},
			{text: 'Corpus CUSIP', filterable: false, datafield: 'corpusCusip', hidden: true, width: 120},
			{text: 'CPI Base Reference Period', filterable: false, datafield: 'cpiBaseReferencePeriod', hidden: true, width: 190},
			{text: 'Currently Outstanding', filterable: false, datafield: 'currentlyOutstanding', hidden: true, cellsformat: 'c', width: 165},
			{text: 'Dated Date', filterable: false, datafield: 'datedDate', hidden: true, cellsformat: 'MM/dd/yyyy', width: 120},
			{text: 'Direct Bidder Accepted', filterable: false, datafield: 'directBidderAccepted', hidden: true, cellsformat: 'c', width: 170},
			{text: 'Direct Bidder Tendered', filterable: false, datafield: 'directBidderTendered', hidden: true, cellsformat: 'c', width: 170},
			{text: 'Estimated Amount of Publicly Held Maturing Securities by Type', filterable: false, datafield: 'estimatedAmountOfPubliclyHeldMaturingSecuritiesByType', hidden: true, cellsformat: 'c', width: 380},
			{text: 'FIMA Included', filterable: false, datafield: 'fimaIncluded', hidden: true, width: 120},
			{text: 'FIMA Noncompetitive Accepted', filterable: false, datafield: 'fimaNoncompetitiveAccepted', hidden: true, cellsformat: 'c', width: 200},
			{text: 'FIMA Noncompetitive Tendered', filterable: false, datafield: 'fimaNoncompetitiveTendered', hidden: true, cellsformat: 'c', width: 200},
			{text: 'First Interest Period', filterable: false, datafield: 'firstInterestPeriod', hidden: true, width: 150},
			{text: 'First Interest Payment Date', filterable: false, datafield: 'firstInterestPaymentDate', hidden: true, cellsformat: 'MM/dd/yyyy', width: 170},
			{text: 'Floating Rate', filtertype: 'checkedlist', filteritems: ['Yes', 'No'], datafield: 'floatingRate', hidden: true, width: 120},
			{text: 'FRN Index Determination Date', filterable: false, datafield: 'frnIndexDeterminationDate', hidden: true, cellsformat: 'MM/dd/yyyy', width: 200},
			{text: 'FRN Index Determination Rate', filterable: false, datafield: 'frnIndexDeterminationRate', hidden: true, cellsformat: 'p3', width: 200},
			{text: 'High Discount Rate', filterable: false, datafield: 'highDiscountRate', hidden: true, cellsformat: 'p3', width: 120},
			{text: 'High Investment Rate', filterable: false, datafield: 'highInvestmentRate', hidden: true, cellsformat: 'p3', width: 150},
			{text: 'High Price', filterable: false, datafield: 'highPrice', hidden: true, width: 90},
			{text: 'High Discount Margin', filterable: false, datafield: 'highDiscountMargin', hidden: true, cellsformat: 'p3', width: 150},
			{text: 'High Yield', filterable: false, datafield: 'highYield', hidden: true, cellsformat: 'p3', width: 90},
			{text: 'Index Ratio On Issue Date', filterable: false, datafield: 'indexRatioOnIssueDate', hidden: true, cellsformat: 'd5', width: 190},
			{text: 'Indirect Bidder Accepted', filterable: false, datafield: 'indirectBidderAccepted', hidden: true, cellsformat: 'c', width: 180},
			{text: 'Indirect Bidder Tendered', filterable: false, datafield: 'indirectBidderTendered', hidden: true, cellsformat: 'c', width: 180},
			{text: 'Interest Payment Frequency', filterable: false, datafield: 'interestPaymentFrequency', hidden: true, width: 200},
			{text: 'Interest Rate', filterable: false, datafield: 'interestRate', hidden: true, cellsformat: 'p3', width: 120},
			{text: 'Low Discount Rate', filterable: false, datafield: 'lowDiscountRate', hidden: true, cellsformat: 'p3', width: 120},
			{text: 'Low Investment Rate', filterable: false, datafield: 'lowInvestmentRate', hidden: true, cellsformat: 'p3', width: 140},
			{text: 'Low Price', filterable: false, datafield: 'lowPrice', hidden: true, width: 120},
			{text: 'Low Discount Margin', filterable: false, datafield: 'lowDiscountMargin', hidden: true, cellsformat: 'p3', width: 140},
			{text: 'Low Yield', filterable: false, datafield: 'lowYield', hidden: true, cellsformat: 'p3', width: 120},
			{text: 'Maturing Date', filterable: false, datafield: 'maturingDate', hidden: true, cellsformat: 'MM/dd/yyyy', width: 120},
			{text: 'Maximum Competitive Award', filterable: false, datafield: 'maximumCompetitiveAward', hidden: true, cellsformat: 'c', width: 200},
			{text: 'Maximum Noncompetitive Award', filterable: false, datafield: 'maximumNoncompetitiveAward', hidden: true, cellsformat: 'c', width: 210},
			{text: 'Maximum Single Bid', filterable: false, datafield: 'maximumSingleBid', hidden: true, cellsformat: 'c', width: 130},
			{text: 'Minimum Bid Amount', filterable: false, datafield: 'minimumBidAmount', hidden: true, cellsformat: 'c', width: 140},
			{text: 'Minimum Strip Amount', filterable: false, datafield: 'minimumStripAmount', hidden: true, cellsformat: 'c', width: 150},
			{text: 'Minimum To Issue', filterable: false, datafield: 'minimumToIssue', hidden: true, cellsformat: 'c', width: 120},
			{text: 'Multiples To Bid', filterable: false, datafield: 'multiplesToBid', hidden: true, cellsformat: 'c', width: 120},
			{text: 'Multiples To Issue', filterable: false, datafield: 'multiplesToIssue', hidden: true, cellsformat: 'c', width: 120},
			{text: 'NLP Exclusion Amount', filterable: false, datafield: 'nlpExclusionAmount', hidden: true, cellsformat: 'c', width: 150},
			{text: 'NLP Reporting Threshold', filterable: false, datafield: 'nlpReportingThreshold', hidden: true, cellsformat: 'c', width: 170},
			{text: 'Noncompetitive Accepted', filterable: false, datafield: 'noncompetitiveAccepted', hidden: true, cellsformat: 'c', width: 170},
			{text: 'Noncompetitive Tenders Accepted', filterable: false, datafield: 'noncompetitiveTendersAccepted', hidden: true, width: 220},
			{text: 'Offering Amount', filterable: false, datafield: 'offeringAmount', hidden: true, cellsformat: 'c', width: 120},
			{text: 'Original CUSIP', filterable: false, datafield: 'originalCusip', hidden: true, width: 120},
			{text: 'Original Dated Date', filterable: false, datafield: 'originalDatedDate', hidden: true, cellsformat: 'MM/dd/yyyy', width: 140},
			{text: 'Original Issue Date', filterable: false, datafield: 'originalIssueDate', hidden: true, cellsformat: 'MM/dd/yyyy', width: 140},
			{text: 'Original Security Term', filterable: false, datafield: 'originalSecurityTerm', hidden: true, width: 160},
			{text: 'PDF Filename - Announcement', filterable: false, datafield: 'pdfFilenameAnnouncement', hidden: true, cellsrenderer: announceLink, width: 220},
			{text: 'PDF Filename - Competitive Results', filterable: false, datafield: 'pdfFilenameCompetitiveResults', hidden: true, cellsrenderer: auctionLink, width: 240},
			{text: 'PDF Filename - Noncompetitive Results', filterable: false, datafield: 'pdfFilenameNoncompetitiveResults', hidden: true, cellsrenderer: nonCompPdfLink, width: 240},
			{text: 'Primary Dealer Accepted', filterable: false, datafield: 'primaryDealerAccepted', hidden: true, cellsformat: 'c', width: 160},
			{text: 'Primary Dealer Tendered', filterable: false, datafield: 'primaryDealerTendered', hidden: true, cellsformat: 'c', width: 160},
			{text: 'Ref CPI On Dated Date', filterable: false, cellsformat: 'd5', datafield: 'refCpiOnDatedDate', hidden: true, width: 155},
			{text: 'Ref CPI On Issue Date', filterable: false, cellsformat: 'd5', datafield: 'refCpiOnIssueDate', hidden: true, width: 155},
			{text: 'Reopening', filtertype: 'checkedlist', filteritems: ['Yes', 'No'], datafield: 'reopening', hidden: true, width: 80},
			{text: 'Security Term Day Month', filterable: false, datafield: 'securityTermDayMonth', hidden: true, width: 160},
			{text: 'Security Term Week Year', filterable: false, datafield: 'securityTermWeekYear', hidden: true, width: 160},
			{text: 'Series', filterable: false, datafield: 'series', hidden: true, width: 80},
			{text: 'SOMA Accepted', filterable: false, datafield: 'somaAccepted', hidden: true, cellsformat: 'c', width: 120},
			{text: 'SOMA Holdings', filterable: false, datafield: 'somaHoldings', hidden: true, cellsformat: 'c', width: 120},
			{text: 'SOMA Included', filterable: false, datafield: 'somaIncluded', hidden: true, cellsformat: 'c', width: 120},
			{text: 'SOMA Tendered', filterable: false, datafield: 'somaTendered', hidden: true, cellsformat: 'c', width: 120},
			{text: 'Spread', filterable: false, datafield: 'spread', hidden: true, cellsformat: 'p3', width: 80},
			{text: 'Standard Interest Payment per $1,000', filterable: false, datafield: 'standardInterestPaymentPer1000', hidden: true, cellsformat: 'c3', width: 230},
			{text: 'Strippable', filterable: false, datafield: 'strippable', hidden: true, width: 120},
			{text: 'TIIN Conversion Factor per $1,000', filterable: false, datafield: 'tiinConversionFactorPer1000', hidden: true, cellsformat: 'd9', width: 220},
			{text: 'TIPS', filtertype: 'checkedlist', filteritems: ['Yes', 'No'], datafield: 'tips', hidden: true, width: 80},
			{text: 'Total Accepted', filterable: false, datafield: 'totalAccepted', hidden: true, cellsformat: 'c', width: 120},
			{text: 'Total Tendered', filterable: false, datafield: 'totalTendered', hidden: true, cellsformat: 'c', width: 120},
			{text: 'Treasury Retail Accepted', filterable: false, datafield: 'treasuryRetailAccepted', hidden: true, cellsformat: 'c', width: 160},
			{text: 'Treasury Retail Tenders Accepted', filterable: false, datafield: 'treasuryRetailTendersAccepted', hidden: true, width: 220},
			{text: 'Unadjusted Accrued Interest per $1,000', filterable: false, datafield: 'unadjustedAccruedInterestPer1000', hidden: true, cellsformat: 'c5', width: 240},
			{text: 'Unadjusted Price', filterable: false, datafield: 'unadjustedPrice', hidden: true, cellsformat: 'd6', width: 120},
			{text: 'XML Filename - Announcement', filterable: false, datafield: 'xmlFilenameAnnouncement', hidden: true, cellsrenderer: xmlLink, width: 200},
			{text: 'XML Filename - Competitive Results', filterable: false, datafield: 'xmlFilenameCompetitiveResults', hidden: true, cellsrenderer: xmlLink, width: 220}
		]
	});
	var listSource =[
		{label: 'CUSIP', value: 'cusip', checked: true },
		{label: 'Security Type', value: 'securityType', checked: true },
		{label: 'Security Term', value: 'securityTerm', checked: true },
		{label: 'Auction Date', value: 'auctionDate', checked: true },
		{label: 'Issue Date', value: 'issueDate', checked: true },
		{label: 'Maturity Date', value: 'maturityDate', checked: true },
		{label: 'Price per $100', value: 'pricePer100', checked: true },
		{label: 'Accrued Interest per $100', value: 'accruedInterestPer100', checked: false},
		{label: 'Accrued Interest per $1,000', value: 'accruedInterestPer1000', checked: false},
		{label: 'Adjusted Accrued Interest per $1,000', value: 'adjustedAccruedInterestPer1000', checked: false},
		{label: 'Adjusted Price', value: 'adjustedPrice', checked: false},
		{label: 'Allocation Percentage', value: 'allocationPercentage', checked: false},
		{label: 'Allocation Percentage Decimals', value: 'allocationPercentageDecimals', checked: false},
		{label: 'Announced CUSIP', value: 'announcedCusip', checked: false},
		{label: 'Announcement Date', value: 'announcementDate', checked: false},
		{label: 'Auction Format', value: 'auctionFormat', checked: false},
		{label: 'Average / Median Discount Rate', value: 'averageMedianDiscountRate', checked: false},
		{label: 'Average / Median Investment Rate', value: 'averageMedianInvestmentRate', checked: false},
		{label: 'Average / Median Price', value: 'averageMedianPrice', checked: false},
		{label: 'Average / Median Discount Margin', value: 'averageMedianDiscountMargin', checked: false},
		{label: 'Average / Median Yield', value: 'averageMedianYield', checked: false},
		{label: 'Back Dated', value: 'backDated', checked: false},
		{label: 'Back Dated Date', value: 'backDatedDate', checked: false},
		{label: 'Bid-to-Cover Ratio', value: 'bidToCoverRatio', checked: false},
		{label: 'Callable', value: 'callable', checked: false},
		{label: 'Call Date', value: 'callDate', checked: false},
		{label: 'Called Date', value: 'calledDate', checked: false},
		{label: 'Cash Management Bill (CMB)', value: 'cashManagementBillCMB', checked: false},
		{label: 'Closing Time (ET) - Competitive', value: 'closingTimeCompetitive', checked: false},
		{label: 'Closing Time (ET) - Noncompetitive', value: 'closingTimeNoncompetitive', checked: false},
		{label: 'Competitive Accepted', value: 'competitiveAccepted', checked: false},
		{label: 'Competitive Bid Decimals', value: 'competitiveBidDecimals', checked: false},
		{label: 'Competitive Tendered', value: 'competitiveTendered', checked: false},
		{label: 'Competitive Tenders Accepted', value: 'competitiveTendersAccepted', checked: false},
		{label: 'Corpus CUSIP', value: 'corpusCusip', checked: false},
		{label: 'CPI Base Reference Period', value: 'cpiBaseReferencePeriod', checked: false},
		{label: 'Currently Outstanding', value: 'currentlyOutstanding', checked: false},
		{label: 'Dated Date', value: 'datedDate', checked: false},
		{label: 'Direct Bidder Accepted', value: 'directBidderAccepted', checked: false},
		{label: 'Direct Bidder Tendered', value: 'directBidderTendered', checked: false},
		{label: 'Estimated Amount of Publicly Held Maturing Securities by Type', value: 'estimatedAmountOfPubliclyHeldMaturingSecuritiesByType', checked: false},
		{label: 'FIMA Included', value: 'fimaIncluded', checked: false},
		{label: 'FIMA Noncompetitive Accepted', value: 'fimaNoncompetitiveAccepted', checked: false},
		{label: 'FIMA Noncompetitive Tendered', value: 'fimaNoncompetitiveTendered', checked: false},
		{label: 'First Interest Period', value: 'firstInterestPeriod', checked: false},
		{label: 'First Interest Payment Date', value: 'firstInterestPaymentDate', checked: false},
		{label: 'Floating Rate', value: 'floatingRate', checked: false},
		{label: 'FRN Index Determination Date', value: 'frnIndexDeterminationDate', checked: false},
		{label: 'FRN Index Determination Rate', value: 'frnIndexDeterminationRate', checked: false},
		{label: 'High Discount Rate', value: 'highDiscountRate', checked: false},
		{label: 'High Investment Rate', value: 'highInvestmentRate', checked: false},
		{label: 'High Price', value: 'highPrice', checked: false},
		{label: 'High Discount Margin', value: 'highDiscountMargin', checked: false},
		{label: 'High Yield', value: 'highYield', checked: false},
		{label: 'Index Ratio On Issue Date', value: 'indexRatioOnIssueDate', checked: false},
		{label: 'Indirect Bidder Accepted', value: 'indirectBidderAccepted', checked: false},
		{label: 'Indirect Bidder Tendered', value: 'indirectBidderTendered', checked: false},
		{label: 'Interest Payment Frequency', value: 'interestPaymentFrequency', checked: false},
		{label: 'Interest Rate', value: 'interestRate', checked: false },
		{label: 'Low Discount Rate', value: 'lowDiscountRate', checked: false},
		{label: 'Low Investment Rate', value: 'lowInvestmentRate', checked: false},
		{label: 'Low Price', value: 'lowPrice', checked: false},
		{label: 'Low Discount Margin', value: 'lowDiscountMargin', checked: false},
		{label: 'Low Yield', value: 'lowYield', checked: false},
		{label: 'Maturing Date', value: 'maturingDate', checked: false},
		{label: 'Maximum Competitive Award', value: 'maximumCompetitiveAward', checked: false},
		{label: 'Maximum Noncompetitive Award', value: 'maximumNoncompetitiveAward', checked: false},
		{label: 'Maximum Single Bid', value: 'maximumSingleBid', checked: false},
		{label: 'Minimum Bid Amount', value: 'minimumBidAmount', checked: false},
		{label: 'Minimum Strip Amount', value: 'minimumStripAmount', checked: false},
		{label: 'Minimum To Issue', value: 'minimumToIssue', checked: false},
		{label: 'Multiples To Bid', value: 'multiplesToBid', checked: false},
		{label: 'Multiples To Issue', value: 'multiplesToIssue', checked: false},
		{label: 'NLP Exclusion Amount', value: 'nlpExclusionAmount', checked: false},
		{label: 'NLP Reporting Threshold', value: 'nlpReportingThreshold', checked: false},
		{label: 'Noncompetitive Accepted', value: 'noncompetitiveAccepted', checked: false},
		{label: 'Noncompetitive Tenders Accepted', value: 'noncompetitiveTendersAccepted', checked: false},
		{label: 'Offering Amount', value: 'offeringAmount', checked: false},
		{label: 'Original CUSIP', value: 'originalCusip', checked: false},
		{label: 'Original Dated Date', value: 'originalDatedDate', checked: false},
		{label: 'Original Issue Date', value: 'originalIssueDate', checked: false},
		{label: 'Original Security Term', value: 'originalSecurityTerm', checked: false},
		{label: 'PDF Filename - Announcement', value: 'pdfFilenameAnnouncement', checked: false},
		{label: 'PDF Filename - Competitive Results', value: 'pdfFilenameCompetitiveResults', checked: false},
		{label: 'PDF Filename - Noncompetitive Results', value: 'pdfFilenameNoncompetitiveResults', checked: false},
		{label: 'Primary Dealer Accepted', value: 'primaryDealerAccepted', checked: false},
		{label: 'Primary Dealer Tendered', value: 'primaryDealerTendered', checked: false},
		{label: 'Ref CPI On Dated Date', value: 'refCpiOnDatedDate', checked: false},
		{label: 'Ref CPI On Issue Date', value: 'refCpiOnIssueDate', checked: false},
		{label: 'Reopening', value: 'reopening', checked: false},
		{label: 'Security Term Day Month', value: 'securityTermDayMonth', checked: false},
		{label: 'Security Term Week Year', value: 'securityTermWeekYear', checked: false},
		{label: 'Series', value: 'series', checked: false},
		{label: 'SOMA Accepted', value: 'somaAccepted', checked: false},
		{label: 'SOMA Holdings', value: 'somaHoldings', checked: false},
		{label: 'SOMA Included', value: 'somaIncluded', checked: false},
		{label: 'SOMA Tendered', value: 'somaTendered', checked: false},
		{label: 'Spread', value: 'spread', checked: false},
		{label: 'Standard Interest Payment per $1,000', value: 'standardInterestPaymentPer1000', checked: false},
		{label: 'Strippable', value: 'strippable', checked: false},
		{label: 'TIIN Conversion Factor per $1,000', value: 'tiinConversionFactorPer1000', checked: false},
		{label: 'TIPS', value: 'tips', checked: false},
		{label: 'Total Accepted', value: 'totalAccepted', checked: false},
		{label: 'Total Tendered', value: 'totalTendered', checked: false},
		{label: 'Treasury Retail Accepted', value: 'treasuryRetailAccepted', checked: false},
		{label: 'Treasury Retail Tenders Accepted', value: 'treasuryRetailTendersAccepted', checked: false},
		{label: 'Unadjusted Accrued Interest per $1,000', value: 'unadjustedAccruedInterestPer1000', checked: false},
		{label: 'Unadjusted Price', value: 'unadjustedPrice', checked: false},
		{label: 'XML Filename - Announcement', value: 'xmlFilenameAnnouncement', checked: false},
		{label: 'XML Filename - Competitive Results', value: 'xmlFilenameCompetitiveResults', checked: false}
	];
	$("#jqxlistbox").jqxListBox({
		theme: 'td-2020',
		source: listSource,
		checkboxes: true,
		width : '450px'
	});
	$("#jqxlistbox").on('checkChange', function(event){
		if (event.args.checked) {
			$("#jqxgrid").jqxGrid('showcolumn', event.args.value);
		}
		else {
			$("#jqxgrid").jqxGrid('hidecolumn', event.args.value);
		}
	});
	$('#jqxlistboxWrapperButton').jqxButton({ theme: 'td-2020' });
	$('#jqxlistboxWrapperButton').click(function(){
		$('#jqxlistbox').slideToggle();
		$('#jqxlistboxSelectAll').slideToggle();
		$('#jqxlistboxUnselectAll').slideToggle();
	});
	$("#jqxlistboxSelectAll").jqxButton({ theme: 'td-2020' });
	$("#jqxlistboxSelectAll").click(function () {
		$("#jqxgrid").jqxGrid('beginupdate');
		$("#jqxlistbox").jqxListBox('checkAll');
		$("#jqxgrid").jqxGrid('endupdate');
	});
	$("#jqxlistboxUnselectAll").jqxButton({ theme: 'td-2020' });
	$("#jqxlistboxUnselectAll").click(function () {
		$("#jqxgrid").jqxGrid('beginupdate');
		$("#jqxlistbox").jqxListBox('uncheckAll');
		$("#jqxgrid").jqxGrid('endupdate');
	});
	$('#clearfilteringbutton').jqxButton({ theme: 'td-2020' });
	$('#clearfilteringbutton').click(function(){
		$("#jqxgrid").jqxGrid('clearfilters');
	});
	$("#csvExport").jqxButton({ theme: 'td-2020' });
	$("#csvExport").click(function () {
		$("#jqxgrid").jqxGrid('exportdata', 'csv', 'Securities.csv','true', null, null, urlExport);
	});
	$("#jsonExport").jqxButton({ theme: 'td-2020' });
	$("#jsonExport").click(function () {
		$("#jqxgrid").jqxGrid('exportdata', 'json', 'Securities.json','true', null, null, urlExport);
	});
	$("#tsvExport").jqxButton({ theme: 'td-2020' });
	$("#tsvExport").click(function () {
		$("#jqxgrid").jqxGrid('exportdata', 'tsv', 'Securities.tsv','true', null, null, urlExport);
	});
	$("#xmlExport").jqxButton({ theme: 'td-2020' });
	$("#xmlExport").click(function(){
		$("#jqxgrid").jqxGrid('exportdata', 'xml', 'Securities.xml','true', null, null, urlExport);
	});
	$('#jqxlistbox').hide();
});
