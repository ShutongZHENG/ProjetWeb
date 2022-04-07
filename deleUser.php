<?php
$username = $_GET['username'];
$idRoom = $_GET['idRoom'];
$file = file_get_contents('room.json');
$datajson = json_decode($file,true);
switch ($idRoom){
    case 0:
        $usernameList= array_column($datajson["chambre1"],'name');
        if( in_array($username,$usernameList) ){
            $key = array_search($username,$usernameList);
            array_splice($datajson["chambre1"], $key,1);
        }

        for($i=0; $i< count( $datajson["chambre1"] );$i++){
            $datajson["chambre1"][$i]["gameStatus"] = "false";
            $datajson["chambre1"][$i]["cartes"] = [];
            $datajson["chambre1"][$i]["order"] = "";
            $datajson["chambre1"][$i]["cartesCentre"] = [];
            $datajson["chambre1"][$i]["note"] = 0;
            $datajson["chambre1"][$i]["outall"] = false;
        }

        break;
    case 1:
        $usernameList= array_column($datajson["chambre2"],'name');
        if( in_array($username,$usernameList) ){
            $key = array_search($username,$usernameList);
            array_splice($datajson["chambre2"], $key,1);
        }
        for($i=0; $i< count( $datajson["chambre2"] );$i++){
            $datajson["chambre2"][$i]["gameStatus"] = "false";
            $datajson["chambre2"][$i]["cartes"] = [];
            $datajson["chambre2"][$i]["order"] = "";
            $datajson["chambre2"][$i]["cartesCentre"] = [];
            $datajson["chambre2"][$i]["note"] = 0;
            $datajson["chambre2"][$i]["outall"] = false;
        }

        break;
    case 2:
        $usernameList= array_column($datajson["chambre3"],'name');
        if( in_array($username,$usernameList) ){
            $key = array_search($username,$usernameList);
            array_splice($datajson["chambre3"], $key,1);
        }
        for($i=0; $i< count( $datajson["chambre3"] );$i++){
            $datajson["chambre3"][$i]["gameStatus"] = "false";
            $datajson["chambre3"][$i]["cartes"] = [];
            $datajson["chambre3"][$i]["order"] = "";
            $datajson["chambre3"][$i]["cartesCentre"] = [];
            $datajson["chambre3"][$i]["note"] = 0;
            $datajson["chambre3"][$i]["outall"] = false;
        }
        break;
}


$json_string = json_encode($datajson);
file_put_contents('room.json', $json_string);

$file = file_get_contents('messages.json');
$datajson = json_decode($file,true);
for ($i = 0 ; $i< count($datajson); $i++){
    if($datajson[$i]["idRoom"] == $idRoom){

        $datajson[$i]["messages"] = array();
        break;

    }
}

$json_string = json_encode($datajson);
file_put_contents('messages.json', $json_string);



echo "success";
?>