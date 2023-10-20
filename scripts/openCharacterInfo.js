var data

window.onload = async function displayCharacterInfo(){
    const urlParams = new URLSearchParams(window.location.search);  

    const dataset = urlParams.get('dataset');
    console.log(dataset);

    const index = urlParams.get('index');
    console.log(index);

    await FetchData(dataset,index)

    document.getElementById("characterName").innerHTML=data.name
    document.getElementById("characterRace").innerHTML="Race: "+data.race
    
}

async function FetchData(dataset,index){
    try {
        await fetch("../"+dataset).then(response => {if (!response.ok) { throw new Error("HTTP error " + response.status);}return response.json();}).then(json => {data = json[index];})
        console.log(data)
    }catch (e) {
        console.error(e,e.stack);
    }
}
