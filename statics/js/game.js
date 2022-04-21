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
    order;
    centreCartes;
    lastper
    indexPos


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
        this.order = 0;
        this.centreCartes = new Array();
        this.indexPos = 0;

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


        let bool_game = true;
        $.ajax({
            url: "room.json",
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {

                switch (idRoom) {
                    case 0:
                        for (let value of data.chambre1) {
                            if (value.gameStatus == "false")
                                bool_game = false;
                        }
                        // console.log(chambres.chambre1.length );
                        break;
                    case 1:
                        for (let value of data.chambre2) {
                            if (value.gameStatus == "false")
                                bool_game = false;
                        }
                        break;
                    case 2:
                        for (let value of data.chambre3) {
                            if (value.gameStatus == "false")
                                bool_game = false;
                        }
                        break;
                }
            }
        });
        this.gameStatus = bool_game;


        let centreCartes;
        let order;
        let lastper
        $.ajax({
            url: "room.json",
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {

                switch (idRoom) {
                    case 0:
                        order = data.chambre1[0]['order'];
                        centreCartes = data.chambre1[0]['cartesCentre'];
                        lastper = data.chambre1[0]['lastper'];
                        // console.log(chambres.chambre1.length );
                        break;
                    case 1:
                        order = data.chambre2[0]['order'];
                        centreCartes = data.chambre2[0]['cartesCentre'];
                        lastper = data.chambre2[0]['lastper'];
                        break;
                    case 2:
                        order = data.chambre3[0]['order'];
                        centreCartes = data.chambre3[0]['cartesCentre'];
                        lastper = data.chambre3[0]['lastper'];
                        break;
                }
            }
        });
        this.order = order;
        this.centreCartes = centreCartes;
        this.lastper = lastper;

    }


    getPlayers() {
        return this.#players;
    }


    distribuer() {
        if (!this.gameStatus && this.#players.length == 4) {
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
        //
        if (this.gameStatus && this.#players.length == 4 && this.#players[this.order].name == this.username) {

            let idSouth = document.getElementById("south");
            let listSouth = idSouth.children;
          //  console.log(listSouth[0].style.bottom);
            let listMontrer=[];
            for(let i =0 ; i<listSouth.length;i++){
                if (listSouth[i].style.bottom == "25px"){
                    listMontrer.push(listSouth[i].alt);
                }
            }
            if (listMontrer.length <=1){

                let data = encodeURI(JSON.stringify(listMontrer));
                console.log("WHAT IS THE DATA:")
                console.log(data);

                let urllink = "idRoom=" + this.idRoom + "&listMontrer=" + data+"&username="+this.username;
                $.get("montrer.php", urllink, function (data) {
                    console.log("THIS IS: ");
                    console.log(data);
                });







// 需要在 Vueplayer要 调用同类 函数
            let index;
            for (let i = 0; i < this.#players.length; i++) {
                console.log(this.#players[i].name);
                if (this.#players[i].name == this.username) {
                    index = i;
                    // break;
                }
            }
            let listPosition = [];
            for (let i = 0; i < 4; i++) {
                if (index == 4)
                    index = 0;
                listPosition.push(index);
                index = index + 1;

            }
//
            let indexMark;
            let idWest = document.getElementById('west');
            let idNorth = document.getElementById('north');
            let idEast = document.getElementById('east');
            let idMark = document.getElementById("idMark");
            console.log(idMark);
            idMark.remove();
            if (this.order == 3) {
                this.order = 0;
            } else {
                this.order = this.order + 1;
            }












                switch (this.order) {
                case listPosition[0]:
                    //南部 增加一个标志
                    indexMark = document.createElement("img");
                    indexMark.src = "./images/mark_sud.png";
                    indexMark.id = "idMark";
                    indexMark.style.zIndex = "10";
                    indexMark.style.position = "absolute";
                    indexMark.style.height = "32%";
                    indexMark.style.left = "775px";
                    indexMark.style.bottom = "170px";

                    idSouth.appendChild(indexMark);
                    break;
                case listPosition[1]:
                    //西部
                    indexMark = document.createElement("img");
                    indexMark.src = "./images/mark_west.png";
                    indexMark.id = "idMark";
                    indexMark.style.zIndex = "10";
                    indexMark.style.position = "absolute";
                    indexMark.style.height = "8.00%";
                    indexMark.style.left = "130px";
                    indexMark.style.top = "250px";
                    idWest.appendChild(indexMark);

                    break;
                case listPosition[2]:
                    //北部
                    indexMark = document.createElement("img");
                    indexMark.src = "./images/mark_north.png";
                    indexMark.id = "idMark";
                    indexMark.style.zIndex = "10";
                    indexMark.style.position = "absolute";
                    indexMark.style.height = "10.45%";
                    indexMark.style.left = "775px";
                    indexMark.style.top = "160px";

                    idNorth.appendChild(indexMark);
                    break;
                case  listPosition[3] :
                    //东
                    indexMark = document.createElement("img");
                    indexMark.src = "./images/mark_east.png";
                    indexMark.id = "idMark";
                    indexMark.style.zIndex = "10";
                    indexMark.style.position = "absolute";
                    indexMark.style.height = "8.00%";
                    indexMark.style.right = "130px";
                    indexMark.style.top = "250px";

                    idEast.appendChild(indexMark);
                    break;

            }

            this.gagner();
            this.autorefreshPlayers();

        }
        }
    }

    gagner() {
        // gagner 紧接 montrer后直接运行
        // room.json zhong user有一个 数据是 分数；
        // 运行前提是 gameStatus 状态为 true
        // 1。 当用户退出后 分数归0
        //2。 用户分别出完 得分是 10， 5，2，0
        // 10分当判断json 别的用户手里都有牌的情况下 为10 有一个人是空为5 有2个人是 2 场上3个人都无牌自动判别为空
        let idroom = this.idRoom;
        let username = this.username;
        $.ajax({
                url: 'gagner.php',
                type: "get",
                dataType: "text",
                async: false,
                data: {"idRoom": idroom, "username": username},
                success: function (data) {
                    console.log(data);
                },
                error: function () {
                    console.log("fail");
                }
            }
        );
    }

    envoyerMsg(msg) {
        console.log("start ajax");
        let idroom = this.idRoom;
        let username = this.username;
        $.ajax({
                url: 'envoyerMsg.php',
                type: "get",
                dataType: "text",
                async: false,
                data: {"message": msg, "idRoom": idroom,"username":username},
                success: function (data) {
                    console.log(data);
                },
                error: function () {
                    console.log("fail");
                }
            }
        );
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
            carte2[i] = new Carte(Symbol.Coeurs, "CartesAJouer/carte_Coeurs_" + (i + 1) + ".png", "CartesAJouer/carte_Autres_3.png", (i + 14), Couleur.Rouge, 0, 0, false);

        for (let i = 0; i < 13; i++)
            carte3[i] = new Carte(Symbol.Piques, "CartesAJouer/carte_Piques_" + (i + 1) + ".png", "CartesAJouer/carte_Autres_3.png", (i + 27), Couleur.Noir, 0, 0, false);

        for (let i = 0; i < 13; i++)
            carte4[i] = new Carte(Symbol.Trefles, "CartesAJouer/carte_Trefles_" + (i + 1) + ".png", "CartesAJouer/carte_Autres_3.png", (i + 40), Couleur.Noir, 0, 0, false);

        carte5[0] = new Carte(Symbol.Joker, "CartesAJouer/carte_Autres_1.png", "CartesAJouer/carte_Autres_3.png", 53, Couleur.Noir, 0, 0, false);
        carte5[1] = new Carte(Symbol.Joker, "CartesAJouer/carte_Autres_2.png", "CartesAJouer/carte_Autres_3.png", 54, Couleur.Rouge, 0, 0, false);
        this.#cartes.push(carte1, carte2, carte3, carte4, carte5);

    }

    getlistCartesByPlayers() {

        let idRoom = this.idRoom;
        let username = this.username;
        console.log("idRoom: " + idRoom + " username: " + username);
        console.log("Players: " + this.#players[0].name);
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
                        for (let i = 0; i < 4; i++) {
                            switch (data.chambre1[i].name) {
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

                        break;
                    case 1:
                        for (let i = 0; i < 4; i++) {
                            switch (data.chambre2[i].name) {
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
                        for (let i = 0; i < 4; i++) {
                            switch (data.chambre3[i].name) {
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


    #tansfertCartes(...listInt) {

        listInt[0].sort(function (i, j) {
            return i - j
        });


        let listA = [];
        let list2 = [];
        let listK = [];
        let list3_Q = [];
        let listJoker = [];


        for (let i = 0; i < listInt[0].length; i++) {
            switch (listInt[0][i] % 13) {
                case 0:
                    listK.push(listInt[0][i]);
                    break;
                case 1:
                    if (Math.trunc(listInt[0][i] / 13) == 4)
                        listJoker.splice(0, 0, listInt[0][i]);
                    else
                        listA.push(listInt[0][i]);
                    break;
                case 2:
                    if (Math.trunc(listInt[0][i] / 13) == 4)
                        listJoker.push(listInt[0][i]);
                    else
                        list2.push(listInt[0][i]);
                    break;
                default:
                    let val = listInt[0][i] % 13;
                    let index = 0;
                    for (let j = list3_Q.length - 1; j >= 0; j--) {
                        if (val >= list3_Q[j] % 13) {
                            index = j + 1;
                            break;
                        }
                    }
                    list3_Q.splice(index, 0, listInt[0][i]);
                    break;


            }


        }
        console.log(list3_Q);
        listInt[0] = (((list3_Q.concat(listK)).concat(listA)).concat(list2)).concat(listJoker);

        //   console.log("ListInt: ");
        //   console.log(listInt[0]);
        //console.log(this.#cartes);
        /// console.log("len: " + listInt[0].length);
        let res = [];
        for (let i = 0; i < listInt[0].length; i++) {
            let col;
            let row;
            if (listInt[0][i] % 13 == 0) {
                col = 12;
                row = Math.trunc(listInt[0][i] / 13) - 1;

            } else {
                col = listInt[0][i] % 13 - 1;
                row = Math.trunc(listInt[0][i] / 13);
            }

            //   console.log("row : "+ row+" col : "+col);
            let carte = this.#cartes[row][col];

            res.push(carte);

        }

        return res;
    }

    getCartes(){
        return this.#cartes;
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
        imageCentreFond.style.position = "absolute";
        imageCentreFond.style.zIndex = "2";

        var textarea = document.createElement("textarea");
        textarea.style.zIndex = "2";
        textarea.style.position = "absolute";
        textarea.style.left = "280px";
        textarea.style.top =" 325px;"
        textarea.style.width = "250px";
        textarea.cols = 30;
        textarea.rows = 10;
        textarea.readOnly = true;
        textarea.name = "rulebox";
        textarea.style.overflow = "auto";
        textarea.style.resize = "none";
        textarea.style.userSelect ="none";
        textarea.value="Jouez aux cartes à tour de rôle, chaque joueur ne peut jouer qu'une seule carte à la fois. Les cartes jouées doivent être plus grand que celles sur la table.\n" +
            "Lorsqu'un joueur n'a aucune carte en main, il gagne. \n1er: +5 points 2eme:+3 points 3eme: +1 points";






        var idImageCentreFond = document.getElementById('imageCentreFond');

        idImageCentreFond.appendChild(imageCentreFond);
        idImageCentreFond.appendChild(textarea);


    }

}


class VueChatRoom extends Observer {
    #imageFond;
    #height;
    #width;
    #modele;
    #positionX;
    #positionY;
    #listMsg;

    constructor(modele) {
        super();
        modele.ajouteObserver(this);
        this.#modele = modele;
        this.#imageFond = './images/chatRoomFond.png';
        this.#height = "200px";
        this.#width = "400px";
        this.#positionX = "200px";
        this.#positionY = "32px";
        this.#listMsg = [];
        this.#dessiner();
    }

    update() {
        this.#redessiner();
    }

    #dessiner() {
        var div = document.createElement("div");
        var idchatRoom = document.getElementById('imageFond');
        idchatRoom.appendChild(div);
        var imgFond = document.createElement("img");
        imgFond.src = this.#imageFond;
        imgFond.style.zIndex = "1";
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
        //

        var textarea = document.createElement("textarea");
        textarea.id = "textbox";
        textarea.cols = 40;
        textarea.rows = 10;
        textarea.readOnly = true;
        textarea.name = "textbox";
        textarea.style.zIndex = "3";
        textarea.style.overflow = "auto";
        textarea.style.resize = "none";
        textarea.style.position = "absolute";
        textarea.style.left = "200px";
        textarea.style.bottom = "31px";
        textarea.style.width = "400px";
        textarea.style.height = "177px";
        textarea.style.background = "transparent";
        textarea.style.borderStyle = "none";
        textarea.value
        div.appendChild(textarea);

        // 绑定 enter 事件
        let modele = this.#modele;
        input.onkeydown = function (e) {
            if (e.keyCode === 13) {
                console.log("Enter!!!");
                console.log(input.value);
                if (input.value != "")
                    modele.envoyerMsg(input.value);

                //  textarea.value = textarea.value+"> "+input.value+"\n";
                input.value = "";
            }
        }
        div.appendChild(input);


    }

    #redessiner() {
        // var context = document.getElementById('textbox');
        let idRoom = this.#modele.idRoom;
        let msg;
        $.ajax({
            url: "messages.json",
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    if (idRoom == data[i]['idRoom']) {
                        msg = data[i]['messages'];
                        break;
                    }

                }

            }
        });

        if (this.#listMsg.length < msg.length) {

            let context;
            for (let i = 0; i < msg.length - this.#listMsg.length; i++) {
                context = $("#textbox").append(msg[this.#listMsg.length + i] + "\n");
            }
            this.#listMsg = msg;
            context.scrollTop(context[0].scrollHeight - context.height());

        } else if (this.#listMsg.length > msg.length) {
            $("#textbox").empty();
            this.#listMsg = msg;
        }


    }

}


class Controleur {
    modele;

    constructor(modele) {
        this.modele = modele;


    }

    distribuer() {
        //当gamestatus 为false 才能运行
        this.modele.distribuer();
    }

    montrer() {
        //运行前提是 gameStatus 状态为 true
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
            //当gamestatus 为false 才能运行

            modele.distribuer();
        }


        // create button montrer
        this.#bt_montrer = document.createElement("button");
        var idBtnm = document.getElementById("buttons");
        this.#bt_montrer.innerHTML = 'montrer';
        this.#bt_montrer.onclick = function () {
            modele.montrer();

        }
        // .addEventListener("click", this.#modele.montrer);

        idBtnd.appendChild(this.#bt_distribuer);
        idBtnm.appendChild(this.#bt_montrer);


    }

}


class VuePlayers extends Observer {
    #Players;
    #modele;
    #imageProfile;
    #order;
     indexPos;

    constructor(modele) {
        super();
        this.#modele = modele;
        this.#Players = modele.getPlayers();
        this.#imageProfile = './images/profile.png'
        this.#dessiner();
        this.#modele.ajouteObserver(this);
        this.#order  =0;
        this.indexPos = 0;

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
        $.ajax({
            url: "room.json",
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {

                switch (idRoom) {
                    case 0:
                        nbPer = data.chambre1.length;
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

        var imageProfile2 = document.createElement("img");
        imageProfile2.src = this.#imageProfile;
        imageProfile2.id = "profile_south";
        var idImageProfile2 = document.getElementById('south');
        imageProfile2.style.height = "50%";
        idImageProfile2.appendChild(imageProfile2);

        //
        // var playerNameSouth = document.createElement('h3');
        // playerNameSouth.id = "playerNameSouth";
        // var nameSouth = document.createTextNode(this.#modele.username);
        // playerNameSouth.appendChild(nameSouth);
        // playerNameSouth.style.zIndex ="10";
        // playerNameSouth.style.top = "0";
        // playerNameSouth.style.position ="absolute";
        // playerNameSouth.style.left = "680px";
        // idImageProfile2.appendChild(playerNameSouth);



        if (nbPer > 1) {
            // let players =  this.#modele.getPlayers();
            // let indexSud = 0;
            // let indexWest ;
            // for (let i = 0; i < players.length; i++) {
            //         if (players[i].name == this.#modele.username)
            //             indexSud = i;
            // }
            //
            // if (indexSud==players.length-1){
            //     indexWest = 0;
            // }else {
            //     indexWest = indexSud+1;
            //     console.log(indexSud+" west "+indexWest);
            // }

            var imageProfile3 = document.createElement("img");
            imageProfile3.src = this.#imageProfile;
            imageProfile3.id = "profile_west";
            var idImageProfile3 = document.getElementById('west');
            imageProfile3.style.width = "50%";
            idImageProfile3.appendChild(imageProfile3);

            // var playerNameWest = document.createElement('h3');
            // playerNameWest.id = "playerNameWest";
            // var nameWest = document.createTextNode(players[indexWest].name);
            // playerNameWest.appendChild(nameWest);
            // playerNameWest.style.zIndex ="10";
            // playerNameWest.style.top = "460px";
            // playerNameWest.style.position ="absolute";
            // playerNameWest.style.left = "65px";
            // idImageProfile3.appendChild(playerNameWest);

            if (nbPer > 2) {
                // let indexNorth;
                // if (indexWest==players.length-1){
                //     indexNorth = 0;
                // }else {
                //     indexNorth = indexWest+1;
                //
                // }
                var imageProfile = document.createElement("img");
                imageProfile.src = this.#imageProfile;
                imageProfile.id = "profile_north";
                var idImageProfile = document.getElementById('north');
                imageProfile.style.height = "50%";
                idImageProfile.appendChild(imageProfile);
                console.log("TIME2 " + this.#Players.length);

                // var playerNameNorth = document.createElement('h3');
                // playerNameNorth.id ="playerNameNorth";
                // var nameNorth = document.createTextNode(players[indexNorth].name);
                // playerNameNorth.appendChild(nameNorth);
                // playerNameNorth.style.zIndex ="10";
                // playerNameNorth.style.top = "90px";
                // playerNameNorth.style.position ="absolute";
                // playerNameNorth.style.left = "790px";
                // idImageProfile.appendChild(playerNameNorth);



                if (nbPer > 3) {

                    // let indexEast;
                    // if (indexNorth==players.length-1){
                    //     indexEast = 0;
                    // }else {
                    //     indexEast = indexNorth+1;
                    //
                    // }

                    var imageProfile4 = document.createElement("img");
                    imageProfile4.src = this.#imageProfile;
                    imageProfile4.id = "profile_east";
                    var idImageProfile4 = document.getElementById('east');
                    imageProfile4.style.width = "50%";
                    idImageProfile4.appendChild(imageProfile4);

                    // var playerNameEast = document.createElement('h3');
                    // playerNameEast.id = "playerNameEast";
                    // var nameEast = document.createTextNode(players[indexEast].name);
                    // playerNameEast.appendChild(nameEast);
                    // playerNameEast.style.zIndex ="10";
                    // playerNameEast.style.top = "460px";
                    // playerNameEast.style.position ="absolute";
                    // playerNameEast.style.right = "65px";
                    //
                    // idImageProfile4.appendChild(playerNameEast);



                }
            }


        }

    }


    #redessiner() {

        let oldPlayers = this.#modele.getPlayers();

        this.#modele.autorefreshPlayers();
      //  console.log("modele gameStatu: "+ this.#modele.gameStatus);
        this.#Players = this.#modele.getPlayers();

        let del1 = document.getElementById('south');
        let del2 = document.getElementById('west');
        let del3 = document.getElementById('east');
        let del4 = document.getElementById('north');
        if (this.#Players.length < 4 || !this.#modele.gameStatus) {
            if (this.#modele.timer == 1) {
                oldPlayers = this.#modele.getPlayers();
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
                console.log("TIME1 " + this.#Players.length);
            }
            this.#modele.timer = 0;
            if (oldPlayers.length > this.#Players.length) {
                let val = oldPlayers.length - this.#Players.length;


                if (document.getElementById('profile_east') && val > 0) {
                    document.getElementById('profile_east').remove();
                    val = val - 1;
                }
                if (document.getElementById('profile_north') && val > 0) {
                    document.getElementById('profile_north').remove();
                    val = val - 1;
                }
                if (document.getElementById('profile_west') && val > 0) {
                    document.getElementById('profile_west').remove();

                }

            } else {
                let val = this.#Players.length - oldPlayers.length;

                if (val > 0 && document.getElementById('profile_west') === null) {
                    let imageProfile = document.createElement("img");
                    imageProfile.src = this.#imageProfile;
                    imageProfile.id = "profile_west";
                    let idImageProfile = document.getElementById('west');
                    imageProfile.style.width = "50%";
                    idImageProfile.appendChild(imageProfile);
                    val = val - 1;


                }
                if (val > 0 && document.getElementById('profile_north') === null) {




                    let imageProfile = document.createElement("img");
                    imageProfile.src = this.#imageProfile;
                    imageProfile.id = "profile_north";
                    let idImageProfile = document.getElementById('north');
                    imageProfile.style.height = "50%";
                    idImageProfile.appendChild(imageProfile);
                    val = val - 1;



                }
                if (document.getElementById('profile_east') === null && val > 0) {


                    let imageProfile = document.createElement("img");
                    imageProfile.src = this.#imageProfile;
                    imageProfile.id = "profile_east";
                    let idImageProfile = document.getElementById('east');
                    imageProfile.style.width = "50%";
                    idImageProfile.appendChild(imageProfile);
                }
            }


        } else {

            if (this.#modele.timer == 0) {

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
                let nouvelOrder = this.#modele.order;
                if (this.#order != nouvelOrder){
                    this.#order = nouvelOrder;

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

                    if(document.getElementById("centreFondCartes"))
                        document.getElementById("centreFondCartes").remove();

                    let centreFondCartes  = document.createElement("div");
                    centreFondCartes.id = "centreFondCartes";
                    centreFondCartes.style.position = "absolute";
                    centreFondCartes.style.zIndex = "3";

                    let centreCartes = new Array();
                    for (let i = 0; i < this.#modele.centreCartes.length; i++) {
                        let col;
                        let row;
                        if (this.#modele.centreCartes[i] % 13 == 0) {
                            col = 12;
                            row = Math.trunc(this.#modele.centreCartes[i] / 13) - 1;

                        } else {
                            col = this.#modele.centreCartes[i] % 13 - 1;
                            row = Math.trunc(this.#modele.centreCartes[i]  / 13);
                        }

                        //   console.log("row : "+ row+" col : "+col);
                        let carte = this.#modele.getCartes()[row][col];

                        centreCartes.push(carte);

                    }

                    for (let i =0; i<centreCartes.length; i++ ){
                            let imgCarte = document.createElement("img");
                            imgCarte.src = ""+centreCartes[i].image;
                            imgCarte.alt = ""+centreCartes[i].valuer;
                            imgCarte.style.zIndex = "auto";
                        imgCarte.style.position = "absolute";
                        imgCarte.style.left = (10+25*i )+"px";
                        imgCarte.style.top = (35-10*i )+"px";
                        imgCarte.style.height = "150px";
                        centreFondCartes.appendChild(imgCarte);

                    }


                    document.getElementById("imageCentreFond").appendChild(centreFondCartes);







                }
                //删除 除自己手牌外的所有卡牌
                //如果order 改变则 进行手牌 和 标志 以及 中心区域的更新
                //
                //
               // console.log("update ");
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
        let idWest = document.getElementById('west');
        let idNorth = document.getElementById('north');
        let idEast = document.getElementById('east');


        // let div = document.createElement("div");
        // idSouth.appendChild(div);
        // 找南的位置是players的几
        let index;
        for (let i = 0; i < this.#modele.getPlayers().length; i++) {
            console.log(this.#modele.getPlayers()[i].name);
            if (this.#modele.getPlayers()[i].name == this.#modele.username) {
                index = i;
                // break;
            }
        }
        let listPosition = [];
        for (let i = 0; i < 4; i++) {
            if (index == 4)
                index = 0;
            listPosition.push(index);
            index = index + 1;

        }
//
        let indexMark;



        switch (this.#modele.order) {
            case listPosition[0]:
                //南部 增加一个标志
                indexMark = document.createElement("img");
                indexMark.src = "./images/mark_sud.png";
                indexMark.id = "idMark";
                indexMark.style.zIndex = "10";
                indexMark.style.position = "absolute";
                indexMark.style.height = "32%";
                indexMark.style.left = "775px";
                indexMark.style.bottom = "170px";
                idSouth.appendChild(indexMark);
                break;
            case listPosition[1]:
                //西部
                indexMark = document.createElement("img");
                indexMark.src = "./images/mark_west.png";
                indexMark.id = "idMark";
                indexMark.style.zIndex = "10";
                indexMark.style.position = "absolute";
                indexMark.style.height = "8.00%";
                indexMark.style.left = "130px";
                indexMark.style.top = "250px";

                idWest.appendChild(indexMark);

                break;
            case listPosition[2]:
                //北部
                indexMark = document.createElement("img");
                indexMark.src = "./images/mark_north.png";
                indexMark.id = "idMark";
                indexMark.style.zIndex = "10";
                indexMark.style.position = "absolute";
                indexMark.style.height = "10.45%";
                indexMark.style.left = "775px";
                indexMark.style.top = "160px";

                idNorth.appendChild(indexMark);
                break;
            case  listPosition[3] :
                //东
                indexMark = document.createElement("img");
                indexMark.src = "./images/mark_east.png";
                indexMark.id = "idMark";
                indexMark.style.zIndex = "10";
                indexMark.style.position = "absolute";
                indexMark.style.height = "8.00%";
                indexMark.style.right = "130px";
                indexMark.style.top = "250px";


                idEast.appendChild(indexMark);
                break;

        }


        var idImageProfile2 = document.getElementById('south');
        var playerNameSouth = document.createElement('h3');
        playerNameSouth.id = "playerNameSouth";
        var nameSouth = document.createTextNode(this.#modele.username);
        playerNameSouth.appendChild(nameSouth);
        playerNameSouth.style.zIndex ="10";
        playerNameSouth.style.top = "-50px";
        playerNameSouth.style.position ="absolute";
        playerNameSouth.style.left = "680px";
        idImageProfile2.appendChild(playerNameSouth);


        for (let i = 0; i < cartes[0].length; i++) {


            let divSouth = document.createElement("img");
            divSouth.src = "" + cartes[0][i].image;
            divSouth.alt = "" + cartes[0][i].valuer;
            divSouth.style.zIndex = "" + (i + 1);
            divSouth.style.position = "absolute";
            divSouth.style.left = (800 - (100 + 25 * (cartes[0].length - 1)) / 2 + 25 * i) + "px";
            //divSouth.style.top = "10px";
            divSouth.style.height = "75%";
            divSouth.style.bottom = "0px";
            divSouth.onclick = function () {
                if (divSouth.style.bottom == "0px") {
                    divSouth.style.bottom = "25px";
                } else {
                    divSouth.style.bottom = "0px";
                }
            };
            //div.appendChild(divSouth);
            idSouth.appendChild(divSouth);

        }

        let players = this.#modele.getPlayers();
        //西面
        var idImageProfile3 = document.getElementById('west');
        var playerNameWest = document.createElement('h3');
        playerNameWest.id = "playerNameWest";
        var nameWest = document.createTextNode(players[listPosition[1]].name);
        playerNameWest.appendChild(nameWest);
        playerNameWest.style.zIndex ="10";
        playerNameWest.style.top = "350px";
        playerNameWest.style.position ="absolute";
        playerNameWest.style.left = "150px";
        idImageProfile3.appendChild(playerNameWest);







        for (let j = 0; j < cartes[1].length; j++) {
            let divWest = document.createElement("img");
            divWest.src = "" + cartes[1][j].imagefond;
            divWest.style.zIndex = "" + (j + 1);
            divWest.style.position = "absolute";
            divWest.style.left = "20px";
            divWest.style.top = (100 + 40 * j) + "px";
            divWest.style.height = "24.45%";
            idWest.appendChild(divWest);

        }


        var idImageProfile = document.getElementById('north');
        var playerNameNorth = document.createElement('h3');
        playerNameNorth.id ="playerNameNorth";
        var nameNorth = document.createTextNode(players[listPosition[2]].name);
        playerNameNorth.appendChild(nameNorth);
        playerNameNorth.style.zIndex ="10";
        playerNameNorth.style.top = "150px";
        playerNameNorth.style.position ="absolute";
        playerNameNorth.style.left = "700px";
        idImageProfile.appendChild(playerNameNorth);




        for (let j = 0; j < cartes[2].length; j++) {
            let divNorth = document.createElement("img");
            divNorth.src = "" + cartes[2][j].imagefond;
            divNorth.style.zIndex = "" + (j + 1);
            divNorth.style.position = "absolute";
            divNorth.style.height = "24.45%";
            divNorth.style.left = (800 - (100 + 25 * (cartes[0].length - 1)) / 2 + 25 * j) + "px";
            divNorth.style.top = "0px";
            idNorth.appendChild(divNorth);

        }


        var idImageProfile4 = document.getElementById('east');
        var playerNameEast = document.createElement('h3');
        playerNameEast.id = "playerNameEast";
        var nameEast = document.createTextNode(players[listPosition[3]].name);
        playerNameEast.appendChild(nameEast);
        playerNameEast.style.zIndex ="10";
        playerNameEast.style.top = "350px";
        playerNameEast.style.position ="absolute";
        playerNameEast.style.right = "150px";

        idImageProfile4.appendChild(playerNameEast);



        for (let j = 0; j < cartes[3].length; j++) {
            let divEast = document.createElement("img");
            divEast.src = "" + cartes[3][j].imagefond;
            divEast.style.zIndex = "" + (j + 1);
            divEast.style.position = "absolute";
            divEast.style.right = "20px";
            divEast.style.top = (100 + 40 * j) + "px";
            divEast.style.height = "24.45%";
            idEast.appendChild(divEast);

        }


    }
}

class VueTabAffichage extends Observer {
    #modele
    #tableWidth;
    #tableHeight;
    noteString;


    constructor(modele) {
        super();
        this.#modele = modele;
        this.#dessiner();
        this.#modele.ajouteObserver(this);
        this.noteString = "";

    }

    update() {
        this.#redessiner();
    }

    #dessiner() {

        var idTabLeft = document.getElementById("webLeft");
        var idTabRight = document.getElementById("webRight");
        idTabLeft.style.position = "absolute";
        idTabLeft.style.left = "0px";
        idTabLeft.style.top ="20px";
        idTabLeft.style.zIndex ="2";
        //1413 * 856
        idTabLeft.style.width = "20px";
         idTabLeft.style.height = "800px"
        idTabRight.style.position ="absolute";
        idTabRight.style.right ="0px";
        idTabRight.style.width = "20px";
        idTabRight.style.height = "800px";
        idTabRight.style.top ="20px";
        idTabRight.style.zIndex ="2";
        // idTabLeft.style.backgroundColor = "red";
        // idTabRight.style.backgroundColor = "red";


        let idRoom = this.#modele.idRoom;
        idTabLeft.onmouseover = function (event){
            let res = "";
            $.ajax({
                url: "room.json",
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {

                    switch (idRoom) {
                        case 0:
                            for (let value of data.chambre1) {
                                res  = res+ value.name +"  note: "+value.note +"\n";
                                console.log("name :"+value.name+"  note: "+value.note);

                            }
                            // console.log(chambres.chambre1.length );
                            break;
                        case 1:
                            for (let value of data.chambre2) {
                                res  = res+ value.name +"  note: "+value.note+"\n";
                                console.log("name :"+value.name+"  note: "+value.note);
                            }
                            break;
                        case 2:
                            for (let value of data.chambre3) {
                                res  = res+ value.name +"  note: "+value.note+"\n";
                                console.log("name :"+value.name+"  note: "+value.note);
                            }
                            break;
                    }
                }
            });
            alert( res);
        }
        idTabRight.onmouseover = function (event){
            let res = "";
            $.ajax({
                url: "room.json",
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {

                    switch (idRoom) {
                        case 0:
                            for (let value of data.chambre1) {
                                res  = res+ value.name +"  note: "+value.note +"\n";
                                console.log("name :"+value.name+"  note: "+value.note);

                            }
                            // console.log(chambres.chambre1.length );
                            break;
                        case 1:
                            for (let value of data.chambre2) {
                                res  = res+ value.name +"  note: "+value.note+"\n";
                                console.log("name :"+value.name+"  note: "+value.note);
                            }
                            break;
                        case 2:
                            for (let value of data.chambre3) {
                                res  = res+ value.name +"  note: "+value.note+"\n";
                                console.log("name :"+value.name+"  note: "+value.note);
                            }
                            break;
                    }
                }
            });
            alert( res);
        }




    }

    #redessiner() {

    }



}


class CVue {
    #VueChatRoom
    #VueCommandes
    #VueFond
    #VuePlayers
    #VueTabAffichage
    #modele;

    constructor(modele) {
        this.#VueFond = new VueFond(modele);
        this.#VueChatRoom = new VueChatRoom(modele);
        this.#VuePlayers = new VuePlayers(modele);
        this.#modele = modele;
        this.#VueCommandes = new VueCommandes(modele);
        this.#VueTabAffichage = new VueTabAffichage(modele);
        this.#modele.notifieObservers();


    }

    notifier() {
        this.#modele.notifieObservers();


    }

}
