// ==UserScript==
// @name         LastWar Utilitys
// @namespace    http://tampermonkey.net/
// @version      0.2
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
    var lvlBauzentrale = window.lvlBauzentrale
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

    const HAUPTQUARTIER = 5
    const BAUZENTRALE = 6
    const ROHEISEN = 9
    const KRISTALL = 10
    const FRUBIN = 11
    const ORIZIN = 12
    const FUROZIN = 13
    const GOLD = 1

    const INDEX_BZ = 0
    const INDEX_FE = 1
    const INDEX_KR = 2
    const INDEX_FR = 3
    const INDEX_OR = 4
    const INDEX_FU = 5
    const INDEX_AU = 6
    const INDEX_HQ = 7

    const RES_FE = 0
    const RES_KR = 1
    const RES_FR = 2
    const RES_OR = 3
    const RES_FU = 4
    const RES_AU = 5

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
            nIntervId = setInterval(checkPageLoaded, 400);
        }
    }

    function checkPageLoaded(){
        try {
        parent = document.getElementById("tradeOfferComment").parentElement
        }
        catch (e) {
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
            div.appendChild(generate_table(0))
        return true
    }

    function generate_table(id) {

        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var currentRes = build[id][RES](id)

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
                    cell.id = "tab_buildName"
                    cellText = document.createTextNode(build[id][STRING] + " (" + (build[id][LVL]) + ")");
                }



                if(j == 1 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "roheisenVariable"
                    cell.id = "tab_res_fe"
                    cellText = document.createTextNode(currentRes[RES_FE]);
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        return tbl
}

    function updateTable(){

    }

    function getBuildNames(){
        var names = new Array();
        var index = 0
        for (var i = 0; i < build.length; i++) {
            if (build[i] != null){
                names[index] = build[i][STRING]
                index++
            }
        }
        return names
    }

    function updateLvl(){
        build[INDEX_BZ][LVL] = window.lvlBauzentrale
        build[INDEX_FE][LVL] = window.lvlRoheisen
        build[INDEX_KR][LVL] = window.lvlKristall
        build[INDEX_FR][LVL] = window.lvlFrubin
        build[INDEX_OR][LVL] = window.lvlOrizin
        build[INDEX_FU][LVL] = window.lvlFrurozin
        build[INDEX_AU][LVL] = window.lvlGold
        build[INDEX_HQ][LVL] = window.lvlHauptquartier
    }


    "<tr id='roheisenmine'><td class='constructionName' id='roheisenmineTd'>Roheisen Mine ( "+lvlRoheisen+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlRoheisen)*100/25, 2)+100)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlRoheisen)*64/25, 2)+64)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>0</td><td class='orizinVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlRoheisen)*30/25, 2)+30)), 0, ',', '.')+"</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='roheisenmineTime'>" + getBuildingTime(9, lvlRoheisen, RoheisenMineBuildingTime) + "</td></tr>";
	//"<tr id='kristall'><td class='constructionName' id='kristallTd'>Kristall Förderungsanlage ( "+lvlKristall+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlKristall)*80/25, 2)+80)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlKristall)*80/25, 2)+80)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>0</td><td class='orizinVariable wordBreak'>0</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='kristallTime'>" + getBuildingTime(10, lvlKristall, KristallBuildingTime) + "</td></tr>";
	//"<tr id='frubin'><td class='constructionName' id='frubinTd'>Frubin Sammler ( "+lvlFrubin+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlFrubin)*80/25, 2)+80)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlFrubin)*64/25, 2)+64)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>0</td><td class='orizinVariable wordBreak'>0</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='frubinTime'>" + getBuildingTime(11, lvlFrubin, FrubinBuildingTime) + "</td></tr>";
	//"<tr id='orizin'><td class='constructionName' id='orizinTd'>Orizin Gewinnungsanlage ( "+lvlOrizin+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlOrizin)*80/25, 2)+80)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow(parseInt(lvlOrizin)*64/25, 2)+64)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>0</td><td class='orizinVariable wordBreak'>0</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='orizinTime'>" + getBuildingTime(12, lvlOrizin, OrizinBuildingTime) + "</td></tr>";
	//"<tr id='frurozin'><td class='constructionName' id='frurozinTd'>Frurozin Herstellung ( "+lvlFrurozin+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlFrurozin)+1)*75/25, 2)+70)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlFrurozin)+1)*48/25, 2)+48)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlFrurozin)+1)*60/25, 2)+60)), 0, ',', '.')+"</td><td class='orizinVariable wordBreak'>0</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='frurozinTime'>" + getBuildingTime(13, lvlFrurozin, FrurozinBuildingTime) + "</td></tr>";
    //"<tr id='gold'><td class='constructionName' id='goldTd'>Gold Mine ( "+lvlGold+" )</td><td class='roheisenVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlGold)+1)*200/25, 2)+200)), 0, ',', '.')+"</td><td class='kristallVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlGold)+1)*125/25, 2)+125)), 0, ',', '.')+"</td><td class='frubinVariable wordBreak'>0</td><td class='orizinVariable wordBreak'>"+$.number( (Math.round(Math.pow((parseInt(lvlGold)+1)*140/25, 2)+140)), 0, ',', '.')+"</td><td class='frurozinVariable wordBreak'>0</td><td class='goldVariable wordBreak'>0</td><td class='wordBreak timeConstructionTd' id='goldTime'>" + getBuildingTime(1, lvlGold, GoldBuildingTime) + "</td></tr>";


    var build = new Array()
    const LW_ID = 0
    const STRING = 1
    const LVL = 2
    const RES = 3

    build[INDEX_BZ] = new Array()
    build[INDEX_FE] = new Array()
    build[INDEX_KR] = new Array()
    build[INDEX_FR] = new Array()
    build[INDEX_OR] = new Array()
    build[INDEX_FU] = new Array()
    build[INDEX_AU] = new Array()
    build[INDEX_HQ] = new Array()

    build[INDEX_BZ][LW_ID] = BAUZENTRALE
    build[INDEX_FE][LW_ID] = ROHEISEN
    build[INDEX_KR][LW_ID] = KRISTALL
    build[INDEX_FR][LW_ID] = FRUBIN
    build[INDEX_OR][LW_ID] = ORIZIN
    build[INDEX_FU][LW_ID] = FUROZIN
    build[INDEX_AU][LW_ID] = GOLD
    build[INDEX_HQ][LW_ID] = HAUPTQUARTIER

    build[INDEX_BZ][STRING] = "Bauzentrale"
    build[INDEX_FE][STRING] = "Roheisen Mine"
    build[INDEX_KR][STRING] = "Kristall Förderungsanlage"
    build[INDEX_FR][STRING] = "Frubin Sammler"
    build[INDEX_OR][STRING] = "Orizin Gewinnungsanlage"
    build[INDEX_FU][STRING] = "Frurozin Herstellung"
    build[INDEX_AU][STRING] = "Gold Mine"
    build[INDEX_HQ][STRING] = "Hauptquartier"

    build[INDEX_BZ][RES] = ress_BZ
    build[INDEX_FE][RES] = null
    build[INDEX_KR][RES] = null
    build[INDEX_FR][RES] = null
    build[INDEX_OR][RES] = null
    build[INDEX_FU][RES] = null
    build[INDEX_AU][RES] = null
    build[INDEX_HQ][RES] = null

    updateLvl()

    function ress_BZ(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow(parseInt(lvl)*100/25, 2)+100))
        res[RES_KR] = 234
        res[RES_FR] = 345
        res[RES_OR] = 456
        res[RES_FU] = 567
        res[RES_AU] = 678
        return res
    }











})();
