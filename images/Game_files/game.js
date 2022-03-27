

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
    #gameStatus;
    #nRoom;

    constructor(name) {
        this.#gameStatus = false;
        this.#name = name;
    }

    setStatus(s) {
        this.#gameStatus = s;
    }

    setNRoom(i) {
        this.#nRoom = i;
    }

    getStatus() {
        return this.#gameStatus;
    }

    getNRoom() {
        return this.#nRoom;
    }

    getName() {
        return this.#name;
    }

}


class Carte {
    symbol;
    image;
    imagefond;
    valuer;
    couleur;
    positionX;
    positionY;
    estPositive;

    constructor(symbol, image, imagefond, valeur, couleur, positionX, positionY, estPositive) {
        this.symbol = symbol;
        this.image = image;
        this.valuer = valeur;
        this.imagefond = imagefond;
        this.couleur = couleur;
        this.positionX = positionX;
        this.positionY = positionY;
        this.estPositive = estPositive;

    }

}


/*
interface Observer {
    public function update();
}
*/

class Observer {
    update() {
    }
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
    idRoom;
    gameStatus


    constructor(idRoom) {
        super();
        this.#cartes = new Array();
        this.#init_cartes();
        this.#messages = new Array();
        this.#players = new Array();
        this.#dealer = new Player('dealer');
        this.idRoom = idRoom;
        this.#autorefreshPlayers();
        this.gameStatus = false;
        console.log("hello "+ this.idRoom);


    }

    #autorefreshPlayers() {
        let nbPer;
        let Players = this.#players;
        let idRoom = this.idRoom;
        $.ajax({
            url: "room.json",
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {
                switch (idRoom) {
                    case 0:
                        nbPer = data.chambre1.length;
                        if (nbPer > Players.length)
                            for (let i = 0; i < nbPer; i++) {
                                let player = new Player(data.chambre1[i].name)
                                if (Players.indexOf(player) == -1) {
                                    Players.push(player);
                                }
                            }
                        else if (nbPer < Players.length) {
                            let jsonPlayers;
                            for (let i = 0; i < nbPer; i++) {
                                jsonPlayers.push(new Player(data.chambre1[i].name));
                            }
                            for (let i = 0; i < Players.length; i++) {
                                if (jsonPlayers.indexOf(Players[i]) == -1) {

                                    let valIndex;
                                    for (let j = 0; j < Players.length; j++) {
                                        if (Players[j] === Players[i])
                                            valIndex = j;
                                    }
                                    if (valIndex > -1)
                                        Players.splice(valIndex, 1);


                                }

                            }

                        } else {

                            let jsonPlayers;
                            for (let i = 0; i < nbPer; i++) {
                                jsonPlayers.push(new Player(data.chambre1[i].name));

                            }
                            for (let i = 0; i < Players.length; i++) {
                                if (Players.indexOf(jsonPlayers[i]) == -1) {

                                    let valIndex;
                                    for (let j = 0; j < Players.length; j++) {
                                        if (Players[j] === Players[i])
                                            valIndex = j;
                                    }
                                    if (valIndex > -1) {
                                        Players.splice(valIndex, 1);
                                        Players.push(jsonPlayers[i]);

                                    }


                                }

                            }


                        }

                        break;
                    case 1:
                        nbPer = data.chambre2.length;
                        if (nbPer > Players.length)
                            for (let i = 0; i < nbPer; i++) {
                                let player = new Player(data.chambre2[i].name)
                                if (Players.indexOf(player) == -1) {
                                    Players.push(player);
                                }
                            }
                        else if (nbPer < Players.length) {
                            let jsonPlayers;
                            for (let i = 0; i < nbPer; i++) {
                                jsonPlayers.push(new Player(data.chambre2[i].name));
                            }
                            for (let i = 0; i < Players.length; i++) {
                                if (jsonPlayers.indexOf(Players[i]) == -1) {

                                    let valIndex;
                                    for (let j = 0; j < Players.length; j++) {
                                        if (Players[j] === Players[i])
                                            valIndex = j;
                                    }
                                    if (valIndex > -1)
                                        Players.splice(valIndex, 1);


                                }

                            }

                        } else {

                            let jsonPlayers;
                            for (let i = 0; i < nbPer; i++) {
                                jsonPlayers.push(new Player(data.chambre2[i].name));

                            }
                            for (let i = 0; i < Players.length; i++) {
                                if (Players.indexOf(jsonPlayers[i]) == -1) {

                                    let valIndex;
                                    for (let j = 0; j < Players.length; j++) {
                                        if (Players[j] === Players[i])
                                            valIndex = j;
                                    }
                                    if (valIndex > -1) {
                                        Players.splice(valIndex, 1);
                                        Players.push(jsonPlayers[i]);

                                    }


                                }

                            }


                        }


                        break;
                    case 2:
                        nbPer = data.chambre3.length;


                        if (nbPer > Players.length)
                            for (let i = 0; i < nbPer; i++) {
                                let player = new Player(data.chambre3[i].name)
                                if (Players.indexOf(player) == -1) {
                                    Players.push(player);
                                }
                            }
                        else if (nbPer < Players.length) {
                            let jsonPlayers;
                            for (let i = 0; i < nbPer; i++) {
                                jsonPlayers.push(new Player(data.chambre3[i].name));
                            }
                            for (let i = 0; i < Players.length; i++) {
                                if (jsonPlayers.indexOf(Players[i]) == -1) {

                                    let valIndex;
                                    for (let j = 0; j < Players.length; j++) {
                                        if (Players[j] === Players[i])
                                            valIndex = j;
                                    }
                                    if (valIndex > -1)
                                        Players.splice(valIndex, 1);


                                }

                            }

                        } else {

                            let jsonPlayers;
                            for (let i = 0; i < nbPer; i++) {
                                jsonPlayers.push(new Player(data.chambre3[i].name));

                            }
                            for (let i = 0; i < Players.length; i++) {
                                if (Players.indexOf(jsonPlayers[i]) == -1) {

                                    let valIndex;
                                    for (let j = 0; j < Players.length; j++) {
                                        if (Players[j] === Players[i])
                                            valIndex = j;
                                    }
                                    if (valIndex > -1) {
                                        Players.splice(valIndex, 1);
                                        Players.push(jsonPlayers[i]);

                                    }


                                }

                            }


                        }


                        break;
                }
            }
        });
        this.#players = Players;

    }


    getPlayers() {
        return this.#players;
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

    distribuer() {
       if(!this.gameStatus) {
           let cartesPlayer = [[], [], [], []];
           for (let i = 0; i < 4; i++) {
               for (let j = 0; j < 7; j++) {
                   let isExist = false;
                   let val = Math.floor(Math.random() * 54 + 1);
                   for (let k = 0; k < 4; k++) {
                       if (cartesPlayer[k].indexOf(val) != -1) {
                           isExist = true;
                       }
                   }
                   if (isExist) {
                       j--;
                   } else {
                       cartesPlayer[i].push(val);
                   }
               }
           }
           let data = encodeURI(JSON.stringify(cartesPlayer));
           let urllink = "idRoom=" + this.idRoom + "&bool_game=true&data=" + data;
           $.get("distribuer.php", urllink, function (data) {
           });

           console.log(urllink);
       }





    }

    montrer() {
    }

    gagner() {
        return false;
    }

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
        this.#dessiner();
    }

    update() {
        this.#redessiner();
    }

    #redessiner() {

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

    #dessiner() {
    }

}

class Controleur {
    modele;
    constructor(modele) {
        this.modele = modele;


    }

    distribuer() {
        this.modele.distribuer();
    }

    montrer() {
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
        this.#bt_distribuer.onclick = function (){
            modele.distribuer();
        }


        // create button montrer
        this.#bt_montrer = document.createElement("button");
        var idBtnm = document.getElementById("buttons");
        this.#bt_montrer.innerHTML = 'montrer';
        this.#bt_montrer.addEventListener("click", this.#modele.montrer);

        idBtnd.appendChild(this.#bt_distribuer);
        idBtnm.appendChild(this.#bt_montrer);


    }

}


class VuePlayers extends Observer {
    #Players
    #modele
    #imageProfile;

    constructor(modele) {
        super();
        this.#modele = modele;
        this.#Players = modele.getPlayers();
        this.#imageProfile = './images/profile.png'
        this.#dessiner();
        this.#modele.ajouteObserver(this);

    }
    update() {
        this.#redessiner();

    }

    #dessiner(){
        var imageProfile2 = document.createElement("img");
        imageProfile2.src = this.#imageProfile;
        var idImageProfile2 = document.getElementById('south');
        imageProfile2.style.height = "50%";
        idImageProfile2.appendChild(imageProfile2);

        this.#dessinerPlayer();
    }
    #dessinerPlayer() {

        let nbPer;
        let idRoom = this.#modele.idRoom;
        let bool_game = true;
        $.ajax({
            url: "room.json",
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {

                switch (idRoom) {
                    case 0:
                        nbPer = data.chambre1.length;
                        for (let value of data.chambre1) {
                            if (value.gameStatus =="false")
                                bool_game = false;
                        }
                        // console.log(chambres.chambre1.length );
                        break;
                    case 1:
                        nbPer = data.chambre2.length;
                        for (let value of data.chambre2) {
                            if (value.gameStatus =="false")
                                bool_game = false;
                        }
                            break;
                    case 2:
                        nbPer = data.chambre3.length;
                            for (let value of data.chambre3) {
                                if (value.gameStatus =="false")
                                    bool_game = false;
                            }
                                break;
                }
            }
        });
        this.#modele.gameStatus = bool_game;
        console.log(nbPer);
        if (nbPer > 1) {

            var imageProfile3 = document.createElement("img");
            imageProfile3.src = this.#imageProfile;
            var idImageProfile3 = document.getElementById('west');
            imageProfile3.style.width = "50%";
            idImageProfile3.appendChild(imageProfile3);



            if (nbPer > 2) {

                var imageProfile = document.createElement("img");
                imageProfile.src = this.#imageProfile;
                var idImageProfile = document.getElementById('north');
                imageProfile.style.height = "50%";
                idImageProfile.appendChild(imageProfile);

                if (nbPer > 3) {

                    var imageProfile4 = document.createElement("img");
                    imageProfile4.src = this.#imageProfile;
                    var idImageProfile4 = document.getElementById('east');
                    imageProfile4.style.width = "50%";
                    idImageProfile4.appendChild(imageProfile4);

                }
            }


        }

    }


    #redessiner() {


        if(this.#Players.length <4 || !this.#modele.gameStatus){
            var del2 = document.getElementById('west');
            var del3 = document.getElementById('east');
            var del4 = document.getElementById('north');
            if (del2.childNodes.length === 1)
                del2.removeChild(del2.childNodes[0]);
            if (del3.childNodes.length == 1)
                del3.removeChild(del3.childNodes[0]);
            if (del4.childNodes.length == 1)
                del4.removeChild(del4.childNodes[0]);
            this.#dessinerPlayer();

        }
        else{
            let nbPer;
            let idRoom = this.#modele.idRoom;
            $.ajax({
                url: "room.json",
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {

                    switch (idRoom) {
                        case 0:
                            nbPer = data.chambre1.length;
                            // console.log(chambres.chambre1.length );
                            break;
                        case 1:
                            nbPer = data.chambre2.length;

                            break;
                        case 2:
                            nbPer = data.chambre3.length;

                            break;
                    }
                }
            });
            this.#modele.gameStatus = nbPer ==4;


        }

    }
}


class CVue {
    #VueChatRoom
    #VueCommandes
    #VueFond
    #VuePlayers
    #modele;

    constructor(modele) {
        this.#VueFond = new VueFond(modele);
        this.#VueChatRoom = new VueChatRoom(modele);
        this.#VuePlayers = new VuePlayers(modele);
        this.#modele = modele;
        this.#VueCommandes = new VueCommandes(modele);
        this.#modele.notifieObservers();


    }

    notifier() {
        this.#modele.notifieObservers();
        console.log(this.#modele.gameStatus);



    }

}
