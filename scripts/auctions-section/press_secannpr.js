var hostLocation = 'https://www.treasurydirect.gov';

if (!window.location.origin) {
	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
if (window.location.origin === 'https://acc.treasurydirect.gov'){
	hostLocation = 'https://acc.treasurydirect.gov';
}

function dateConverter(rawDate){
	if (typeof rawDate !== 'undefined'){
		return rawDate.substr(5, 2) + '\/' + rawDate.substr(8, 2) + '\/'+ rawDate.substr(0, 4);
	}else{
		return "";
	}
}

function findSpecialPDFYear(val){
	if((val.pdfFilenameSpecialAnnouncement !== undefined) && (val.pdfFilenameSpecialAnnouncement !== null)){
		return val.pdfFilenameSpecialAnnouncement.match(/SPL_(.*?)_/g)[0].match(/\d{3}[0-9]/g)[0];
	} else {
		return val.match(/SPL_(.*?)_/g)[0].match(/\d{3}[0-9]/g)[0];
	}
}

$(function(){
	var dataURL = hostLocation + '/TA_WS/securities/pending?format=jsonp&callback=?';
	var specialDataURL = hostLocation + '/TA_WS/specialannouncements?format=jsonp&callback=?'
	$.getJSON(dataURL, function(data){
		if (data.length !== 0){
			var secannprOutput = '';
			$.each(data, function(key, val){
				var pdfYear = val.pdfFilenameAnnouncement.slice(2, 6);
				if (val.pdfFilenameSpecialAnnouncement.length !== 0){
					var hasSpecialPDF = val.pdfFilenameSpecialAnnouncement.split(",");
					secannprOutput += '<h5><a href="/instit/annceresult/press/preanre/' + pdfYear + '/' + val.pdfFilenameAnnouncement + '" target="_blank" rel="noopener noreferrer">' + val.securityTerm + ' ' + val.type + '</a>' + '<span style="font-size: initial; font-weight: 700;">, Uploaded ' + dateConverter(val.announcementDate) + '</span></h5>';
					$.each(hasSpecialPDF, function(key, val){
						secannprOutput += '<h5><a href="/instit/annceresult/press/preanre/' + findSpecialPDFYear(val) + '/' + $.trim(val) + '" target="_blank" rel="noopener noreferrer" style="padding-left: 2em;">Special Announcement</a></h5>';
					});
				}else{
					secannprOutput += '<h5><a href="/instit/annceresult/press/preanre/' + pdfYear + '/' + val.pdfFilenameAnnouncement + '" target="_blank" rel="noopener noreferrer">' + val.securityTerm + ' ' + val.type + '</a>' + '<span style="font-size: initial; font-weight: 700;">, Uploaded ' + dateConverter(val.updatedTimestamp) + '</span></h5>';
				}
			});
			secannprOutput += '</h5>';
			$("#secannprOutput").html(secannprOutput);
			$.getJSON(specialDataURL, function(data){
				var secannprSpecialOutput = '';
				$.each(data, function(key, val){
					secannprSpecialOutput += '<h5><a href="/instit/annceresult/press/preanre/' + findSpecialPDFYear(val) + '/' + val.pdfFilenameSpecialAnnouncement + '" target="_blank" rel="noopener noreferrer">' + val.title + '</a>' + '<span style="font-size: initial; font-weight: 700;">, Uploaded ' + dateConverter(val.updateTimestamp) + '</span></h5>';
				});
				$("#secannprOutput").prepend(secannprSpecialOutput);
				// $("#secannprOutput ul:first-child").prepend(secannprSpecialOutput);
			});
		}else{
			$("#secannprOutput").append("<h4>No Auctions Scheduled</h4>");
			$.getJSON(specialDataURL, function(data){
				var secannprOutput = '<h5>';
					$.each(data, function(key, val){
						secannprOutput += '<a href="/instit/annceresult/press/preanre/' + findSpecialPDFYear(val) + '/' + val.pdfFilenameSpecialAnnouncement + '" target="_blank" rel="noopener noreferrer">' + val.title + '</a>' + '<span style="font-size: initial; font-weight: 700;">, Uploaded ' + dateConverter(val.updateTimestamp) + '</span>';
					});
					secannprOutput += '</h5>';
					$("#secannprOutput").append(secannprOutput);
			});

		}
	});
});
