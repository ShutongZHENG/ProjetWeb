<html>
<html lang="fr">
<head>
<meta charset="utf-8">
    <title>Inscription</title>
</head>

<body>
    
<?php
	$username = $_POST['username'];
	$password = $_POST['password'];
    $niveau = $_POST['niveau'];
	$datajson = array();
    $data = array();
    $data['username'] = $username;
    $data['password'] = $password;
    $data['niveau'] = $niveau;
  
    if(file_exists('compte.json')){
        $file = file_get_contents('compte.json');
        $datajson = json_decode($file,true);
        array_push($datajson,$data);
        $json_string = json_encode($datajson);
        file_put_contents('compte.json', $json_string);
    }else{
        array_push($datajson,$data);
        $json_string = json_encode($datajson);
        file_put_contents('compte.json', $json_string);
    }

    
?>
<a href="index.php">Créé avec succès, retour à la page d'accueil</a>

</body>

</html>