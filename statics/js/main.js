// chambre est libre, ctd nombre de personne est inferieur 4.
var estLibre = false;
var chambres ;

function refreshChambres(){
    setInterval( refreshChambre,1000);
}

function refreshChambre()
{
    $.ajax({
        url: "room.json",
        type: "GET",
        dataType: "json", 
        success: function(data) {
           chambres = data;
           $('#Btn1').html("amateur "+chambres.chambre1+"/4");   
           $('#Btn2').html("moyen "+chambres.chambre2+"/4");   
           $('#Btn3').html("pro "+chambres.chambre3+"/4");  
        }
    })

}




function start(idChambre,name)
{ 
 
    var url = "game.php?idRoom="+idChambre +"&username="+name;  
   // url=url+ "&prevPlayerNo="+out.prevPlayerNo+"&succPlayerNo="+out.succPlayerNo;               
    //alert(url);
    window.location=url;
      
}
