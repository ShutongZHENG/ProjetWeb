<?php
abstract class Observable{

    private $observers;
    public function __construct(){
	$this -> observers = array();
    }
    public function ajouteObserver(Observer $observer) {
	array_push($this->observers,$observer);
    }

    public function notifieObservers() {
        for($i = 0;$i< count($this->observers); $i++){
             $this->observers[$i]->update();

        }
    }
}

?>
