<?php
class Player{
    private $name;
    private $status;
    private $numRoom;
    public function __construct(String $name)
    {
        $this->name = $name;
        $this->status = true;
        $this->numRoom  = -1;
    }
    public function setStatus(bool $s){
        $this->status = $s;
    }
    public function setNumRoom(int $i){
        $this->numRoom = $i;
    }

}

?>