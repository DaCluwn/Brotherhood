var locationsJSON
var factionsJSON

const pathToLocationsData='Data/locations.json'
const pathToFactionsData='Data/organisations.json'

window.onload = async function FillLocationsTable(){
    await FetchData()
    let tableInnerHTMLString="<table><tr> <td> Name of Location </td> <td> Type of location </td> <td> District </td> <td> Influenced by </td> </td> <td> Point of Interest </td> </tr>"
    Object.keys(locationsJSON).forEach(function (loc){
        let loc_type_text=""
        switch(locationsJSON[loc].type){
            case 1: loc_type_text = "Shanty Town"; break;
            default: loc_type_text = "Unrecognised Location Type"
        }
        let loc_dis_text=""
        switch(locationsJSON[loc].district){
            case 1: loc_dis_text = "Norther Elmwood Sprawl"; break;
            default: loc_dis_text = "Unrecognised Location Type"
        }

        tableInnerHTMLString+="<tr><td>"+locationsJSON[loc].loc_name+"</td><td>"+loc_type_text+"</td> <td>"+loc_dis_text+"</td> <td>"+factionsJSON[locationsJSON[loc].influence].name+"</td><td>"+locationsJSON[loc].poi+"</td></tr>"
    });
    tableInnerHTMLString+="</table>"
    document.getElementById("locationsTable").innerHTML = tableInnerHTMLString
}

async function FetchData(){
    try {
        await fetch("../"+pathToLocationsData).then(response => {if (!response.ok) { throw new Error("HTTP error " + response.status);}return response.json();}).then(json => {locationsJSON = json;})
    }catch (e) {
        console.error(e,e.stack);
    }
    try {
        await fetch("../"+pathToFactionsData).then(response => {if (!response.ok) { throw new Error("HTTP error " + response.status);}return response.json();}).then(json => {factionsJSON = json;})
        console.log(factionsJSON)
    }catch (e) {
        console.error(e,e.stack);
    }
}