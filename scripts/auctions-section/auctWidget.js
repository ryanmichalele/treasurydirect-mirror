var hostLocation = 'https://www.treasurydirect.gov';

if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
if (window.location.origin === 'https://acc.treasurydirect.gov'){
    hostLocation = 'https://acc.treasurydirect.gov';
}
$(document).ready(function () {

    function dateConverter(rawDate) {
        var formattedDate = rawDate.substr(5, 2) + '\/' + rawDate.substr(8, 2) + '\/' + rawDate.substr(0, 4);
        return formattedDate;
    }

    function decimalConverter(rawNumber, decimalSpaces) {
        if (rawNumber === "") {
            return rawNumber;
        } else {
            var formattedDecimal = parseFloat(rawNumber).toFixed(decimalSpaces);
            return formattedDecimal;
        }
    };

    function offeringAmountAbbr(offAmt) {
        var abbrOffAmt = offAmt / 1000000000 + ' Billion';
        return abbrOffAmt;
    }

    //Auction Results
    var billsURL = hostLocation + '/TA_WS/securities/auctioned?format=jsonp&limitByTerm=true&type=Bill&days=720&callback=?';
    var cmbURL = hostLocation + '/TA_WS/securities/auctioned?format=jsonp&type=CMB&limitToMature=true&callback=?';
    $.getJSON(billsURL, function (data) {
        if (data.length !== 0) {
            var billsOutput = "";
            $.each(data, function (key, val) {
                var pdfValue = val.pdfFilenameCompetitiveResults;
                var year = pdfValue.slice(2, 6);
                billsOutput += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameCompetitiveResults + '" target="_blank" rel="noreferrer noopener">' + val.securityTerm + '</a></td>';
                billsOutput += '<td>' + val.cashManagementBillCMB + '</td>';
                billsOutput += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                billsOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
                billsOutput += '<td>' + decimalConverter(val.highDiscountRate, 3) + '%</td>';
                billsOutput += '<td>' + decimalConverter(val.highInvestmentRate, 3) + '%</td>';
                billsOutput += '<td class="numAlignRight">$' + decimalConverter(val.pricePer100, 6) + '</td></tr>';
            });
            $("#institTableBills tbody").append(billsOutput);
            $("#institTableBills tbody tr:odd").addClass("odd");
            $.getJSON(cmbURL, function (data) {
                if (data.length !== 0) {
                    var cmbOutput = "";
                    $.each(data, function (key, val) {
                        var pdfValue = val.pdfFilenameCompetitiveResults;
                        var year = pdfValue.slice(2, 6);
                        cmbOutput += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameCompetitiveResults + '" target="_blank" rel="noreferrer noopener">' + val.securityTerm + '</a></td>';
                        cmbOutput += '<td>' + val.cashManagementBillCMB + '</td>';
                        cmbOutput += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                        cmbOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
                        cmbOutput += '<td>' + decimalConverter(val.highDiscountRate, 3) + '%</td>';
                        cmbOutput += '<td>' + decimalConverter(val.highInvestmentRate, 3) + '%</td>';
                        cmbOutput += '<td class="numAlignRight">$' + decimalConverter(val.pricePer100, 6) + '</td></tr>';
                    });
                    $("#institTableBills tbody").append(cmbOutput);
                    $("#institTableBills tbody tr:odd").addClass("odd");
                }
            });
        } else {
            $.getJSON(cmbURL, function (data) {
                if (data.length !== 0) {
                    var cmbOutput = "";
                    $.each(data, function (key, val) {
                        var pdfValue = val.pdfFilenameCompetitiveResults;
                        var year = pdfValue.slice(2, 6);
                        cmbOutput += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameCompetitiveResults + '" target="_blank" rel="noreferrer noopener">' + val.securityTerm + '</a></td>';
                        cmbOutput += '<td>' + val.cashManagementBillCMB + '</td>';
                        cmbOutput += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                        cmbOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
                        cmbOutput += '<td>' + decimalConverter(val.highDiscountRate, 3) + '%</td>';
                        cmbOutput += '<td>' + decimalConverter(val.highInvestmentRate, 3) + '%</td>';
                        cmbOutput += '<td class="numAlignRight">$' + decimalConverter(val.pricePer100, 6) + '</td></tr>';
                    });
                    $("#institTableBills tbody").append(cmbOutput);
                    $("#institTableBills tbody tr:odd").addClass("odd");
                } else {
                    var noScheduledOfferings = '<tr><td colspan="7">No recent Bill auction results.</td></tr>';
                    $("#institTableBills tbody").append(noScheduledOfferings);
                }
            });

        }
    });
    var notesURL = hostLocation + '/TA_WS/securities/auctioned?format=jsonp&limitByTerm=true&type=Note&days=720&callback=?';
    $.getJSON(notesURL, function (data) {
        if (data.length !== 0) {
            var notesOutput = "";
            $.each(data, function (key, val) {
                var pdfValue = val.pdfFilenameCompetitiveResults;
                var year = pdfValue.slice(2, 6);
                notesOutput += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameCompetitiveResults + '" target="_blank" rel="noreferrer noopener">' + val.term + '</a></td>';
                notesOutput += '<td>' + val.reopening + '</td>';
                notesOutput += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                notesOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
                if (isNaN(val.highYield) === false || isNaN(val.interestRate) === false) {
                    notesOutput += '<td>' + decimalConverter(val.highYield, 3) + '%</td>';
                    notesOutput += '<td>' + decimalConverter(val.interestRate, 3) + '%</td>';
                } else {
                    notesOutput += '<td></td>';
                    notesOutput += '<td></td>';
                }
                notesOutput += '<td class="numAlignRight">$' + decimalConverter(val.pricePer100, 6) + '</td></tr>';
            });
            $("#institTableNotes tbody").append(notesOutput);
            $("#institTableNotes tbody tr:odd").addClass("odd");
        } else {
            var noScheduledOfferings = '<tr><td colspan="7">No recent Note auction results.</td></tr>';
            $("#institTableNotes tbody").append(noScheduledOfferings);
        }
    });
    var bondsURL = hostLocation + '/TA_WS/securities/auctioned?format=jsonp&limitByTerm=true&type=Bond&days=720&callback=?';
    $.getJSON(bondsURL, function (data) {
        if (data.length !== 0) {
            var bondsOutput = "";
            $.each(data, function (key, val) {
                var pdfValue = val.pdfFilenameCompetitiveResults;
                var year = pdfValue.slice(2, 6);
                bondsOutput += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameCompetitiveResults + '" target="_blank" rel="noreferrer noopener">' + val.term + '</a></td>';
                bondsOutput += '<td>' + val.reopening + '</td>';
                bondsOutput += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                bondsOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
                if (isNaN(val.highYield) === false || isNaN(val.interestRate) === false) {
                    bondsOutput += '<td>' + decimalConverter(val.highYield, 3) + '%</td>';
                    bondsOutput += '<td>' + decimalConverter(val.interestRate, 3) + '%</td>';
                } else {
                    bondsOutput += '<td></td>';
                    bondsOutput += '<td></td>';
                }
                bondsOutput += '<td class="numAlignRight">$' + decimalConverter(val.pricePer100, 6) + '</td></tr>';
            });
            $("#institTableBonds tbody").append(bondsOutput);
            $("#institTableBonds tbody tr:odd").addClass("odd");
        } else {
            var noScheduledOfferings = '<tr><td colspan="7">No recent Bond auction results.</td></tr>';
            $("#institTableBonds tbody").append(noScheduledOfferings);
        }
    });
    var tipsURL = hostLocation + '/TA_WS/securities/auctioned?format=jsonp&limitByTerm=true&type=TIPS&days=720&callback=?';
    $.getJSON(tipsURL, function (data) {
        if (data.length !== 0) {
            var tipsOutput = "";
            $.each(data, function (key, val) {
                var pdfValue = val.pdfFilenameCompetitiveResults;
                var year = pdfValue.slice(2, 6);
                tipsOutput += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameCompetitiveResults + '" target="_blank" rel="noreferrer noopener">' + val.term + '</a></td>';
                tipsOutput += '<td>' + val.reopening + '</td>';
                tipsOutput += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                tipsOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
                if (isNaN(val.highYield) === false || isNaN(val.interestRate) === false) {
                    tipsOutput += '<td>' + decimalConverter(val.highYield, 3) + '%</td>';
                    tipsOutput += '<td>' + decimalConverter(val.interestRate, 3) + '%</td>';
                } else {
                    tipsOutput += '<td></td>';
                    tipsOutput += '<td></td>';
                }
                tipsOutput += '<td class="numAlignRight">$' + decimalConverter(val.pricePer100, 6) + '</td></tr>';
            });
            $("#institTableTIPS tbody").append(tipsOutput);
            $("#institTableTIPS tbody tr:odd").addClass("odd");
        } else {
            var noScheduledOfferings = '<tr><td colspan="7">No recent TIPS auction results.</td></tr>';
            $("#institTableTIPS tbody").append(noScheduledOfferings);
        }
    });
    var frnURL = hostLocation + '/TA_WS/securities/auctioned?format=jsonp&limitByTerm=true&type=FRN&days=720&callback=?';
    $.getJSON(frnURL, function (data) {
        if (data.length !== 0) {
            var frnOutput = "";
            $.each(data, function (key, val) {
                var pdfValue = val.pdfFilenameCompetitiveResults;
                var year = pdfValue.slice(2, 6);
                frnOutput += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameCompetitiveResults + '" target="_blank" rel="noreferrer noopener">' + val.term + '</a></td>';
                frnOutput += '<td>' + val.reopening + '</td>';
                frnOutput += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                frnOutput += '<td>' + dateConverter(val.issueDate) + '</td>';
                if (isNaN(val.highDiscountMargin) === false || isNaN(val.spread) === false) {
                    frnOutput += '<td>' + decimalConverter(val.highDiscountMargin, 3) + '%</td>';
                    frnOutput += '<td>' + decimalConverter(val.spread, 3) + '%</td>';
                } else {
                    frnOutput += '<td></td>';
                    frnOutput += '<td></td>';
                }
                frnOutput += '<td class="numAlignRight">$' + decimalConverter(val.pricePer100, 6) + '</td></tr>';
            });
            $("#institTableFRN tbody").append(frnOutput);
            $("#institTableFRN tbody tr:odd").addClass("odd");
        } else {
            var noScheduledOfferings = '<tr><td colspan="7">No recent FRN auction results.</td></tr>';
            $("#institTableFRN tbody").append(noScheduledOfferings);
        }
    });
    //Upcoming Auctions
    var billsURLUpcoming = hostLocation + '/TA_WS/securities/upcoming?format=jsonp&limitByTerm=true&type=Bill&callback=?';
    var cmbURLUpcoming = hostLocation + '/TA_WS/securities/upcoming?format=jsonp&type=CMB&callback=?';
    $.getJSON(billsURLUpcoming, function (data) {
        if (data.length !== 0) {
            var billsOutputUpcoming = "";
            $.each(data, function (key, val) {
                var pdfValue = val.pdfFilenameAnnouncement;
                var year = pdfValue.slice(2, 6);
                if (val.pdfFilenameAnnouncement.length !== 0) {
                    billsOutputUpcoming += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameAnnouncement + '" target="_blank" rel="noreferrer noopener">' + val.securityTerm + '</a></td>';
                } else {
                    billsOutputUpcoming += '<tr><td>' + val.securityTerm + '</td>';
                }
                billsOutputUpcoming += '<td>' + val.cashManagementBillCMB + '</td>';
                if (val.pdfFilenameAnnouncement.length !== 0) {
                    billsOutputUpcoming += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                } else {
                    billsOutputUpcoming += '<td>' + val.cusip + '</td>';
                }
                if (val.offeringAmount.length !== 0) {
                    billsOutputUpcoming += '<td>' + offeringAmountAbbr(val.offeringAmount) + '</td>';
                } else {
                    billsOutputUpcoming += '<td></td>';
                }
                billsOutputUpcoming += '<td>' + dateConverter(val.announcementDate) + '</td>';
                billsOutputUpcoming += '<td>' + dateConverter(val.auctionDate) + '</td>';
                billsOutputUpcoming += '<td>' + dateConverter(val.issueDate) + '</td></tr>';
            });
            $("#institTableBillsUpcoming tbody").append(billsOutputUpcoming);
            $("#institTableBillsUpcoming tbody tr:odd").addClass("odd");
            $.getJSON(cmbURLUpcoming, function (data) {
                if (data.length !== 0) {
                    var cmbOutputUpcoming = "";
                    $.each(data, function (key, val) {
                        var pdfValue = val.pdfFilenameAnnouncement;
                        var year = pdfValue.slice(2, 6);
                        if (val.pdfFilenameAnnouncement.length !== 0) {
                            cmbOutputUpcoming += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameAnnouncement + '" target="_blank" rel="noreferrer noopener">' + val.securityTerm + '</a></td>';
                        } else {
                            cmbOutputUpcoming += '<tr><td>' + val.securityTerm + '</td>';
                        }
                        cmbOutputUpcoming += '<td>' + val.cashManagementBillCMB + '</td>';
                        if (val.pdfFilenameAnnouncement.length !== 0) {
                            cmbOutputUpcoming += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                        } else {
                            cmbOutputUpcoming += '<td>' + val.cusip + '</td>';
                        }
                        if (val.offeringAmount.length !== 0) {
                            cmbOutputUpcoming += '<td>' + offeringAmountAbbr(val.offeringAmount) + '</td>';
                        } else {
                            cmbOutputUpcoming += '<td></td>';
                        }
                        cmbOutputUpcoming += '<td>' + dateConverter(val.announcementDate) + '</td>';
                        cmbOutputUpcoming += '<td>' + dateConverter(val.auctionDate) + '</td>';
                        cmbOutputUpcoming += '<td>' + dateConverter(val.issueDate) + '</td></tr>';
                    });
                    $("#institTableBillsUpcoming tbody").append(cmbOutputUpcoming);
                    $("#institTableBillsUpcoming tbody tr:odd").addClass("odd");
                }
            });
        } else {
            $.getJSON(cmbURLUpcoming, function (data) {
                if (data.length !== 0) {
                    var cmbOutputUpcoming = "";
                    $.each(data, function (key, val) {
                        var pdfValue = val.pdfFilenameAnnouncement;
                        var year = pdfValue.slice(2, 6);
                        if (val.pdfFilenameAnnouncement.length !== 0) {
                            cmbOutputUpcoming += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameAnnouncement + '" target="_blank" rel="noreferrer noopener">' + val.securityTerm + '</a></td>';
                        } else {
                            cmbOutputUpcoming += '<tr><td>' + val.securityTerm + '</td>';
                        }
                        cmbOutputUpcoming += '<td>' + val.cashManagementBillCMB + '</td>';
                        if (val.pdfFilenameAnnouncement.length !== 0) {
                            cmbOutputUpcoming += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                        } else {
                            cmbOutputUpcoming += '<td>' + val.cusip + '</td>';
                        }
                        if (val.offeringAmount.length !== 0) {
                            cmbOutputUpcoming += '<td>' + offeringAmountAbbr(val.offeringAmount) + '</td>';
                        } else {
                            cmbOutputUpcoming += '<td></td>';
                        }
                        cmbOutputUpcoming += '<td>' + dateConverter(val.announcementDate) + '</td>';
                        cmbOutputUpcoming += '<td>' + dateConverter(val.auctionDate) + '</td>';
                        cmbOutputUpcoming += '<td>' + dateConverter(val.issueDate) + '</td></tr>';
                    });
                    $("#institTableBillsUpcoming tbody").append(cmbOutputUpcoming);
                    $("#institTableBillsUpcoming tbody tr:odd").addClass("odd");
                } else {
                    var noScheduledOfferings = '<tr><td colspan="7">No scheduled Bill offerings.</td></tr>';
                    $("#institTableBillsUpcoming tbody").append(noScheduledOfferings);
                }
            });
        }
    });

    var notesURLUpcoming = hostLocation + '/TA_WS/securities/upcoming?format=jsonp&limitByTerm=true&type=Note&callback=?';
    $.getJSON(notesURLUpcoming, function (data) {
        if (data.length !== 0) {
            var notesOutputUpcoming = "";
            $.each(data, function (key, val) {
                var pdfValue = val.pdfFilenameAnnouncement;
                var year = pdfValue.slice(2, 6);
                if (val.pdfFilenameAnnouncement.length !== 0) {
                    notesOutputUpcoming += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameAnnouncement + '" target="_blank" rel="noreferrer noopener">' + val.securityTerm + '</a></td>';
                } else {
                    notesOutputUpcoming += '<tr><td>' + val.securityTerm + '</td>';
                }
                notesOutputUpcoming += '<td>' + val.reopening + '</td>';
                if (val.pdfFilenameAnnouncement.length !== 0) {
                    notesOutputUpcoming += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                } else {
                    notesOutputUpcoming += '<td>' + val.cusip + '</td>';
                }
                if (val.offeringAmount.length !== 0) {
                    notesOutputUpcoming += '<td>' + offeringAmountAbbr(val.offeringAmount) + '</td>';
                } else {
                    notesOutputUpcoming += '<td></td>';
                }
                notesOutputUpcoming += '<td>' + dateConverter(val.announcementDate) + '</td>';
                notesOutputUpcoming += '<td>' + dateConverter(val.auctionDate) + '</td>';
                notesOutputUpcoming += '<td>' + dateConverter(val.issueDate) + '</td></tr>';
            });
            $("#institTableNotesUpcoming tbody").append(notesOutputUpcoming);
            $("#institTableNotesUpcoming tbody tr:odd").addClass("odd");
        } else {
            var noScheduledOfferings = '<tr><td colspan="7">No scheduled Note offerings.</td></tr>';
            $("#institTableNotesUpcoming tbody").append(noScheduledOfferings);
        }
    });
    var bondsURLUpcoming = hostLocation + '/TA_WS/securities/upcoming?format=jsonp&limitByTerm=true&type=Bond&callback=?';
    $.getJSON(bondsURLUpcoming, function (data) {
        if (data.length !== 0) {
            var bondsOutputUpcoming = "";
            $.each(data, function (key, val) {
                var pdfValue = val.pdfFilenameAnnouncement;
                var year = pdfValue.slice(2, 6);
                if (val.pdfFilenameAnnouncement.length !== 0) {
                    bondsOutputUpcoming += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameAnnouncement + '" target="_blank" rel="noreferrer noopener">' + val.securityTerm + '</a></td>';
                } else {
                    bondsOutputUpcoming += '<tr><td>' + val.securityTerm + '</td>';
                }
                bondsOutputUpcoming += '<td>' + val.reopening + '</td>';
                if (val.pdfFilenameAnnouncement.length !== 0) {
                    bondsOutputUpcoming += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                } else {
                    bondsOutputUpcoming += '<td>' + val.cusip + '</td>';
                }
                if (val.offeringAmount.length !== 0) {
                    bondsOutputUpcoming += '<td>' + offeringAmountAbbr(val.offeringAmount) + '</td>';
                } else {
                    bondsOutputUpcoming += '<td></td>';
                }
                bondsOutputUpcoming += '<td>' + dateConverter(val.announcementDate) + '</td>';
                bondsOutputUpcoming += '<td>' + dateConverter(val.auctionDate) + '</td>';
                bondsOutputUpcoming += '<td>' + dateConverter(val.issueDate) + '</td></tr>';
            });
            $("#institTableBondsUpcoming tbody").append(bondsOutputUpcoming);
            $("#institTableBondsUpcoming tbody tr:odd").addClass("odd");
        } else {
            var noScheduledOfferings = '<tr><td colspan="7">No scheduled Bond offerings.</td></tr>';
            $("#institTableBondsUpcoming tbody").append(noScheduledOfferings);
        }
    });
    var tipsURLUpcoming = hostLocation + '/TA_WS/securities/upcoming?format=jsonp&limitByTerm=true&type=TIPS&callback=?';
    $.getJSON(tipsURLUpcoming, function (data) {
        if (data.length !== 0) {
            var tipsOutputUpcoming = "";
            $.each(data, function (key, val) {
                var pdfValue = val.pdfFilenameAnnouncement;
                var year = pdfValue.slice(2, 6);
                if (val.pdfFilenameAnnouncement.length !== 0) {
                    tipsOutputUpcoming += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameAnnouncement + '" target="_blank" rel="noreferrer noopener">' + val.securityTerm + '</a></td>';
                } else {
                    tipsOutputUpcoming += '<tr><td>' + val.securityTerm + '</td>';
                }
                tipsOutputUpcoming += '<td>' + val.reopening + '</td>';
                if (val.pdfFilenameAnnouncement.length !== 0) {
                    tipsOutputUpcoming += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                } else {
                    tipsOutputUpcoming += '<td>' + val.cusip + '</td>';
                }
                if (val.offeringAmount.length !== 0) {
                    tipsOutputUpcoming += '<td>' + offeringAmountAbbr(val.offeringAmount) + '</td>';
                } else {
                    tipsOutputUpcoming += '<td></td>';
                }
                tipsOutputUpcoming += '<td>' + dateConverter(val.announcementDate) + '</td>';
                tipsOutputUpcoming += '<td>' + dateConverter(val.auctionDate) + '</td>';
                tipsOutputUpcoming += '<td>' + dateConverter(val.issueDate) + '</td></tr>';
            });
            $("#institTableTIPSUpcoming tbody").append(tipsOutputUpcoming);
            $("#institTableTIPSUpcoming tbody tr:odd").addClass("odd");
        } else {
            var noScheduledOfferings = '<tr><td colspan="7">No scheduled TIPS offerings.</td></tr>';
            $("#institTableTIPSUpcoming tbody").append(noScheduledOfferings);
        }
    });
    var frnURLUpcoming = hostLocation + '/TA_WS/securities/upcoming?format=jsonp&limitByTerm=true&type=FRN&callback=?';
    $.getJSON(frnURLUpcoming, function (data) {
        if (data.length !== 0) {
            var frnOutputUpcoming = "";
            $.each(data, function (key, val) {
                var pdfValue = val.pdfFilenameAnnouncement;
                var year = pdfValue.slice(2, 6);
                if (val.pdfFilenameAnnouncement.length !== 0) {
                    frnOutputUpcoming += '<tr><td><a href="/instit/annceresult/press/preanre/' + year + '/' + val.pdfFilenameAnnouncement + '" target="_blank" rel="noreferrer noopener">' + val.securityTerm + '</a></td>';
                } else {
                    frnOutputUpcoming += '<tr><td>' + val.securityTerm + '</td>';
                }
                frnOutputUpcoming += '<td>' + val.reopening + '</td>';
                if (val.pdfFilenameAnnouncement.length !== 0) {
                    frnOutputUpcoming += '<td><a href="/auctions/auction-query/?cusip=' + val.cusip + '">' + val.cusip + '</a></td>';
                } else {
                    frnOutputUpcoming += '<td>' + val.cusip + '</td>';
                }
                if (val.offeringAmount.length !== 0) {
                    frnOutputUpcoming += '<td>' + offeringAmountAbbr(val.offeringAmount) + '</td>';
                } else {
                    frnOutputUpcoming += '<td></td>';
                }
                frnOutputUpcoming += '<td>' + dateConverter(val.announcementDate) + '</td>';
                frnOutputUpcoming += '<td>' + dateConverter(val.auctionDate) + '</td>';
                frnOutputUpcoming += '<td>' + dateConverter(val.issueDate) + '</td></tr>';
            });
            $("#institTableFRNUpcoming tbody").append(frnOutputUpcoming);
            $("#institTableFRNUpcoming tbody tr:odd").addClass("odd");
        } else {
            var noScheduledOfferings = '<tr><td colspan="7">No scheduled FRN offerings.</td></tr>';
            $("#institTableFRNUpcoming tbody").append(noScheduledOfferings);
        }
    });
});
