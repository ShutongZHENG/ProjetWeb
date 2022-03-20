<html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Game</title>
    <style type="text/css">
        #a{
            position: absolute;
            z-index: 1;
        }
        #imageFond{
            position: absolute;
            z-index: 1;
        }
        #imageCentreFond{
            position: relative;
            z-index: 2;
            left: 620px;
            top: 228px;
        }
        #buttons{
          position: relative;
          z-index: 2;
          left: 10px;
          top: 5px;
        }

    </style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript" src="./statics/js/game.js"></script>   
<script type="text/javascript">
 window.onload = function() {
        var modele = new CModele();
		var vue = new CVue(modele);
 }
</script>

</head>

<body>
    <div id="compte">
        <p> <?= $_GET["username"] ?> <br> dans la chambre <?= $_GET["idRoom"] ?> </p>
    </div>


    <div id="a">

    <div id="imageFond">
       
    </div>
    <div id="imageCentreFond">
       
    </div>


    </div>
 
    <div id="buttons" > 


    </div>


</body>

</html>