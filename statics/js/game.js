const Couleur = {
    Noir: 'Noir',
    Rouge: 'Rouge',
};


const Symbol = {
    Joker: 'Joker',
    Coeurs: 'Coeurs',
    Carraux: 'Carraux',
    Piques: 'Piques',
    Trefles: 'Trefles',
};

class Player {
    #name;
    #status;
    #nRoom;
    constructor(name) {
        this.#status = true;
        this.#name = name;
    }
    setStatus(s) {
        this.#status = s;
    }
    setNRoom(i) {
        this.#nRoom = i;
    }
    getStatus() {
        return this.#status;
    }
    getNRoom() {
        return this.#nRoom;
    }
    getName() {
        return this.#name;
    }

}


class Carte {
    #symbol;
    #image;
    #imagefond;
    #valuer;
    #couleur;
    #positionX;
    #positionY;
    #estPositive;
    constructor(symbol, image, imagefond, valeur, couleur, positionX, positionY, estPositive) {
        this.#symbol = symbol;
        this.#image = image;
        this.#valuer = valeur;
        this.#imagefond = imagefond;
        this.#couleur = couleur;
        this.#positionX = positionX;
        this.#positionY = positionY;
        this.#estPositive = estPositive;

    }

}


/*
interface Observer {
    public function update();
}
*/

class Observer {
   update(){}
}



class Observable {
    #observers;
    constructor() {
        this.#observers = new Array();
    }
    ajouteObserver(observer) {
        this.#observers.push(observer);
    }
    notifieObservers() {
        for (let i = 0; i < this.#observers.length; i++)
            this.#observers[i].update();
    }

}



class CModele extends Observable {

    #cartes;
    #messages;
    #players;
    #dealer;

    constructor() {
        super();
        this.#cartes = new Array();
        this.#init_cartes();
        this.#messages = new Array();
        this.#players = new Array();
        this.#dealer = new Player('dealer');
    }

    setPlayer(p) {
        this.#players.push(p);
    }

    deletePlayer(p) {
        let valIndex;
        for (let i = 0; i < this.#players.length; i++) {
            if (this.#players[i] === p)
                valIndex = i;
        }
        if (valIndex > -1)
            this.#players.splice(valIndex, 1);

    }
    distribuer() { }
    montrer() { }
    gagner() { return false; }

    envoyerMsg(msg) {
        this.#messages.push(msg);
    }


    #init_cartes() {
        let carte1 = new Array()
        let carte2 = new Array()
        let carte3 = new Array()
        let carte4 = new Array()
        let carte5 = new Array()
        for (let i = 0; i < 13; i++)
            carte1[i] = new Carte(Symbol.Carraux, "CartesAJouer/carte_Carraux_" + (i + 1) + ".png", "carte_Autres_3.png", (i + 1), Couleur.Rouge, 0, 0, false);

        for (let i = 0; i < 13; i++)
            carte2[i] = new Carte(Symbol.Coeurs, "CartesAJouer/carte_Coeurs_" + (i + 1) + ".png", "carte_Autres_3.png", (i + 1), Couleur.Rouge, 0, 0, false);

        for (let i = 0; i < 13; i++)
            carte3[i] = new Carte(Symbol.Piques, "CartesAJouer/carte_Piques_" + (i + 1) + ".png", "carte_Autres_3.png", (i + 1), Couleur.Noir, 0, 0, false);

        for (let i = 0; i < 13; i++)
            carte4[i] = new Carte(Symbol.Trefles, "CartesAJouer/carte_Trefles_" + (i + 1) + ".png", "carte_Autres_3.png", (i + 1), Couleur.Noir, 0, 0, false);

        carte5[0] = new Carte(Symbol.Joker, "CartesAJouer/carte_Autres_1.png", "carte_Autres_3.png", 1, Couleur.Noir, 0, 0, false);
        carte5[1] = new Carte(Symbol.Joker, "CartesAJouer/carte_Autres_2.png", "carte_Autres_3.png", 1, Couleur.Rouge, 0, 0, false);
        this.#cartes.push(carte1, carte2, carte3, carte4, carte5);

    }



}

class VueFond extends Observer {
    #imageFond;
    #height;
    #width;
    #imageCentreFond;
    #modele;
    constructor(modele, imageFond, height, width, imageCentreFond) {
        super();
        this.#modele = modele;
        this.#imageFond = './images/imageFond.png';
        this.#height = height
        this.width = width;
        this.#imageCentreFond = './images/imageCentreFond.png';
        modele.ajouteObserver(this);

    }
    update() { 
        this.#dessiner();
    }
    #dessiner() { 
        var imageFond = document.createElement("img"); //创建一个img元素
        imageFond.src = this.#imageFond;
        var idImageFond = document.getElementById('imageFond');
        idImageFond.appendChild(imageFond);
        
        var imageCentreFond = document.createElement("img");
        imageCentreFond.src = this.#imageCentreFond;
        var idImageCentreFond = document.getElementById('imageCentreFond');
        idImageCentreFond.appendChild(imageCentreFond);

    }

}


class VueChatRoom extends Observer {
    #imageFond;
    #height;
    #width;
    #modele;
    #positionX;
    #positionY;
    constructor(modele, imageFond, h, w, pX, pY) {
        super();
        this.#modele = modele;
        this.#imageFond = imageFond;
        this.#height = h;
        this.#width = w;
        this.#positionX = pX;
        this.#positionY = pY;
    }
    update() {
        this.#dessiner();
    }
    #dessiner() { }

}

class Controleur {
    #modele;
    constructor(modele) {
        this.#modele = modele;

    }
    distribuer(){
        console.log("disriuber");
    }
    montrer(){
        console.log("montrer");
    }
    

}


class VueCommandes {
    #modele;
    #bt_distribuer;
    #bt_montrer;
    #contoleur;
    constructor(modele) {
        this.#modele = modele;
        this.#contoleur = new Controleur(modele);

        // create button distribuer


        this.#bt_distribuer = document.createElement("button");
        var idBtnd = document.getElementById("buttons");
        this.#bt_distribuer.innerHTML = 'distribuer';
        this.#bt_distribuer.addEventListener("click",this.#contoleur.distribuer);
        
        // create button montrer
        this.#bt_montrer = document.createElement("button");
        var idBtnm = document.getElementById("buttons");
        this.#bt_montrer.innerHTML = 'montrer';
        this.#bt_montrer.addEventListener ("click",this.#contoleur.montrer);

        idBtnd.appendChild(this.#bt_distribuer);
        idBtnm.appendChild(this.#bt_montrer);
        



    }

}

class CVue{
#VueChatRoom
#VueCommandes
#VueFond
constructor(modele){
    this.#VueChatRoom = new VueChatRoom(modele);
    this.#VueCommandes = new VueCommandes(modele);
    this.#VueFond = new VueFond(modele);
    modele.notifieObservers();
 
}


}
