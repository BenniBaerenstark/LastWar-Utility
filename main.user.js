// ==UserScript==
// @name         LastWar Utilities
// @namespace    http://tampermonkey.net/
// @version      1.5.0
// @description  Tool for LastWar
// @author       Revan
// @match        http*://*.last-war.de/main.php*
// @match        http*://*.last-war.de/main-mobile.php*
// @grant        none
// @downloadURL  https://github.com/BenniBaerenstark/LastWar-Utility/raw/main/main.user.js
// @updateURL    https://github.com/BenniBaerenstark/LastWar-Utility/raw/main/main.user.js
// @require      //cdn.jsdelivr.net/npm/sweetalert2@11
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';


    //   _____________________________
    //  |                             |
    //  |      Building Ress Tool     |
    //  |_____________________________|

    const HAUPTQUARTIER = 5
    const BAUZENTRALE = 6
    const FORSCHUNG = 7
    const SPIOSTATION = 8
    const ROHEISEN = 9
    const KRISTALL = 10
    const FRUBIN = 11
    const ORIZIN = 12
    const FUROZIN = 13
    const GOLD = 1
    const EISENLAGER = 14
    const KRISLAGER = 15
    const FRUBLAGER = 16
    const ORILAGER = 17
    const FUROLAGER = 18
    const GOLDLAGER = 19
    const KERNKRAFTWERK = 20
    const FUSIONSKRAFTWERK = 21
    const WERFT = 22
    const VERTEIDIGUNG = 23
    const SPIOABWEHR = 24
    const FRUHWARN = 25
    const AKADEMIE = 26
    const HANGAR = 27
    const HANDELSPOSTEN = 28
    const HANDELSZENTRUM = 29
    const BANKK = 30
    const GEHEIMDIENST = 31
    const KREDIT = 32
    const WERKSTATT = 33
    const RECYCLING = 34

    const INDEX_HQ = 0
    const INDEX_BZ = 1
    const INDEX_FZ = 2
    const INDEX_SS = 3
    const INDEX_FE = 10
    const INDEX_KR = 11
    const INDEX_FR = 12
    const INDEX_OR = 13
    const INDEX_FU = 14
    const INDEX_AU = 15
    const INDEX_FEL = 20
    const INDEX_KRL = 22
    const INDEX_FRL = 23
    const INDEX_ORL = 24
    const INDEX_FUL = 25
    const INDEX_AUL = 26
    const INDEX_KKW = 30
    const INDEX_FKW = 31
    const INDEX_RSF = 40
    const INDEX_VTS = 41
    const INDEX_SPA = 42
    const INDEX_FWA = 43
    const INDEX_HP = 50
    const INDEX_HZ = 51
    const INDEX_BA = 52
    const INDEX_GDZ = 60
    const INDEX_KRE = 61
    const INDEX_WER = 62
    const INDEX_REC = 63


    const RES_FE = 0
    const RES_KR = 1
    const RES_FR = 2
    const RES_OR = 3
    const RES_FU = 4
    const RES_AU = 5

    var select
    var parent
    var input_lvl

    let nIntervId
    let nCheckInt

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
            nIntervId = setInterval(checkPageLoaded, 700);
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
        if (window.innerWidth > 600) select.style.fontSize = "17px";
        else select.style.fontSize = "12px";
        select.addEventListener ("change", function () {
            updateTable1()
        })

        var optionGroup_haupt = document.createElement('OPTGROUP')
        optionGroup_haupt.label = "Hauptgebäude"
        var optionGroup_res = document.createElement('OPTGROUP')
        optionGroup_res.label = "Rohstoffgebäude"
        var optionGroup_lager = document.createElement('OPTGROUP')
        optionGroup_lager.label = "Lagergebäude"
        var optionGroup_energie = document.createElement('OPTGROUP')
        optionGroup_energie.label = "Energiegebäude"
        var optionGroup_rsf = document.createElement('OPTGROUP')
        optionGroup_rsf.label = "Raumschiff- und Verteidigungsgebäude"
        var optionGroup_handel = document.createElement('OPTGROUP')
        optionGroup_handel.label = "Handelsgebäude"
        var optionGroup_special = document.createElement('OPTGROUP')
        optionGroup_special.label = "Special Building"

        for (var i= 0; i < 10; i++) {
            if(build[i]!=null){
                var option = document.createElement("option");
                option.value = i
                option.text = build[i][STRING]
                optionGroup_haupt.appendChild(option);
            }

        }
        select.appendChild(optionGroup_haupt)

        for ( i= 10; i < 20; i++) {
            if(build[i]!=null){
                option = document.createElement("option");
                option.value = i
                option.text = build[i][STRING]
                optionGroup_res.appendChild(option);
            }

        }
        select.appendChild(optionGroup_res)

        for ( i= 20; i < 30; i++) {
            if(build[i]!=null){
                option = document.createElement("option");
                option.value = i
                option.text = build[i][STRING]
                optionGroup_lager.appendChild(option);
            }

        }
        select.appendChild(optionGroup_lager)

        for ( i= 30; i < 40; i++) {
            if(build[i]!=null){
                option = document.createElement("option");
                option.value = i
                option.text = build[i][STRING]
                optionGroup_energie.appendChild(option);
            }

        }
        select.appendChild(optionGroup_energie)

        for ( i= 40; i < 50; i++) {
            if(build[i]!=null){
                option = document.createElement("option");
                option.value = i
                option.text = build[i][STRING]
                optionGroup_rsf.appendChild(option);
            }

        }
        select.appendChild(optionGroup_rsf)

        for ( i= 50; i < 60; i++) {
            if(build[i]!=null){
                option = document.createElement("option");
                option.value = i
                option.text = build[i][STRING]
                optionGroup_handel.appendChild(option);
            }

        }
        //select.appendChild(optionGroup_handel)

        for ( i= 60; i < 70; i++) {
            if(build[i]!=null){
                option = document.createElement("option");
                option.value = i
                option.text = build[i][STRING]
                optionGroup_special.appendChild(option);
            }

        }
        //select.appendChild(optionGroup_special)
        select.value = 1

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

        var btn3 = document.createElement("a");
        btn3.classList.add("formButtonNewMessage")
        btn3.innerHTML = "Fordern +"
        btn3.setAttribute("style", "float: none");
        btn3.addEventListener("click", setTradePlus, false);


        parent.appendChild(div)
        div.appendChild(document.createElement("p"))
        generateSelector()

        if (window.innerWidth > 600) div.appendChild(generate_tableWide(1))
        else div.appendChild(generate_tableNarrow(1))
        div.appendChild(btn3)
        div.appendChild(btn)
        div.appendChild(btn2)

    }

    function generate_tableWide(id) {

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
                    cellText = document.createTextNode(window.$.number( currentRes[RES_FE], 0, ',', '.'));
                }
                if(j == 3 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "kristallVariable"
                    cell.id = "tab_res_kr"
                    cellText = document.createTextNode(window.$.number( currentRes[RES_KR], 0, ',', '.'));
                }
                if(j == 4 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "frubinVariable"
                    cell.id = "tab_res_fr"
                    cellText = document.createTextNode(window.$.number( currentRes[RES_FR], 0, ',', '.'));
                }
                if(j == 5 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "orizinVariable"
                    cell.id = "tab_res_or"
                    cellText = document.createTextNode(window.$.number( currentRes[RES_OR], 0, ',', '.'));
                }
                if(j == 6 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "frurozinVariable"
                    cell.id = "tab_res_fu"
                    cellText = document.createTextNode(window.$.number( currentRes[RES_FU], 0, ',', '.'));
                }
                if(j == 7 && i == 1){
                    cell = document.createElement("td");
                    cell.classList = "goldVariable"
                    cell.id = "tab_res_au"
                    cellText = document.createTextNode(window.$.number( currentRes[RES_AU], 0, ',', '.'));
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        return tbl
    }

    function generate_tableNarrow(id) {

        updateLvl()

        var tbl1 = document.createElement("table");
        var tbl2 = document.createElement("table");
        var tbl1Body = document.createElement("tbody");
        var tbl2Body = document.createElement("tbody");
        var div = document.createElement("div");

        input_lvl = document.createElement("INPUT");
        input_lvl.setAttribute("style", "width: 50px;");
        input_lvl.type = "number"
        input_lvl.id = "input-lvl"
        input_lvl.value = checkLvl(id)+1
        input_lvl.addEventListener ("change", function () {
            updateTable2()
        })

        var currentRes = build[id][RES](input_lvl.value-1)

        for (var i = 0; i < 4; i++) {
            var row = document.createElement("tr");
            if (i == 0) row.classList = "rohstoffgebaude"
            if (i > 0) row.classList = ""

            for (var j = 0; j < 6; j++) {
                var cell = null
                var cellText = null
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
                if(j == 0 && i == 2){
                    cell = document.createElement("th");
                    cell.classList = "roheisenVariable"
                    cellText = document.createTextNode("Roheisen");
                }
                if(j == 1 && i == 2){
                    cell = document.createElement("th");
                    cell.classList = "kristallVariable"
                    cellText = document.createTextNode("Kristall");
                }
                if(j == 2 && i == 2){
                    cell = document.createElement("th");
                    cell.classList = "frubinVariable"
                    cellText = document.createTextNode("Frubin");
                }
                if(j == 3 && i == 2){
                    cell = document.createElement("th");
                    cell.classList = "orizinVariable"
                    cellText = document.createTextNode("Orizin");
                }
                if(j == 4 && i == 2){
                    cell = document.createElement("th");
                    cell.classList = "frurozinVariable"
                    cellText = document.createTextNode("Frurozin");
                }
                if(j == 5 && i == 2){
                    cell = document.createElement("th");
                    cell.classList = "goldVariable"
                    cellText = document.createTextNode("Gold");
                }
                if(j == 6 && i == 2){
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

                if(j == 0 && i == 3){
                    cell = document.createElement("td");
                    cell.classList = "roheisenVariable"
                    cell.id = "tab_res_fe"
                    cellText = document.createTextNode(window.$.number( currentRes[RES_FE], 0, ',', '.'));
                }
                if(j == 1 && i == 3){
                    cell = document.createElement("td");
                    cell.classList = "kristallVariable"
                    cell.id = "tab_res_kr"
                    cellText = document.createTextNode(window.$.number( currentRes[RES_KR], 0, ',', '.'));
                }
                if(j == 2 && i == 3){
                    cell = document.createElement("td");
                    cell.classList = "frubinVariable"
                    cell.id = "tab_res_fr"
                    cellText = document.createTextNode(window.$.number( currentRes[RES_FR], 0, ',', '.'));
                }
                if(j == 3 && i == 3){
                    cell = document.createElement("td");
                    cell.classList = "orizinVariable"
                    cell.id = "tab_res_or"
                    cellText = document.createTextNode(window.$.number( currentRes[RES_OR], 0, ',', '.'));
                }
                if(j == 4 && i == 3){
                    cell = document.createElement("td");
                    cell.classList = "frurozinVariable"
                    cell.id = "tab_res_fu"
                    cellText = document.createTextNode(window.$.number( currentRes[RES_FU], 0, ',', '.'));
                }
                if(j == 5 && i == 3){
                    cell = document.createElement("td");
                    cell.classList = "goldVariable"
                    cell.id = "tab_res_au"
                    cellText = document.createTextNode(window.$.number( currentRes[RES_AU], 0, ',', '.'));
                }

                if(cell != null)cell.appendChild(cellText);
                if(cell != null)row.appendChild(cell);
            }
            if(i > 1) tbl2Body.appendChild(row);
            if(i <=1) tbl1Body.appendChild(row);
        }
        tbl1.appendChild(tbl1Body)
        tbl2.appendChild(tbl2Body);
        div.appendChild(tbl1)
        div.appendChild(tbl2)
        return div
}

    function checkLvl(id){
        if (build[id][LW_ID] == window.BuildingNumber || build[id][LW_ID] == window.BuildingNumber2) return build[id][LVL] + 1
        return build[id][LVL]
    }

    function updateTable1(){
        updateLvl()
        var id = select.value
        var currentRes = build[id][RES](checkLvl(id))
        document.getElementById("input-lvl").value = checkLvl(id)+1
        document.getElementById("tab_res_fe").innerText = window.$.number(currentRes[RES_FE], 0, ',', '.')
        document.getElementById("tab_res_kr").innerText = window.$.number(currentRes[RES_KR], 0, ',', '.')
        document.getElementById("tab_res_fr").innerText = window.$.number(currentRes[RES_FR], 0, ',', '.')
        document.getElementById("tab_res_or").innerText = window.$.number(currentRes[RES_OR], 0, ',', '.')
        document.getElementById("tab_res_fu").innerText = window.$.number(currentRes[RES_FU], 0, ',', '.')
        document.getElementById("tab_res_au").innerText = window.$.number(currentRes[RES_AU], 0, ',', '.')
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
        updateLvl()
        var id = select.value
        var lvl_input = document.getElementById("input-lvl").value
        if(lvl_input < 1) {
            document.getElementById("input-lvl").value = 1
            lvl_input = 1
        }
        var currentRes = build[id][RES](lvl_input-1)
        document.getElementById("tab_res_fe").innerText = window.$.number(currentRes[RES_FE], 0, ',', '.')
        document.getElementById("tab_res_kr").innerText = window.$.number(currentRes[RES_KR], 0, ',', '.')
        document.getElementById("tab_res_fr").innerText = window.$.number(currentRes[RES_FR], 0, ',', '.')
        document.getElementById("tab_res_or").innerText = window.$.number(currentRes[RES_OR], 0, ',', '.')
        document.getElementById("tab_res_fu").innerText = window.$.number(currentRes[RES_FU], 0, ',', '.')
        document.getElementById("tab_res_au").innerText = window.$.number(currentRes[RES_AU], 0, ',', '.')
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
        var id = select.value
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

    function setTradePlus(){
        var id = select.value
        var reserve = 10
        var currentRes = build[id][RES](document.getElementById("input-lvl").value-1)
        var trade_FE = Math.ceil(currentRes[RES_FE]*(1+window.lose/100)-(window.Roheisen)-window.getResourcePerHour()[0].roheisen)
        var trade_KR = Math.ceil(currentRes[RES_KR]*(1+window.lose/100)-(window.Kristall)-window.getResourcePerHour()[0].kristall)
        var trade_FR = Math.ceil(currentRes[RES_FR]*(1+window.lose/100)-(window.Frubin)-window.getResourcePerHour()[0].frubin)
        var trade_OR = Math.ceil(currentRes[RES_OR]*(1+window.lose/100)-(window.Orizin)-window.getResourcePerHour()[0].orizin)
        var trade_FU = Math.ceil(currentRes[RES_FU]*(1+window.lose/100)-(window.Frurozin)-window.getResourcePerHour()[0].frurozin)
        var trade_AU = Math.ceil(currentRes[RES_AU]*(1+window.lose/100)-(window.Gold)-window.getResourcePerHour()[0].gold)
        if(trade_FE > 0) {document.getElementById("his_eisen").value = trade_FE + reserve} else document.getElementById("his_eisen").value = 0
        if(trade_KR > 0) {document.getElementById("his_kristall").value = trade_KR + reserve} else document.getElementById("his_kristall").value = 0
        if(trade_FR > 0) {document.getElementById("his_frubin").value = trade_FR + reserve} else document.getElementById("his_frubin").value = 0
        if(trade_OR > 0) {document.getElementById("his_orizin").value = trade_OR + reserve} else document.getElementById("his_orizin").value = 0
        if(trade_FU > 0) {document.getElementById("his_frurozin").value = trade_FU + reserve} else document.getElementById("his_frurozin").value = 0
        if(trade_AU > 0) {document.getElementById("his_gold").value = trade_AU + reserve} else document.getElementById("his_gold").value = 0
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
        var id = select.value
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
        build[INDEX_HQ][LVL] = window.lvlHauptquartier
        build[INDEX_BZ][LVL] = window.lvlBauzentrale
        build[INDEX_FZ][LVL] = window.lvlForschungszentrale
        build[INDEX_SS][LVL] = window.lvlSpionagestation
        build[INDEX_FE][LVL] = window.lvlRoheisen
        build[INDEX_KR][LVL] = window.lvlKristall
        build[INDEX_FR][LVL] = window.lvlFrubin
        build[INDEX_OR][LVL] = window.lvlOrizin
        build[INDEX_FU][LVL] = window.lvlFrurozin
        build[INDEX_AU][LVL] = window.lvlGold
        build[INDEX_FEL][LVL] = window.lvlRoheisenLager
        build[INDEX_KRL][LVL] = window.lvlKristallLager
        build[INDEX_FRL][LVL] = window.lvlFrubinLager
        build[INDEX_ORL][LVL] = window.lvlOrizinLager
        build[INDEX_FUL][LVL] = window.lvlFrurozinLager
        build[INDEX_AUL][LVL] = window.lvlGoldLager
        build[INDEX_KKW][LVL] = window.lvlKernkraftwerk
        build[INDEX_FKW][LVL] = window.lvlFusionskraftwerk
        build[INDEX_RSF][LVL] = window.lvlRaumschiffFabrik
        build[INDEX_VTS][LVL] = window.lvlVerteidigungsstation
        build[INDEX_SPA][LVL] = window.lvlVerteidigungsstation
        build[INDEX_FWA][LVL] = window.lvlFruhwarnanlage
        build[INDEX_HP][LVL] = window.lvlHandelsposten
        build[INDEX_HZ][LVL] = window.lvlHandelszentrum
        build[INDEX_BA][LVL] = window.lvlBank
        build[INDEX_GDZ][LVL] = window.lvlGeheimdienstzentrum
        build[INDEX_KRE][LVL] = window.lvlKreditinstitut
        build[INDEX_WER][LVL] = window.lvlWerkstatt
        build[INDEX_REC][LVL] = window.lvlRecyclingAnlage
    }



    //   _____________________________
    //  |                             |
    //  |        Notification         |
    //  |_____________________________|

    var beep = new Audio ("https://soundbible.com//mp3/Fuzzy Beep-SoundBible.com-1580329899.mp3")
    var bell = new Audio("https://www.tones7.com/media/sweet_text.mp3")
    var bell2 = new Audio("https://www.tones7.com/media/sweet_text.mp3")
    var alarm = new Audio("https://www.tones7.com/media/emergency_alarm.mp3");

    var bellEnabled = false
    var alarmEnabled = false
    var updateEnabled = false

    if (!nCheckInt) {
            nCheckInt = setInterval(checkForMessages, 1000);
        }

    var idleTime = 0;
    window.$(document).ready(function () {
        var idleInterval = setInterval(timerIncrement, 1000); // 1 Sekunde
        window.$(this).mousemove(function (e) {
            idleTime = 0
        });
        window.$(this).keypress(function (e) {
            idleTime = 0
        });
    });

    function timerIncrement() {
        idleTime = idleTime + 1;
        if (idleTime > 170 + Math.floor(Math.random() * 20) ){ // about 3 minutes
            if(updateEnabled)window.location.reload();
        }
    }

    function checkForMessages(){
        if(document.querySelector("#constructionPageDiv > table:nth-child(1) > tbody > tr:nth-child(3)") != null){
            var freeEnergy = parseInt(window.Energy)
            if (window.lvlKernkraftwerk <= 10 && window.lvlFusionskraftwerk < 1){
                if(freeEnergy >= 5)document.querySelector("#constructionPageDiv > table:nth-child(1) > tbody > tr:nth-child(3)").style.backgroundColor = 'Green'
                if(freeEnergy < 5)document.querySelector("#constructionPageDiv > table:nth-child(1) > tbody > tr:nth-child(3)").style.backgroundColor = 'DarkOrange'
                if(freeEnergy < 2)document.querySelector("#constructionPageDiv > table:nth-child(1) > tbody > tr:nth-child(3)").style.backgroundColor = 'Red'
            }
            if(window.lvlFusionskraftwerk > 0){
                if(freeEnergy >= 20)document.querySelector("#constructionPageDiv > table:nth-child(1) > tbody > tr:nth-child(3)").style.backgroundColor = 'Green'
                if(freeEnergy < 20)document.querySelector("#constructionPageDiv > table:nth-child(1) > tbody > tr:nth-child(3)").style.backgroundColor = 'DarkOrange'
                if(freeEnergy < 3)document.querySelector("#constructionPageDiv > table:nth-child(1) > tbody > tr:nth-child(3)").style.backgroundColor = 'Red'

            }
            var freeSlots = window.number_of_slots - window.number_of_buildings
            if(freeSlots >= 5)document.querySelector("#constructionPageDiv > table:nth-child(1) > tbody > tr:nth-child(4)").style.backgroundColor = 'Green'
            if(freeSlots < 5)document.querySelector("#constructionPageDiv > table:nth-child(1) > tbody > tr:nth-child(4)").style.backgroundColor = 'DarkOrange'
            if(freeSlots < 2)document.querySelector("#constructionPageDiv > table:nth-child(1) > tbody > tr:nth-child(4)").style.backgroundColor = 'Red'
        }


        if(document.getElementById("system_message") == null) return
        if(document.getElementById("system_message").getElementsByTagName("td").length > 0){
            if(idleTime > 10 && bellEnabled){
                bellEnabled = false
                playBell()
                setTimeout(playBell2,700)
                setTimeout(bellEnable,8000)
            }
        }
        if(document.getElementById("attaksInfo") != null){
            var e = document.getElementsByClassName("attaksInfo")[0]
            e = document.getElementById("attaksInfo")
            var clock = e.getElementsByClassName("popover")
            if(clock == null) return
            var clock_str = clock[0].innerText
            var time = new Date("1970-01-01 " + clock_str);
            if (time.getMinutes() < 4 && time.getHours() < 1 && idleTime > 5) startAlarm()
        }
    }


    function startAlarm(){
        if(alarmEnabled){
            alarm.play()
            alarmEnabled = false
            setTimeout(stopAlarm,3600)
        }
    }

    function stopAlarm(){
        alarm.pause();
        alarm.currentTime = 0;
        setTimeout(enableAlarm,10000)
    }

    function enableAlarm(){
        alarmEnabled = true
    }
    function bellEnable(){
        bellEnabled = true
    }

    function playBell(){
        bell.play()
    }
    function playBell2(){
        bell2.play()
    }





    //   _____________________________
    //  |                             |
    //  |       Error Blocker         |
    //  |_____________________________|


    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//cdn.jsdelivr.net/npm/sweetalert2@11';

    document.head.appendChild(script);

    addJS_Node (null, null, overrideSelectNativeJS_Functions);

    function overrideSelectNativeJS_Functions () {
        window.alert = function alert (message) {
            if(message.includes("error"))return
            window.Swal.fire({
                text: message,
                color: '#62C4CC',
                background: '#01141D',
                confirmButtonColor: '#173D47'
            })
            console.log(message)
        }
    }

    function addJS_Node (text, s_URL, funcToRun) {
        var D = document;
        var scriptNode = D.createElement ('script');
        scriptNode.type = "text/javascript";
        if (text) scriptNode.textContent = text;
        if (s_URL) scriptNode.src = s_URL;
        if (funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')()';

        var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
        targ.appendChild (scriptNode);
    }

    //   ________________________________
    //  |                                |
    //  |  Energy & Buldingslot Display  |
    //  |________________________________|


    function optimizeFirstPage(){
        document.querySelector("#ubersicht")
        try{
            setTimeout(function e(){
                document.querySelector("#uberPageDiv > table:nth-child(6) > tbody > tr:nth-child(5)").remove()
                document.querySelector("#uberPageDiv > table:nth-child(6) > tbody > tr:nth-child(5)").remove()
                var freeEnergy = parseInt(window.Energy)
                if (window.lvlKernkraftwerk <= 10 && window.lvlFusionskraftwerk < 1){
                    if(freeEnergy >= 5)document.querySelector("#uberPageDiv > table:nth-child(6) > tbody > tr:nth-child(3)").backgroundColor = 'Green'
                    if(freeEnergy < 5)document.querySelector("#uberPageDiv > table:nth-child(6) > tbody > tr:nth-child(3)").style.backgroundColor = 'DarkOrange'
                    if(freeEnergy < 2)document.querySelector("#uberPageDiv > table:nth-child(6) > tbody > tr:nth-child(3)").style.backgroundColor = 'Red'
                }
                if(window.lvlFusionskraftwerk > 0){
                    if(freeEnergy >= 20)document.querySelector("#uberPageDiv > table:nth-child(6) > tbody > tr:nth-child(3)").style.backgroundColor = 'Green'
                    if(freeEnergy < 20)document.querySelector("#uberPageDiv > table:nth-child(6) > tbody > tr:nth-child(3)").style.backgroundColor = 'DarkOrange'
                    if(freeEnergy < 3)document.querySelector("#uberPageDiv > table:nth-child(6) > tbody > tr:nth-child(3)").style.backgroundColor = 'Red'

                }
                var freeSlots = window.number_of_slots - window.number_of_buildings
                if(freeSlots >= 5)document.querySelector("#uberPageDiv > table:nth-child(6) > tbody > tr:nth-child(4)").style.backgroundColor = 'Green'
                if(freeSlots < 5)document.querySelector("#uberPageDiv > table:nth-child(6) > tbody > tr:nth-child(4)").style.backgroundColor = 'DarkOrange'
                if(freeSlots < 2)document.querySelector("#uberPageDiv > table:nth-child(6) > tbody > tr:nth-child(4)").style.backgroundColor = 'Red'
            },1000)
        }
        catch(e){
            console.log("fdsafds")
        }
    }
    optimizeFirstPage()
    document.querySelector("#ubersicht").addEventListener("click", optimizeFirstPage)

    //   ________________________________
    //  |                                |
    //  |           Database             |
    //  |________________________________|


    var build = new Array()
    const LW_ID = 0
    const STRING = 1
    const LVL = 2
    const RES = 3

    build[INDEX_HQ] = new Array()
    build[INDEX_BZ] = new Array()
    build[INDEX_FZ] = new Array()
    build[INDEX_SS] = new Array()
    build[INDEX_FE] = new Array()
    build[INDEX_KR] = new Array()
    build[INDEX_FR] = new Array()
    build[INDEX_OR] = new Array()
    build[INDEX_FU] = new Array()
    build[INDEX_AU] = new Array()
    build[INDEX_FEL] = new Array()
    build[INDEX_KRL] = new Array()
    build[INDEX_FRL] = new Array()
    build[INDEX_ORL] = new Array()
    build[INDEX_FUL] = new Array()
    build[INDEX_AUL] = new Array()
    build[INDEX_KKW] = new Array()
    build[INDEX_FKW] = new Array()
    build[INDEX_RSF] = new Array()
    build[INDEX_VTS] = new Array()
    build[INDEX_SPA] = new Array()
    build[INDEX_FWA] = new Array()
    build[INDEX_HP] = new Array()
    build[INDEX_HZ] = new Array()
    build[INDEX_BA] = new Array()
    build[INDEX_GDZ] = new Array()
    build[INDEX_KRE] = new Array()
    build[INDEX_WER] = new Array()
    build[INDEX_REC] = new Array()

    build[INDEX_HQ][LW_ID] = HAUPTQUARTIER
    build[INDEX_BZ][LW_ID] = BAUZENTRALE
    build[INDEX_FZ][LW_ID] = FORSCHUNG
    build[INDEX_SS][LW_ID] = SPIOSTATION
    build[INDEX_FE][LW_ID] = ROHEISEN
    build[INDEX_KR][LW_ID] = KRISTALL
    build[INDEX_FR][LW_ID] = FRUBIN
    build[INDEX_OR][LW_ID] = ORIZIN
    build[INDEX_FU][LW_ID] = FUROZIN
    build[INDEX_AU][LW_ID] = GOLD
    build[INDEX_FEL][LW_ID] = EISENLAGER
    build[INDEX_KRL][LW_ID] = KRISLAGER
    build[INDEX_FRL][LW_ID] = FRUBLAGER
    build[INDEX_ORL][LW_ID] = ORILAGER
    build[INDEX_FUL][LW_ID] = FUROLAGER
    build[INDEX_AUL][LW_ID] = GOLDLAGER
    build[INDEX_KKW][LW_ID] = KERNKRAFTWERK
    build[INDEX_FKW][LW_ID] = FUSIONSKRAFTWERK
    build[INDEX_RSF][LW_ID] = WERFT
    build[INDEX_VTS][LW_ID] = VERTEIDIGUNG
    build[INDEX_SPA][LW_ID] = SPIOABWEHR
    build[INDEX_FWA][LW_ID] = FRUHWARN
    build[INDEX_HP][LW_ID] = HANDELSPOSTEN
    build[INDEX_HZ][LW_ID] = HANDELSZENTRUM
    build[INDEX_BA][LW_ID] = BANKK
    build[INDEX_GDZ][LW_ID] = GEHEIMDIENST
    build[INDEX_KRE][LW_ID] = KREDIT
    build[INDEX_WER][LW_ID] = WERKSTATT
    build[INDEX_REC][LW_ID] = RECYCLING


    build[INDEX_HQ][STRING] = "Hauptquartier"
    build[INDEX_BZ][STRING] = "Bauzentrale"
    build[INDEX_FZ][STRING] = "Forschungszentrale"
    build[INDEX_SS][STRING] = "Spionagestation"
    build[INDEX_FE][STRING] = "Roheisen Mine"
    build[INDEX_KR][STRING] = "Kristall Förderungsanlage"
    build[INDEX_FR][STRING] = "Frubin Sammler"
    build[INDEX_OR][STRING] = "Orizin Gewinnungsanlage"
    build[INDEX_FU][STRING] = "Frurozin Herstellung"
    build[INDEX_AU][STRING] = "Gold Mine"
    build[INDEX_FEL][STRING] = "Roheisen Lager"
    build[INDEX_KRL][STRING] = "Kristall Lager"
    build[INDEX_FRL][STRING] = "Frubin Lager"
    build[INDEX_ORL][STRING] = "Orizin Lager"
    build[INDEX_FUL][STRING] = "Frurozin Lager"
    build[INDEX_AUL][STRING] = "Gold Lager"
    build[INDEX_KKW][STRING] = "Kernkraftwerk"
    build[INDEX_FKW][STRING] = "Fusionskraftwerk"
    build[INDEX_RSF][STRING] = "Raumschiff Fabrik"
    build[INDEX_VTS][STRING] = "Verteidigungsstation"
    build[INDEX_SPA][STRING] = "Spionageabwehr"
    build[INDEX_FWA][STRING] = "Frühwarnanlage"
    build[INDEX_HP][STRING] = "Handelsposten"
    build[INDEX_HZ][STRING] = "Handelszentrum"
    build[INDEX_BA][STRING] = "Bank"
    build[INDEX_GDZ][STRING] = "Geheimdienstzentrum"
    build[INDEX_KRE][STRING] = "Kreditinstitut"
    build[INDEX_WER][STRING] = "Werkstatt"
    build[INDEX_REC][STRING] = "Recycling Anlage"

    build[INDEX_HQ][RES] = ress_HQ
    build[INDEX_BZ][RES] = ress_BZ
    build[INDEX_FZ][RES] = ress_FZ
    build[INDEX_SS][RES] = ress_SS
    build[INDEX_FE][RES] = ress_FE
    build[INDEX_KR][RES] = ress_KR
    build[INDEX_FR][RES] = ress_FR
    build[INDEX_OR][RES] = ress_OR
    build[INDEX_FU][RES] = ress_FU
    build[INDEX_AU][RES] = ress_AU
    build[INDEX_FEL][RES] = ress_FEL
    build[INDEX_KRL][RES] = ress_KRL
    build[INDEX_FRL][RES] = ress_FRL
    build[INDEX_ORL][RES] = ress_ORL
    build[INDEX_FUL][RES] = ress_FUL
    build[INDEX_AUL][RES] = ress_AUL
    build[INDEX_KKW][RES] = ress_KKW
    build[INDEX_FKW][RES] = ress_FKW
    build[INDEX_RSF][RES] = ress_RSF
    build[INDEX_VTS][RES] = ress_VTS
    build[INDEX_SPA][RES] = ress_SPA
    build[INDEX_FWA][RES] = ress_FWA
    build[INDEX_HP][RES] = ress_HP
    build[INDEX_HZ][RES] = ress_HZ
    build[INDEX_BA][RES] = ress_BA
    build[INDEX_GDZ][RES] = ress_GDZ
    build[INDEX_KRE][RES] = ress_KRE
    build[INDEX_WER][RES] = ress_WER
    build[INDEX_REC][RES] = ress_REC

    updateLvl()

    function ress_HQ(lvl){
        var res = new Array()
        res[RES_FE] = 320*(parseInt(lvl)+1)+80
        res[RES_KR] = 120*(parseInt(lvl)+1)+30
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

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

        function ress_FZ(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(400*(1+(parseInt(lvl)+1)*0.8))
        res[RES_KR] = 0
        res[RES_FR] = Math.round(100*(1+(parseInt(lvl)+1)*0.8))
        res[RES_OR] = Math.round(100*(1+(parseInt(lvl)+1)*0.8))
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

        function ress_SS(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(750*(1+(parseInt(lvl)+1)*0.8))
        res[RES_KR] = 0
        res[RES_FR] = Math.round(500*(1+(parseInt(lvl)+1)*0.8))
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

    function ress_FEL(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(Math.pow((parseInt(lvl)+1)*400/20, 2)+400)
        res[RES_KR] = 0
        res[RES_FR] = Math.round(Math.pow((parseInt(lvl)+1)*300/20, 2)+300)
        res[RES_OR] = 0
        res[RES_FU] = Math.round(Math.pow((parseInt(lvl)+1)*140/20, 2)+140)
        res[RES_AU] = 0
        return res
    }

    function ress_KRL(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(Math.pow((parseInt(lvl)+1)*350/20, 2)+350)
        res[RES_KR] = Math.round(Math.pow((parseInt(lvl)+1)*150/20, 2)+150)
        res[RES_FR] = Math.round(Math.pow((parseInt(lvl)+1)*300/20, 2)+300)
        res[RES_OR] = 0
        res[RES_FU] = Math.round(Math.pow((parseInt(lvl)+1)*80/20, 2)+80)
        res[RES_AU] = 0
        return res
    }

    function ress_FRL(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(Math.pow((parseInt(lvl)+1)*350/20, 2)+350)
        res[RES_KR] = 0
        res[RES_FR] = Math.round(Math.pow((parseInt(lvl)+1)*350/20, 2)+350)
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_ORL(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(Math.pow((parseInt(lvl)+1)*400/20, 2)+400)
        res[RES_KR] = 0
        res[RES_FR] = Math.round(Math.pow((parseInt(lvl)+1)*300/20, 2)+300)
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_FUL(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(Math.pow((parseInt(lvl)+1)*350/20, 2)+350)
        res[RES_KR] = 0
        res[RES_FR] = Math.round(Math.pow((parseInt(lvl)+1)*350/20, 2)+350)
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_AUL(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(Math.pow((parseInt(lvl)+1)*25/1, 2)+500)
        res[RES_KR] = 0
        res[RES_FR] = Math.round(Math.pow((parseInt(lvl)+1)*17.5/1, 2)+350)
        res[RES_OR] = 0
        res[RES_FU] = Math.round(Math.pow((parseInt(lvl)+1)*7.5/1, 2)+150)
        res[RES_AU] = 0
        return res
    }

    function ress_KKW(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(150*(1+parseInt(lvl)*0.8))
        res[RES_KR] = Math.round(500*(1+parseInt(lvl)*0.8))
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_FKW(lvl){
        var res = new Array()
        if(lvl == 0){
            res[RES_FE] = 25000
            res[RES_KR] = 40000
            res[RES_FR] = 20000
        }
        else{
            res[RES_FE] = (parseInt(lvl) + 1)*20000+25000
            res[RES_KR] = (parseInt(lvl) + 1)*32000+40000
            res[RES_FR] = (parseInt(lvl) + 1)*16000+20000
        }
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_RSF(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(4000*(1+(parseInt(lvl)+1)*0.8))
        res[RES_KR] = Math.round(350*(1+(parseInt(lvl)+1)*0.8))
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = Math.round(3000*(1+(parseInt(lvl)+1)*0.8))
        res[RES_AU] = 0
        return res
    }

    function ress_VTS(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(3250*(1+(parseInt(lvl)+1)*0.8))
        res[RES_KR] = Math.round(250*(1+(parseInt(lvl)+1)*0.8))
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = Math.round(2000*(1+(parseInt(lvl)+1)*0.8))
        res[RES_AU] = 0
        return res
    }

    function ress_SPA(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(750*(1+(parseInt(lvl)+1)*0.8))
        res[RES_KR] = 0
        res[RES_FR] = Math.round(500*(1+(parseInt(lvl)+1)*0.8))
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_FWA(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(502*(parseInt(lvl)+1)*(parseInt(lvl)+1)+560)
        res[RES_KR] = Math.round(1024*(parseInt(lvl)+1)*(parseInt(lvl)+1)+800)
        res[RES_FR] = Math.round(1296*(parseInt(lvl)+1)*(parseInt(lvl)+1)+900)
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_HP(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(7200*(1+parseInt(lvl)*0.8))
        res[RES_KR] = Math.round(1000*(1+parseInt(lvl)*0.8))
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = Math.round(5400*(1+parseInt(lvl)*0.8))
        res[RES_AU] = 0
        return res
    }

    function ress_HZ(lvl){
        var res = new Array()
        res[RES_FE] = Math.round(6000*Math.pow(2,parseInt(lvl)/2))
        res[RES_KR] = Math.round(2250*Math.pow(2,parseInt(lvl)/2))
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = Math.round(3250*Math.pow(2,parseInt(lvl)/2))
        res[RES_AU] = 0
        return res
    }

    function ress_BA(lvl){
        var res = new Array()
        if(lvl == 0){
            res[RES_FE] = 4500
            res[RES_KR] = 2000
            res[RES_FU] = 3500
        }
        else{
            res[RES_FE] = Math.round(12656.25*Math.pow((parseInt(lvl) + 1), 2) + 4500)
            res[RES_KR] = Math.round(2500*Math.pow((parseInt(lvl) + 1), 2) + 2000)
            res[RES_FU] = Math.round(7656.25*Math.pow((parseInt(lvl) + 1), 2) + 3500)
        }
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_GDZ(lvl){
        var res = new Array()
        if(lvl == 0){
            res[RES_FE] = 8000
            res[RES_KR] = 4000
            res[RES_FR] = 12000
            res[RES_OR] = 4000
        }
        else{
            res[RES_FE] = parseInt(lvl) + 1)*6400+8000
            res[RES_KR] = parseInt(lvl) + 1)*3200+4000
            res[RES_FR] = parseInt(lvl) + 1)*9600+12000
            res[RES_OR] = parseInt(lvl) + 1)*3200+4000
        }
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_KRE(lvl){
        var res = new Array()
        if(lvl == 0){
            res[RES_FE] = 30000
            res[RES_KR] = 25000
            res[RES_OR] = 7000
        }
        else{
            res[RES_FE] = parseInt(lvl) + 1)*24000+30000
            res[RES_KR] = parseInt(lvl) + 1)*20000+25000
            res[RES_OR] = parseInt(lvl) + 1)*5600+7000
        }
        res[RES_FR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_WER(lvl){
        var res = new Array()
        res[RES_FE] = 0
        res[RES_KR] = 0
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

    function ress_REC(lvl){
        var res = new Array()
        res[RES_FE] = 0
        res[RES_KR] = 0
        res[RES_FR] = 0
        res[RES_OR] = 0
        res[RES_FU] = 0
        res[RES_AU] = 0
        return res
    }

})();
