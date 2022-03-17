<?php

class Carte{
    private $symbol;
    private $image;
    private $imagefond;
    private $valeur;
    private $couleur;
    private $positionX;
    private $positionY;
    private $estPositive;

    public function __construct(Symbol $symbol, String $image, String $imagefond, int $valeur, Couleur $couleur,int $positionX,int $positionY,bool $estPositive) {
        $this->symbol = $symbol;
        $this->image = $image;
        $this->imagefond= $imagefond;
        $this->valeur= $valeur;
        $this->couleur= $couleur;
        $this->positionX= $positionX;
        $this->positionY= $positionY;
        $this->estPositive= $estPositive;
    }


}

?>