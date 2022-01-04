// ==UserScript==
// @name         LastWar Utilitys
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  Tool for LastWar
// @author       Revan
// @match        http*://*.last-war.de/main.php*
// @match        http*://*.last-war.de/main-mobile.php*
// @grant        none
// @downloadURL  https://github.com/BenniBaerenstark/LastWar-Utility/raw/main/main.user.js
// @updateURL    https://github.com/BenniBaerenstark/LastWar-Utility/raw/main/main.user.js
// @run-at      document-idle
// ==/UserScript==

(function() {
    'use strict';
    var select
    var parent
    var input_lvl

    var BuildingNumber = window.BuildingNumber

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

    function generateSelector(){
        var values = getBuildNames();
        select = document.createElement("select");
        select.name = "buildSelect";
        select.id = "buildSelect"
        select.style.fontSize = "17px";
        for (const val of values) {
            var option = document.createElement("option");
            option.value = val;
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            select.appendChild(option);
        }
        select.addEventListener ("change", function () {
            updateTable1()
        })
    }

    function generatePage(){

        var div = document.createElement("div");
        div.id = "container"

        var btn = document.createElement("a");
        btn.classList.add("formButtonNewMessage")
        btn.innerHTML = "Fordern"
        btn.setAttribute("style", "float: none");
        btn.addEventListener("click", setTrade, false);

        var btn2 = document.createElement("a");
        btn2.classList.add("formButtonNewMessage")
        btn2.innerHTML = "Saven"
        btn2.setAttribute("style", "float: none");
        btn2.addEventListener("click", setSave, false);

        var btn_div = document.createElement("div");

        parent.appendChild(div)
        div.appendChild(document.createElement("p"))
        generateSelector()

        div.appendChild(generate_table(0))
        div.appendChild(btn)
        div.appendChild(btn2)

    }

    function generate_table(id) {

        updateLvl()

        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        input_lvl = document.createElement("INPUT");
        input_lvl.setAttribute("style", "width: 50px;");
        input_lvl.type = "number"
        input_lvl.id = "input-lvl"
        input_lvl.value = checkLvl(id)+1
        input_lvl.addEventListener ("change", function () {
            updateTable2()
        })

        var currentRes = build[id][RES](input_lvl.value-1)

        for (var i = 0; i < 2; i++) {
            var row = document.createElement("tr");
            if (i == 0) row.classList = "rohstoffgebaude"
            if (i > 0) row.classList = ""

            for (var j = 0; j < 9; j++) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode("NA");
                if(j == 0 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "constructionName"
                    cellText = document.createTextNode("Gebäude");
                }
                if(j == 1 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "constructionName"
                    cellText = document.createTextNode("Stufe");
                }
                if(j == 2 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "roheisenVariable"
                    cellText = document.createTextNode("Roheisen");
                }
                if(j == 3 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "kristallVariable"
                    cellText = document.createTextNode("Kristall");
                }
                if(j == 4 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "frubinVariable"
                    cellText = document.createTextNode("Frubin");
                }
                if(j == 5 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "orizinVariable"
                    cellText = document.createTextNode("Orizin");
                }
                if(j == 6 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "frurozinVariable"
                    cellText = document.createTextNode("Frurozin");
                }
                if(j == 7 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "goldVariable"
                    cellText = document.createTextNode("Gold");
                }
                if(j == 8 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = ""
                    cellText = document.createTextNode("Dauer");
                }
                if(j == 0 && i == 1){
                    cell = document.createElement("td");
                    cell.appendChild(select)
                   // cell.classList = "constructionName"
                    cell.id = "tab_buildName"
                    cellText = document.createTextNode("");
                }
                if(j == 1 && i == 1){
                    cell = document.createElement("td");
                    cell.appendChild(input_lvl)
                    cellText = document.createTextNode("");
                }

                if(j == 2 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "roheisenVariable"
                    cell.id = "tab_res_fe"
                    cellText = document.createTextNode($.number( currentRes[RES_FE], 0, ',', '.'));
                }
                if(j == 3 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "kristallVariable"
                    cell.id = "tab_res_kr"
                    cellText = document.createTextNode($.number( currentRes[RES_KR], 0, ',', '.'));
                }
                if(j == 4 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "frubinVariable"
                    cell.id = "tab_res_fr"
                    cellText = document.createTextNode($.number( currentRes[RES_FR], 0, ',', '.'));
                }
                if(j == 5 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "orizinVariable"
                    cell.id = "tab_res_or"
                    cellText = document.createTextNode($.number( currentRes[RES_OR], 0, ',', '.'));
                }
                if(j == 6 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "frurozinVariable"
                    cell.id = "tab_res_fu"
                    cellText = document.createTextNode($.number( currentRes[RES_FU], 0, ',', '.'));
                }
                if(j == 7 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "goldVariable"
                    cell.id = "tab_res_au"
                    cellText = document.createTextNode($.number( currentRes[RES_AU], 0, ',', '.'));
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        return tbl
}

    function checkLvl(id){
        if (build[id][LW_ID] == window.BuildingNumber || build[id][LW_ID] == window.BuildingNumber) return build[id][LVL] + 1
        return build[id][LVL]
    }

    function updateTable1(){
        console.log("select changed")
        updateLvl()
        var id = select.selectedIndex
        var currentRes = build[id][RES](checkLvl(id))
        document.getElementById("input-lvl").value = checkLvl(id)+1
        document.getElementById("tab_res_fe").innerText = $.number(currentRes[RES_FE], 0, ',', '.')
        document.getElementById("tab_res_kr").innerText = $.number(currentRes[RES_KR], 0, ',', '.')
        document.getElementById("tab_res_fr").innerText = $.number(currentRes[RES_FR], 0, ',', '.')
        document.getElementById("tab_res_or").innerText = $.number(currentRes[RES_OR], 0, ',', '.')
        document.getElementById("tab_res_fu").innerText = $.number(currentRes[RES_FU], 0, ',', '.')
        document.getElementById("tab_res_au").innerText = $.number(currentRes[RES_AU], 0, ',', '.')
        document.getElementById("my_eisen").value = 0
        document.getElementById("my_kristall").value = 0
        document.getElementById("my_frubin").value = 0
        document.getElementById("my_orizin").value = 0
        document.getElementById("my_frurozin").value = 0
        document.getElementById("my_gold").value = 0
        document.getElementById("his_eisen").value = 0
        document.getElementById("his_kristall").value = 0
        document.getElementById("his_frubin").value = 0
        document.getElementById("his_orizin").value = 0
        document.getElementById("his_frurozin").value = 0
        document.getElementById("his_gold").value = 0
        document.getElementById("galaxyTrade").value = ""
        document.getElementById("systemTrade").value = ""
        document.getElementById("planetTrade").value = ""
    }

    function updateTable2(){
        console.log("input changed")
        updateLvl()
        var id = select.selectedIndex
        var currentRes = build[id][RES](document.getElementById("input-lvl").value)
        document.getElementById("tab_res_fe").innerText = $.number(currentRes[RES_FE], 0, ',', '.')
        document.getElementById("tab_res_kr").innerText = $.number(currentRes[RES_KR], 0, ',', '.')
        document.getElementById("tab_res_fr").innerText = $.number(currentRes[RES_FR], 0, ',', '.')
        document.getElementById("tab_res_or").innerText = $.number(currentRes[RES_OR], 0, ',', '.')
        document.getElementById("tab_res_fu").innerText = $.number(currentRes[RES_FU], 0, ',', '.')
        document.getElementById("tab_res_au").innerText = $.number(currentRes[RES_AU], 0, ',', '.')
        document.getElementById("my_eisen").value = 0
        document.getElementById("my_kristall").value = 0
        document.getElementById("my_frubin").value = 0
        document.getElementById("my_orizin").value = 0
        document.getElementById("my_frurozin").value = 0
        document.getElementById("my_gold").value = 0
        document.getElementById("his_eisen").value = 0
        document.getElementById("his_kristall").value = 0
        document.getElementById("his_frubin").value = 0
        document.getElementById("his_orizin").value = 0
        document.getElementById("his_frurozin").value = 0
        document.getElementById("his_gold").value = 0
        document.getElementById("galaxyTrade").value = ""
        document.getElementById("systemTrade").value = ""
        document.getElementById("planetTrade").value = ""
    }

    function setTrade(){
        var id = select.selectedIndex
        var currentRes = build[id][RES](document.getElementById("input-lvl").value-1)
        document.getElementById("his_eisen").value = currentRes[RES_FE]
        document.getElementById("his_kristall").value = currentRes[RES_KR]
        document.getElementById("his_frubin").value = currentRes[RES_FR]
        document.getElementById("his_orizin").value = currentRes[RES_OR]
        document.getElementById("his_frurozin").value = currentRes[RES_FU]
        document.getElementById("his_gold").value = currentRes[RES_AU]
        document.getElementById("my_eisen").value = 1
        document.getElementById("my_kristall").value = 0
        document.getElementById("my_frubin").value = 0
        document.getElementById("my_orizin").value = 0
        document.getElementById("my_frurozin").value = 0
        document.getElementById("my_gold").value = 0
        document.getElementById("tradeOfferComment").value = ""
        document.getElementById("galaxyTrade").value = ""
        document.getElementById("systemTrade").value = ""
        document.getElementById("planetTrade").value = ""
    }

    function setSave(){
        var id = select.selectedIndex
        var currentRes = build[id][RES](document.getElementById("input-lvl").value-1)
        document.getElementById("my_eisen").value = currentRes[RES_FE]
        document.getElementById("my_kristall").value = currentRes[RES_KR]
        document.getElementById("my_frubin").value = currentRes[RES_FR]
        document.getElementById("my_orizin").value = currentRes[RES_OR]
        document.getElementById("my_frurozin").value = currentRes[RES_FU]
        document.getElementById("my_gold").value = currentRes[RES_AU]
        document.getElementById("his_eisen").value = 0
        document.getElementById("his_kristall").value = 0
        document.getElementById("his_frubin").value = 0
        document.getElementById("his_orizin").value = 0
        document.getElementById("his_frurozin").value = 0
        document.getElementById("his_gold").value = 99999999
        document.getElementById("tradeOfferComment").value = "###LWM::SAVE###"

        var cords = document.getElementById("lwm-own-coords").options[1].text
        var cords_array = cords.split("x");
        document.getElementById("galaxyTrade").value = cords_array[0]
        document.getElementById("systemTrade").value = cords_array[1]
        document.getElementById("planetTrade").value = cords_array[2]
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
    build[INDEX_FE][RES] = ress_FE
    build[INDEX_KR][RES] = ress_KR
    build[INDEX_FR][RES] = ress_FR
    build[INDEX_OR][RES] = ress_OR
    build[INDEX_FU][RES] = ress_FU
    build[INDEX_AU][RES] = ress_AU
    build[INDEX_HQ][RES] = ress_HQ

    updateLvl()

    function ress_BZ(lvl){
        var res = new Array()
        res[RES_FE] = (240*(parseInt(lvl)+1)+60)
        res[RES_KR] = (120*(parseInt(lvl)+1)+30)
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_FE(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow(parseInt(lvl)*100/25, 2)+100))
        res[RES_KR] = (Math.round(Math.pow(parseInt(lvl)*64/25, 2)+64))
        res[RES_FR] = 0
        res[RES_OR] = (Math.round(Math.pow(parseInt(lvl)*30/25, 2)+30))
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

     function ress_KR(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow(parseInt(lvl)*80/25, 2)+80))
        res[RES_KR] = (Math.round(Math.pow(parseInt(lvl)*80/25, 2)+80))
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_FR(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow(parseInt(lvl)*80/25, 2)+80))
        res[RES_KR] = (Math.round(Math.pow(parseInt(lvl)*64/25, 2)+64))
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_OR(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow(parseInt(lvl)*80/25, 2)+80))
        res[RES_KR] = (Math.round(Math.pow(parseInt(lvl)*64/25, 2)+64))
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_FU(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow((parseInt(lvl)+1)*75/25, 2)+70))
        res[RES_KR] = (Math.round(Math.pow((parseInt(lvl)+1)*48/25, 2)+48))
        res[RES_FR] = (Math.round(Math.pow((parseInt(lvl)+1)*60/25, 2)+60))
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_AU(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow((parseInt(lvl)+1)*200/25, 2)+200))
        res[RES_KR] = (Math.round(Math.pow((parseInt(lvl)+1)*125/25, 2)+125))
        res[RES_FR] = 0
        res[RES_OR] = (Math.round(Math.pow((parseInt(lvl)+1)*140/25, 2)+140))
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_HQ(lvl){
        var res = new Array()
        res[RES_FE] = (320*(parseInt(lvl)+1)+80)
        res[RES_KR] = (120*(parseInt(lvl)+1)+30)
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }











})();

// @run-at      document-idle
// ==/UserScript==

(function() {
    'use strict';
    var select
    var parent
    var input_lvl

    var BuildingNumber = window.BuildingNumber

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

    function generateSelector(){
        var values = getBuildNames();
        select = document.createElement("select");
        select.name = "buildSelect";
        select.id = "buildSelect"
        select.style.fontSize = "17px";
        for (const val of values) {
            var option = document.createElement("option");
            option.value = val;
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            select.appendChild(option);
        }
        select.addEventListener ("change", function () {
            updateTable1()
        })
    }

    function generatePage(){

        var div = document.createElement("div");
        div.id = "container"

        var btn = document.createElement("a");
        btn.classList.add("formButtonNewMessage")
        btn.innerHTML = "Fordern"
        btn.setAttribute("style", "float: none");
        btn.addEventListener("click", setTrade, false);

        var btn2 = document.createElement("a");
        btn2.classList.add("formButtonNewMessage")
        btn2.innerHTML = "Saven"
        btn2.setAttribute("style", "float: none");
        btn2.addEventListener("click", setSave, false);

        var btn_div = document.createElement("div");

        parent.appendChild(div)
        div.appendChild(document.createElement("p"))
        generateSelector()

        div.appendChild(generate_table(0))
        div.appendChild(btn)
        div.appendChild(btn2)

    }

    function generate_table(id) {

        updateLvl()

        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var currentRes = build[id][RES](build[id][LVL])

        input_lvl = document.createElement("INPUT");
        input_lvl.setAttribute("style", "width: 50px;");
        input_lvl.type = "number"
        input_lvl.id = "input-lvl"
        input_lvl.value = build[id][LVL]+1
        input_lvl.addEventListener ("change", function () {
            updateTable2()
        })

        for (var i = 0; i < 2; i++) {
            var row = document.createElement("tr");
            if (i == 0) row.classList = "rohstoffgebaude"
            if (i > 0) row.classList = ""

            for (var j = 0; j < 9; j++) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode("NA");
                if(j == 0 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "constructionName"
                    cellText = document.createTextNode("Gebäude");
                }
                if(j == 1 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "constructionName"
                    cellText = document.createTextNode("Stufe");
                }
                if(j == 2 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "roheisenVariable"
                    cellText = document.createTextNode("Roheisen");
                }
                if(j == 3 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "kristallVariable"
                    cellText = document.createTextNode("Kristall");
                }
                if(j == 4 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "frubinVariable"
                    cellText = document.createTextNode("Frubin");
                }
                if(j == 5 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "orizinVariable"
                    cellText = document.createTextNode("Orizin");
                }
                if(j == 6 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "frurozinVariable"
                    cellText = document.createTextNode("Frurozin");
                }
                if(j == 7 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = "goldVariable"
                    cellText = document.createTextNode("Gold");
                }
                if(j == 8 && i == 0){
                    cell = document.createElement("th");
                    cell.classList = ""
                    cellText = document.createTextNode("Dauer");
                }
                if(j == 0 && i == 1){
                    cell = document.createElement("td");
                    cell.appendChild(select)
                   // cell.classList = "constructionName"
                    cell.id = "tab_buildName"
                    cellText = document.createTextNode("");
                }
                if(j == 1 && i == 1){
                    cell = document.createElement("td");
                    cell.appendChild(input_lvl)
                    cellText = document.createTextNode("");
                }

                if(j == 2 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "roheisenVariable"
                    cell.id = "tab_res_fe"
                    cellText = document.createTextNode($.number( currentRes[RES_FE], 0, ',', '.'));
                }
                if(j == 3 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "kristallVariable"
                    cell.id = "tab_res_kr"
                    cellText = document.createTextNode($.number( currentRes[RES_KR], 0, ',', '.'));
                }
                if(j == 4 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "frubinVariable"
                    cell.id = "tab_res_fr"
                    cellText = document.createTextNode($.number( currentRes[RES_FR], 0, ',', '.'));
                }
                if(j == 5 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "orizinVariable"
                    cell.id = "tab_res_or"
                    cellText = document.createTextNode($.number( currentRes[RES_OR], 0, ',', '.'));
                }
                if(j == 6 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "frurozinVariable"
                    cell.id = "tab_res_fu"
                    cellText = document.createTextNode($.number( currentRes[RES_FU], 0, ',', '.'));
                }
                if(j == 7 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "goldVariable"
                    cell.id = "tab_res_au"
                    cellText = document.createTextNode($.number( currentRes[RES_AU], 0, ',', '.'));
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        return tbl
}

    function updateTable1(){
        console.log("select changed")
        updateLvl()
        var id = select.selectedIndex
        var currentRes = build[id][RES](build[id][LVL])
        document.getElementById("input-lvl").value = build[id][LVL]+1
        document.getElementById("tab_res_fe").innerText = currentRes[RES_FE]
        document.getElementById("tab_res_kr").innerText = currentRes[RES_KR]
        document.getElementById("tab_res_fr").innerText = currentRes[RES_FR]
        document.getElementById("tab_res_or").innerText = currentRes[RES_OR]
        document.getElementById("tab_res_fu").innerText = currentRes[RES_FU]
        document.getElementById("tab_res_au").innerText = currentRes[RES_AU]
    }

    function updateTable2(){
        console.log("input changed")
        updateLvl()
        var id = select.selectedIndex
        var currentRes = build[id][RES](document.getElementById("input-lvl").value)
        document.getElementById("tab_res_fe").innerText = currentRes[RES_FE]
        document.getElementById("tab_res_kr").innerText = currentRes[RES_KR]
        document.getElementById("tab_res_fr").innerText = currentRes[RES_FR]
        document.getElementById("tab_res_or").innerText = currentRes[RES_OR]
        document.getElementById("tab_res_fu").innerText = currentRes[RES_FU]
        document.getElementById("tab_res_au").innerText = currentRes[RES_AU]
    }

    function setTrade(){
        var id = select.selectedIndex
        var currentRes = build[id][RES](document.getElementById("input-lvl").value)
        document.getElementById("his_eisen").value = currentRes[RES_FE]
        document.getElementById("his_kristall").value = currentRes[RES_KR]
        document.getElementById("his_frubin").value = currentRes[RES_FR]
        document.getElementById("his_orizin").value = currentRes[RES_OR]
        document.getElementById("his_frurozin").value = currentRes[RES_FU]
        document.getElementById("his_gold").value = currentRes[RES_AU]
        document.getElementById("my_eisen").value = 1
        document.getElementById("my_kristall").value = 0
        document.getElementById("my_frubin").value = 0
        document.getElementById("my_orizin").value = 0
        document.getElementById("my_frurozin").value = 0
        document.getElementById("my_gold").value = 0
        document.getElementById("tradeOfferComment").value = ""
    }

    function setSave(){
        var id = select.selectedIndex
        var currentRes = build[id][RES](document.getElementById("input-lvl").value-1)
        document.getElementById("my_eisen").value = currentRes[RES_FE]
        document.getElementById("my_kristall").value = currentRes[RES_KR]
        document.getElementById("my_frubin").value = currentRes[RES_FR]
        document.getElementById("my_orizin").value = currentRes[RES_OR]
        document.getElementById("my_frurozin").value = currentRes[RES_FU]
        document.getElementById("my_gold").value = currentRes[RES_AU]
        document.getElementById("his_eisen").value = 0
        document.getElementById("his_kristall").value = 0
        document.getElementById("his_frubin").value = 0
        document.getElementById("his_orizin").value = 0
        document.getElementById("his_frurozin").value = 0
        document.getElementById("his_gold").value = 99999999
        document.getElementById("tradeOfferComment").value = "###LWM::SAVE###"

        document.getElementById("lwm-own-coords").selectedIndex = 1
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
    build[INDEX_FE][RES] = ress_FE
    build[INDEX_KR][RES] = ress_KR
    build[INDEX_FR][RES] = ress_FR
    build[INDEX_OR][RES] = ress_OR
    build[INDEX_FU][RES] = ress_FU
    build[INDEX_AU][RES] = ress_AU
    build[INDEX_HQ][RES] = ress_HQ

    updateLvl()

    function ress_BZ(lvl){
        var res = new Array()
        res[RES_FE] = (240*(parseInt(lvl)+1)+60)
        res[RES_KR] = (120*(parseInt(lvl)+1)+30)
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_FE(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow(parseInt(lvl)*100/25, 2)+100))
        res[RES_KR] = (Math.round(Math.pow(parseInt(lvl)*64/25, 2)+64))
        res[RES_FR] = 0
        res[RES_OR] = (Math.round(Math.pow(parseInt(lvl)*30/25, 2)+30))
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

     function ress_KR(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow(parseInt(lvl)*80/25, 2)+80))
        res[RES_KR] = (Math.round(Math.pow(parseInt(lvl)*80/25, 2)+80))
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_FR(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow(parseInt(lvl)*80/25, 2)+80))
        res[RES_KR] = (Math.round(Math.pow(parseInt(lvl)*64/25, 2)+64))
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_OR(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow(parseInt(lvl)*80/25, 2)+80))
        res[RES_KR] = (Math.round(Math.pow(parseInt(lvl)*64/25, 2)+64))
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_FU(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow((parseInt(lvl)+1)*75/25, 2)+70))
        res[RES_KR] = (Math.round(Math.pow((parseInt(lvl)+1)*48/25, 2)+48))
        res[RES_FR] = (Math.round(Math.pow((parseInt(lvl)+1)*60/25, 2)+60))
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_AU(lvl){
        var res = new Array()
        res[RES_FE] = (Math.round(Math.pow((parseInt(lvl)+1)*200/25, 2)+200))
        res[RES_KR] = (Math.round(Math.pow((parseInt(lvl)+1)*125/25, 2)+125))
        res[RES_FR] = 0
        res[RES_OR] = (Math.round(Math.pow((parseInt(lvl)+1)*140/25, 2)+140))
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_HQ(lvl){
        var res = new Array()
        res[RES_FE] = (320*(parseInt(lvl)+1)+80)
        res[RES_KR] = (120*(parseInt(lvl)+1)+30)
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }











})();
