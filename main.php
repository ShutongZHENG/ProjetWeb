<?php
require_once 'Player.php';
session_start();
$_SESSION["username"]=$_GET["username"];

?>
<html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Main</title>
    <style type="text/css">
        button {
            width: 100px;
            height: 100px;
            margin:auto;
        }
        h1 {
            text-align:center;
        }
    </style>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript" src="./statics/js/main.js"></script>  
<script type="text/javascript">

window.onload=function(){
    refreshChambres();
}



</script>
</head>
<body>
<h1> Veuillez sélectionner votre niveau pour jouer </h1>
<div id="chambres" style="width: 100%;height: 100px;text-align:center;" >
<button type="button" id="Btn1" onclick="start(0, '<?php echo $_GET["username"] ?>' )">amateur 0/4</button>
<button type="button" id="Btn2" onclick="start(1, '<?php  echo $_GET["username"] ?>' )">moyen 0/4</button>
<button type="button" id="Btn3" onclick="start(2, '<?php echo $_GET["username"] ?>' )">pro 0/4</button>
</div>

</body>

</html>