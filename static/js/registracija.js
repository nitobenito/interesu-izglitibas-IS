
  function registracija(){
    var adrese=document.getElementById("Adrese").value;
    var epasts=document.getElementById("Epasts").value;
    var talrunis=document.getElementById("Talrunis").value;
    var specialists=document.getElementById("Specialists").value;
    var klubs=document.getElementById("iicnosauk").value;
    if(adrese==""||epasts==""||talrunis==""||specialists=="") alert("Visiem laukiem jābūt aizpildītājiem");
    else{
    var dict={adrese:adrese, epasts:epasts, talrunis:talrunis, specialists:specialists, iicnosaukums:klubs};
    //console.log(JSON.stringify(dict));
    fetch('https://interesu-izglitibas-IS.skarturs.repl.co/registret_IIC', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(dict)
      })
      //.then(resp=>resp.json())
      .then(resp=>resp.text())
      .then((atbilde)=>{
       console.log("**"+atbilde+"**");
       document.getElementById("forma").reset();
       });
    
   }
}