notiekLabosana = false;
// no faila lasaPulcinuSarakstu.js

async function labotPulcinuA(pulcins) {
    fetch('/api/visipulcini')
        .then(res => res.json())
        .then(data => { ieliktTabula(data); })
}


// funkcija pulciņa lauku nolasīšanai un atvēršanai labošanas skatā.
async function labotPulcinu(pulcins) {
    notiekLabosana = true;
    let request = await fetch('/api/atvertlabosanai/' + pulcins,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });



    let pulcDati = await request.json();
    document.getElementById("pulcinuTabula").style = "display:none";
    
    document.getElementById("labosanasSkats").innerHTML = pulcDati.lapa;

    document.getElementById("iCentrs").value = pulcDati.iicnosaukums;
    document.getElementById("nosaukums").value = pulcDati.nosaukums;
    document.getElementById("joma").value = pulcDati.joma;
    document.getElementById("adrese").value = pulcDati.adrese;
    document.getElementById("stunduSkaits").value = pulcDati.stunduSkaits;
    document.getElementById("vecumsNo").value = pulcDati.vecums.no;
    document.getElementById("vecumsLidz").value = pulcDati.vecums.lidz;
    document.getElementById("maxAudzekni").value = pulcDati.maxAudzekni;
    document.getElementById("skolotajs").value = pulcDati.skolotajs;
    document.getElementById("epasts").value = pulcDati.epasts;
    document.getElementById("talrunis").value = pulcDati.talrunis;

    var visiLaiki = pulcDati.laiks;
    console.log(visiLaiki);

    var table = document.getElementById("laiki");

    for (let i = 0; i < visiLaiki.length; i++) {
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var dNos = visiLaiki[i].diena;
        cell1.innerHTML = dNos;        
        cell1.id = dNos;
        cell2.innerHTML = visiLaiki[i].no;
        cell2.id = dNos + 'No';
        cell3.innerHTML = visiLaiki[i].lidz;
        cell3.id = dNos + 'Lidz';
        cell4.innerHTML = '<button type=\'button\' class=\"btn btn-primary\" onclick=\'dzestLaiku(this)\'>x</button>';
    }





    pulcID = pulcDati.id;

}

async function dzestPulcinu(pulcins) {
    if (confirm('Dzēst?')) {
        let request = await fetch('/api/dzestPulcinu/' + pulcins,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

        let atbilde = await request.json();
        alert('Ieraksts izdzēsts');

        location.reload();
    }
}

function ieliktTabula(visiPulcini) {
    pulcDati = visiPulcini;
    let tabulasBody = document.getElementById("tbody");
    let pulcins;
    for (let i = 0; i < visiPulcini.length; i++) {
        let laiks = "";
        pulcins = "<tr><td id=\"" + visiPulcini[i].id + "\">";
        pulcins += visiPulcini[i].id;
        pulcins += "</td><td><input type=\"button\" class=\"btn btn-primary\" onclick=\"labotPulcinu(" + visiPulcini[i].id + ")\" value=\"✎\" data-toggle=\"tooltip\" title=\"Labot\">&nbsp; <input type=\"button\" class=\"btn btn-primary\" value=\"✘\" onclick=\"dzestPulcinu(" + visiPulcini[i].id + ")\" data-toggle=\"tooltip\" title=\"Dzēst\"></td><td name=\"iic\" id=\"iic\">";
        pulcins += visiPulcini[i].iicnosaukums + "</td><td>";
        pulcins += visiPulcini[i].joma + "</td><td>" +
            visiPulcini[i].nosaukums + "</td><td>" +
            visiPulcini[i].stunduSkaits + "</td><td>" +
            visiPulcini[i].vecums.no + "—" + visiPulcini[i].vecums.lidz + "</td><td>" +
            visiPulcini[i].skolotajs + "</td><td>" +
            visiPulcini[i].epasts + "</td><td>" +
            visiPulcini[i].talrunis + "</td><td>" +
            visiPulcini[i].adrese + "</td><td>" +
            visiPulcini[i].maxAudzekni + "</td><td>";
        for (let j = 0; j < visiPulcini[i].laiks.length; j++) {
            laiks += visiPulcini[i].laiks[j].diena + ": " + visiPulcini[i].laiks[j].no + "—" + visiPulcini[i].laiks[j].lidz + "<br>";
        }
        pulcins += laiks + "</td></tr>";
        tabulasBody.innerHTML += pulcins;
    }
}


fetch('/api/visipulcini')
    .then(res => res.json())
    .then(data => { ieliktTabula(data); })

// no faila registracija.js

function registracija() {
    var adrese = document.getElementById("Adrese").value;
    var epasts = document.getElementById("Epasts").value;
    var talrunis = document.getElementById("Talrunis").value;
    var specialists = document.getElementById("Specialists").value;
    var klubs = document.getElementById("Nosaukums").value;
    var vaiJauns = document.getElementById('iicnosauk').value;

    if (vaiJauns == 'jauns' && (adrese == "" || epasts == "" || talrunis == "" || specialists == "")) {
        alert("Visiem laukiem jābūt aizpildītiem");
    }
    else if (vaiJauns == 'jauns') {
        var dict = { adrese: adrese, epasts: epasts, talrunis: talrunis, specialists: specialists, iicnosaukums: klubs };

        fetch('/registret_IIC', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dict)
        })
            .then(atb => atb.json())
            .then(response => {
                console.log(response);
                document.getElementById("iicsaturs").style = "display:none";
                document.getElementById("statuss").innerHTML = response.statuss;
                document.getElementById("pulcins").innerHTML = response.pulcins;
                document.getElementById('iCentrs').value = response.iic;
            });
    }

    else {
        var dict = { iicnosaukums: vaiJauns };
        fetch('/jauns_pulcins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dict)
        })
            .then(atb => atb.json())
            .then(response => {
                document.getElementById("iicsaturs").style = "display:none";
                document.getElementById("pulcins").innerHTML = response.pulcins;
                document.getElementById('iCentrs').value = response.iic;
            });

        // uzreiz vajag atvērt jauna pulciņa skatu
        console.log(1);

    }
}

async function iicNosaukumiRead() {
    fetch('/dati/iic.json', { cache: "no-store" })
        .then(res => res.json())
        .then(json => {
            var visi = json;
            var option = document.createElement("option");
            option.value = 'jauns';
            option.textContent = '--pievienot jaunu--';
            document.getElementById("iicnosauk").appendChild(option);

            for (var i = 0; i < visi.length; i++) {
                var option = document.createElement("option");
                option.value = visi[i].iicnosaukums;
                option.textContent = visi[i].iicnosaukums;
                document.getElementById("iicnosauk").appendChild(option);
            }
        })
}


// no faila sendPulcinaInfo.js

async function nosutitPulcinaInfo() {
    if (notiekLabosana == true) {
        id = pulcID;
        notiekLabosana = false;
    }
    else {
        var id = -1;
    }

    var iicID = -1;
    var iicnosaukums = document.forma.iCentrs.value;
    var joma = document.forma.joma.value;
    var nosaukums = document.forma.nosaukums.value;
    var stunduSkaits = Number(document.forma.stunduSkaits.value);
    var vecumsNo = Number(document.forma.vecumsNo.value);
    var vecumsLidz = Number(document.forma.vecumsLidz.value);
    var skolotajs = document.forma.skolotajs.value;
    var epasts = document.forma.epasts.value;
    var talrunis = document.forma.talrunis.value;
    var adrese = document.forma.adrese.value;
    var maxAudzekni = Number(document.forma.maxAudzekni.value);

    try {
        var pirmdienaNo = document.getElementById('pirmdienaNo').innerHTML;
        var pirmdienaLidz = document.getElementById('pirmdienaLidz').innerHTML;
        console.log(pirmdienaNo, pirmdienaLidz);
    }
    catch (err) {
        var pirmdienaNo = 'none';
    }
    try {
        var otrdienaNo = document.getElementById('otrdienaNo').innerHTML;
        var otrdienaLidz = document.getElementById('otrdienaLidz').innerHTML;
        console.log(otrdienaNo);
    }
    catch (err) {
        var otrdienaNo = 'none';
    }
    try {
        var tresdienaNo = document.getElementById('tresdienaNo').innerHTML;
        var tresdienaLidz = document.getElementById('tresdienaLidz').innerHTML;
    }
    catch (err) {
        var tresdienaNo = 'none';
    }
    try {
        var ceturtdienaNo = document.getElementById('ceturtdienaNo').innerHTML;
        var ceturtdienaLidz = document.getElementById('ceturtdienaLidz').innerHTML;
    }
    catch (err) {
        var ceturtdienaNo = 'none';
    }
    try {
        var piektdienaNo = document.getElementById('piektdienaNo').innerHTML;
        var piektdienaLidz = document.getElementById('piektdienaLidz').innerHTML;
    }
    catch (err) {
        var piektdienaNo = 'none';
    }
    try {
        var sestdienaNo = document.getElementById('sestdienaNo').innerHTML;
        var sestdienaLidz = document.getElementById('sestdienaLidz').innerHTML;
    }
    catch (err) {
        var sestdienaNo = 'none';
    }

    try {
        var svetdienaNo = document.getElementById('svetdienaNo').innerHTML;
        var svetdienaLidz = document.getElementById('svetdienaLidz').innerHTML;
    }
    catch (err) {
        var svetdienaNo = 'none';
    }
    var laiks = [];

    if (pirmdienaNo != "none") {
        laiks.push({ diena: "pirmdiena", no: pirmdienaNo, lidz: pirmdienaLidz })
    }
    if (otrdienaNo != "none") {
        laiks.push({ diena: "otrdiena", no: otrdienaNo, lidz: otrdienaLidz })
    }

    if (tresdienaNo != "none") {
        laiks.push({ diena: "tresdiena", no: tresdienaNo, lidz: tresdienaLidz })
    }
    if (ceturtdienaNo != "none") {
        laiks.push({ diena: "ceturtdiena", no: ceturtdienaNo, lidz: ceturtdienaLidz })
    }
    if (piektdienaNo != "none") {
        laiks.push({ diena: "piektdiena", no: piektdienaNo, lidz: piektdienaLidz })
    }
    if (sestdienaNo != "none") {
        laiks.push({ diena: "sestdiena", no: sestdienaNo, lidz: sestdienaLidz })
    }
    if (svetdienaNo != "none") {
        laiks.push({ diena: "svetdiena", no: svetdienaNo, lidz: svetdienaLidz })
    }

    var dict = {
        id: id, iicID: iicID, iicnosaukums: iicnosaukums, joma: joma, nosaukums: nosaukums, stunduSkaits: stunduSkaits,
        vecums: { no: vecumsNo, lidz: vecumsLidz },
        skolotajs: skolotajs, epasts: epasts, talrunis: talrunis, adrese: adrese, maxAudzekni: maxAudzekni
    };

    dict["laiks"] = laiks;


    var jsonData = JSON.stringify(dict)


    var request = await fetch('/api/jaunsPulcins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonData
    });


    // var atbilde = await request.json();



    alert('Ieraksts saglabāts');
    window.setTimeout(atverSarakstu, 1000);



} // beigas

function pievienotLaiku() {
    var table = document.getElementById("laiki");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var d = document.getElementById('diena');
    var dNos = d.options[d.selectedIndex].text;
    cell1.innerHTML = dNos;
    cell1.id = document.getElementById('diena').id;
    cell2.innerHTML = document.getElementById('No').value;
    cell2.id = document.getElementById('diena').value + document.getElementById('No').id;
    cell3.innerHTML = document.getElementById('Lidz').value;
    cell3.id = document.getElementById('diena').value + document.getElementById('Lidz').id;
    cell4.innerHTML = '<button type=\'button\' class=\"btn btn-primary\" onclick=\'dzestLaiku(this)\'>x</button>';
}


function dzestLaiku(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("laiki").deleteRow(i);
}


function atverSarakstu() {
    location.href = "/pulcinu_saraksts";
}

// no faila vecPietRegistree.js
function vecPietRegistree1() {
    var vecVards = document.getElementById("vec_vards").value;
    var vecUzvards = document.getElementById("vec_uzvards").value;
    var vecEpasts = document.getElementById("vec_epasts").value;
    var vecTelefons = document.getElementById("vec_telefons").value;
    var dzimums = document.getElementById("berns").value;
    var skVards = document.getElementById("sk_vards").value;
    var skUzvards = document.getElementById("sk_uzvards").value;
    var skSkola = document.getElementById("sk_skola").value;
    var skKlase = document.getElementById("sk_klase").value;
    var skPerskods = document.getElementById("sk_perskods").value;
    var skAdrese = document.getElementById("sk_adrese").value;
    var skEpasts = document.getElementById("sk_epasts").value;
    var skTelefons = document.getElementById("sk_telefons").value;

    if (vecVards == "" || vecUzvards == "" || vecTelefons == "" || vecEpasts == "" || skVards == "" || skUzvards == "" || skSkola == "" || skKlase == "" || skPerskods == "" || skAdrese == "" || skEpasts == "" || skTelefons == "")
        alert("Visiem laukiem jābūt aizpildītājiem")
    else
        if (document.getElementById('r1').checked == false) alert("Izlasi noteikumus!")
        else {
            var dict = {
                vecVards: vecVards, vecUzvards: vecUzvards, vecEpasts: vecEpasts, vecTelefons: vecTelefons,
                dzimums: dzimums, skVards: skVards, skUzvards: skUzvards, skSkola: skSkola, skKlase: skKlase,
                skPerskods: skPerskods, skAdrese: skAdrese, skEpasts: skEpasts, skTelefons: skTelefons
            };

            jsonData = JSON.stringify(dict);
            console.log(jsonData);
            if (document.getElementById('r1').checked)
                download(jsonData, 'vecakuPieteikumsSuutiit.txt', 'text/plain');
            alert("Visi dati veiksmīgi saglabāti")
        }
    fetch('https://kalviskincis.github.io/interesu-izglitibas-IS/views/vecakuPieteikumsSuutiit.txt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dict)
    })
        .then(res => res.json())
        .then(data => document.getElementById("zinojumi").innerHTML = "Dati saglabāti")

}


function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}


// no faila vecPietLasa.js
async function lasitTekstu() {
    fetch('../dati/vecaku_pieteikums.txt')
        .then(res => res.json())
        .then(json => { console.log(json); ieliktTekstu(json); })
}

function ieliktTekstu(jsonTxt) {
    let nosaukums = document.getElementById("nosaukums");
    let i = Math.floor(Math.random() * 10);
    if (i >= 9) { i = 0; };
    let rinda = `<tr><td>${jsonTxt[i].nosaukumsIIC}</td> </tr> <tr> <td> Vadītājs: ${jsonTxt[i].direktorsIIC}</td></tr><tr> <td> Tel: ${jsonTxt[i].IICTel} E-pasts: ${jsonTxt[i].IICEpasts}</td></tr>`;
    nosaukums.innerHTML = rinda;
    let nosIzvele = document.getElementById("izvele");
    let rinda2 = "<tr><td> interešu izglītības programmas  - " + jsonTxt[i].jomasNos + " - pulciņā - " + jsonTxt[i].pulcinaNosaukums + " - </tr></td> <tr><td> pie pedagoga " + jsonTxt[i].skolotajaVards + " " + jsonTxt[i].skolotajaUzvards + ". </td></tr>";
    nosIzvele.innerHTML = rinda2;
}

// no datnes ieladetKategorijas.js
function ieladetJomas() {
    jomas = ["---", "💃 Dejas", "🎼 Mūzika", "🎬 Teātra māksla", "⚽️ Sports", "🎨 Vizuālā māksla", "🔧 Tehniskā jaunrade", "🌿 Vides izglītība", "💻 Informācijas tehnoloģijas", "📚 Akadēmiskā izglītība", " ❗ Citas programmas"]
    if (document.getElementById('joma').innerHTML.length == 14) {
        for (var i = 0; i < jomas.length; i++) {
            var option = document.createElement("option");
            option.value = jomas[i];
            option.textContent = jomas[i];
            document.getElementById("joma").appendChild(option);
        }
    }
}