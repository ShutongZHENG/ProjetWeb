<?php
$data = json_decode(urldecode($_GET['listMontrer']));
$idRoom = $_GET['idRoom'];
$username = $_GET['username'];

$file = file_get_contents('room.json');
$datajson = json_decode($file, true);
switch ($idRoom) {
    case 0:
        for($i=0; $i<4;$i++){
            for ($a =0 ; $a<count($data); $a++)
                array_push($datajson["chambre1"][$i]["cartesCentre"], $data[$a]);
            if ($datajson["chambre1"][$i]["order"]+1 == 4){
                $datajson["chambre1"][$i]["order"] = 0;
                $datajson["chambre1"][$i]["cartesCentre"] = array();
            }else{
                $datajson["chambre1"][$i]["order"] = $datajson["chambre1"][$i]["order"]+1;
            }


            if ( $datajson["chambre1"][$i]["name"] == $username){
                $nouvelCartes = array();
                for ($j =0; $j< count($datajson["chambre1"][$i]["cartes"]) ; $j++){
                    if (!in_array($datajson["chambre1"][$i]["cartes"][$j] , $data)){
                    array_push($nouvelCartes,$datajson["chambre1"][$i]["cartes"][$j] );
                    }

                }
                $datajson["chambre1"][$i]["cartes"] = $nouvelCartes;


            }

        }
        break;
    case 1:
        for($i=0; $i<4;$i++){
            for ($a =0 ; $a<count($data); $a++)
                array_push($datajson["chambre2"][$i]["cartesCentre"], $data[$a]);
            if ($datajson["chambre2"][$i]["order"]+1 == 4){
                $datajson["chambre2"][$i]["order"] = 0;
                $datajson["chambre2"][$i]["cartesCentre"] = array();
            }else{
                $datajson["chambre2"][$i]["order"] = $datajson["chambre2"][$i]["order"]+1;
            }


            if ( $datajson["chambre2"][$i]["name"] == $username){
                $nouvelCartes = array();
                for ($j =0; $j< count($datajson["chambre2"][$i]["cartes"]) ; $j++){
                    if (!in_array($datajson["chambre2"][$i]["cartes"][$j] , $data)){
                        array_push($nouvelCartes,$datajson["chambre2"][$i]["cartes"][$j] );
                    }

                }
                $datajson["chambre2"][$i]["cartes"] = $nouvelCartes;


            }

        }

        break;
    case 2:
        for($i=0; $i<4;$i++){
            for ($a =0 ; $a<count($data); $a++)
                array_push($datajson["chambre3"][$i]["cartesCentre"], $data[$a]);
            $datajson["chambre3"][$i]["cartesCentre"] = $data;
            if ($datajson["chambre3"][$i]["order"]+1 == 4){
                $datajson["chambre3"][$i]["order"] = 0;
                $datajson["chambre3"][$i]["cartesCentre"] = array();
            }else{
                $datajson["chambre3"][$i]["order"] = $datajson["chambre3"][$i]["order"]+1;
            }


            if ( $datajson["chambre3"][$i]["name"] == $username){
                $nouvelCartes = array();
                for ($j =0; $j< count($datajson["chambre3"][$i]["cartes"]) ; $j++){
                    if (!in_array($datajson["chambre3"][$i]["cartes"][$j] , $data)){
                        array_push($nouvelCartes,$datajson["chambre3"][$i]["cartes"][$j] );
                    }

                }
                $datajson["chambre3"][$i]["cartes"] = $nouvelCartes;


            }

        }
        break;
}


$json_string = json_encode($datajson);
file_put_contents('room.json', $json_string);
echo "$data";
