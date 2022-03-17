<?php
class Controleur{
private $modele;
public function __construct(CModele $modele)
{
    $this->modele = $modele;
}
public function comportement(action){}
}



?>