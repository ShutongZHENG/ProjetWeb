<html>
<html lang="fr">
<head>
<meta charset="utf-8">
    <title>Inscription</title>
</head>

<body>
    
<?php
    $Player;
	$username = $_POST['username'];
	$password = $_POST['password'];
    $data['username'] = $username;
    $data['password'] = $password;

    $res = false;
    $file = file_get_contents('compte.json');
    $datajson = json_decode($file,true);
    foreach($datajson as $i => $per){
        if ($datajson[$i]['username'] == $username && $datajson[$i]['password'] == $password)
            $res= true;
    }
    if($res){
        header('Location:main.php?username='.$username);
        
        exit;
    }else{
        echo "<a href='index.php'>Sans succès, retour à la page d'accueil</a> ";
    }

    
?>


</body>

</html>