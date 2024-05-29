async function RecupSheetDatas(ID, TITLE, RANGE) {
    try {
        const URL = `https://docs.google.com/spreadsheets/d/${ID}/gviz/tq?sheet=${TITLE}&range=${RANGE}`;
        const response = await fetch(URL);
        const text = await response.text();
        const data = JSON.parse(text.substr(47).slice(0, -2));
        return data;
    } catch (error) {
        throw error;
    }
}

async function TraiterSheetDatas(DATA, WHERE) {
    try {
        DATACOLUMNS = DATA.table.cols.map(element => element.label)
        let NewData = [];
        let Number = 1;

        if (WHERE === 'None') {
            Number = 0;
        }

        for (let i = 0; i < DATA.table.rows.length; i++) {
            if (Number === 1 && DATA.table.rows[i].c[0].v > WHERE) {
                return [NewData, DATACOLUMNS];
            } else if (NewData[DATA.table.rows[i].c[Number].f] !== undefined) {
                for (let j = Number + 1; j < DATACOLUMNS.length; j++) {
                    if (DATA.table.rows[i].c[j] !== null && DATA.table.rows[i].c[j]['v'] !== null) {
                        TempData = StrToListSpe(DATA.table.rows[i].c[j].v);
                        for (let k = 0; k < TempData.length; k++) {
                            if (NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]] === null) {
                                NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]] = StrToList(TempData[k]);
                            } else if (TempData[k][0] === "+") {
                                NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]].push(TempData[k].slice(1).split(","));
                            } else if (TempData[k].includes("=>")) {
                                test = TempData[k].split("=>").map(item => item.split(","));
                                for (let k = 0; k < NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]].length; k++) {
                                    const array1 = NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]][k];
                                    const array2 = test[0];
                                    if (array1.length === array2.length && array1.every((value, index) => value === array2[index])) {
                                        NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]][k] = test[1];
                                    } else if (array1 === array2[0]) {
                                        NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]][k] = test[1][0];
                                    }
                                }
                            } else {
                                NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]] = StrToList(TempData[k]);
                            }
                        }
                    }
                }
            } else {
                NewData[DATA.table.rows[i].c[Number].f] = {};
                for (let j = Number + 1; j < DATACOLUMNS.length; j++) {
                    if (DATA.table.rows[i].c[j] !== null && DATA.table.rows[i].c[j]['v'] !== null) {
                        TempData = StrToListSpe(DATA.table.rows[i].c[j].v);
                        for (let k = 0; k < TempData.length; k++) {
                            if (NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]] === undefined) {
                                if (TempData[k].includes("=>")) {
                                    test = TempData[k].split("=>").map(item => item.split(","));
                                    NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]] = [test];
                                } else if (TempData[k][0] === "+") {
                                    NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]] = [TempData[k].slice(1).split(",")];
                                } else {
                                    NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]] = StrToList(TempData[k]);
                                }
                            } else {
                                if (TempData[k].includes("=>")) {
                                    test = TempData[k].split("=>").map(item => item.split(","));
                                    NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]].push(test);
                                } else if (TempData[k][0] === "+") {
                                    NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]].push(TempData[k].slice(1).split(","));
                                } else {
                                    NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]].push(StrToList(TempData[k])[0]);
                                }
                            }
                        }
                    } else {
                        NewData[DATA.table.rows[i].c[Number].f][DATACOLUMNS[j]] = null;
                    }
                }
            }
        }
        return [NewData, DATACOLUMNS];
    } catch (error) {
        throw error;
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
    let data = STR.replaceAll("?", "");
    data = data.split("-");
    return parseInt(Ordre(data[0], CHAPTERS)) <= Ordre(CHAP, CHAPTERS) && (Ordre(data[1], CHAPTERS) === "" || Ordre(CHAP, CHAPTERS) < parseInt(Ordre(data[1], CHAPTERS)));
}

async function TraiterMainDatas(DATA) {
    try {
        DATACOLUMNS = DATA.table.cols.map(element => element.label)
        let NewData = [];

        for (let i = 0; i < DATA.table.rows.length; i++) {
            NewData[DATA.table.rows[i].c[1].v] = DATA.table.rows[i].c[2].v;
        }
        return NewData;
    } catch (error) {
        throw error;
    }
}

async function DatasVictory(WHERE, SPE) {
    var modif = localStorage.getItem('modif');
    if (modif === 'true' || SPE === true) {
        try {
            var Maindatas = await RecupSheetDatas(SheetId, SheetTitleMain, SheetRangeMain);
            var MainDatas = await TraiterMainDatas(Maindatas);

            let Persodatas = await RecupSheetDatas(SheetId, SheetTitlePerso, SheetRangePerso);
            var [PersoDatas, PersoDatasColumns] = await TraiterSheetDatas(Persodatas, WHERE);

            let Lieudatas = await RecupSheetDatas(SheetId, SheetTitleLieu, SheetRangeLieu);
            var [LieuDatas, LieuDatasColumns] = await TraiterSheetDatas(Lieudatas, WHERE);

            let Appartenancedatas = await RecupSheetDatas(SheetId, SheetTitleAppartenance, SheetRangeAppartenance);
            var [AppartenanceDatas, AppartenanceDatasColumns] = await TraiterSheetDatas(Appartenancedatas, WHERE);

            let Chapdatas = await RecupSheetDatas(SheetId, SheetTitleChapter, SheetRangeChapter);
            var [ChapDatas, ChapDatasColumns] = await TraiterSheetDatas(Chapdatas, "None");

            var dico = { "Main": MainDatas, "Perso": [PersoDatas, PersoDatasColumns], "Lieu": [LieuDatas, LieuDatasColumns], "Appartenance": [AppartenanceDatas, AppartenanceDatasColumns], "Chap": [ChapDatas, ChapDatasColumns] };

            console.log(dico);

            if (SPE === false) {
                liste.forEach(function (B) {
                    var request = indexedDB.open(`MaBaseDeDonnees_${B}`, i);

                    request.onupgradeneeded = function (event) {
                        var db = event.target.result;
                        // Créer un objetStore (équivalent à une table dans une base de données relationnelle)
                        var objectStore = db.createObjectStore('MonObjet', { keyPath: 'id', autoIncrement: true });
                    };

                    request.onsuccess = function (event) {
                        var db = event.target.result;
                        // Commencer une transaction en mode lecture-écriture
                        var transaction = db.transaction(['MonObjet'], 'readwrite');
                        // Récupérer l'objet store
                        var objectStore = transaction.objectStore('MonObjet');
                        // Ajouter l'objet à l'objet store
                        Data = dico[B];
                        Data["id"] = 1;
                        var NewRequest = objectStore.put(Data);

                        NewRequest.onsuccess = function (event) {
                            console.log("Objet modifié avec succès !");
                        };

                        NewRequest.onerror = function (event) {
                            console.error("Erreur lors de l'ajout de l'objet :", event.target.error);
                        };
                    };

                    request.onerror = function (event) {
                        console.error("Erreur lors de l'ouverture de la base de données :", event.target.error);
                    };
                });
            }

        } catch (error) {
            console.error('Une erreur est survenue :', error);
        }

        modif = false;
        localStorage.setItem('modif', modif);
    }
    else {
        var dico = {};
        try {
            var promesses = [];
            for (let B of liste) {
                var promesse = new Promise(function (resolve, reject) {
                    var request = indexedDB.open(`MaBaseDeDonnees_${B}`, i);

                    request.onsuccess = function (event) {
                        // Obtention de la référence à la base de données ouverte
                        var db = event.target.result;
                        // Utilisation de la base de données pour effectuer des opérations
                        // par exemple, récupérer des données depuis un objet store
                        var transaction = db.transaction(['MonObjet'], 'readonly');
                        var objectStore = transaction.objectStore('MonObjet');
                        var getRequest = objectStore.get(1);

                        getRequest.onsuccess = function (event) {
                            dico[B] = getRequest.result;
                            console.log("Récupération réussie pour :", B)
                            resolve();
                        };

                        getRequest.onerror = function (event) {
                            console.error("Erreur lors de la récupération de l'objet :", event.target.error);
                            reject(event.target.error);
                        };
                    };

                    request.onerror = function (event) {
                        console.error("Erreur lors de l'ouverture de la base de données :", event.target.error);
                        reject(event.target.error);
                    };

                    request.onupgradeneeded = async function (event) {
                        modif = 'true';
                        localStorage.setItem('modif', modif);
                        i++;
                        localStorage.setItem('i', i);
                        location.reload();
                    };
                });
                promesses.push(promesse);
            }
            await Promise.all(promesses).catch(function (error) {
                console.error('Une erreur est survenue lors de la récupération des données :', error);
            });

        } catch (error) {
            console.error('Une erreur est survenue :', error);

            var Maindatas = await RecupSheetDatas(SheetId, SheetTitleMain, SheetRangeMain);
            var MainDatas = await TraiterMainDatas(Maindatas);

            let Persodatas = await RecupSheetDatas(SheetId, SheetTitlePerso, SheetRangePerso);
            var [PersoDatas, PersoDatasColumns] = await TraiterSheetDatas(Persodatas, WHERE);

            let Lieudatas = await RecupSheetDatas(SheetId, SheetTitleLieu, SheetRangeLieu);
            var [LieuDatas, LieuDatasColumns] = await TraiterSheetDatas(Lieudatas, WHERE);

            let Appartenancedatas = await RecupSheetDatas(SheetId, SheetTitleAppartenance, SheetRangeAppartenance);
            var [AppartenanceDatas, AppartenanceDatasColumns] = await TraiterSheetDatas(Appartenancedatas, WHERE);

            let Chapdatas = await RecupSheetDatas(SheetId, SheetTitleChapter, SheetRangeChapter);
            var [ChapDatas, ChapDatasColumns] = await TraiterSheetDatas(Chapdatas, "None");

            var dico = { "Main": MainDatas, "Perso": [PersoDatas, PersoDatasColumns], "Lieu": [LieuDatas, LieuDatasColumns], "Appartenance": [AppartenanceDatas, AppartenanceDatasColumns], "Chap": [ChapDatas, ChapDatasColumns] };
            return dico;
        }
    }

    return dico;
}

// INFOS SHEET
let SheetId = '1eqWmcikQwZYszoS1GeaNnGTHVQzy52Nsrj2qyAXp7fg';
let SheetTitleMain = 'Main';
let SheetRangeMain = 'A1:C33';
let SheetTitlePerso = 'Perso';
let SheetRangePerso = 'A1:AA1000';
let SheetTitleChapter = 'Chapter';
let SheetRangeChapter = "A1:E500";
let SheetTitleLieu = 'Lieu';
let SheetRangeLieu = 'A1:D50';
let SheetTitleAppartenance = 'Appartenance';
let SheetRangeAppartenance = 'A1:E50';

let liste = ["Main", "Perso", "Appartenance", "Lieu", "Chap"];

var where = localStorage.getItem('where_solov');
var modif = localStorage.getItem('modif');
var i = localStorage.getItem('i');
if (i === null) {
    i = 1;
    localStorage.setItem('i', i);
}
var char = (new URLSearchParams(window.location.search)).get('char');
var chap = (new URLSearchParams(window.location.search)).get('chap');
var lieu = (new URLSearchParams(window.location.search)).get('lieu');

async function general() {
    async function Afficher(TYPE, DATA, MAIN) {
        if (TYPE[DATA] === null || MAIN[DATA] === undefined) {
            return "";
        } else {
            if (MAIN[DATA] == "Info") {
                return DATA + ":<br>" + TYPE[DATA];
            } else if (MAIN[DATA].includes("\\")) {
                let Affichage = [];
                if (MAIN[DATA] == "Info\\Duree") {
                    for (let l = 0; l < TYPE[DATA].length; l++) {
                        if (InTime(TYPE[DATA][l][1], chap, ChapDatas) && Affichage[0] === undefined) {
                            Affichage.push(DATA + ":<br>" + TYPE[DATA][l][0]);
                        } else if (InTime(TYPE[DATA][l][1], chap, ChapDatas)) {
                            Affichage.push(TYPE[DATA][l][0]);
                        }
                    }
                } else if (MAIN[DATA] == "Info\\Infos\\Duree") {
                    for (let l = 0; l < TYPE[DATA].length; l++) {
                        if (InTime(TYPE[DATA][l][2], chap, ChapDatas) && Affichage[0] === undefined) {
                            Affichage.push(DATA + ":<br>" + TYPE[DATA][l][0] + " Niv." + TYPE[DATA][l][1]);
                        } else if (InTime(TYPE[DATA][l][2], chap, ChapDatas)) {
                            Affichage.push(TYPE[DATA][l][0] + " Niv." + TYPE[DATA][l][1]);
                        }
                    }
                } else if (MAIN[DATA] == "Lieu\\Duree") {
                    for (let l = 0; l < TYPE[DATA].length; l++) {
                        if (InTime(TYPE[DATA][l][1], chap, ChapDatas) && Affichage[0] === undefined) {
                            Affichage.push(DATA + ":<br><a href='index.html?chap=" + chap + "&lieu=" + TYPE[DATA][l][0] + "'>" + LieuDatas[TYPE[DATA][l][0]]['Nom'] + "</a>");
                        } else if (InTime(TYPE[DATA][l][1], chap, ChapDatas)) {
                            Affichage.push("<a href='index.html?chap=" + chap + "&lieu=" + TYPE[DATA][l][0] + "'>" + LieuDatas[TYPE[DATA][l][0]]['Nom'] + "</a>");
                        }
                    }
                } else if (MAIN[DATA] == "Perso\\Infos") {
                    for (let l = 0; l < TYPE[DATA].length; l++) {
                        if (Affichage[0] === undefined) {
                            Affichage.push(DATA + ":<br><a href='index.html?chap=" + chap + "&char=" + TYPE[DATA][l][0] + "'>" + PersoDatas[TYPE[DATA][l][0]]['Nom'] + "</a> (" + TYPE[DATA][l][1] + ")");
                        } else {
                            Affichage.push("<a href='index.html?chap=" + chap + "&char=" + TYPE[DATA][l][0] + "'>" + PersoDatas[TYPE[DATA][l][0]]['Nom'] + "</a> (" + TYPE[DATA][l][1] + ")");
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

    try {
        let dicoReturn = await DatasVictory(where, false);
        console.log(dicoReturn);
        var MainDatas = dicoReturn["Main"];
        var [PersoDatas, PersoDatasColumns] = dicoReturn["Perso"];
        var [LieuDatas, LieuDatasColumns] = dicoReturn["Lieu"];
        var [AppartenanceDatas, AppartenanceDatasColumns] = dicoReturn["Appartenance"];
        var [ChapDatas, ChapDatasColumns] = dicoReturn["Chap"];

        // RIEN
        if (chap === null && char === null && lieu === null) {
            let Text = "";
            for (let k = 0; k <= where; k++) {
                if (ChapDatas[k] !== undefined) {
                    Text += `<a href="index.html?chap=${k}">Chapitre ${k}</a><br>`
                }
            }

            document.getElementById("Character_Name").innerHTML = "TOUS LES CHAPITRES";
            document.getElementById("Data").innerHTML = Text;

            // CHAP
        } else if (chap !== null && char === null && lieu === null) {
            let Text = "Personnages du chapitre<br><div class='vu'>";
            for (let k = 0; k <= ChapDatas[chap]["Personnages"][0].length; k++) {
                if (PersoDatas[ChapDatas[chap]["Personnages"][0][k]] !== undefined && ChapDatas[chap]["Personnages"][0][k] !== undefined) {
                    if (PersoDatas[ChapDatas[chap]["Personnages"][0][k]]["Image"] !== null) {
                        Text += `<p><a href="index.html?chap=${chap}&char=${ChapDatas[chap]["Personnages"][0][k]}"><img class="pitite" src="${PersoDatas[ChapDatas[chap]["Personnages"][0][k]]["Image"][0]}">${PersoDatas[ChapDatas[chap]["Personnages"][0][k]]["Nom"]}</a></p>`;
                    } else {
                        Text += `<p><a href="index.html?chap=${chap}&char=${ChapDatas[chap]["Personnages"][0][k]}"><img class="pitite" src="https://images.assetsdelivery.com/compings_v2/kritchanut/kritchanut1406/kritchanut140600093.jpg">${PersoDatas[ChapDatas[chap]["Personnages"][0][k]]["Nom"]}</a></p>`;
                    }
                }
            }
            Text += "</div>Personnages mentionnés<br><div class='mentio'>";
            if (ChapDatas[chap]["Mentionnés"] !== null && ChapDatas[chap]["Mentionnés"][0] !== null) {
                for (let k = 0; k <= ChapDatas[chap]["Mentionnés"][0].length; k++) {
                    if (ChapDatas[chap]["Mentionnés"][0][k] !== undefined) {
                        if (PersoDatas[ChapDatas[chap]["Mentionnés"][0][k]]["Image"] !== null) {
                            Text += `<p><a href="index.html?chap=${chap}&char=${ChapDatas[chap]["Mentionnés"][0][k]}"><img class="pitite" src="${PersoDatas[ChapDatas[chap]["Mentionnés"][0][k]]["Image"]}">${PersoDatas[ChapDatas[chap]["Mentionnés"][0][k]]["Nom"]}</a></p>`;
                        } else {
                            Text += `<p><a href="index.html?chap=${chap}&char=${ChapDatas[chap]["Mentionnés"][0][k]}"><img class="pitite" src="https://images.assetsdelivery.com/compings_v2/kritchanut/kritchanut1406/kritchanut140600093.jpg">${PersoDatas[ChapDatas[chap]["Mentionnés"][0][k]]["Nom"]}</a></p>`;
                        }
                    }
                }
            } else {
                Text += "<p>Aucun</p>"
            }
            Text += "</div>"

            document.getElementById("Character_Name").innerHTML = `TOUS LES PERSOS DU CHAP ${chap}`;
            document.getElementById("Data").innerHTML = Text;

            var curseur = $("#poignee");
            curseur.text(chap);
            $("#barre").slider(
                {
                    min: 0, max: where,
                    slide: function (event, ui) {
                        curseur.text(ui.value);
                        chap = ui.value;
                        try {
                            let Text = "Personnages du chapitre<br><div class='vu'>";
                            for (let k = 0; k <= ChapDatas[chap]["Personnages"][0].length; k++) {
                                if (PersoDatas[ChapDatas[chap]["Personnages"][0][k]] !== undefined && ChapDatas[chap]["Personnages"][0][k] !== undefined) {
                                    if (PersoDatas[ChapDatas[chap]["Personnages"][0][k]]["Image"] !== null) {
                                        Text += `<p><a href="index.html?chap=${chap}&char=${ChapDatas[chap]["Personnages"][0][k]}"><img class="pitite" src="${PersoDatas[ChapDatas[chap]["Personnages"][0][k]]["Image"]}">${PersoDatas[ChapDatas[chap]["Personnages"][0][k]]["Nom"]}</a></p>`;
                                    } else {
                                        Text += `<p><a href="index.html?chap=${chap}&char=${ChapDatas[chap]["Personnages"][0][k]}"><img class="pitite" src="https://images.assetsdelivery.com/compings_v2/kritchanut/kritchanut1406/kritchanut140600093.jpg">${PersoDatas[ChapDatas[chap]["Personnages"][0][k]]["Nom"]}</a></p>`;
                                    }
                                }
                            }
                            Text += "</div>Personnages mentionnés<br><div class='mentio'>";
                            if (ChapDatas[chap]["Mentionnés"] !== null && ChapDatas[chap]["Mentionnés"][0] !== null) {
                                for (let k = 0; k <= ChapDatas[chap]["Mentionnés"][0].length; k++) {
                                    if (ChapDatas[chap]["Mentionnés"][0][k] !== undefined) {
                                        if (PersoDatas[ChapDatas[chap]["Mentionnés"][0][k]]["Image"] !== null) {
                                            Text += `<p><a href="index.html?chap=${chap}&char=${ChapDatas[chap]["Mentionnés"][0][k]}"><img class="pitite" src="${PersoDatas[ChapDatas[chap]["Mentionnés"][0][k]]["Image"]}">${PersoDatas[ChapDatas[chap]["Mentionnés"][0][k]]["Nom"]}</a></p>`;
                                        } else {
                                            Text += `<p><a href="index.html?chap=${chap}&char=${ChapDatas[chap]["Mentionnés"][0][k]}"><img class="pitite" src="https://images.assetsdelivery.com/compings_v2/kritchanut/kritchanut1406/kritchanut140600093.jpg">${PersoDatas[ChapDatas[chap]["Mentionnés"][0][k]]["Nom"]}</a></p>`;
                                        }
                                    }
                                }
                            } else {
                                Text += "<p>Aucun</p>"
                            }
                            Text += "</div>"

                            document.getElementById("Character_Name").innerHTML = `TOUS LES PERSOS DU CHAP ${chap}`;
                            document.getElementById("Data").innerHTML = Text;
                        } catch (error) {
                            console.log(error);
                            document.getElementById("Character_Name").innerHTML = `TOUS LES PERSOS DU CHAP ${chap}`;
                            document.getElementById("Data").innerHTML = "Ce chapitre n'a pas encore été documenté";
                        }
                    }
                }
            )
            // CHAR
        } else if (chap === null && char !== null && lieu === null) {
            document.getElementById("Character_Name").innerHTML = PersoDatas[char]["Nom"];
            var text = [];
            for (let i = 1; i < PersoDatasColumns.length; i++) {
                if (PersoDatasColumns[i] === "Image" && PersoDatas[char][PersoDatasColumns[i]] !== null) {
                    text.unshift("<img src='" + PersoDatas[char][PersoDatasColumns[i]] + "' alt='" + PersoDatas[char]["Nom"] + "'>");
                } else if (PersoDatas[char][PersoDatasColumns[i]] !== null) {
                    text.push(PersoDatasColumns[i] + ":<br>" + PersoDatas[char][PersoDatasColumns[i]]);
                }
            }
            document.getElementById("Data").innerHTML = text.join("<br><br>");

            // CHAR & CHAP
        } else if (chap !== null && char !== null && lieu === null) {
            document.getElementById("Character_Name").innerHTML = PersoDatas[char]["Nom"];
            var text = [];
            for (let i = 1; i < PersoDatasColumns.length; i++) {
                if (PersoDatasColumns[i] === "Numéro" && PersoDatas[char][PersoDatasColumns[i]] !== null) {
                    continue;
                } else if (PersoDatasColumns[i] === "Image" && PersoDatas[char][PersoDatasColumns[i]] !== null) {
                    text.unshift("<img src='" + PersoDatas[char][PersoDatasColumns[i]] + "' alt='" + PersoDatas[char]["Nom"] + "'>");
                } else {
                    result = await Afficher(PersoDatas[char], PersoDatasColumns[i], MainDatas);
                    if (result !== "") {
                        text.push(result);
                    }
                }
            }
            document.getElementById("Data").innerHTML = text.join("<br><br>");

            document.getElementById("naviguer").innerHTML = `<a href="index.html?chap=${parseInt(chap) - 1}&char=${char}">-<br>${parseInt(chap) - 1}</a><a href="index.html?chap=${parseInt(chap) + 1}&char=${char}">+<br>${parseInt(chap) + 1}</a>`;
        } else if (chap !== null && char === null && lieu !== null) {
            document.getElementById("Character_Name").innerHTML = LieuDatas[lieu]["Nom"];
            var text = [];
            for (let i = 1; i < LieuDatasColumns.length; i++) {
                if (LieuDatasColumns[i] === "Numéro" && LieuDatas[lieu][LieuDatasColumns[i]] !== null) {
                    continue;
                } else if (LieuDatasColumns[i] === "Image" && LieuDatas[lieu][LieuDatasColumns[i]] !== null) {
                    text.unshift("<img src='" + LieuDatas[lieu][LieuDatasColumns[i]] + "' alt='" + LieuDatas[lieu]["Nom"] + "'>");
                } else {
                    result = await Afficher(LieuDatas[lieu], LieuDatasColumns[i], MainDatas);
                    if (result !== "") {
                        text.push(result);
                    }
                }
            }
            let Affichage = "Présent:<br><div class='vu'>";
            for (let i = 0; i < PersoDatas.length; i++) {
                if (PersoDatas[i]["Lieu"] !== null) {
                    for (let j = 0; j < PersoDatas[i]["Lieu"].length; j++) {
                        if (PersoDatas[i]["Lieu"][j][0] === lieu && InTime(PersoDatas[i]["Lieu"][j][1], chap, ChapDatas)) {
                            if (PersoDatas[i]["Image"] !== null) {
                                Affichage += `<p><a href="index.html?chap=${chap}&char=${i}"><img class="pitite" src="${PersoDatas[i]["Image"]}">${PersoDatas[i]["Nom"]}</a></p>`;
                            } else {
                                Affichage += `<p><a href="index.html?chap=${chap}&char=${i}"><img class="pitite" src="https://images.assetsdelivery.com/compings_v2/kritchanut/kritchanut1406/kritchanut140600093.jpg">${PersoDatas[i]["Nom"]}</a></p>`;
                            }
                        }
                    }
                }
            }
            text.push(Affichage);
            if (i === 0) {
                text.push("Aucun");
            }
            text.push("</div>");

            document.getElementById("Data").innerHTML = text.join("<br><br>");


            document.getElementById("naviguer").innerHTML = `<a href="index.html?chap=${parseInt(chap) - 1}&lieu=${lieu}">-</a>  <a href="index.html?chap=${parseInt(chap) + 1}&lieu=${lieu}">+</a>`;
        }
    } catch (erreur) {
        console.error(erreur);
    }
}