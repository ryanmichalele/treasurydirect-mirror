var hostLocation = 'https://www.treasurydirect.gov';

if (!window.location.origin) {
	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
if (window.location.origin === 'https://acc.treasurydirect.gov'){
	hostLocation = 'https://acc.treasurydirect.gov';
}
$(document).ready(function () {
	// "use strict";
	// $("#tabs").show();
	function dateConverter(rawDate){
		var formattedDate = rawDate.substr(5, 2) + '\/' + rawDate.substr(8, 2) + '\/'+ rawDate.substr(0, 4);
		return formattedDate;
	}
	function decimalConverter(rawNumber, decimalSpaces){
		if (rawNumber === ""){
			return rawNumber;
		}else{
			var formattedDecimal = parseFloat(rawNumber).toFixed(decimalSpaces);
			return formattedDecimal;
		}
	};
	var billsURL = hostLocation + "/TA_WS/securities/auctioned?pagesize=20&type=Bill&format=jsonp&callback=?";
	$.getJSON(billsURL, function(data){
		var billsOutput = '<table id="institTableBills" class="table table-striped table-hover no-margin-top"><thead><tr class="bg-td-blue-lighter"><th>Security Term</th><th>CUSIP</th><th>Issue<br />Date</th><th>Maturity<br />Date</th><th>High<br />Rate</th><th>Investment<br />Rate</th></tr></thead><tbody>';
		$.each(data, function(key, val){
			billsOutput += '<tr><td>' + val.securityTerm + '</td>';
			billsOutput += '<td><a target="_blank" href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
			billsOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
			billsOutput += '<td>' + dateConverter(val.maturityDate) + '</td>';
			billsOutput += '<td>' + decimalConverter(val.highDiscountRate, 3) + '%</td>';
			billsOutput += '<td>' + decimalConverter(val.highInvestmentRate, 3) + '%</td></tr>';
		});
		billsOutput += '</tbody></table>';
		$("#tabs-1").html(billsOutput);
		// $("#institTableBills tbody tr:odd").addClass("odd");
	});
	var cmbURL = hostLocation + "/TA_WS/securities/auctioned?pagesize=20&type=CMB&format=jsonp&callback=?";
	$.getJSON(cmbURL, function(data){
		var cmbOutput = '<table id="institTableCMB" class="table table-striped table-hover no-margin-top"><thead><tr class="bg-td-blue-lighter"><th>Security Term</th><th>CUSIP</th><th>Issue<br />Date</th><th>Maturity<br />Date</th><th>High<br />Rate</th><th>Investment<br />Rate</th></tr></thead><tbody>';
		if(data.length !== 0){
			$.each(data, function(key, val){
				cmbOutput += '<tr><td>' + val.securityTerm + '</td>';
				cmbOutput += '<td><a target="_blank" href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
				cmbOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
				cmbOutput += '<td>' + dateConverter(val.maturityDate) + '</td>';
				cmbOutput += '<td>' + decimalConverter(val.highDiscountRate, 3) + '%</td>';
				cmbOutput += '<td>' + decimalConverter(val.highInvestmentRate, 3) + '%</td></tr>';
			});
			cmbOutput += '</tbody></table>';
			$("#tabs-2").html(cmbOutput);
			// $("#institTableCMB tbody tr:odd").addClass("odd");
		}else{
			cmbOutput += '<tr><td colspan="6">No recent CMB auction results.</td></tr>';
			cmbOutput += '</tbody></table>';
			$("#tabs-2").html(cmbOutput);
		}
	});	
	var notesURL = hostLocation + "/TA_WS/securities/auctioned?pagesize=20&type=Note&format=jsonp&callback=?";
	$.getJSON(notesURL, function(data){
		var notesOutput = '<table id="institTableNotes" class="table table-striped table-hover no-margin-top"><thead><tr class="bg-td-blue-lighter"><th>Security Term</th><th>CUSIP</th><th>Reopening</th><th>Issue<br />Date</th><th>Maturity Date</th><th>High Yield</th><th>Interest Rate</th></tr></thead><tbody>';
		$.each(data, function(key, val){
			notesOutput += '<tr><td>' + val.term + '</td>';
			notesOutput += '<td><a target="_blank" href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
			notesOutput += '<td>' + val.reopening + '</td>';
			notesOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
			notesOutput += '<td>' + dateConverter(val.maturityDate) + '</td>';			
			if (isNaN(val.highYield)  === false || isNaN(val.interestRate) === false){
				notesOutput += '<td>' + decimalConverter(val.highYield, 3) + '%</td>';
				notesOutput += '<td>' + decimalConverter(val.interestRate, 3) + '%</td></tr>';					
			}else{
				notesOutput += '<td></td>';
				notesOutput += '<td></td>';				
			}
		});
		notesOutput += '</tbody></table>';
		$("#tabs-3").html(notesOutput);
		// $("#institTableNotes tbody tr:odd").addClass("odd");
	});	
	var bondsURL = hostLocation + "/TA_WS/securities/auctioned?pagesize=20&type=Bond&format=jsonp&callback=?";
	$.getJSON(bondsURL, function(data){
		var bondsOutput = '<table id="institTableBonds" class="table table-striped table-hover no-margin-top"><thead><tr class="bg-td-blue-lighter"><th>Security Term</th><th>CUSIP</th><th>Reopening</th><th>Issue<br />Date</th><th>Maturity Date</th><th>High Yield</th><th>Interest Rate</th></tr></thead><tbody>';
		$.each(data, function(key, val){
			bondsOutput += '<tr><td>' + val.term + '</td>';
			bondsOutput += '<td><a target="_blank" href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
			bondsOutput += '<td>' + val.reopening + '</td>';
			bondsOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
			bondsOutput += '<td>' + dateConverter(val.maturityDate) + '</td>';			
			if (isNaN(val.highYield)  === false || isNaN(val.interestRate) === false){
				bondsOutput += '<td>' + decimalConverter(val.highYield, 3) + '%</td>';
				bondsOutput += '<td>' + decimalConverter(val.interestRate, 3) + '%</td></tr>';					
			}else{
				bondsOutput += '<td></td>';
				bondsOutput += '<td></td></tr>';				
			}
		});
		bondsOutput += '</tbody></table>';
		$("#tabs-4").html(bondsOutput);
		// $("#institTableBonds tbody tr:odd").addClass("odd");
	});
	var tipsURL = hostLocation + "/TA_WS/securities/auctioned?pagesize=20&type=TIPS&format=jsonp&callback=?";
	$.getJSON(tipsURL, function(data){
		var tipsOutput = '<table id="institTableTIPS" class="table table-striped table-hover no-margin-top"><thead><tr class="bg-td-blue-lighter"><th>Security Term</th><th>CUSIP</th><th>Reopening</th><th>Issue<br />Date</th><th>Maturity Date</th><th>High Yield</th><th>Interest Rate</th></tr></thead><tbody>';
		$.each(data, function(key, val){
			tipsOutput += '<tr><td>' + val.term + '</td>';
			tipsOutput += '<td><a target="_blank" href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
			tipsOutput += '<td>' + val.reopening + '</td>';
			tipsOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
			tipsOutput += '<td>' + dateConverter(val.maturityDate) + '</td>';				
			if (isNaN(val.highYield)  === false || isNaN(val.interestRate) === false){
				tipsOutput += '<td>' + decimalConverter(val.highYield, 3) + '%</td>';
				tipsOutput += '<td>' + decimalConverter(val.interestRate, 3) + '%</td></tr>';					
			}else{
				tipsOutput += '<td></td>';
				tipsOutput += '<td></td></tr>';				
			}
		});
		tipsOutput += '</tbody></table>';
		$("#tabs-5").html(tipsOutput);
		// $("#institTableTIPS tbody tr:odd").addClass("odd");
	});
	var frnURL = hostLocation + "/TA_WS/securities/auctioned?pagesize=20&type=FRN&format=jsonp&callback=?";
	$.getJSON(frnURL, function(data){
		var frnOutput = '<table id="institTableFRN" class="table table-striped table-hover no-margin-top"><thead><tr class="bg-td-blue-lighter"><th>Security Term</th><th>CUSIP</th><th>Reopening</th><th>Issue<br />Date</th><th>Maturity Date</th><th>High<br />Discount Margin</th><th>Spread</th></tr></thead><tbody>';
		if(data.length !== 0){
			$.each(data, function(key, val){		
				frnOutput += '<tr><td>' + val.term + '</td>';
				frnOutput += '<td><a target="_blank" href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
				frnOutput += '<td>' + val.reopening + '</td>';
				frnOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
				frnOutput += '<td>' + dateConverter(val.maturityDate) + '</td>';			
				if (val.highDiscountMargin.length  !== 0 || val.spread.length !== 0){
					frnOutput += '<td>' + decimalConverter(val.highDiscountMargin, 3) + '%</td>';
					frnOutput += '<td>' + decimalConverter(val.spread, 3) + '%</td></tr>';
				}else{
					frnOutput += '<td></td>';
					frnOutput += '<td></td></tr>';			
				}				
			});
			frnOutput += '</tbody></table>';
			$("#tabs-6").html(frnOutput);
			// $("#institTableFRN tbody tr:odd").addClass("odd");
		}else{
			frnOutput += '<tr><td colspan="7">No recent FRN auction results.</td></tr>';
			frnOutput += '</tbody></table>';
			$("#tabs-6").html(frnOutput);
		}
	});
});
