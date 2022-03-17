<?php
class VueFond implements Observer
{
 private $imageFond;
 private $hight;
 private $weight;
 private $imagecentreFond;
 private $modele;
  
 public function __construct(CModel $modele, String $imageFond, int $h, int $w, String $imagecentreFond){
    $this->modele = $modele;
    $this->imageFond = $imageFond;
    $this->hight = $h;
    $this->weight = $w;
    $this->imagecentreFond = $imagecentreFond;
 }
    public function update(){


        redessiner();
    }
    private function dessiner(){



    }
}


?>