<html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Inscription</title>
</head>

<body>
    <form action="inscriptionValide.php" method="POST">
        <p>
            <label>Identifiant:</label>
        </p>
        <p>
            <input type="text" name="username" />
        </p>
        <p>
            <label>Mot de passe:</label>
        </p>
        <p>
            <input type="text" name="password" />
        </p>

        <p>
            <select name="niveau">
                <option value="">sélectionner votre niveau</option>
                <option value="amateur">amateur</option>
                <option value="moyen">moyen</option>
                <option value="pro">pro</option>
            </select>
            <input type="submit" value="Créer" />
        </p>


    </form>

</body>

</html>