async function raditNoliktavasDatus(tipsAtlase)
{
 
  let jsonVielas = Array();
  let jsonInventars = Array();

  // if(tipsAtlase==undefined)
  // {
  //   let vielasNoServera = await fetch('/api/v1/vielas');
  //   jsonVielas = await vielasNoServera.json();
  //   jsonVielas = pievienotIerakstuParKategoriju(jsonVielas, 'viela');
  //   //
  //   let inventarsNoServera = await fetch('/api/v1/inventars');
  //   jsonInventars = await inventarsNoServera.json();
  //   jsonInventars = pievienotIerakstuParKategoriju(jsonInventars, 'inventars');
  // }
  // else if(tipsAtlase=='viela')
  // {
    //jsonVielas = await iegutDatusNoApi('/api/v1/vielas');
    let vielasNoServera = await fetch('/api/v1/vielas');
    jsonVielas = await vielasNoServera.json();
    jsonVielas = pievienotIerakstuParKategoriju(jsonVielas, 'viela');
  // }
  // else if(tipsAtlase=='aprikojums')
  // {
  //   //jsonInventars = await iegutDatusNoApi('/api/v1/inventars');
  //   let inventarsNoServera = await fetch('/api/v1/inventars');
  //   jsonInventars = await inventarsNoServera.json();
  //   jsonInventars = pievienotIerakstuParKategoriju(jsonInventars, 'inventars');
  // }


  let datiNoliktava = jsonVielas.concat(jsonInventars);
  console.log(datiNoliktava);

  let tabula = document.querySelector('#pub_data tbody');
  tabula.innerHTML = '';

  //datiNoliktava.length - saņemto ierakstu skaits
  //datiNoliktava['0'] - pirmais ieraksts
  //datiNoliktava['0']['Nosaukums'] - pirmā ieraksta nosaukums
  
  for (i = 0; i < datiNoliktava.length; i++)
  {

      kategorija = datiNoliktava[i]['kategorija'];


      tabula.innerHTML = tabula.innerHTML+`
      <tr id="`+kategorija+datiNoliktava[i]['id']+`">
      <td> `+datiNoliktava[i]['id']+` </td>
      <td> `+datiNoliktava[i]['nosaukums']+` </td>
      <td> `+datiNoliktava[i]['tips']+` </td>
      <td> `+datiNoliktava[i]['apakstips']+` </td>
      <td> `+datiNoliktava[i]['skaits']+` </td>
      <td> `+datiNoliktava[i]['daudzums']+` </td>
      <td> `+datiNoliktava[i]['komentari']+` </td>
      <td onclick="dzestVieluAprikojumu(`+datiNoliktava[i]['id']+`,'`+kategorija+`')"> ❌ </td>
      </tr>`;
      


  }//loop beigas
  


}//beidzas raditNoliktavasDatus(dati)