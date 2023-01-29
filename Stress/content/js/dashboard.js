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

    var data = {"OkPercent": 90.88444444444444, "KoPercent": 9.115555555555556};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.4747625, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.03496, 500, 1500, ""], "isController": true}, {"data": [0.7296, 500, 1500, "-519"], "isController": false}, {"data": [0.5144, 500, 1500, "-530"], "isController": false}, {"data": [0.761, 500, 1500, "-532"], "isController": false}, {"data": [0.6742, 500, 1500, "-531"], "isController": false}, {"data": [0.0246, 500, 1500, "-516"], "isController": false}, {"data": [0.5128, 500, 1500, "-538"], "isController": false}, {"data": [0.7346, 500, 1500, "-515"], "isController": false}, {"data": [0.2904, 500, 1500, "-537"], "isController": false}, {"data": [0.3916, 500, 1500, "-518"], "isController": false}, {"data": [0.626, 500, 1500, "-517"], "isController": false}, {"data": [0.5298, 500, 1500, "-539"], "isController": false}, {"data": [0.5114, 500, 1500, "-534"], "isController": false}, {"data": [0.768, 500, 1500, "-533"], "isController": false}, {"data": [0.609, 500, 1500, "-514"], "isController": false}, {"data": [0.7642, 500, 1500, "-536"], "isController": false}, {"data": [0.5132, 500, 1500, "-535"], "isController": false}, {"data": [0.3566, 500, 1500, "-540"], "isController": false}, {"data": [0.5086, 500, 1500, "-521"], "isController": false}, {"data": [0.506, 500, 1500, "-520"], "isController": false}, {"data": [0.7622, 500, 1500, "-527"], "isController": false}, {"data": [0.4716, 500, 1500, "-526"], "isController": false}, {"data": [0.5216, 500, 1500, "-529"], "isController": false}, {"data": [0.7378, 500, 1500, "-528"], "isController": false}, {"data": [0.7454, 500, 1500, "-523"], "isController": false}, {"data": [0.5086, 500, 1500, "-522"], "isController": false}, {"data": [0.3536, 500, 1500, "-525"], "isController": false}, {"data": [0.5908, 500, 1500, "-524"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 67500, 6153, 9.115555555555556, 1377.2187703703692, 4, 71441, 497.0, 1891.0, 3748.9500000000007, 22633.640000000058, 153.6549388111888, 2983.730867470339, 87.96478484894013], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["", 12500, 3313, 26.504, 7436.98159999998, 62, 73984, 5059.5, 16560.499999999993, 21537.09999999998, 31265.989999999998, 28.454683071739947, 2983.737659559635, 87.96498508974607], "isController": true}, {"data": ["-519", 2500, 20, 0.8, 641.5768, 9, 8772, 437.5, 1385.6000000000004, 1688.8999999999996, 3716.6999999999935, 5.715944971454571, 2.2791884015474206, 2.7463329355035633], "isController": false}, {"data": ["-530", 2500, 536, 21.44, 788.7360000000001, 8, 8802, 679.0, 1352.9, 1660.5499999999984, 4073.8799999999974, 5.717291376037688, 6.1772139674857645, 3.707306126649439], "isController": false}, {"data": ["-532", 2500, 34, 1.36, 537.9907999999996, 6, 8775, 421.0, 962.0, 1387.8999999999996, 2535.6499999999924, 5.720391823958374, 2.2782711774625715, 2.7484695091674998], "isController": false}, {"data": ["-531", 2500, 0, 0.0, 790.7996, 13, 17513, 542.0, 1626.9, 2229.8499999999995, 4925.779999999995, 5.71891313199709, 51.504225615555214, 2.971154088107863], "isController": false}, {"data": ["-516", 2500, 0, 0.0, 13786.28439999998, 97, 71441, 12918.5, 24758.300000000003, 28677.949999999986, 37786.25999999994, 5.706134094151213, 2312.8828258737517, 2.44070970042796], "isController": false}, {"data": ["-538", 2500, 519, 20.76, 751.2568000000016, 6, 5284, 663.0, 1349.9, 1654.9499999999998, 2682.809999999974, 5.7247145084874616, 6.180676838005464, 3.7121195640973386], "isController": false}, {"data": ["-515", 2500, 0, 0.0, 665.0703999999997, 4, 17703, 442.5, 1374.2000000000007, 1793.2999999999975, 4476.859999999997, 5.712836286107982, 26.843341246563728, 2.482629050115285], "isController": false}, {"data": ["-537", 2500, 589, 23.56, 1753.9484000000016, 21, 14290, 1017.5, 4329.500000000004, 5721.349999999998, 9049.339999999964, 5.723403914350405, 2.9651658971550106, 7.970287091663748], "isController": false}, {"data": ["-518", 2500, 305, 12.2, 1167.5076000000001, 115, 8989, 1008.0, 2052.9, 2468.8499999999995, 4117.619999999948, 5.714285714285714, 4.025279017857143, 3.1808035714285716], "isController": false}, {"data": ["-517", 2500, 0, 0.0, 1089.6960000000015, 10, 15587, 568.5, 2398.5000000000023, 3866.749999999999, 9498.939999999999, 5.715056430467195, 2.282673906309651, 2.7626493487121695], "isController": false}, {"data": ["-539", 2500, 512, 20.48, 724.4523999999999, 8, 7232, 642.0, 1292.8000000000002, 1638.8999999999996, 2718.7999999999956, 5.72547492814529, 6.1883997047086305, 3.7126126487192113], "isController": false}, {"data": ["-534", 2500, 572, 22.88, 759.5119999999988, 7, 8905, 646.0, 1353.0, 1650.7999999999993, 2953.719999999994, 5.721897472752325, 6.133201320814203, 3.710292892487835], "isController": false}, {"data": ["-533", 2500, 32, 1.28, 531.7907999999998, 7, 11602, 427.0, 947.0, 1296.9499999999998, 2267.309999999985, 5.721085633209758, 2.2789318876149935, 2.748802862831251], "isController": false}, {"data": ["-514", 2500, 0, 0.0, 962.5475999999995, 9, 17412, 636.0, 1855.0, 2769.8499999999995, 6309.579999999969, 5.708714009412527, 48.60448835864767, 2.55331153936615], "isController": false}, {"data": ["-536", 2500, 42, 1.68, 549.1520000000011, 5, 8545, 423.5, 981.9000000000001, 1424.5999999999985, 3264.9799999999996, 5.722499954220001, 2.277572864591917, 2.8221313250791993], "isController": false}, {"data": ["-535", 2500, 547, 21.88, 765.4703999999987, 11, 9308, 652.0, 1352.9, 1627.7999999999993, 2895.859999999975, 5.720653618999892, 6.171939446738427, 3.709486331070243], "isController": false}, {"data": ["-540", 2500, 0, 0.0, 1779.8340000000014, 12, 27459, 1361.5, 3386.8, 4743.599999999991, 8702.819999999996, 5.7259338998190605, 153.034208160601, 2.5833803337074275], "isController": false}, {"data": ["-521", 2500, 471, 18.84, 844.716399999998, 10, 8849, 705.0, 1538.5000000000005, 1841.0, 4090.9299999999985, 5.715343869379245, 6.2669683201346995, 3.706043290300604], "isController": false}, {"data": ["-520", 2500, 478, 19.12, 847.0351999999984, 12, 9804, 708.0, 1508.0, 1761.7999999999993, 3740.319999999985, 5.7159580402952175, 6.259885034935936, 3.70644154175393], "isController": false}, {"data": ["-527", 2500, 44, 1.76, 550.9779999999996, 11, 11482, 410.5, 940.9000000000001, 1313.0999999999967, 2778.6299999999483, 5.7170037412072485, 2.275001243448314, 2.7468416412831704], "isController": false}, {"data": ["-526", 2500, 0, 0.0, 1457.1456000000017, 14, 24473, 992.0, 2854.700000000001, 3940.699999999999, 10980.709999999994, 5.716546199983079, 152.78293036089127, 2.551232044328386], "isController": false}, {"data": ["-529", 2500, 491, 19.64, 803.3636000000005, 14, 9209, 673.0, 1398.7000000000003, 1709.3999999999978, 4089.9199999999983, 5.718193691231264, 6.24040996375237, 3.7078912216577726], "isController": false}, {"data": ["-528", 2500, 42, 1.68, 606.8211999999988, 9, 8822, 437.0, 1145.9, 1646.9499999999998, 3827.639999999992, 5.716768425144634, 2.275291698108893, 2.746728579268711], "isController": false}, {"data": ["-523", 2500, 42, 1.68, 604.6356000000012, 6, 8744, 433.0, 1089.0, 1536.9499999999998, 4072.3599999999205, 5.715487599678104, 2.2747819255706343, 2.762857775235021], "isController": false}, {"data": ["-522", 2500, 518, 20.72, 807.064399999999, 15, 11032, 698.0, 1434.7000000000003, 1746.7999999999993, 3552.99, 5.715343869379245, 6.195687265813786, 3.706043290300604], "isController": false}, {"data": ["-525", 2500, 0, 0.0, 1898.023600000002, 14, 30623, 1388.0, 3849.4000000000005, 5177.749999999995, 11127.13999999996, 5.7162717103999565, 163.76296959529367, 2.467375093746856], "isController": false}, {"data": ["-524", 2500, 359, 14.36, 719.4972000000001, 9, 8658, 585.0, 1370.8000000000002, 1659.749999999999, 3142.9199999999983, 5.7158926966895836, 2.7173621812532436, 3.7231449498944844], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["400/Bad Request", 5405, 87.84332845766293, 8.007407407407408], "isController": false}, {"data": ["502/Bad Gateway", 748, 12.15667154233707, 1.108148148148148], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 67500, 6153, "400/Bad Request", 5405, "502/Bad Gateway", 748, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["-519", 2500, 20, "502/Bad Gateway", 20, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["-530", 2500, 536, "400/Bad Request", 496, "502/Bad Gateway", 40, "", "", "", "", "", ""], "isController": false}, {"data": ["-532", 2500, 34, "502/Bad Gateway", 34, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["-538", 2500, 519, "400/Bad Request", 445, "502/Bad Gateway", 74, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-537", 2500, 589, "400/Bad Request", 542, "502/Bad Gateway", 47, "", "", "", "", "", ""], "isController": false}, {"data": ["-518", 2500, 305, "400/Bad Request", 305, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-539", 2500, 512, "400/Bad Request", 435, "502/Bad Gateway", 77, "", "", "", "", "", ""], "isController": false}, {"data": ["-534", 2500, 572, "400/Bad Request", 530, "502/Bad Gateway", 42, "", "", "", "", "", ""], "isController": false}, {"data": ["-533", 2500, 32, "502/Bad Gateway", 32, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-536", 2500, 42, "502/Bad Gateway", 42, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["-535", 2500, 547, "400/Bad Request", 514, "502/Bad Gateway", 33, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-521", 2500, 471, "400/Bad Request", 444, "502/Bad Gateway", 27, "", "", "", "", "", ""], "isController": false}, {"data": ["-520", 2500, 478, "400/Bad Request", 455, "502/Bad Gateway", 23, "", "", "", "", "", ""], "isController": false}, {"data": ["-527", 2500, 44, "502/Bad Gateway", 44, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-529", 2500, 491, "400/Bad Request", 458, "502/Bad Gateway", 33, "", "", "", "", "", ""], "isController": false}, {"data": ["-528", 2500, 42, "502/Bad Gateway", 42, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["-523", 2500, 42, "502/Bad Gateway", 42, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["-522", 2500, 518, "400/Bad Request", 475, "502/Bad Gateway", 43, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["-524", 2500, 359, "400/Bad Request", 306, "502/Bad Gateway", 53, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
