// chambre est libre, ctd nombre de personne est inferieur 4.
var isEntrer ;
var chambres ;
var libreChambres;

function refreshChambres(){
    setInterval( refreshChambre,500);
}

function refreshChambre()
{
    $.ajax({
        url: "room.json",
        type: "GET",
        dataType: "json", 
        success: function(data) {
           chambres = data;
           $('#Btn1').html("amateur "+chambres.chambre1.length+"/4");
           $('#Btn2').html("moyen "+chambres.chambre2.length+"/4");
           $('#Btn3').html("pro "+chambres.chambre3.length+"/4");
        }
    });

}




function start(idChambre,name)
{
    $.ajax({
            url: "room.json",
            type: "GET",
            dataType: "json",
            async:false,
            success: function(data) {
                libreChambres = data;
                switch (idChambre){
                    case 0:
                        if (libreChambres.chambre1.length <4)
                            isEntrer = true;
                        break;
                    case 1:
                        if (libreChambres.chambre2.length <4)
                            isEntrer = true;
                        break;
                    case 2:
                        if (libreChambres.chambre3.length <4)
                            isEntrer = true;
                        break;
                }
            }
        });

console.log(isEntrer);

    if (isEntrer){
        var url = "game.php?idRoom="+idChambre +"&username="+name;
        // url=url+ "&prevPlayerNo="+out.prevPlayerNo+"&succPlayerNo="+out.succPlayerNo;
        //alert(url);
        window.location=url;

    }else{
        alert("La salle est pleine");
    }

      
}
