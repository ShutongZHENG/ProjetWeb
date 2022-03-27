<?php
$cartes = json_decode(urldecode($_GET['data']));
$gameStatus = $_GET['bool_game'];
$idRoom = $_GET['idRoom'];


$file = file_get_contents('room.json');
$datajson = json_decode($file, true);
switch ($idRoom) {
    case 0:
        $usernameList = array_column($datajson["chambre1"], 'name');
        for($i=0; $i<4;$i++){
            $datajson["chambre1"][$i]["gameStatus"] = $gameStatus;
            $datajson["chambre1"][$i]["cartes"] = $cartes[$i];
        }
        break;
    case 1:
        $usernameList = array_column($datajson["chambre2"], 'name');
        for($i=0; $i<4;$i++){
            $datajson["chambre2"][$i]["gameStatus"] = $gameStatus;
            $datajson["chambre2"][$i]["cartes"] = $cartes[$i];
        }
        break;
    case 2:
        $usernameList = array_column($datajson["chambre3"], 'name');
        for($i=0; $i<4;$i++){
            $datajson["chambre3"][$i]["gameStatus"] = $gameStatus;
            $datajson["chambre3"][$i]["cartes"] = $cartes[$i];
        }
        break;
}


$json_string = json_encode($datajson);
file_put_contents('room.json', $json_string);
$carte1= $cartes[0][0];
echo $carte1;


?>
