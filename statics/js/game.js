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
    name;
    gameStatus;
    nRoom;
    cartes;

    constructor(name) {
        this.gameStatus = false;
        this.name = name;
        this.cartes = new Array();
    }

    setStatus(s) {
        this.gameStatus = s;
    }

    setNRoom(i) {
        this.nRoom = i;
    }

    getStatus() {
        return this.gameStatus;
    }

    getNRoom() {
        return this.nRoom;
    }

    getName() {
        return this.name;
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
    gameStatus;
    timer;
    username;


    constructor(idRoom, username) {
        super();
        this.timer = 0;
        this.#cartes = new Array();
        this.#init_cartes();
        this.#messages = new Array();
        this.#players = new Array();
        this.#dealer = new Player('dealer');
        this.idRoom = idRoom;
        this.autorefreshPlayers();
        this.gameStatus = false;
        this.username = username;
        console.log("hello " + this.idRoom);


    }

    autorefreshPlayers() {
        let nbPer;
        let Players = [];
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
                        for (let i = 0; i < nbPer; i++) {
                            let player = new Player(data.chambre1[i].name);
                            player.setStatus(data.chambre1[i].gameStatus);
                            Players.push(player);
                        }

                        break;
                    case 1:
                        nbPer = data.chambre2.length;
                        for (let i = 0; i < nbPer; i++) {
                            let player = new Player(data.chambre2[i].name);
                            player.setStatus(data.chambre2[i].gameStatus);
                            Players.push(player);
                        }
                        break;
                    case 2:
                        nbPer = data.chambre3.length;
                        for (let i = 0; i < nbPer; i++) {
                            let player = new Player(data.chambre3[i].name);
                            player.setStatus(data.chambre3[i].gameStatus);
                            Players.push(player);
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


    distribuer() {
        if (!this.gameStatus) {
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
            carte1[i] = new Carte(Symbol.Carraux, "CartesAJouer/carte_Carraux_" + (i + 1) + ".png", "CartesAJouer/carte_Autres_3.png", (i + 1), Couleur.Rouge, 0, 0, false);

        for (let i = 0; i < 13; i++)
            carte2[i] = new Carte(Symbol.Coeurs, "CartesAJouer/carte_Coeurs_" + (i + 1) + ".png", "CartesAJouer/carte_Autres_3.png", (i + 1), Couleur.Rouge, 0, 0, false);

        for (let i = 0; i < 13; i++)
            carte3[i] = new Carte(Symbol.Piques, "CartesAJouer/carte_Piques_" + (i + 1) + ".png", "CartesAJouer/carte_Autres_3.png", (i + 1), Couleur.Noir, 0, 0, false);

        for (let i = 0; i < 13; i++)
            carte4[i] = new Carte(Symbol.Trefles, "CartesAJouer/carte_Trefles_" + (i + 1) + ".png", "CartesAJouer/carte_Autres_3.png", (i + 1), Couleur.Noir, 0, 0, false);

        carte5[0] = new Carte(Symbol.Joker, "CartesAJouer/carte_Autres_1.png", "CartesAJouer/carte_Autres_3.png", 1, Couleur.Noir, 0, 0, false);
        carte5[1] = new Carte(Symbol.Joker, "CartesAJouer/carte_Autres_2.png", "CartesAJouer/carte_Autres_3.png", 1, Couleur.Rouge, 0, 0, false);
        this.#cartes.push(carte1, carte2, carte3, carte4, carte5);

    }

    getlistCartesByPlayers(){

        let idRoom = this.idRoom;
        let username = this.username;
        console.log("idRoom: "+idRoom +" username: "+username);
        console.log("Players: "+this.#players[0].name);
        let playerSouth;
        let playerWest;
        let playerNorth;
        let playerEast;
        let index;
        for (let i = 0; i < 4; i++) {
            if (this.getPlayers()[i].name == username)
                index = i;

        }

        playerSouth = this.getPlayers()[index];
        index = index + 1;
        if (index == 4)
            index = 0;
        playerWest = this.getPlayers()[index];
        index = index + 1;
        if (index == 4)
            index = 0;
        playerNorth = this.getPlayers()[index];
        index = index + 1;
        if (index == 4)
            index = 0;
        playerEast = this.getPlayers()[index];



        // ajax给提取卡牌信息
        $.ajax({
            url: "room.json",
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {

                switch (idRoom) {
                    case 0:
                        for (let i =0 ; i<4; i++){
                            switch(data.chambre1[i].name){
                                case playerSouth.name:
                                    playerSouth.cartes = data.chambre1[i].cartes;
                                    break;
                                case playerWest.name:
                                    playerWest.cartes = data.chambre1[i].cartes;
                                    break;
                                case playerNorth.name:
                                    playerNorth.cartes = data.chambre1[i].cartes;
                                    break;
                                case playerEast.name:
                                    playerEast.cartes = data.chambre1[i].cartes;
                                    break;
                            }
                        }
                        // console.log(chambres.chambre1.length );
                        break;
                    case 1:
                        for (let i =0 ; i<4; i++){
                            switch(data.chambre2[i].name){
                                case playerSouth.name:
                                    playerSouth.cartes = data.chambre2[i].cartes;
                                    break;
                                case playerWest.name:
                                    playerWest.cartes = data.chambre2[i].cartes;
                                    break;
                                case playerNorth.name:
                                    playerNorth.cartes = data.chambre2[i].cartes;
                                    break;
                                case playerEast.name:
                                    playerEast.cartes = data.chambre2[i].cartes;
                                    break;
                            }
                        }
                        break;
                    case 2:
                        for (let i =0 ; i<4; i++){
                            switch(data.chambre3[i].name){
                                case playerSouth.name:
                                    playerSouth.cartes = data.chambre3[i].cartes;
                                    break;
                                case playerWest.name:
                                    playerWest.cartes = data.chambre3[i].cartes;
                                    break;
                                case playerNorth.name:
                                    playerNorth.cartes = data.chambre3[i].cartes;
                                    break;
                                case playerEast.name:
                                    playerEast.cartes = data.chambre3[i].cartes;
                                    break;
                            }
                        }
                        break;
                }
            }
        });



        let res = [];
        res.push(this.#tansfertCartes(playerSouth.cartes));
        res.push(this.#tansfertCartes(playerWest.cartes));
        res.push(this.#tansfertCartes(playerNorth.cartes));
        res.push(this.#tansfertCartes(playerEast.cartes));
        return res;
    }


    #tansfertCartes(...listInt){

        listInt.sort(function(i, j){return i - j});
        console.log("ListInt: ");
        console.log(listInt);
        console.log(this.#cartes);
        console.log("len: " + listInt[0].length);
        let res =[];
        for (let i = 0 ; i < listInt[0].length; i++){
            let col ;
            let row;
            if (listInt[0][i]%13 ==0 ){
                col = 12;
                row = Math.trunc(listInt[0][i]/13) -1;

            }else{
                col = listInt[0][i]%13 -1;
                row = Math.trunc(listInt[0][i]/13);
            }

            console.log("row : "+ row+" col : "+col);
            let carte = this.#cartes[row][col];

            res.push(carte );

        }

        return res;
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

    constructor(modele) {
        super();
        modele.ajouteObserver(this);
        this.#modele = modele;
        this.#imageFond = './images/chatRoomFond.png';
        this.#height = "200px";
        this.#width = "400px";
        this.#positionX = "200px";
        this.#positionY = "32px";
        this.#dessiner();
    }

    update() {
       // this.#dessiner();
    }

    #dessiner() {
        var div = document.createElement("div");
        var idchatRoom = document.getElementById('imageFond');
        idchatRoom.appendChild(div);
        var imgFond = document.createElement("img");
        imgFond.src = this.#imageFond;
       // console.log("node: "+idchatRoom.nodeType);
        imgFond.style.zIndex ="1";
        imgFond.style.position = "absolute";
        imgFond.style.left = this.#positionX;
        imgFond.style.bottom = this.#positionY;
        div.appendChild(imgFond);
        var input = document.createElement("input");
        input.style.zIndex = "2";
        input.style.position = "absolute";
        input.style.left = "202px";
        input.style.width = "396px";
        input.style.bottom = "210px";

        // 绑定 enter 事件
        input.onkeydown = function (e){
            if (e.keyCode === 13){
                console.log("Enter!!!");
                console.log(input.value);
                input.value="";
            }
        }
        div.appendChild(input);





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
        this.#bt_distribuer.onclick = function () {
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

    #dessiner() {
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
                            if (value.gameStatus == "false")
                                bool_game = false;
                        }
                        // console.log(chambres.chambre1.length );
                        break;
                    case 1:
                        nbPer = data.chambre2.length;
                        for (let value of data.chambre2) {
                            if (value.gameStatus == "false")
                                bool_game = false;
                        }
                        break;
                    case 2:
                        nbPer = data.chambre3.length;
                        for (let value of data.chambre3) {
                            if (value.gameStatus == "false")
                                bool_game = false;
                        }
                        break;
                }
            }
        });
        this.#modele.gameStatus = bool_game;

        var imageProfile2 = document.createElement("img");
        imageProfile2.src = this.#imageProfile;
        var idImageProfile2 = document.getElementById('south');
        imageProfile2.style.height = "50%";
        idImageProfile2.appendChild(imageProfile2);

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

        this.#modele.autorefreshPlayers();
        this.#Players = this.#modele.getPlayers();


        if (this.#Players.length < 4 || !this.#modele.gameStatus) {
            this.#modele.timer = 0;
            var del1 = document.getElementById('south');
            var del2 = document.getElementById('west');
            var del3 = document.getElementById('east');
            var del4 = document.getElementById('north');
            while (del1.childNodes.length > 0) {
                del1.removeChild(del1.childNodes[0]);
            }
            while (del2.childNodes.length > 0) {
                del2.removeChild(del2.childNodes[0]);
            }
            while (del3.childNodes.length > 0) {
                del3.removeChild(del3.childNodes[0]);
            }
            while (del4.childNodes.length > 0) {
                del4.removeChild(del4.childNodes[0]);
            }
            this.#dessinerPlayer();

        } else {
            if (this.#modele.timer == 0) {
                var del1 = document.getElementById('south');
                var del2 = document.getElementById('west');
                var del3 = document.getElementById('east');
                var del4 = document.getElementById('north');
                while (del1.childNodes.length > 0) {
                    del1.removeChild(del1.childNodes[0]);
                }
                while (del2.childNodes.length > 0) {
                    del2.removeChild(del2.childNodes[0]);
                }
                while (del3.childNodes.length > 0) {
                    del3.removeChild(del3.childNodes[0]);
                }
                while (del4.childNodes.length > 0) {
                    del4.removeChild(del4.childNodes[0]);
                }
                this.#showInitCartes();
                this.#modele.timer += 1;
            } else {
                //删除 除自己手牌外的所有卡牌
                console.log("update ");
            }
        }

    }

    //根据名字 在 json的位置 确定 每个人的位置 并 显示其卡牌

    //用 ajax 进行 卡牌选择
    // 选择完毕后 点击 montrer 然后调用 php 对 json文件中的卡牌信息进行 更新
    // 更新完毕后 执行一次 卡牌的刷新 等于说 再调用一次 showCartes（）

    #showInitCartes() {
        //0 -> south 1-> west 2->north 3->east
       let cartes = this.#modele.getlistCartesByPlayers();
       console.log("ShowInitCarte: ");
       console.log(cartes);
        let idSouth = document.getElementById('south');
       // let div = document.createElement("div");
       // idSouth.appendChild(div);
       for (let i =0 ; i< cartes[0].length;i++){


            let divSouth = document.createElement("img");
            divSouth.src = ""+cartes[0][i].image;
            divSouth.style.zIndex =""+(i+1);
            divSouth.style.position = "absolute";
            divSouth.style.left = (800 - (100+25*(cartes[0].length-1))/2+25*i)+"px";
            //divSouth.style.top = "10px";
            divSouth.style.height = "75%";
            divSouth.style.bottom = "0px";
            divSouth.onclick = function (){
               if(divSouth.style.bottom == "0px"){
                   divSouth.style.bottom = "25px";
               }else {
                   divSouth.style.bottom = "0px";
               }
            };
           //div.appendChild(divSouth);
           idSouth.appendChild(divSouth);

       }


       //西面
        let idWest = document.getElementById('west');
          for (let j = 0 ; j<cartes[1].length; j++){
               let divWest = document.createElement("img");
               divWest.src = ""+cartes[1][j].imagefond;
               divWest.style.zIndex =""+(j+1);
               divWest.style.position = "absolute";
               divWest.style.left = "20px";
               divWest.style.top = (100+40*j)+"px";
               divWest.style.height = "24.45%";
               idWest.appendChild(divWest);

           }

        let idNorth = document.getElementById('north');
        for (let j = 0 ; j<cartes[2].length; j++){
            let divNorth = document.createElement("img");
            divNorth.src = ""+cartes[2][j].imagefond;
            divNorth.style.zIndex =""+(j+1);
            divNorth.style.position = "absolute";
            divNorth.style.height = "24.45%";
            divNorth.style.left = (800 - (100+25*(cartes[0].length-1))/2+25*j)+"px";
            divNorth.style.top = "0px";
            idNorth.appendChild(divNorth);

        }

        let idEast = document.getElementById('east');
        for (let j = 0 ; j<cartes[3].length; j++){
            let divEast = document.createElement("img");
            divEast.src = ""+cartes[3][j].imagefond;
            divEast.style.zIndex =""+(j+1);
            divEast.style.position = "absolute";
            divEast.style.right = "20px";
            divEast.style.top = (100+40*j)+"px";
            divEast.style.height = "24.45%";
            idEast.appendChild(divEast);

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


    }

}
