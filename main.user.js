// ==UserScript==
// @name         LastWar Utilitys
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Tool for LastWar
// @author       Revan
// @match        http*://*.last-war.de/main.php*
// @match        http*://*.last-war.de/main-mobile.php*
// @grant        none
// @downloadURL  https://github.com/BenniBaerenstark/-DG-Ship-Market/raw/main/main.user.js
// @updateURL    https://github.com/BenniBaerenstark/-DG-Ship-Market/edit/main/main.user.js
// @run-at      document-idle
// ==/UserScript==

(function() {
    'use strict';
    var select
    var parent

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

    let nIntervId

    window.onclick = e => {
        if(e.target.innerText == "Neues Handelsangebot stellen"){
            neuerHandelClicked()
        }
        if(e.target.className == "fas fa-handshake"){
            neuerHandelClicked()
        }
    }

    function neuerHandelClicked(){
        if (!nIntervId) {
            nIntervId = setInterval(checkPageLoaded, 200);
        }
    }

    function checkPageLoaded(){
        try {
        parent = document.getElementById("tradeOfferComment").parentElement
        }
        catch (e) {
            console.log("Page not loaded")
            return false
        }
        clearInterval(nIntervId);
        nIntervId = null;
        generatePage()
        return true
    }

    function generatePage(){

        var div = document.createElement("div");
        div.id = "container"

        var values = getBuildNames();
            select = document.createElement("select");
            select.name = "buildSelect";
            select.id = "buildSelect"
            for (const val of values) {
                var option = document.createElement("option");
                option.value = val;
                option.text = val.charAt(0).toUpperCase() + val.slice(1);
                select.appendChild(option);
            }
            select.addEventListener ("change", function () {
                updateTable()
            })

            parent.appendChild(div)
            div.appendChild(document.createElement("p"))
            div.appendChild(select)
            div.appendChild(generate_table(1))
        return true
    }

    function generate_table(id) {
        
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        for (var i = 0; i < 2; i++) {
            var row = document.createElement("tr");
            if (i == 0) row.classList = "rohstoffgebaude"
            if (i > 0) row.classList = ""

            for (var j = 0; j < 8; j++) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode("leer");
                if(j == 0 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "constructionName"
                    cellText = document.createTextNode("Gebäude");
                }
                if(j == 1 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "roheisenVariable"
                    cellText = document.createTextNode("Roheisen");
                }
                if(j == 2 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "kristallVariable"
                    cellText = document.createTextNode("Kristall");
                }
                if(j == 3 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "frubinVariable"
                    cellText = document.createTextNode("Frubin");
                }
                if(j == 4 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "orizinVariable"
                    cellText = document.createTextNode("Orizin");
                }
                if(j == 5 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "frurozinVariable"
                    cellText = document.createTextNode("Frurozin");
                }
                if(j == 6 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "goldVariable"
                    cellText = document.createTextNode("Gold");
                }
                if(j == 7 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = ""
                    cellText = document.createTextNode("Dauer");
                }

                if(j == 0 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "constructionName"
                    cell.id = "buildName"
                    cellText = document.createTextNode(build[id][name]);
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        return tbl
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

    function retry(fn, retriesLeft = 2, interval = 1000) {
        return new Promise((resolve, reject) => {
            fn()
                .then(resolve)
                .catch((error) => {
        if (retriesLeft === 0) {
            reject(error);
            return;
        }

                setTimeout(() => {
                    console.log('retrying...')
                    retry(fn, retriesLeft - 1, interval).then(resolve).catch(reject);
        }, interval);
      });
  });
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
