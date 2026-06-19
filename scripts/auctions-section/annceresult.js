var hostLocation = 'https://www.treasurydirect.gov';

if (!window.location.origin) {
	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
if (window.location.origin === 'https://acc.treasurydirect.gov'){
	hostLocation = 'https://acc.treasurydirect.gov';
}
$(document).ready(function () {
	$.getJSON(hostLocation + "/TA_WS/securities/announced?pagesize=1&format=jsonp&callback=?", function(data){
		var currentYear = data[0].auctionDateYear;
		var url = hostLocation + '/TA_WS/securities/search?startDate=' + currentYear + '-01-01&endDate=' + currentYear + '-12-31&compact=true&dateFieldName=auctionDate&format=jsonp';
		var source = {
			datatype: "jsonp",
			datafields: [
				{name: 'a', type: 'string'}, //cusip
				{name: 'd', type: 'string'}, //securityTerm
				{name: 'z3a', type: 'string'}, //type
				{name: 't3a', type: 'string'}, //term
				{name: 'h', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"}, //announcementDate
				{name: 'i', type: 'date',  format: "yyyy-MM-ddTHH:mm:ss"}, //auctionDate
				{name: 'e3', type: 'string'}, //pdfFilenameAnnouncement
				{name: 'f3', type: 'string'}, //pdfFilenameCompetitiveResults
				{name: 'f31', type: 'string'}, //pdfFilenameNoncompetitiveResults
				{name: 'f32', type: 'string'}, //pdfFilenameSpecialAnnouncement
				{name: 'e4', type: 'string'}, //xmlFilenameAnnouncement
				{name: 'ia1', type: 'string'} //xmlFilenameCompetitiveResults
			],
			url: url,
			root: "securityList"
		};
		var dataAdapter = new $.jqx.dataAdapter(source);
		var announceLink = function (row, column, value, defaultHtml, columnSettings, rowData) {
			if (value) {
				var html = '<div style="text-align: center;"><a href="/instit/annceresult/press/preanre/' + rowData.h.getFullYear() + '/' + value + '" target="_blank" rel="noopener noreferrer">PDF</a></div>';
				var formattedPDFLink = defaultHtml.replace(value, html);
				return formattedPDFLink;
			}
		};
		var auctionLink = function (row, column, value, defaultHtml, columnSettings, rowData) {
			if (value) {
				var html = '<div style="text-align: center;"><a href="/instit/annceresult/press/preanre/' + rowData.i.getFullYear() + '/' + value + '" target="_blank" rel="noopener noreferrer">PDF</a></div>';
				var formattedPDFLink = defaultHtml.replace(value, html);
				return formattedPDFLink;
			}
		};
		var nonCompLink = function (row, column, value, defaultHtml, columnSettings, rowData) {
			if (value) {
				var html = '<div style="text-align: center"><a href="/instit/annceresult/press/preanre/' + rowData.i.getFullYear() + '/' + value + '" target="_blank" rel="noopener noreferrer">PDF</a></div>';
				var formattedPDFLink = defaultHtml.replace(value, html);
				return formattedPDFLink;
			}
		};
		var specialLink = function (row, column, value, defaultHtml, columnSettings, rowData) {
			if (value) {
				var specialPDFValue = value.split(', ');
				var specialRowHeight = specialPDFValue.length * 26;
				var html = '<div style="text-align: center;">';
				var valueType = specialPDFValue[0];
				$.each(specialPDFValue, function(key, val){
					if (val !== valueType){
						html += ' | <a href="/instit/annceresult/press/preanre/' + rowData.i.getFullYear() + '/' + $.trim(val) + '" target="_blank" rel="noopener noreferrer">PDF</a>';
					}else{
						html += '<a href="/instit/annceresult/press/preanre/' + rowData.i.getFullYear() + '/' + $.trim(val) + '" target="_blank" rel="noopener noreferrer">PDF</a>';
					}

				});
				html += '</div>'
				var formattedPDFLink = defaultHtml.replace(value, html);
				return formattedPDFLink;
			}
		};
		var xmlLink = function (row, column, value, defaultHtml, columnSettings, rowData) {
			if (value) {
				var html = '<div style="text-align: center;"><a href="/xml/' + value + '" target="_blank" rel="noopener noreferrer">XML</a></div>';
				var formattedXMLLink = defaultHtml.replace(value, html);
				return formattedXMLLink;
			}
		};
		var columnsrenderer = function (value) {
			// header column titles blue-bg
			return "<div style='padding-top:1rem; text-align: center'>" + value + "</div>";
		};
		var groupsRenderer = function (defaultText, group, state, params) {
			if(params.level === 1){
				// term= line
				return "<div style='margin: 9px;'>" + defaultText +  "</div>";
			}else{
				// marketable title
				return "<div style='margin: 9px;'>" + group +  "</div>";
			}
		};
		// commented out from cusip
		var dataRenderer = function (row, column, value, defaultHtml, columnSettings, rowData) {
			return "<div style='margin: 0.5rem;'>" + value + "</div>";
		};
		// initialize jqxGrid
		$("#jqxGrid").jqxGrid({
			theme: 'td-2020',
			width: '100%',
			height: 600,
			columnsheight: 50,
			// autorowheight: true,
			rowsheight: 33,
			groupindentwidth: 25,
			source: dataAdapter,
			pageable: false,
			sortable: false,
			filterable: false,
			altrows: true,
			pagesize: 500,
			autoheight: true,
			showfilterrow: false,
			groupable: true,
			showgroupsheader: false,
			autoshowfiltericon: false,
			showfiltercolumnbackground: false,
			showfiltermenuitems:false,
			showsortmenuitems:false,
			showgroupmenuitems:false,
			columns:[
				{text: 'Type', filtertype: 'checkedlist', hidden: true, datafield: 'z3a'},
				{text: 'Term', columntype: 'textbox', hidden: true, datafield: 't3a'},
				{text: 'Announcement <br>Date', datafield: 'h', renderer: columnsrenderer, cellsformat: 'MM/dd/yyyy', filterable: false, sortable: false, cellsalign: 'middle', width: 90},
				{text: 'Auction <br>Date', datafield: 'i', renderer: columnsrenderer, cellsformat: 'MM/dd/yyyy', filterable: false, sortable: false, cellsalign: 'middle', width: 70},
				{text: 'CUSIP', columntype: 'textbox', datafield: 'a', renderer: columnsrenderer, filterable: false, sortable: false, cellsalign: 'middle', width: 85},
				// These two commented out have cellsrenderer removed to align better, leaving them for future ref
				// {text: 'CUSIP', columntype: 'textbox', datafield: 'a', renderer: columnsrenderer, cellsrenderer: dataRenderer, filterable: false, sortable: false, width: 100},
				// {text: 'Security <br>Term', columntype: 'textbox', datafield: 'd', renderer: columnsrenderer, cellsrenderer: dataRenderer, filterable: false, sortable: false, width: 135},
				{text: 'Security <br>Term', columntype: 'textbox', datafield: 'd', renderer: columnsrenderer, filterable: false, sortable: false, cellsalign: 'middle', width: 100},
				{text: 'PDF', columngroup: 'Announcement', datafield: 'e3', groupable: false, enablehover: false, renderer: columnsrenderer, cellsrenderer: announceLink, filterable: false, sortable: false, width: 50},
				{text: 'XML', columngroup: 'Announcement', datafield: 'e4', renderer: columnsrenderer, cellsrenderer: xmlLink, filterable: false, sortable: false, width: 50},
				{text: 'PDF', columngroup: 'NonResults', datafield: 'f31', renderer: columnsrenderer, cellsrenderer: nonCompLink, filterable: false, sortable: false, width: 60},
				{text: 'PDF', columngroup: 'Results', datafield: 'f3', renderer: columnsrenderer, cellsrenderer: auctionLink, filterable: false, sortable: false, width: 60},
				{text: 'XML', columngroup: 'Results', datafield: 'ia1', renderer: columnsrenderer, cellsrenderer: xmlLink, filterable: false, sortable: false, width: 60},
				{text: 'PDF', columngroup: 'Special', datafield: 'f32', renderer: columnsrenderer, cellsrenderer: specialLink, filterable: false, sortable: false, width: 180}
			],
			groups: ['z3a', 't3a'],
			groupsrenderer: groupsRenderer,
			columngroups: [
				{ text: 'Announcement', name: 'Announcement', renderer: function () {
						return '<div style="padding-top:1rem; text-align: center">Announcement</div>';}
				},
				{ text: 'Noncomp Results', name: 'NonResults', renderer: function () {
						return '<div style="padding-top:1rem; text-align: center">Noncomp <br />Results</div>';}
				},
				{ text: 'Competitive Results', name: 'Results', renderer: function () {
						return '<div style="padding-top:1rem; text-align: center">Competitive Results</div>';}
				},
				{ text: 'Special Announcement', name: 'Special', renderer: function () {
						return '<div style="padding-top:1rem; text-align: center">Special <br />Announcement</div>';}
				}
			]
		});
		//function to get list of years
		var getYear = function(){
			var yearList = [];
			var thisYear = currentYear;
			var yearOffset = 0, lastYearOffset = (thisYear - 1997);
			for (var i = yearOffset; i <= lastYearOffset; i++) {
				var year = thisYear - i;
				yearList.push(year);
			}
			return yearList;
		};
		function setYearFilter(year){
			if (year === '1997'){
				source.url = hostLocation + '/TA_WS/securities/search?startDate=' + year + '-01-01&endDate=' + year + '-12-31&compact=true&dateFieldName=auctionDate&format=jsonp&tips=Yes';
			}else{
				source.url = hostLocation + '/TA_WS/securities/search?startDate=' + year + '-01-01&endDate=' + year + '-12-31&compact=true&dateFieldName=auctionDate&format=jsonp&pdfFilenameAnnouncement=notNull';
			}
			$('#jqxGrid').jqxGrid('updatebounddata', 'cells');
		}
		//initialize dropdown
		$("#jqYearList").jqxDropDownList({
			source: getYear(),
			selectedIndex: 0,
			// width: '125',
			// height: '25',
			// dropDownHorizontalAlignment:'left'
		});
		//initialize button
		// $("#jqButtonYear").jqxButton({ width: '60', height: '25' });
		$("#jqButtonYear").click(function(){
			setYearFilter($("#jqYearList").val());
		});
	});
});
