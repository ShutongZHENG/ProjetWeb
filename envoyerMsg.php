<?php

$msg = $_GET['message'];
$idRoom = $_GET['idRoom'];



$datajson = array();
$data = array();



if (file_exists('messages.json')) {
    $file = file_get_contents('messages.json');
    $datajson = json_decode($file, true);
    $hasData =true;
    for ($i = 0; $i< count($datajson);$i++){
        if($datajson[$i]['idRoom'] == $idRoom){
            array_push($datajson[$i]['messages'] , $msg);
            $hasData = false;
            break;
        }

    }
    if ($hasData){
        $data['idRoom'] = $idRoom;
        $data['messages'] =  array($msg);
        array_push($datajson, $data);
    }


    $json_string = json_encode($datajson);
    file_put_contents('messages.json', $json_string);
}


echo "success";

?>