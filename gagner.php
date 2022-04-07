<?php
$idRoom = $_GET['idRoom'];
$username = $_GET['username'];
if (file_exists('room.json')) {
    $file = file_get_contents('room.json');
    $datajson = json_decode($file, true);
    switch ($idRoom) {
        case 0:
            $hasWon = 0;
            for ($i = 0; $i<count($datajson["chambre1"]) ; $i++ ){
                if ( count ($datajson["chambre1"][$i]["cartes"] ) == 0 &&  $datajson["chambre1"][$i]["name"] != $username){
                        $hasWon ++;
                }

            }
            for ($i = 0; $i<count($datajson["chambre1"]) ; $i++ )
            if (count( $datajson["chambre1"][$i]["cartes"]  ) == 0 && $datajson["chambre1"][$i]["outall"] == false && $datajson["chambre1"][$i]["name"] = $username){

                $datajson["chambre1"][$i]["note"] = $datajson["chambre1"][$i]["note"]+ (5 - $hasWon) ;
                $datajson["chambre1"][$i]["outall"] = true;

                $hasWon++;
            }
            if($hasWon ==3){
                for ($i = 0; $i<count($datajson["chambre1"]) ; $i++ ){
                    $datajson["chambre1"][$i]["gameStatus"] = "false";
                }
            }


            break;
        case 1:
            $hasWon = 0;
            for ($i = 0; $i<count($datajson["chambre2"]) ; $i++ ){
                if ( count ($datajson["chambre2"][$i]["cartes"] ) == 0  &&  $datajson["chambre2"][$i]["name"] != $username){
                    $hasWon ++;
                }

            }

            for ($i = 0; $i<count($datajson["chambre2"]) ; $i++ )
                if (count( $datajson["chambre2"][$i]["cartes"]  ) == 0 && $datajson["chambre2"][$i]["outall"] == false && $datajson["chambre2"][$i]["name"] = $username){

                    $datajson["chambre2"][$i]["note"] = $datajson["chambre2"][$i]["note"]+ (5 - $hasWon) ;
                    $datajson["chambre2"][$i]["outall"] = true;

                    $hasWon++;
                }

            if($hasWon ==3){
                for ($i = 0; $i<count($datajson["chambre2"]) ; $i++ ){
                    $datajson["chambre2"][$i]["gameStatus"] = "false";
                }
            }
            break;
        case 2:
            $hasWon = 0;
            for ($i = 0; $i<count($datajson["chambre3"]) ; $i++ ){
                if ( count ($datajson["chambre3"][$i]["cartes"] )== 0  &&  $datajson["chambre3"][$i]["name"] != $username){
                    $hasWon ++;
                }

            }

            for ($i = 0; $i<count($datajson["chambre3"]) ; $i++ )
                if (count( $datajson["chambre3"][$i]["cartes"]  ) == 0 && $datajson["chambre3"][$i]["outall"] == false && $datajson["chambre3"][$i]["name"] = $username){

                    $datajson["chambre3"][$i]["note"] = $datajson["chambre3"][$i]["note"]+ (5 - $hasWon) ;
                    $datajson["chambre3"][$i]["outall"] = true;

                    $hasWon++;
                }
            if($hasWon ==3){
                for ($i = 0; $i<count($datajson["chambre3"]) ; $i++ ){
                    $datajson["chambre3"][$i]["gameStatus"] = "false";

                }
            }
            break;
    }


    $json_string = json_encode($datajson);
    file_put_contents('room.json', $json_string);
    echo "success";
}


