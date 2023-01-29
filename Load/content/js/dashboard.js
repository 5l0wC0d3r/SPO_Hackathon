/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 91.13333333333334, "KoPercent": 8.866666666666667};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.4734375, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0351, 500, 1500, ""], "isController": true}, {"data": [0.7285, 500, 1500, "-519"], "isController": false}, {"data": [0.518, 500, 1500, "-530"], "isController": false}, {"data": [0.7535, 500, 1500, "-532"], "isController": false}, {"data": [0.65725, 500, 1500, "-531"], "isController": false}, {"data": [0.0265, 500, 1500, "-516"], "isController": false}, {"data": [0.51125, 500, 1500, "-538"], "isController": false}, {"data": [0.74975, 500, 1500, "-515"], "isController": false}, {"data": [0.292, 500, 1500, "-537"], "isController": false}, {"data": [0.40625, 500, 1500, "-518"], "isController": false}, {"data": [0.63475, 500, 1500, "-517"], "isController": false}, {"data": [0.53125, 500, 1500, "-539"], "isController": false}, {"data": [0.5085, 500, 1500, "-534"], "isController": false}, {"data": [0.759, 500, 1500, "-533"], "isController": false}, {"data": [0.6255, 500, 1500, "-514"], "isController": false}, {"data": [0.75375, 500, 1500, "-536"], "isController": false}, {"data": [0.5125, 500, 1500, "-535"], "isController": false}, {"data": [0.35825, 500, 1500, "-540"], "isController": false}, {"data": [0.504, 500, 1500, "-521"], "isController": false}, {"data": [0.502, 500, 1500, "-520"], "isController": false}, {"data": [0.761, 500, 1500, "-527"], "isController": false}, {"data": [0.45575, 500, 1500, "-526"], "isController": false}, {"data": [0.5115, 500, 1500, "-529"], "isController": false}, {"data": [0.72675, 500, 1500, "-528"], "isController": false}, {"data": [0.74425, 500, 1500, "-523"], "isController": false}, {"data": [0.49925, 500, 1500, "-522"], "isController": false}, {"data": [0.35175, 500, 1500, "-525"], "isController": false}, {"data": [0.59175, 500, 1500, "-524"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 54000, 4788, 8.866666666666667, 1377.6658703703736, 6, 58293, 551.0, 2129.800000000003, 4717.950000000001, 23450.94000000001, 122.88450904225179, 2386.3020569323644, 70.34924801507383], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["", 10000, 2593, 25.93, 7439.395999999995, 44, 64281, 5150.5, 16558.799999999996, 21467.59999999997, 30389.0, 22.754837109498553, 2386.139157188566, 70.34444565803575], "isController": true}, {"data": ["-519", 2000, 20, 1.0, 641.3289999999993, 12, 8835, 449.5, 1334.0, 1650.7999999999993, 3547.51, 4.565876465646345, 1.8198406452040035, 2.1937609581035176], "isController": false}, {"data": ["-530", 2000, 388, 19.4, 817.8859999999997, 6, 8906, 684.0, 1421.8000000000002, 1731.7999999999993, 4265.91, 4.569475447066054, 4.989246917603219, 2.9630192352068945], "isController": false}, {"data": ["-532", 2000, 25, 1.25, 560.770499999999, 6, 8718, 415.0, 1073.900000000001, 1561.9499999999998, 3264.76, 4.570822610945292, 1.8208523570018147, 2.1961374263526205], "isController": false}, {"data": ["-531", 2000, 0, 0.0, 832.0014999999992, 12, 46585, 568.0, 1641.9, 2176.0, 5388.120000000002, 4.5702272545502325, 41.159047121899384, 2.3743758783405506], "isController": false}, {"data": ["-516", 2000, 0, 0.0, 13593.123999999989, 134, 58293, 12925.0, 24426.9, 27713.6, 37210.600000000006, 4.559506114297699, 1848.117483671981, 1.950257498107805], "isController": false}, {"data": ["-538", 2000, 419, 20.95, 766.3205000000014, 6, 8872, 668.5, 1369.8000000000002, 1661.0, 2881.4200000000014, 4.573226502762229, 4.931114971914673, 2.965451560384883], "isController": false}, {"data": ["-515", 2000, 0, 0.0, 674.4340000000025, 7, 17326, 423.0, 1308.0, 1889.6499999999987, 5702.56, 4.562220706551121, 21.43684147195489, 1.9826056781398915], "isController": false}, {"data": ["-537", 2000, 454, 22.7, 1716.8224999999989, 21, 15578, 1040.0, 4005.100000000001, 5408.249999999997, 9054.37, 4.57253643168402, 2.3572407686205112, 6.367614210528722], "isController": false}, {"data": ["-518", 2000, 230, 11.5, 1167.1409999999976, 115, 8968, 981.5, 2143.9, 2572.7999999999993, 4493.7300000000005, 4.564292625928833, 3.2199658134482316, 2.540670699979917], "isController": false}, {"data": ["-517", 2000, 0, 0.0, 1045.9515, 12, 13161, 551.0, 2118.9, 3355.899999999996, 9301.390000000001, 4.563480292610356, 1.8227182028101911, 2.2059792430098892], "isController": false}, {"data": ["-539", 2000, 402, 20.1, 735.6489999999999, 12, 7267, 647.5, 1277.7000000000003, 1597.8999999999996, 2514.8500000000004, 4.574335234732012, 4.957527386687999, 2.9661705037715396], "isController": false}, {"data": ["-534", 2000, 432, 21.6, 777.7140000000031, 8, 9482, 677.5, 1388.0, 1670.8999999999996, 3243.6400000000003, 4.571564412199677, 4.938528441273683, 2.964373798535728], "isController": false}, {"data": ["-533", 2000, 31, 1.55, 554.5070000000005, 8, 8774, 418.0, 1016.6000000000004, 1448.8999999999996, 2759.9300000000003, 4.571167361865037, 1.819837973544369, 2.196303068396092], "isController": false}, {"data": ["-514", 2000, 0, 0.0, 941.1184999999989, 17, 19429, 597.0, 1777.9, 2674.5499999999984, 6785.520000000003, 4.5588097859410865, 38.813056530950895, 2.0389989081650564], "isController": false}, {"data": ["-536", 2000, 36, 1.8, 559.8144999999997, 6, 8491, 421.0, 1001.0, 1431.699999999999, 3325.940000000001, 4.571961531515674, 1.819194208924926, 2.2547271224759915], "isController": false}, {"data": ["-535", 2000, 422, 21.1, 767.1260000000001, 10, 11997, 680.0, 1371.4000000000005, 1646.0, 2568.5400000000004, 4.571313635542878, 4.9512795285432825, 2.9642111855473345], "isController": false}, {"data": ["-540", 2000, 0, 0.0, 1756.1309999999992, 11, 16825, 1374.5, 3437.7000000000003, 4639.249999999997, 7416.130000000001, 4.5750467798533245, 122.27566687025625, 2.0641324338791365], "isController": false}, {"data": ["-521", 2000, 388, 19.4, 819.425999999999, 12, 9133, 701.5, 1502.6000000000004, 1802.6499999999987, 3265.6500000000005, 4.567315377694145, 4.989872334971477, 2.961618565223547], "isController": false}, {"data": ["-520", 2000, 374, 18.7, 849.3674999999998, 13, 11602, 706.5, 1544.0, 1819.749999999999, 4207.77, 4.567263227365214, 5.013626233589252, 2.961584748994631], "isController": false}, {"data": ["-527", 2000, 28, 1.4, 552.2594999999991, 10, 8858, 412.0, 1001.9000000000001, 1429.749999999999, 2492.7700000000004, 4.569277094670852, 1.8196610567367135, 2.195394854080136], "isController": false}, {"data": ["-526", 2000, 0, 0.0, 1486.3925000000017, 14, 32935, 1022.0, 2848.0, 4006.5499999999984, 10897.920000000002, 4.568734323530352, 122.1053498736745, 2.0389761580599326], "isController": false}, {"data": ["-529", 2000, 415, 20.75, 802.6225000000002, 8, 8919, 686.0, 1401.9, 1657.9499999999998, 3544.460000000003, 4.5698408781406235, 4.956385153043971, 2.9632561944193103], "isController": false}, {"data": ["-528", 2000, 33, 1.65, 658.6055000000009, 7, 11695, 452.0, 1277.800000000001, 1722.8999999999996, 4478.87, 4.568953504044666, 1.8185728888008095, 2.1952393788964604], "isController": false}, {"data": ["-523", 2000, 32, 1.6, 599.8705000000001, 9, 8774, 425.5, 1150.900000000001, 1573.7999999999956, 3467.130000000001, 4.567826513949, 1.818316127853464, 2.2080801996140185], "isController": false}, {"data": ["-522", 2000, 401, 20.05, 840.2849999999992, 10, 8533, 727.5, 1532.5000000000005, 1874.699999999999, 3854.5200000000013, 4.567534422081288, 4.970713004969477, 2.9617606018183356], "isController": false}, {"data": ["-525", 2000, 0, 0.0, 1930.8055000000013, 19, 25516, 1414.0, 3790.000000000002, 5139.349999999994, 11254.210000000003, 4.56805604091151, 130.8672865697154, 1.9717585645340698], "isController": false}, {"data": ["-524", 2000, 258, 12.9, 749.5034999999998, 11, 8743, 592.0, 1423.6000000000004, 1749.5999999999985, 3816.9, 4.5681186431774, 2.165132099998401, 2.9755225927727795], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 4193, 87.57309941520468, 7.764814814814815], "isController": false}, {"data": ["502/Bad Gateway", 595, 12.426900584795321, 1.1018518518518519], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 54000, 4788, "400/Bad Request", 4193, "502/Bad Gateway", 595, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["-519", 2000, 20, "502/Bad Gateway", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["-530", 2000, 388, "400/Bad Request", 357, "502/Bad Gateway", 31, "", "", "", "", "", ""], "isController": false}, {"data": ["-532", 2000, 25, "502/Bad Gateway", 25, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["-538", 2000, 419, "400/Bad Request", 358, "502/Bad Gateway", 61, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-537", 2000, 454, "400/Bad Request", 410, "502/Bad Gateway", 44, "", "", "", "", "", ""], "isController": false}, {"data": ["-518", 2000, 230, "400/Bad Request", 230, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-539", 2000, 402, "400/Bad Request", 345, "502/Bad Gateway", 57, "", "", "", "", "", ""], "isController": false}, {"data": ["-534", 2000, 432, "400/Bad Request", 405, "502/Bad Gateway", 27, "", "", "", "", "", ""], "isController": false}, {"data": ["-533", 2000, 31, "502/Bad Gateway", 31, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-536", 2000, 36, "502/Bad Gateway", 36, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["-535", 2000, 422, "400/Bad Request", 394, "502/Bad Gateway", 28, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-521", 2000, 388, "400/Bad Request", 363, "502/Bad Gateway", 25, "", "", "", "", "", ""], "isController": false}, {"data": ["-520", 2000, 374, "400/Bad Request", 355, "502/Bad Gateway", 19, "", "", "", "", "", ""], "isController": false}, {"data": ["-527", 2000, 28, "502/Bad Gateway", 28, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-529", 2000, 415, "400/Bad Request", 384, "502/Bad Gateway", 31, "", "", "", "", "", ""], "isController": false}, {"data": ["-528", 2000, 33, "502/Bad Gateway", 33, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["-523", 2000, 32, "502/Bad Gateway", 32, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["-522", 2000, 401, "400/Bad Request", 370, "502/Bad Gateway", 31, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-524", 2000, 258, "400/Bad Request", 222, "502/Bad Gateway", 36, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
