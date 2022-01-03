
// ==UserScript==
// @name         -DG- Management
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Tool for LastWar
// @author       Revan
// @match        http*://*.last-war.de/main.php*
// @match        http*://*.last-war.de/main-mobile.php*
// @grant        none
// @downloadURL  https://github.com/BenniBaerenstark/-DG-Ship-Market/raw/main/main.user.js
// @updateURL    https://github.com/BenniBaerenstark/-DG-Ship-Market/edit/main/main.user.js
// ==/UserScript==

(function() {
    'use strict';
    var select

    var BuildingNumber = window.BuildingNumber
    var lvlRoheisen = window.lvlRoheisen
    var lvlKristall = window.lvlKristall
    var lvlFrubin = window.lvlFrubin
    var lvlOrizin = window.lvlOrizin
    var lvlFrurozin = window.lvlFrurozin
    var lvlGold = window.lvlGold

    var getBuildingTime = window.getBuildingTime
    var RoheisenMineBuildingTime = window.RoheisenMineBuildingTime
    var KristallBuildingTime = window.KristallBuildingTime
    var FrubinBuildingTime = window.FrubinBuildingTime
    var OrizinBuildingTime = window.OrizinBuildingTime
    var FrurozinBuildingTime = window.FrurozinBuildingTime
    var GoldBuildingTime = window.GoldBuildingTime

    var $ = window.$

    window.onclick = e => {
        if(e.target.innerText == "Neues Handelsangebot stellen"){
            neuerHandelClicked()
        }
        if(e.target.className == "fas fa-handshake"){
            neuerHandelClicked()
        }
    }

    function neuerHandelClicked(){
        setTimeout(generate_table,500)
    }

    function generate_table() {

        var parent_length = document.getElementsByClassName("formButtonNewMessage").length
        var parent = document.getElementsByClassName("formButtonNewMessage")[parent_length-1].parentElement

        var div = document.createElement("div");
        div.id = "container"

        var values = getBuildNames();
            select = document.createElement("select");
            select.name = "shipSelect";
            select.id = "shipSelect"
            for (const val of values) {
                var option = document.createElement("option");
                option.value = val;
                option.text = val.charAt(0).toUpperCase() + val.slice(1);
                select.appendChild(option);
            }
            select.addEventListener ("change", function () {
                updateTable()
            })

        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        // creating all cells
        for (var i = 0; i < 2; i++) {
            // creates a table row
            var row = document.createElement("tr");

            for (var j = 0; j < 2; j++) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                var cell = document.createElement("td");
                var cellText = document.createTextNode("cell in row "+i+", column "+j);
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            // add the row to the end of the table body
            tblBody.appendChild(row);
        }

        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        parent.appendChild(div)
        div.appendChild(select)
        div.appendChild(tbl);
        // sets the border attribute of tbl to 2;
        tbl.setAttribute("border", "2");
}

    function getBuildNames(){
        var names = new Array();
        for (var i = 0; i < build.length; i++) {
            names[i] = build[i][name]
        }
        return names
    }

    function updateTable(){

    }


    function getPriceHTML(id){
    if (id == 1) return "<tr id='roheisenmine'><td class='constructionName' id='roheisenmineTd'>Roheisen Mine ( "+lvlRoheisen+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlRoheisen)*100/25, 2)+100)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlRoheisen)*64/25, 2)+64)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>0</td><td class='orizinVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlRoheisen)*30/25, 2)+30)), 0, ',', '.')+"</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='roheisenmineTime'>" + getBuildingTime(9, lvlRoheisen, RoheisenMineBuildingTime) + "</td></tr>";
	if (id == 2) return "<tr id='kristall'><td class='constructionName' id='kristallTd'>Kristall Förderungsanlage ( "+lvlKristall+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlKristall)*80/25, 2)+80)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlKristall)*80/25, 2)+80)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>0</td><td class='orizinVariable wordBreak'>0</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='kristallTime'>" + getBuildingTime(10, lvlKristall, KristallBuildingTime) + "</td></tr>";
	if (id == 3) return "<tr id='frubin'><td class='constructionName' id='frubinTd'>Frubin Sammler ( "+lvlFrubin+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlFrubin)*80/25, 2)+80)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlFrubin)*64/25, 2)+64)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>0</td><td class='orizinVariable wordBreak'>0</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='frubinTime'>" + getBuildingTime(11, lvlFrubin, FrubinBuildingTime) + "</td></tr>";
	if (id == 4) return "<tr id='orizin'><td class='constructionName' id='orizinTd'>Orizin Gewinnungsanlage ( "+lvlOrizin+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlOrizin)*80/25, 2)+80)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlOrizin)*64/25, 2)+64)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>0</td><td class='orizinVariable wordBreak'>0</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='orizinTime'>" + getBuildingTime(12, lvlOrizin, OrizinBuildingTime) + "</td></tr>";
	if (id == 5) return "<tr id='frurozin'><td class='constructionName' id='frurozinTd'>Frurozin Herstellung ( "+lvlFrurozin+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlFrurozin)+1)*75/25, 2)+70)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlFrurozin)+1)*48/25, 2)+48)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlFrurozin)+1)*60/25, 2)+60)), 0, ',', '.')+"</td><td class='orizinVariable wordBreak'>0</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='frurozinTime'>" + getBuildingTime(13, lvlFrurozin, FrurozinBuildingTime) + "</td></tr>";
    if (id == 6) return "<tr id='gold'><td class='constructionName' id='goldTd'>Gold Mine ( "+lvlGold+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlGold)+1)*200/25, 2)+200)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlGold)+1)*125/25, 2)+125)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>0</td><td class='orizinVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlGold)+1)*140/25, 2)+140)), 0, ',', '.')+"</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='goldTime'>" + getBuildingTime(1, lvlGold, GoldBuildingTime) + "</td></tr>";

    }


    var build = new Array()
    const name = 0

    build[0] = new Array()
    build[1] = new Array()
    build[2] = new Array()
    build[3] = new Array()
    build[4] = new Array()
    build[5] = new Array()
    build[6] = new Array()

    build[0][name] = "Roheisen Mine"
    build[1][name] = "Kristall Förderungsanlage"
    build[2][name] = "Frubin Sammler"
    build[3][name] = "Orizin Gewinnungsanlage"
    build[4][name] = "Frurozin Herstellung"
    build[5][name] = "Gold Min"
    build[6][name] = "Bauzentrale"

})();
