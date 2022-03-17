<?php
class VueChatRoom implements Observer
{
 private $imageFond;
 private $hight;
 private $weight;
 private $modele;
 private $positionX;
 private $positionY;
  
 public function __construct(CModele $modele, String $imageFond, int $h, int $w, int $pX, int $pY){
    $this->modele = $modele;
    $this->imageFond = $imageFond;
    $this->hight = $h;
    $this->weight = $w;
    $this->positionX = $pX;
    $this->positionY = $pY;
 }
    public function update(){


        redessiner();
    }
    private function dessiner(){



    }
}


?>