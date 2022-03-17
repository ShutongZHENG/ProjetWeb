<?php
class CModele extends Observable{
private $cartes;
private $messages ;

public function __construct(){
     $this->cartes = array();
     $this ->init_cartes();
     $this->messages = array();

}
public function distribuer(){}
public function montrer(){}
public function gagner(){return false;}

public function envoyerMsg(String $msg){
    array_push($this->messages,$msg);
}

private function init_cartes() {
//add cartes
$carte1 = array();
$carte2 = array();
$carte3 = array();
$carte4 = array();
$carte5 = array();
for($i=0; $i<13; $i++)
$carte1[$i] = new Carte(Symbol::Carraux,"CartesAJouer/carte_Carraux_"+($i+1)+".png","carte_Autres_3.png",($i+1),Couleur::Rouge,0,0,false);

for($i=0; $i<13; $i++)
$carte2[$i] = new Carte(Symbol::Coeurs,"CartesAJouer/carte_Coeurs_"+($i+1)+".png","carte_Autres_3.png",($i+1),Couleur::Rouge,0,0,false);

for($i=0; $i<13; $i++)
$carte3[$i] = new Carte(Symbol::Piques,"CartesAJouer/carte_Piques_"+($i+1)+".png","carte_Autres_3.png",($i+1),Couleur::Noir,0,0,false);

for($i=0; $i<13; $i++)
$carte4[$i] = new Carte(Symbol::Trefles,"CartesAJouer/carte_Trefles_"+($i+1)+".png","carte_Autres_3.png",($i+1),Couleur::Noir,0,0,false);

$carte5[0] = new Carte(Symbol::Joker,"CartesAJouer/carte_Autres_1.png","carte_Autres_3.png",1,Couleur::Noir,0,0,false);
$carte5[1] = new Carte(Symbol::Joker,"CartesAJouer/carte_Autres_2.png","carte_Autres_3.png",1,Couleur::Rouge,0,0,false);
array_push($this->cartes,$carte1,$carte2,$carte3,$carte4,$carte5);
}


} 
?>