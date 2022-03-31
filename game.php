<html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Game</title>
    <style type="text/css">


        #imageFond {
            position:relative
        }

        #imageCentreFond {
            position: absolute;
            left: 725px;
            top: 325px;
            z-index: : 1;

        }

        #buttons {
            position: absolute;
            left: 10px;
            top: 5px;
        }

        #players{
            position: absolute;
            width:1600px;height:615px;
            left: 20px;
            top: 25px;
            display: grid;
            grid-template-columns: repeat(1600,1px);
            grid-template-rows: repeat(800,1px);


        }
        #south{
            display: flex;
            justify-content: center;
            align-items: center;
            grid-column: 100 / 1500;
            grid-row: 600/800;
            position: relative;

        }
        #north{
            display: flex;
            justify-content: center;
            align-items: center;
            grid-column: 100 / 1500;
            grid-row: 1/151;
        }
        #west{
            display: flex;
            justify-content: center;
            align-items: center;
            grid-column: 1 / 151;
            grid-row: 100/800;
        }
        #east{
            display: flex;
            justify-content: center;
            align-items: center;
            grid-column: 1450 / 1600;
            grid-row: 100/800;
        }

    </style>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="./statics/js/game.js" defer></script>
    <script type="text/javascript">
        window.onload = function () {
            $.ajax({
                url: 'addUser.php?idRoom=' +<?php echo $_GET['idRoom'];?> +"&username=" +'<?php echo $_GET['username'];?>',
                type: "post",
                async:false,
                data: {},
                success: function (data) {
                    console.log(data);
                }

            });
            var modele = new CModele(<?php echo $_GET['idRoom'];?>,'<?= $_GET["username"] ?>');
            var vue = new CVue(modele);
            setInterval( ()=>{vue.notifier()},500);
            console.log("json add");
            // alert("hello world");
        }

        window.onbeforeunload = function () {

            console.log("exit");

            $.ajax({
                url: 'deleUser.php?idRoom=' +<?php echo $_GET['idRoom'];?> +"&username=" +'<?php echo $_GET['username'];?>',
                type: "post",
                async:true,
                data: {},
                success: function (data) {
                    console.log(data);
                }
            });






            return "close web";
        }
    </script>

</head>

<body>
<div id="compte">
    <p> <?= $_GET["username"] ?> <br> dans la chambre <?= $_GET["idRoom"] ?> </p>
</div>


<div id="a">

    <div id="imageFond">
        <div id="imageCentreFond"></div>
        <div id="buttons"></div>
        <div id="players">
            <div id="north">
                <div id="chatRoomFond"></div>
            </div>
            <div id="west"></div>
            <div id="east"></div>
            <div id="south"></div>

        </div>
    </div>



</div>



</body>

</html>