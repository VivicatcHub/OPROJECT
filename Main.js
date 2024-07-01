var WHERE = parseInt(localStorage.getItem(`Where${ANIME}`));
var MODIF = localStorage.getItem('Modif');
var I = localStorage.getItem('I');
if (I === null) {
    I = 1;
    localStorage.setItem('I', I);
}
var II = localStorage.getItem('II');
if (II === null) {
    II = 1;
    localStorage.setItem('II', II);
}
var CHAR = (new URLSearchParams(window.location.search)).get('char');
var CHAP = (new URLSearchParams(window.location.search)).get('chap');
var LIEU = (new URLSearchParams(window.location.search)).get('lieu');


async function RecupSheetDatas(ID, TITLE, RANGE) {
    try {
        const Url = `https://docs.google.com/spreadsheets/d/${ID}/gviz/tq?sheet=${TITLE}&range=${RANGE}`;
        const Response = await fetch(Url);
        const Text = await Response.text();
        const Data = JSON.parse(Text.substr(47).slice(0, -2));
        return Data;
    } catch (error) { throw error; }
}

async function TraiterSheetDatas(DATA, WHERE, TYPE, SPE) {
    /*
    DATA (DICT): Données à traiter
    WHERE (INT): Chapitre actuel
    TYPE (STR): Catégorie (Main, Général, Perso...)
    SPE (BOOL): true - seulement le chapitre actuel
                false - chapitres d'avant également
    */
    if (TYPE === "Main") {
        return TraiterMainDatas(DATA)
    } else {
        if (WHERE !== 'None') {
            WHERE = parseInt(WHERE);
        }
        try {
            var Temp = 0;
            Datacolumns = DATA.table.cols.map(Element => Element.label);
            if (Datacolumns[0] == "") {
                Datacolumns = DATA.table.rows[0].c.map(Element => Element.v);
                Temp++;
            }
            let NewData = [];
            let WhereExist = 1;
            if (WHERE === 'None') { WhereExist = 0; }
            for (let i = Temp; i < DATA.table.rows.length; i++) {
                if ((SPE && DATA.table.rows[i].c[0].v == WHERE) || !SPE) {
                    // console.log(WHERE, DATA.table.rows[i].c[0].v, DATA.table.rows[i].c[1].v);
                    if (WhereExist === 1 && DATA.table.rows[i].c[0].v > WHERE) {
                        return [NewData, Datacolumns];
                    } else if (NewData[DATA.table.rows[i].c[WhereExist].v] !== undefined) {
                        for (let j = WhereExist + 1; j < Datacolumns.length; j++) {
                            if (DATA.table.rows[i].c[j] !== null && DATA.table.rows[i].c[j]['v'] !== null) {
                                TempData = StrToListSpe(DATA.table.rows[i].c[j].v);
                                for (let k = 0; k < TempData.length; k++) {
                                    if (NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]] === null) {
                                        NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]] = StrToList(TempData[k]);
                                    } else if (TempData[k][0] === "+") {
                                        NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]].push(TempData[k].slice(1).split(","));
                                    } else if (TempData[k].includes("=>")) {
                                        test = TempData[k].split("=>").map(item => item.split(","));
                                        for (let k = 0; k < NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]].length; k++) {
                                            const array1 = NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]][k];
                                            const array2 = test[0];
                                            if (array1.length === array2.length && array1.every((value, index) => value === array2[index])) {
                                                NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]][k] = test[1];
                                            } else if (array1 === array2[0]) {
                                                NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]][k] = test[1][0];
                                            }
                                        }
                                    } else {
                                        NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]] = StrToList(TempData[k]);
                                    }
                                }
                            }
                        }
                    } else {
                        NewData[DATA.table.rows[i].c[WhereExist].v] = {};
                        for (let j = WhereExist + 1; j < Datacolumns.length; j++) {
                            if (DATA.table.rows[i].c[j] !== null && DATA.table.rows[i].c[j]['v'] !== null) {
                                TempData = StrToListSpe(DATA.table.rows[i].c[j].v);
                                for (let k = 0; k < TempData.length; k++) {
                                    if (NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]] === undefined) {
                                        if (TempData[k].includes("=>")) {
                                            test = TempData[k].split("=>").map(item => item.split(","));
                                            NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]] = [test];
                                        } else if (TempData[k][0] === "+") {
                                            NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]] = [TempData[k].slice(1).split(",")];
                                        } else {
                                            NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]] = StrToList(TempData[k]);
                                        }
                                    } else {
                                        if (TempData[k].includes("=>")) {
                                            test = TempData[k].split("=>").map(item => item.split(","));
                                            NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]].push(test);
                                        } else if (TempData[k][0] === "+") {
                                            NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]].push(TempData[k].slice(1).split(","));
                                        } else {
                                            NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]].push(StrToList(TempData[k])[0]);
                                        }
                                    }
                                }
                            } else {
                                NewData[DATA.table.rows[i].c[WhereExist].v][Datacolumns[j]] = null;
                            }
                        }
                    }
                }
            }
            return [NewData, Datacolumns];
        } catch (error) { throw error; }
    }
}

// SPLIT PAR "," SI IL Y'EN A UNE
function StrToList(STR) {
    if (typeof STR === 'string') {
        if (STR.includes(",")) {
            return [STR.split(",")];
        } else {
            return [STR];
        }
    } else {
        return [STR.toString()];
    }
}

// SPLIT PAR "\" SI IL Y'EN A UNE
function StrToListSpe(STR) {
    if (typeof STR === 'string') {
        if (STR.includes("\\")) {
            //console.log(STR.split("\\"));
            return STR.split("\\");
        } else {
            return [STR];
        }
    } else {
        return [STR.toString()];
    }
}

function Ordre(VAL, CHAPTERS) {
    if (VAL === "") {
        return ""
    } else {
        return CHAPTERS[VAL]["Ordre"][0]
    }
}

// FONCTION POUR SAVOIR SI L'EVENEMENT EST ACTUEL
function InTime(STR, CHAP, CHAPTERS) {
    let Data = STR.replaceAll("?", "");
    Data = Data.split("-");
    return parseInt(Ordre(Data[0], CHAPTERS)) <= Ordre(CHAP, CHAPTERS) && (Ordre(Data[1], CHAPTERS) === "" || Ordre(CHAP, CHAPTERS) < parseInt(Ordre(Data[1], CHAPTERS)));
}

async function TraiterMainDatas(DATA) {
    try {
        Datacolumns = DATA.table.cols.map(element => element.label)
        let NewData = [];

        for (let i = 0; i < DATA.table.rows.length; i++) {
            NewData[DATA.table.rows[i].c[1].v] = DATA.table.rows[i].c[2].v;
        }
        return NewData;
    } catch (error) {
        throw error;
    }
}

async function DatasRange() {
    var Modif = localStorage.getItem('Modif');
    if (Modif === 'true') {
        try {
            var NewDatas = await RecupSheetDatas(SHEET_ID, "General", GENERAL_RANGE);
            var Datas = {};
            NewDatas.table.rows.forEach(element => {
                // console.log(element);
                Datas[element.c[0].v] = element.c[1].v;
            })
            // Supprimer la base de données existante
            indexedDB.deleteDatabase(`MaBaseDeDonnees${ANIME}_General`);

            // Réinitialiser la variable locale II à 1
            II = 1;
            localStorage.setItem('II', II);
            // console.log("datas:", Datas);
            var Request = indexedDB.open(`MaBaseDeDonnees${ANIME}_General`, II);

            Request.onupgradeneeded = function (event) {
                var Db = event.target.result;
                var ObjectStore = Db.createObjectStore('MonObjet', { keyPath: 'id', autoIncrement: true }); // Créer un objetStore (équivalent à une table dans une base de données relationnelle)
            };

            Request.onsuccess = function (event) {
                var Db = event.target.result;
                var Transaction = Db.transaction(['MonObjet'], 'readwrite'); // Commencer une transaction en mode lecture-écriture
                var ObjectStore = Transaction.objectStore('MonObjet'); // Récupérer l'objet store
                var NewRequest = ObjectStore.put(Datas);

                NewRequest.onsuccess = function (event) {
                    console.log("Objet General modifié avec succès !");
                };

                NewRequest.onerror = function (event) {
                    console.error("Erreur lors de l'ajout de l'objet General:", event.target.error);
                };
            };

            Request.onerror = function (event) {
                console.error("Erreur lors de l'ouverture de la base de données General:", event.target.error);
            };

        } catch (error) {
            console.error('Une erreur est survenue :', error);
        }
    } else {
        try {
            var Promesse = new Promise(function (Resolve, Reject) {
                var Request = indexedDB.open(`MaBaseDeDonnees${ANIME}_General`, II);

                Request.onsuccess = function (event) {
                    var Db = event.target.result; // Obtention de la référence à la base de données ouverte
                    var Transaction = Db.transaction(['MonObjet'], 'readonly'); // Utilisation de la base de données pour effectuer des opérations | par exemple, récupérer des données depuis un objet store
                    var OjectStore = Transaction.objectStore('MonObjet');
                    var GetRequest = OjectStore.get(1);

                    GetRequest.onsuccess = function (event) {
                        Datas = GetRequest.result;
                        // console.log("Récupération réussie pour : Général")
                        delete Datas.id;
                        Resolve(Datas);
                    };

                    GetRequest.onerror = function (event) {
                        console.error("Erreur lors de la récupération de l'objet Général:", event.target.error);
                        Reject(event.target.error);
                    };
                };

                Request.onerror = function (event) {
                    console.error("Erreur lors de l'ouverture de la base de données Général:", event.target.error);
                    Reject(event.target.error);
                };

                Request.onupgradeneeded = async function (event) {
                    MODIF = 'true';
                    localStorage.setItem('Modif', MODIF);
                    II++;
                    localStorage.setItem('II', II);
                    location.reload();
                };
            });
            Datas = await Promesse;
            return Datas;

        } catch (error) {
            console.error('Une erreur est survenue :', error);
            var NewDatas = await RecupSheetDatas(SHEET_ID, "General", GENERAL_RANGE);
            var Datas = {};
            NewDatas.table.rows.forEach(element => {
                // console.log(element);
                Datas[element.c[0].v] = element.c[1].v;
            })
            return Datas;
        }
    }

    return Datas;
}

function WhereOrNot(TYPE, WHERE) {
    switch (TYPE) {
        case "Main":
        case "Chapter":
            return 'None';
        default:
            return WHERE;
    }
}

async function DatasVictory(WHERE, SPE, DATAS) {
    var LISTE = [];
    Object.keys(DATAS).forEach(ele => {
        LISTE.push(ele);
    })
    var MODIF = localStorage.getItem('Modif');
    if (MODIF === 'true' || SPE === true) {
        try {
            var Dico = {};
            var promises = LISTE.map(async function (Element) { // Création d'un tableau de promesses
                Dico[Element] = await TraiterSheetDatas(await RecupSheetDatas(SHEET_ID, Element, DATAS[Element], false), await WhereOrNot(Element, WHERE), Element);
            });
            await Promise.all(promises); // Attendre que toutes les promesses se terminent

            if (SPE === false) {
                LISTE.forEach(function (Element) {
                    var Request = indexedDB.open(`MaBaseDeDonnees${ANIME}_${Element}`, I);

                    Request.onupgradeneeded = function (event) {
                        var Db = event.target.result;
                        var ObjectStore = Db.createObjectStore('MonObjet', { keyPath: 'id', autoIncrement: true }); // Créer un objetStore (équivalent à une table dans une base de données relationnelle)
                    };

                    Request.onsuccess = function (event) {
                        var Db = event.target.result;
                        var Transaction = Db.transaction(['MonObjet'], 'readwrite'); // Commencer une transaction en mode lecture-écriture
                        var ObjectStore = Transaction.objectStore('MonObjet'); // Récupérer l'objet store
                        Data = Dico[Element]; // Ajouter l'objet à l'objet store
                        // console.log("Data:", Data, Element);
                        Data["id"] = 1;
                        var NewRequest = ObjectStore.put(Data);

                        NewRequest.onsuccess = function (event) {
                            console.log("Objet modifié avec succès !");
                        };

                        NewRequest.onerror = function (event) {
                            console.error("Erreur lors de l'ajout de l'objet :", event.target.error);
                        };
                    };

                    Request.onerror = function (event) {
                        console.error("Erreur lors de l'ouverture de la base de données :", event.target.error, Element);
                    };
                });
            }

        } catch (error) {
            console.error('Une erreur est survenue :', error);
        }
        if (!SPE) {
            MODIF = false;
            localStorage.setItem('Modif', MODIF);
        }
    }
    else {
        var Dico = {};
        try {
            var Promesses = [];
            LISTE.forEach(function (Element) {
                var Promesse = new Promise(function (Resolve, Reject) {
                    var Request = indexedDB.open(`MaBaseDeDonnees${ANIME}_${Element}`, I);

                    Request.onsuccess = function (event) {
                        var Db = event.target.result; // Obtention de la référence à la base de données ouverte
                        var Transaction = Db.transaction(['MonObjet'], 'readonly'); // Utilisation de la base de données pour effectuer des opérations | par exemple, récupérer des données depuis un objet store
                        var ObjectStore = Transaction.objectStore('MonObjet');
                        var GetRequest = ObjectStore.get(1);

                        GetRequest.onsuccess = function (event) {
                            Dico[Element] = GetRequest.result;
                            // console.log("Récupération réussie pour :", Element)
                            Resolve();
                        };

                        GetRequest.onerror = function (event) {
                            console.error("Erreur lors de la récupération de l'objet :", event.target.error);
                            Reject(event.target.error);
                        };
                    };

                    Request.onerror = function (event) {
                        console.error("Erreur lors de l'ouverture de la base de données :", event.target.error);
                        Reject(event.target.error);
                    };

                    Request.onupgradeneeded = async function (event) {
                        MODIF = 'true';
                        localStorage.setItem('Modif', MODIF);
                        I++;
                        localStorage.setItem('I', I);
                        location.reload();
                    };
                });
                Promesses.push(Promesse);
            });
            await Promise.all(Promesses).catch(function (error) {
                console.error('Une erreur est survenue lors de la récupération des données :', error);
            });

        } catch (error) {
            console.error('Une erreur est survenue :', error);
            var Dico = {};
            var promises = LISTE.map(async function (Element) { // Création d'un tableau de promesses
                Dico[Element] = await TraiterSheetDatas(await RecupSheetDatas(SHEET_ID, Element, DATAS[Element], false), await WhereOrNot(Element, WHERE), Element);
            });
            await Promise.all(promises); // Attendre que toutes les promesses se terminent
            console.log(Dico);
            return Dico;
        }
    }

    return Dico;
}

function AfficherButtons(CHAP, WHERE, SUP) {
    var Text = "";
    CHAP = parseInt(CHAP);
    WHERE = parseInt(WHERE);
    if (CHAP - 10 > 1) {
        Text += `<a href="index.html?chap=1${SUP}"><button>1</button></a> ←`;
    }
    if (CHAP - 10 >= 1) {
        Text += `<a href="index.html?chap=${CHAP - 10}${SUP}"><button>${CHAP - 10}</button></a> -`;
    }
    if (CHAP - 1 >= 1) {
        Text += `<a href="index.html?chap=${CHAP - 1}${SUP}"><button>${CHAP - 1}</button></a> |`;
    }
    if (CHAP + 1 < WHERE) {
        Text += `| <a href="index.html?chap=${CHAP + 1}${SUP}"><button>${CHAP + 1}</button></a>`;
    }
    if (CHAP + 10 < WHERE) {
        Text += `- <a href="index.html?chap=${CHAP + 10}${SUP}"><button>${CHAP + 10}</button></a>`;
    }
    if (WHERE !== CHAP) {
        Text += `→ <a href="index.html?chap=${WHERE}${SUP}"><button>${WHERE}</button></a>`;
    }
    return Text;
}

async function General() {
    async function Afficher(TYPE, DATA, MAIN) {
        if (TYPE[DATA] === null || MAIN[DATA] === undefined) {
            return "";
        } else {
            let Affichage = [];
            MAIN[DATA].split("|").forEach(Type => {
                console.log("Affichage:", Type, TYPE[DATA]);
                switch (Type) {
                    case "Info":
                        if (MAIN[DATA] === "Info" && Array.isArray(TYPE[DATA])) {
                            var Temp = DATA + ":<br>"
                            TYPE[DATA].forEach(Element => {
                                Temp += Element + "<br>";
                            });
                            Affichage.push(Temp);
                        } else if (Array.isArray(TYPE[DATA])) {
                            Affichage.push(DATA + ":<br>" + TYPE[DATA][0][0]);
                        } else {
                            Affichage.push(DATA + ":<br>" + TYPE[DATA]);
                        }
                        break
                }
            });
            if (Affichage[0] !== undefined) {
                return Affichage.join("<br>");
            } else {
                return "";
            }
            if (MAIN[DATA] == "Info") {
                return DATA + ":<br>" + TYPE[DATA];
            } else if (MAIN[DATA].includes("|")) {
                let Affichage = [];
                if (MAIN[DATA] == "Info|Duree") {
                    for (let l = 0; l < TYPE[DATA].length; l++) {
                        if (InTime(TYPE[DATA][l][1], CHAP, ChapDatas) && Affichage[0] === undefined) {
                            Affichage.push(DATA + ":<br>" + TYPE[DATA][l][0]);
                        } else if (InTime(TYPE[DATA][l][1], CHAP, ChapDatas)) {
                            Affichage.push(TYPE[DATA][l][0]);
                        }
                    }
                } else if (MAIN[DATA] == "Info|Infos|Duree") {
                    for (let l = 0; l < TYPE[DATA].length; l++) {
                        if (InTime(TYPE[DATA][l][2], CHAP, ChapDatas) && Affichage[0] === undefined) {
                            Affichage.push(DATA + ":<br>" + TYPE[DATA][l][0] + "  -  " + TYPE[DATA][l][1]);
                        } else if (InTime(TYPE[DATA][l][2], CHAP, ChapDatas)) {
                            Affichage.push(TYPE[DATA][l][0] + "  -  " + TYPE[DATA][l][1]);
                        }
                    }
                } else if (MAIN[DATA] == "Lieu|Duree") {
                    for (let l = 0; l < TYPE[DATA].length; l++) {
                        if (InTime(TYPE[DATA][l][1], CHAP, ChapDatas) && Affichage[0] === undefined) {
                            Affichage.push(DATA + ":<br><a href='index.html?chap=" + CHAP + "&lieu=" + TYPE[DATA][l][0] + "'>" + LieuDatas[TYPE[DATA][l][0]]['Nom'] + "</a>");
                        } else if (InTime(TYPE[DATA][l][1], CHAP, ChapDatas)) {
                            Affichage.push("<a href='index.html?chap=" + CHAP + "&lieu=" + TYPE[DATA][l][0] + "'>" + LieuDatas[TYPE[DATA][l][0]]['Nom'] + "</a>");
                        }
                    }
                } else if (MAIN[DATA] == "Perso|Infos") {
                    for (let l = 0; l < TYPE[DATA].length; l++) {
                        if (Affichage[0] === undefined) {
                            Affichage.push(DATA + ":<br><a href='index.html?chap=" + CHAP + "&char=" + TYPE[DATA][l][0] + "'>" + PersoDatas[TYPE[DATA][l][0]]['Nom'] + "</a> (" + TYPE[DATA][l][1] + ")");
                        } else {
                            Affichage.push("<a href='index.html?chap=" + CHAP + "&char=" + TYPE[DATA][l][0] + "'>" + PersoDatas[TYPE[DATA][l][0]]['Nom'] + "</a> (" + TYPE[DATA][l][1] + ")");
                        }
                    }
                }
                if (Affichage[0] !== undefined) {
                    return Affichage.join("<br>");
                } else {
                    return "";
                }
            } else {
                return "";
            }
        }
    }
    Datas = await DatasRange();
    console.log("Datas:", Datas);

    try {
        let dicoReturn = await DatasVictory(WHERE, false, Datas);
        console.log("dicoReturn:", dicoReturn);
        var MainDatas = dicoReturn["Main"];
        var [PersoDatas, PersoDatasColumns] = dicoReturn["Perso"];
        var [LieuDatas, LieuDatasColumns] = dicoReturn["Lieu"];
        var [ChapDatas, ChapDatasColumns] = dicoReturn["Chapter"];

        // RIEN
        if (CHAP === null && CHAR === null && LIEU === null) {
            let Text = "";
            for (let k = 0; k <= WHERE; k++) {
                if (ChapDatas[k] !== undefined) {
                    if (ChapDatas[k]["Nom"] !== null) {
                        Text += `<a href="index.html?chap=${k}"><div class="chapter-line"><div class="chapter-number">${k}</div><div class="chapter-title">${ChapDatas[k]["Nom"]}<br></div></div></a>`;
                    } else {
                        Text += `<a href="index.html?chap=${k}"><div class="chapter-line"><div class="chapter-number">${k}</div><div class="chapter-title">Chapitre ${k}<br></div></div></a>`;
                    }
                }
            }
            // document.getElementById("Chapter_Title").innerHTML = `TOUS LES CHAPITRES<button id="toggleViewButton"><i class="fi fi-rr-apps-sort"></i></button>`;
            document.getElementById("Chapter_Data").innerHTML = Text;
            Text = "";
            for (let i = 0; i <= PersoDatas.length; i++) {
                if (PersoDatas[i] !== undefined) {
                    if (PersoDatas[i]["Image"] !== null) {
                        Text += `<a href="index.html?chap=${WHERE}&char=${i}"><div class="chapter-line"><div class="chapter-number"><img class="pitite" src="${PersoDatas[i]["Image"][0][0]}"></div><div class="chapter-title">${PersoDatas[i]["Nom"]}</div></div></a>`;
                    } else {
                        Text += `<a href="index.html?chap=${WHERE}&char=${i}"><div class="chapter-line"><div class="chapter-number"><img class="pitite" src="https://images.assetsdelivery.com/compings_v2/kritchanut/kritchanut1406/kritchanut140600093.jpg"></div><div class="chapter-title">${PersoDatas[i]["Nom"]}</div></div></a>`;
                    }
                }
            }
            document.getElementById("Perso_Data").innerHTML = Text;
            document.getElementById("Discord_Data").innerHTML = `<iframe src="https://discord.com/widget?id=1229847530737500220&theme=dark" width="100%" height="1000px" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>`;

            // CHAP
        } else if (CHAP !== null && CHAR === null && LIEU === null) {
            if (document.getElementById("container") !== undefined) { document.getElementById("container").remove(); }
            let Text = "Personnages du chapitre<br><div class='vu'>";
            if (ChapDatas[CHAP] !== null && ChapDatas[CHAP]["Personnages"] !== null && ChapDatas[CHAP]["Personnages"][0] !== null) {
                for (let k = 0; k <= ChapDatas[CHAP]["Personnages"][0].length; k++) {
                    if (PersoDatas[ChapDatas[CHAP]["Personnages"][0][k]] !== undefined && ChapDatas[CHAP]["Personnages"][0][k] !== undefined) {
                        if (PersoDatas[ChapDatas[CHAP]["Personnages"][0][k]]["Image"] !== null) {
                            Text += `<p><a href="index.html?chap=${CHAP}&char=${ChapDatas[CHAP]["Personnages"][0][k]}"><img class="apercu" src="${PersoDatas[ChapDatas[CHAP]["Personnages"][0][k]]["Image"][0][0]}">${PersoDatas[ChapDatas[CHAP]["Personnages"][0][k]]["Nom"]}</a></p>`;
                        } else {
                            Text += `<p><a href="index.html?chap=${CHAP}&char=${ChapDatas[CHAP]["Personnages"][0][k]}"><img class="apercu" src="https://images.assetsdelivery.com/compings_v2/kritchanut/kritchanut1406/kritchanut140600093.jpg">${PersoDatas[ChapDatas[CHAP]["Personnages"][0][k]]["Nom"]}</a></p>`;
                        }
                    }
                }
            } else {
                Text += "<p>Aucun</p>"
            }
            Text += "</div>Personnages mentionnés<br><div class='mentio'>";
            if (ChapDatas[CHAP] !== null && ChapDatas[CHAP]["Mentionnés"] !== null && ChapDatas[CHAP]["Mentionnés"][0] !== null) {
                for (let k = 0; k <= ChapDatas[CHAP]["Mentionnés"][0].length; k++) {
                    if (ChapDatas[CHAP]["Mentionnés"][0][k] !== undefined) {
                        if (PersoDatas[ChapDatas[CHAP]["Mentionnés"][0][k]]["Image"] !== null) {
                            Text += `<p><a href="index.html?chap=${CHAP}&char=${ChapDatas[CHAP]["Mentionnés"][0][k]}"><img class="apercu" src="${PersoDatas[ChapDatas[CHAP]["Mentionnés"][0][k]]["Image"][0]}">${PersoDatas[ChapDatas[CHAP]["Mentionnés"][0][k]]["Nom"]}</a></p>`;
                        } else {
                            Text += `<p><a href="index.html?chap=${CHAP}&char=${ChapDatas[CHAP]["Mentionnés"][0][k]}"><img class="apercu" src="https://images.assetsdelivery.com/compings_v2/kritchanut/kritchanut1406/kritchanut140600093.jpg">${PersoDatas[ChapDatas[CHAP]["Mentionnés"][0][k]]["Nom"]}</a></p>`;
                        }
                    }
                }
            } else {
                Text += "<p>Aucun</p>"
            }
            Text += "</div>";

            document.getElementById("Character_Name").innerHTML = `TOUS LES PERSOS DU CHAP ${CHAP}`;
            document.getElementById("Data").innerHTML = Text;
            let NewDiv = document.createElement("div");
            NewDiv.classList = "ButtonsNav";
            NewDiv.innerHTML = `<div class="DivButtonsNav">${AfficherButtons(CHAP, WHERE, "")}</div>`;
            document.body.appendChild(NewDiv);
            // CHAR
        } else if (CHAP === null && CHAR !== null && LIEU === null) {
            if (document.getElementById("container") !== undefined) { document.getElementById("container").remove(); }
            document.getElementById("Character_Name").innerHTML = PersoDatas[CHAR]["Nom"];
            var text = [];
            for (let i = 1; i < PersoDatasColumns.length; i++) {
                if (PersoDatasColumns[i] === "Image" && PersoDatas[CHAR][PersoDatasColumns[i]] !== null) {
                    text.unshift("<img src='" + PersoDatas[CHAR][PersoDatasColumns[i]] + "' alt='" + PersoDatas[CHAR]["Nom"] + "'>");
                } else if (PersoDatas[CHAR][PersoDatasColumns[i]] !== null) {
                    text.push(PersoDatasColumns[i] + ":<br>" + PersoDatas[CHAR][PersoDatasColumns[i]]);
                }
            }
            document.getElementById("Data").innerHTML = text.join("<br><br>");

            // CHAR & CHAP
        } else if (CHAP !== null && CHAR !== null && LIEU === null) {
            if (document.getElementById("container") !== undefined) { document.getElementById("container").remove(); }
            document.getElementById("Character_Name").innerHTML = PersoDatas[CHAR]["Nom"];
            var text = [];
            for (let i = 1; i < PersoDatasColumns.length; i++) {
                if (PersoDatasColumns[i] === "Numéro" && PersoDatas[CHAR][PersoDatasColumns[i]] !== null) {
                    continue;
                } else if (PersoDatasColumns[i] === "Image" && PersoDatas[CHAR][PersoDatasColumns[i]] !== null) {
                    text.unshift("<img src='" + PersoDatas[CHAR][PersoDatasColumns[i]][0][0] + "' alt='" + PersoDatas[CHAR]["Nom"] + "'>");
                } else {
                    result = await Afficher(PersoDatas[CHAR], PersoDatasColumns[i], MainDatas);
                    if (result !== "") {
                        text.push(result);
                    }
                }
            }
            document.getElementById("Data").innerHTML = text.join("<br><br>");
            let NewDiv = document.createElement("div");
            NewDiv.classList = "ButtonsNav";
            NewDiv.innerHTML = `<div class="DivButtonsNav">${AfficherButtons(CHAP, WHERE, `&char=${CHAR}`)}</div>`;
            document.body.appendChild(NewDiv);
        } else if (CHAP !== null && CHAR === null && LIEU !== null) {
            if (document.getElementById("container") !== undefined) { document.getElementById("container").remove(); }
            document.getElementById("Character_Name").innerHTML = LieuDatas[LIEU]["Nom"];
            var text = [];
            for (let i = 1; i < LieuDatasColumns.length; i++) {
                if (LieuDatasColumns[i] === "Numéro" && LieuDatas[LIEU][LieuDatasColumns[i]] !== null) {
                    continue;
                } else if (LieuDatasColumns[i] === "Image" && LieuDatas[LIEU][LieuDatasColumns[i]] !== null) {
                    text.unshift("<img src='" + LieuDatas[LIEU][LieuDatasColumns[i]] + "' alt='" + LieuDatas[LIEU]["Nom"] + "'>");
                } else {
                    result = await Afficher(LieuDatas[LIEU], LieuDatasColumns[i], MainDatas);
                    if (result !== "") {
                        text.push(result);
                    }
                }
            }
            let Affichage = "Présent:<br><div class='vu'>";
            for (let i = 0; i < PersoDatas.length; i++) {
                if (PersoDatas[i]["Lieu"] !== null) {
                    for (let j = 0; j < PersoDatas[i]["Lieu"].length; j++) {
                        if (PersoDatas[i]["Lieu"][j][0] === LIEU && InTime(PersoDatas[i]["Lieu"][j][1], CHAP, ChapDatas)) {
                            if (PersoDatas[i]["Image"] !== null) {
                                Affichage += `<p><a href="index.html?chap=${CHAP}&char=${i}"><img class="pitite" src="${PersoDatas[i]["Image"]}">${PersoDatas[i]["Nom"]}</a></p>`;
                            } else {
                                Affichage += `<p><a href="index.html?chap=${CHAP}&char=${i}"><img class="pitite" src="https://images.assetsdelivery.com/compings_v2/kritchanut/kritchanut1406/kritchanut140600093.jpg">${PersoDatas[i]["Nom"]}</a></p>`;
                            }
                        }
                    }
                }
            }
            text.push(Affichage);
            if (I === 0) {
                text.push("Aucun");
            }
            text.push("</div>");

            document.getElementById("Data").innerHTML = text.join("<br><br>");
            document.getElementById("naviguer").innerHTML = `<a href="index.html?chap=${parseInt(CHAP) - 1}&lieu=${LIEU}">-</a>  <a href="index.html?chap=${parseInt(CHAP) + 1}&lieu=${LIEU}">+</a>`;
            NewDiv.classList = "ButtonsNav";
            NewDiv.innerHTML = `<div class="DivButtonsNav">${AfficherButtons(CHAP, WHERE, "")}</div>`;
            document.body.appendChild(NewDiv);
        }
    } catch (erreur) {
        console.error(erreur);
    }
}