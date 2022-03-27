<?php
$username = $_GET['username'];
$idRoom = $_GET['idRoom'];
$datajson = array();
$data = array();
$data['name'] = $username;
$data['nRoom'] = $idRoom;
$data['gameStatus'] = 'false';
$data['cartes'] = array();


if (file_exists('room.json')) {
    $file = file_get_contents('room.json');
    $datajson = json_decode($file, true);
    switch ($idRoom) {
        case 0:
            $usernameList = array_column($datajson["chambre1"], 'name');
            if (in_array($username, $usernameList) == false)
                array_push($datajson["chambre1"], $data);
            break;
        case 1:
            $usernameList = array_column($datajson["chambre2"], 'name');
            if (in_array($username, $usernameList) == false)
                array_push($datajson["chambre2"], $data);
            break;
        case 2:
            $usernameList = array_column($datajson["chambre3"], 'name');
            if (in_array($username, $usernameList) == false)
                array_push($datajson["chambre3"], $data);
            break;
    }


    $json_string = json_encode($datajson);
    file_put_contents('room.json', $json_string);
    echo "success";
}
    ?>