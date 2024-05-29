async function Add(Element, Data) {
    let dicoReturnPast = await DatasVictory(localStorage.getItem('where_solov'), false);
    var MainDatasPast = dicoReturnPast["Main"];
    var [PersoDatasPast, PersoDatasColumnsPast] = dicoReturnPast["Perso"];
    var [LieuDatasPast, LieuDatasColumnsPast] = dicoReturnPast["Lieu"];
    var [AppartenanceDatasPast, AppartenanceDatasColumnsPast] = dicoReturnPast["Appartenance"];
    var [ChapDatasPast, ChapDatasColumnsPast] = dicoReturnPast["Chap"];

    var Child = Element.parentElement;
    Element.remove();

    let newElement = document.createElement('div');
    newElement.className = 'oui';

    console.log(Data);

    switch (Data) {
        case "Info":
        case "Infom":
            newElement.innerHTML = `<input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>`;
            break;
        case "Info\\Duree":
        case "Info\Duree":
            newElement.innerHTML = `<input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>`;
            break;
        case "Info\\Infos\\Duree":
        case "Info\Infos\Duree":
            newElement.innerHTML = `<input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>`;
            break;
        case "Lieu\\Duree":
        case "Lieu\Duree":
            let TempLieuDuree = `<select style="color: red;">`;
            Object.keys(LieuDatasPast).forEach(element => {
                TempLieuDuree += `<option value="${element}">${element} - ${LieuDatasPast[element]["Nom"]}</option>`;
            });
            newElement.innerHTML = TempLieuDuree + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>`;
            break;
        case "Perso\\Infos":
        case "Perso\Infos":
            let TempPersoInfos = `<select style="color: red;">`;
            Object.keys(PersoDatasPast).forEach(element => {
                TempPersoInfos += `<option value="${element}">${element} - ${PersoDatasPast[element]["Nom"]}</option>`;
            });
            newElement.innerHTML = TempPersoInfos + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>`;
            break;
        case "Lieu":
            let TempLieu = `<select style="color: red;">`;
            Object.keys(LieuDatasPast).forEach(element => {
                TempLieu += `<option value="${element}">${element} - ${LieuDatasPast[element]["Nom"]}</option>`;
            });
            newElement.innerHTML = TempLieu + `</select>`;
            break;
        case "App":
            let TempApp = `<select style="color: red;">`;
            Object.keys(AppartenanceDatasPast).forEach(element => {
                TempApp += `<option value="${element}">${element} - ${AppartenanceDatasPast[element]["Nom"]}</option>`;
            });
            newElement.innerHTML = TempApp + `</select>`;
            break;
        case "Persos":
            let TempPersos = `<select style="color: red;">`;
            Object.keys(PersoDatasPast).forEach(element => {
                TempPersos += `<option value="${element}">${element} - ${PersoDatasPast[element]["Nom"]}</option>`;
            });
            newElement.innerHTML = TempPersos + `</select>`;
            break;
    }

    let button = document.createElement('button');
    button.textContent = 'Ajouter';
    button.onclick = function () { Add(this, Data); };
    Child.appendChild(newElement);
    Child.appendChild(button);
}

function Supp(Element) {
    function getElementFromEnd(collection, indexFromEnd) {
        var length = collection.length;
        var positiveIndex = length + indexFromEnd;
        if (positiveIndex >= 0 && positiveIndex < length) {
            return collection[positiveIndex];
        } else {
            return undefined;
        }
    }
    var Child = Element.parentElement;
    var As = getElementFromEnd(Child.children, -3);
    As.remove();
    Element.remove();
    Child.innerHTML += "<button onclick='Supp(this)'>Supprimer</button>";
}

function ajusterTaille(input) {
    var div = document.createElement('div');
    div.style.width = 'auto';
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.whiteSpace = 'pre'; // Pour conserver les espaces et les retours à la ligne
    div.textContent = input.value;
    document.body.appendChild(div);
    input.style.width = div.offsetWidth + 'px';
    document.body.removeChild(div);
}

async function Modification(Element) {
    let dicoReturnPast = await DatasVictory(localStorage.getItem('where_solov'), false);
    // console.log(Element, Data);
    var MainDatasPast = dicoReturnPast["Main"];
    var [PersoDatasPast, PersoDatasColumnsPast] = dicoReturnPast["Perso"];
    var [LieuDatasPast, LieuDatasColumnsPast] = dicoReturnPast["Lieu"];
    var [AppartenanceDatasPast, AppartenanceDatasColumnsPast] = dicoReturnPast["Appartenance"];
    var [ChapDatasPast, ChapDatasColumnsPast] = dicoReturnPast["Chap"];

    var parent = Element.parentElement;
    Element.remove();
    var type = parent.parentElement.getAttribute('data-score');
    switch (type) {
        case "Info":
        case "Infom":
            parent.className = "oui";
            parent.innerHTML += `=><input data-score="SS" style="color: red;" oninput="ajusterTaille(this)" type="text"></input>`;
            break;
        case "Info\\Duree":
            parent.className = "oui";
            parent.innerHTML += `=><input style="color: red;" data-score="SS" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>`;
            break;
        case "Info\\Infos\\Duree":
            parent.className = "oui";
            parent.innerHTML += `=><input data-score="SS" style="color: red;" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>`;
            break;
        case "Lieu\\Duree":
            parent.className = "oui";
            Text = `=><select data-score="SS" style="color: red;">`;
            Object.keys(LieuDatasPast).forEach(element => {
                Text += `<option value="${element}">${element} - ${LieuDatasPast[element]["Nom"]}</option>`;
            });
            parent.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>`;
            break;
        case "Perso\\Infos":
            parent.className = "oui";
            Text = `=><select data-score="SS" style="color: red;">`;
            Object.keys(PersoDatasPast).forEach(element => {
                Text += `<option value="${element}">${element} - ${PersoDatasPast[element]["Nom"]}</option>`;
            });
            parent.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>`;
            break;
        case "Lieu":
            parent.className = "oui";
            Text = `=><select data-score="SS" style="color: red;">`;
            Object.keys(LieuDatasPast).forEach(element => {
                Text += `<option value="${element}">${element} - ${LieuDatasPast[element]["Nom"]}</option>`;
            });
            parent.innerHTML += Text + `</select>`;
            break;
        case "App":
            parent.className = "oui";
            Text = `=><select data-score="SS" style="color: red;">`;
            Object.keys(AppartenanceDatasPast).forEach(element => {
                Text += `<option value="${element}">${element} - ${AppartenanceDatasPast[element]["Nom"]}</option>`;
            });
            parent.innerHTML += Text + `</select>`;
            break;
        case "Perso":
            parent.className = "oui";
            Text = `=><select data-score="SS" style="color: red;">`;
            Object.keys(PersoDatasPast).forEach(element => {
                Text += `<option value="${element}">${element} - ${PersoDatasPast[element]["Nom"]}</option>`;
            });
            parent.innerHTML += Text + `</select>`;
            break;
    }
}

function InDatas(DATA, RANGE) {
    // console.log(RANGE, DATA);
    return RANGE.some(element => JSON.stringify(element[0]) === JSON.stringify(DATA));
}

async function modifierPage(C, TYPE) {
    var choix = C.value;
    var ligne = C.parentElement.parentElement;

    let dicoReturPast = await DatasVictorySpe2(localStorage.getItem('where_solov'), true);
    // console.log(dicoReturPast);
    var MainDatasPast = dicoReturPast["Main"];
    var [PersoDatasPast, PersoDatasColumnsPast] = dicoReturPast["Perso"];
    var [LieuDatasPast, LieuDatasColumnsPast] = dicoReturPast["Lieu"];
    var [AppartenanceDatasPast, AppartenanceDatasColumnsPast] = dicoReturPast["Appartenance"];

    let dicoReturn = await DatasVictorySpe(localStorage.getItem('where_solov'));
    // console.log("dicoReturn", dicoReturn, localStorage.getItem('where_solov'));
    var PersoDatas = dicoReturn["Perso"][0];
    var LieuDatas = dicoReturn["Lieu"][0];
    var AppartenanceDatas = dicoReturn["Appartenance"][0];

    var [DATA1, DATA2, DATA3] = { "Personnages": [PersoDatasPast, PersoDatasColumnsPast, PersoDatas], "Locations": [LieuDatasPast, LieuDatasColumnsPast, LieuDatas], "Groupes": [AppartenanceDatasPast, AppartenanceDatasColumnsPast, AppartenanceDatas] }[TYPE];
    // console.log("DATA", DATA1, DATA2, DATA3)

    compteur = 0;
    Array.from(ligne.children).forEach(function (child) {
        if (compteur === 1) {
            child.innerHTML = choix;
        } else if (compteur > 1 && choix !== "new" && ((choix in DATA1 && DATA1[choix][DATA2[compteur]] !== null) || (choix in DATA3 && DATA3[choix][DATA2[compteur]] !== null))) {
            switch (MainDatasPast[DATA2[compteur]]) {
                case "Infom":
                case "Info":
                    if (choix in DATA1 && DATA1[choix][DATA2[compteur]] !== null) {
                        DATA1[choix][DATA2[compteur]].forEach(data => {
                            if (DATA3[choix] === undefined || DATA3[choix][DATA2[compteur]] === null || InDatas(data, DATA3[choix][DATA2[compteur]][0]) === false) {
                                child.innerHTML += `<div><input oninput="ajusterTaille(this)" type="text" value="${data}"></input><button onclick="Modification(this)">Modif</button></div>`;
                            }
                        });
                    }
                    if (choix in DATA3 && DATA3[choix][DATA2[compteur]] !== null) {
                        DATA3[choix][DATA2[compteur]].forEach(data => {
                            // console.log("data", data);
                            if (Array.isArray(data[0])) {
                                child.innerHTML += `<div class="oui"><input oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input>=><input data-score="SS" style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input></div>`;
                            } else {
                                child.innerHTML += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data}"></input></div>`;
                            }
                        });
                    }
                    break;
                case "Info\\Duree":
                    if (choix in DATA1 && DATA1[choix][DATA2[compteur]] !== null) {
                        DATA1[choix][DATA2[compteur]].forEach(data => {
                            if (DATA3[choix] === undefined || DATA3[choix][DATA2[compteur]] === null || InDatas(data, DATA3[choix][DATA2[compteur]]) === false) {
                                child.innerHTML += `<div><input oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[1]}"></input><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (choix in DATA3 && DATA3[choix][DATA2[compteur]] !== null) {
                        DATA3[choix][DATA2[compteur]].forEach(data => {
                            // console.log("data", data);
                            if (Array.isArray(data[0])) {
                                child.innerHTML += `<div class="oui"><input oninput="ajusterTaille(this)" type="text" value="${data[0][0]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[0][1].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[0][1].split("-")[1]}"></input>=><input data-score="SS" style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][0]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][1].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][1].split("-")[1]}"></input></div>`;
                            } else {
                                child.innerHTML += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[1]}"></input></div>`;
                            }
                        });
                    }
                    break;
                case "Info\\Infos\\Duree":
                    if (choix in DATA1 && DATA1[choix][DATA2[compteur]] !== null) {
                        DATA1[choix][DATA2[compteur]].forEach(data => {
                            if (DATA3[choix] === undefined || DATA3[choix][DATA2[compteur]] === null || InDatas(data, DATA3[choix][DATA2[compteur]]) === false) {
                                child.innerHTML += `<div><input oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[1]}"></input><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (choix in DATA3 && DATA3[choix][DATA2[compteur]] !== null) {
                        DATA3[choix][DATA2[compteur]].forEach(data => {
                            // console.log("data", data);
                            if (Array.isArray(data[0])) {
                                child.innerHTML += `<div class="oui"><input oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[1]}"></input>=><input data-score="SS" style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[1]}"></input></div>`;
                            } else {
                                child.innerHTML += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[1]}"></input></div>`;
                            }
                        });
                    }
                    break;
                case "Lieu\\Duree":
                    TempLieu = { ...LieuDatas, ...LieuDatasPast };
                    if (choix in DATA1 && DATA1[choix][DATA2[compteur]] !== null) {
                        DATA1[choix][DATA2[compteur]].forEach(data => {
                            if (DATA3[choix] === undefined || DATA3[choix][DATA2[compteur]] === null || InDatas(data, DATA3[choix][DATA2[compteur]]) === false) {
                                Text = `<div><select>`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                // console.log("data", data);
                                child.innerHTML += Text + `</select> | <input oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[1]}"></input><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (choix in DATA3 && DATA3[choix][DATA2[compteur]] !== null) {
                        DATA3[choix][DATA2[compteur]].forEach(data => {
                            // console.log("data", data);
                            if (Array.isArray(data[0])) {
                                Text = `<div class="oui"><select>`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[0][0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                Text += `</select> | <input oninput="ajusterTaille(this)" type="text" value="${data[0][1].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[0][1].split("-")[1]}"></input>=><select data-score="SS" style="color: red;">`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[1][0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][1].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][1].split("-")[1]}"></input></div>`;
                            } else {
                                Text = `<div class="oui"><select style="color: red;">`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[1]}"></input></div>`;
                            }
                        });
                    }
                    break;
                case "Perso\\Infos":
                    TempPerso = { ...PersoDatas, ...PersoDatasPast }
                    // console.log(TempPerso);
                    if (choix in DATA1 && DATA1[choix][DATA2[compteur]] !== null) {
                        DATA1[choix][DATA2[compteur]].forEach(data => {
                            if (DATA3[choix] === undefined || DATA3[choix][DATA2[compteur]] === null || InDatas(data, DATA3[choix][DATA2[compteur]]) === false) {
                                Text = `<div><select>`;
                                // console.log("data", data);
                                Object.keys(TempPerso).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempPerso[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempPerso[element]["Nom"]}</option>`;
                                    }
                                });
                                child.innerHTML += Text + `</select> | <input oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (choix in DATA3 && DATA3[choix][DATA2[compteur]] !== null) {
                        DATA3[choix][DATA2[compteur]].forEach(data => {
                            // console.log("data", data);
                            if (Array.isArray(data[0])) {
                                Text = `<div class="oui"><select>`;
                                // console.log("data", data);
                                Object.keys(TempPerso).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempPerso[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempPerso[element]["Nom"]}</option>`;
                                    }
                                });
                                Text += `</select> | <input oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input><select data-score="SS" style="color: red;">`;
                                // console.log("data", data);
                                Object.keys(TempPerso).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempPerso[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempPerso[element]["Nom"]}</option>`;
                                    }
                                });
                                child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input></div>`;
                            } else {
                                Text = `<div class="oui"><select style="color: red;">`;
                                // console.log("data", data);
                                Object.keys(TempPerso).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempPerso[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempPerso[element]["Nom"]}</option>`;
                                    }
                                });
                                child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input></div>`;
                            }
                        });
                    }
                    break;
                case "Lieu":
                    TempLieu = { ...LieuDatas, ...LieuDatasPast };
                    if (choix in DATA1 && DATA1[choix][DATA2[compteur]] !== null) {
                        DATA1[choix][DATA2[compteur]].forEach(data => {
                            if (DATA3[choix] === undefined || DATA3[choix][DATA2[compteur]] === null || InDatas(data, DATA3[choix][DATA2[compteur]]) === false) {
                                Text = `<div><select>`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                // console.log("data", data);
                                child.innerHTML += Text + `</select><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (choix in DATA3 && DATA3[choix][DATA2[compteur]] !== null) {
                        DATA3[choix][DATA2[compteur]].forEach(data => {
                            // console.log("data", data);
                            if (Array.isArray(data[0])) {
                                Text = `<div class="oui"><select>`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[0][0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                Text += `</select>=><select data-score="SS" style="color: red;">`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[1][0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                child.innerHTML += Text + `</select></div>`;
                            } else {
                                Text = `<div class="oui"><select style="color: red;">`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                child.innerHTML += Text + `</select></div>`;
                            }
                        });
                    }
                    break;
                case "App":
                    TempApp = { ...AppartenanceDatas, ...AppartenanceDatasPast };
                    if (choix in DATA1 && DATA1[choix][DATA2[compteur]] !== null) {
                        DATA1[choix][DATA2[compteur]].forEach(data => {
                            if (DATA3[choix] === undefined || DATA3[choix][DATA2[compteur]] === null || InDatas(data, DATA3[choix][DATA2[compteur]]) === false) {
                                Text = `<div><select>`;
                                Object.keys(TempApp).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempApp[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempApp[element]["Nom"]}</option>`;
                                    }
                                });
                                // console.log("data", data);
                                child.innerHTML += Text + `</select><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (choix in DATA3 && DATA3[choix][DATA2[compteur]] !== null) {
                        DATA3[choix][DATA2[compteur]].forEach(data => {
                            // console.log("data", data);
                            if (Array.isArray(data[0])) {
                                Text = `<div class="oui"><select>`;
                                Object.keys(TempApp).forEach(element => {
                                    if (element === data[0][0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempApp[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempApp[element]["Nom"]}</option>`;
                                    }
                                });
                                Text += `</select>=><select data-score="SS" style="color: red;">`;
                                Object.keys(TempApp).forEach(element => {
                                    if (element === data[1][0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempApp[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempApp[element]["Nom"]}</option>`;
                                    }
                                });
                                child.innerHTML += Text + `</select></div>`;
                            } else {
                                Text = `<div class="oui"><select style="color: red;">`;
                                Object.keys(TempApp).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempApp[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempApp[element]["Nom"]}</option>`;
                                    }
                                });
                                child.innerHTML += Text + `</select></div>`;
                            }
                        });
                    }
                    break;
            }
        } else {
            switch (MainDatasPast[DATA2[compteur]]) {
                case "Info":
                case "Infom":
                    child.innerHTML += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text"></input></div>`;
                    break;
                case "Info\Duree":
                    child.innerHTML += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input></div>`;
                    break;
                case "Info\Infos\Duree":
                    child.innerHTML += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input></div>`;
                    break;
                case "Lieu\Duree":
                    Text = `<div class="oui"><select style="color: red;">`;
                    Object.keys(LieuDatasPast).forEach(element => {
                        Text += `<option value="${element}">${element} - ${LieuDatasPast[element]["Nom"]}</option>`;
                    });
                    child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input></div>`;
                    break;
                case "Perso\Infos":
                    Text = `<div class="oui"><select style="color: red;">`;
                    Object.keys(PersoDatasPast).forEach(element => {
                        Text += `<option value="${element}">${element} - ${PersoDatasPast[element]["Nom"]}</option>`;
                    });
                    child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input></div>`;
                    break;
                case "Lieu":
                    Text = `<div class="oui"><select style="color: red;">`;
                    Object.keys(LieuDatasPast).forEach(element => {
                        Text += `<option value="${element}">${element} - ${LieuDatasPast[element]["Nom"]}</option>`;
                    });
                    child.innerHTML += Text + `</select></div>`;
                    break;
                case "App":
                    Text = `<div class="oui"><select style="color: red;">`;
                    Object.keys(AppartenanceDatasPast).forEach(element => {
                        Text += `<option value="${element}">${element} - ${AppartenanceDatasPast[element]["Nom"]}</option>`;
                    });
                    child.innerHTML += Text + `</select></div>`;
                    break;
            }
        }
        if (compteur > 1) {
            child.innerHTML += `<button onclick="Add(this, '${MainDatasPast[DATA2[compteur]]}')">Ajouter</button><button onclick="Supp(this)">Supprimer</button>`;
        }
        compteur++;
    });

    let dicoReturnPast = await DatasVictory(localStorage.getItem('where_solov'), false);
    // console.log("dicoReturnPast", dicoReturnPast, localStorage.getItem('where_solov'));
    var MainDatasPast = dicoReturnPast["Main"];
    var [PersoDatasPast, PersoDatasColumnsPast] = dicoReturnPast["Perso"];
    var [LieuDatasPast, LieuDatasColumnsPast] = dicoReturnPast["Lieu"];
    var [AppartenanceDatasPast, AppartenanceDatasColumnsPast] = dicoReturnPast["Appartenance"];

    [DATA1, DATA2] = { "Personnages": [PersoDatasPast, PersoDatasColumnsPast], "Locations": [LieuDatasPast, LieuDatasColumnsPast], "Groupes": [AppartenanceDatasPast, AppartenanceDatasColumnsPast] }[TYPE];

    var table = ligne.parentElement.parentElement.getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    compteur = [0, table.rows.length];
    newRow.id = `${compteur[1]}`
    Text = ``;
    DATA2.forEach(element => {
        if (compteur[0] === 0) {
            Text += `<td>${localStorage.getItem('where_solov')}</td>`;
        } else if (compteur[0] === 1) {
            Text += `<td><select id="numero" name="numero" onchange="modifierPage(this, '${TYPE}')"><option style="text-align: center;" value="" selected>NUMERO</option><option value="new">Nouveau</option>`;
            Object.keys(DATA1).forEach(element => {
                Text += `<option value="${element}">${element} - ${DATA1[element]["Nom"]}</option>`;
            });
            Text += `</select></td>`;
        } else {
            Text += `<td data-score="${MainDatasPast[DATA2[compteur[0]]]}"></td>`;
        }
        compteur = [compteur[0] + 1, compteur[1]];
    });
    newRow.innerHTML = Text;
}

function Transfo() {
    function Plus(NUM, BOOL) {
        if (NUM === 0 || BOOL === true) {
            return "";
        } else {
            return "+";
        }
    }

    Xompteur = 0;
    document.querySelectorAll('table').forEach(table => {
        if (Xompteur === 3) {
            Vi = 0;
            Vj = 1;
        } else {
            Vi = 1;
            Vj = 0;
        }
        for (var i = 0; i < table.rows.length - Vi; i++) {
            for (var j = 2 - Vj, cell; cell = table.rows[i].cells[j]; j++) {
                // console.log(cell.innerHTML);
                if (j === 2 && cell.innerHTML.includes("<input") === false) {
                    break;
                }
                switch (cell.getAttribute('data-score')) {
                    case "Info":
                    case "This":
                    case "App":
                    case "Lieu":
                    case "Infom":
                        Text = ""
                        compteur = 0;
                        cell.querySelectorAll('input[type="text"], select').forEach(function (child) {
                            if (child.parentElement.className === "oui") {
                                if (child.getAttribute('data-score') === "SS") {
                                    Text = Text.slice(0, -1) + "=>" + child.value + "\\";
                                } else {
                                    Text += Plus(compteur, child.innerText.includes("=>")) + child.value + "\\";
                                }
                            }
                            compteur++;
                        });
                        if (Text.length > 0 && Text[0] === "+") {
                            cell.innerHTML = '="' + Text.slice(0, -1) + '"';
                        } else {
                            cell.innerHTML = Text.slice(0, -1);
                        }
                        break;
                    case "Persos":
                        Text = ""
                        cell.querySelectorAll('select').forEach(function (child) {
                            if (child.parentElement.className === "oui") {
                                Text += child.value + ",";
                            }
                        });
                        cell.innerHTML = Text.slice(0, -1);
                        break;
                    case "Info\\Duree":
                    case "Lieu\\Duree":
                        Text = "";
                        compteur = [0, 0];
                        cell.querySelectorAll('div').forEach(function (child) {
                            child.querySelectorAll('select, input[type="text"]').forEach(function (minichild) {
                                if (child.className === "oui") {
                                    if (compteur[0] === 0) {
                                        if (minichild.getAttribute("data-score") === "SS") {
                                            Text = Text.slice(0, -1) + "=>" + minichild.value + ",";
                                        } else {
                                            Text += Plus(compteur[1], child.innerText.includes("=>")) + minichild.value + ",";
                                        }
                                        compteur[0]++;
                                    } else if (compteur[0] === 1) {
                                        Text += minichild.value + "-";
                                        compteur[0]++;
                                    } else if (compteur[0] === 2) {
                                        Text += minichild.value + "\\";
                                        compteur[0] = 0;
                                    }
                                }
                                compteur[1]++;
                            });

                        });
                        if (Text.length > 0 && Text[0] === "+") {
                            cell.innerHTML = '="' + Text.slice(0, -1) + '"';
                        } else {
                            cell.innerHTML = Text.slice(0, -1);
                        }
                        break;
                    case "Perso\\Infos":
                        Text = "";
                        compteur = [0, 0];
                        cell.querySelectorAll('div').forEach(function (child) {
                            child.querySelectorAll('select, input[type="text"]').forEach(function (minichild) {
                                if (child.className === "oui") {
                                    if (compteur[0] === 0) {
                                        if (minichild.getAttribute("data-score") === "SS") {
                                            Text = Text.slice(0, -1) + "=>" + minichild.value + ",";
                                        } else {
                                            Text += Plus(compteur[1], child.innerText.includes("=>")) + minichild.value + ","
                                        }
                                        compteur[0]++;
                                    } else if (compteur[0] === 1) {
                                        Text += minichild.value + "\\"
                                        compteur[0] = 0;
                                    }
                                }
                                compteur[1]++;
                            });
                        });
                        if (Text.length > 0 && Text[0] === "+") {
                            cell.innerHTML = '="' + Text.slice(0, -1) + '"';
                        } else {
                            cell.innerHTML = Text.slice(0, -1);
                        }
                        break;
                    case "Info\\Infos\\Duree":
                        Text = "";
                        compteur = [0, 0];
                        cell.querySelectorAll('div').forEach(function (child) {
                            child.querySelectorAll('input[type="text"]').forEach(function (minichild) {
                                if (child.className === "oui") {
                                    if (compteur[0] === 0) {
                                        if (minichild.getAttribute("data-score") === "SS") {
                                            Text = Text.slice(0, -1) + "=>" + minichild.value + ",";
                                        } else {
                                            Text += Plus(compteur[1], child.innerText.includes("=>")) + minichild.value + ","
                                        }
                                        compteur[0]++;
                                    } else if (compteur[0] === 1) {
                                        Text += minichild.value + ","
                                        compteur[0]++;
                                    } else if (compteur[0] === 2) {
                                        Text += minichild.value + "-"
                                        compteur[0]++;
                                    } else {
                                        Text += minichild.value + "\\"
                                        compteur[0] = 0;
                                    }
                                }
                                compteur[1]++;
                            });
                        });
                        if (Text.length > 0 && Text[0] === "+") {
                            cell.innerHTML = '="' + Text.slice(0, -1) + '"';
                        } else {
                            cell.innerHTML = Text.slice(0, -1);
                        }
                        break;
                }
            }
        }
        Xompteur++;
    })


}

async function TraiterSheetDatasSpe(DATA, WHERE) {
    try {
        DATACOLUMNS = DATA.table.cols.map(element => element.label)
        let NewData = [];
        let Number = 1;

        for (let i = 0; i < DATA.table.rows.length; i++) {
            if (DATA.table.rows[i].c[0].v == WHERE) {
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
                                    // console.log(TempData[k]);
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
        }
        return [NewData, DATACOLUMNS];
    } catch (error) {
        throw error;
    }
}

async function DatasVictorySpe(WHERE) {
    var modif = localStorage.getItem('modif_spe');
    if (modif === 'true') {
        try {
            var Maindatas = await RecupSheetDatas(SheetId, SheetTitleMain, SheetRangeMain);
            var MainDatas = await TraiterMainDatas(Maindatas);

            let Persodatas = await RecupSheetDatas(SheetId, SheetTitlePerso, SheetRangePerso);
            var [PersoDatas, PersoDatasColumns] = await TraiterSheetDatasSpe(Persodatas, WHERE);

            let Lieudatas = await RecupSheetDatas(SheetId, SheetTitleLieu, SheetRangeLieu);
            var [LieuDatas, LieuDatasColumns] = await TraiterSheetDatasSpe(Lieudatas, WHERE);

            let Appartenancedatas = await RecupSheetDatas(SheetId, SheetTitleAppartenance, SheetRangeAppartenance);
            var [AppartenanceDatas, AppartenanceDatasColumns] = await TraiterSheetDatasSpe(Appartenancedatas, WHERE);

            let Chapdatas = await RecupSheetDatas(SheetId, SheetTitleChapter, SheetRangeChapter);
            var [ChapDatas, ChapDatasColumns] = await TraiterSheetDatasSpe(Chapdatas, "None");

            var dico = { "Main": MainDatas, "Perso": [PersoDatas, PersoDatasColumns], "Lieu": [LieuDatas, LieuDatasColumns], "Appartenance": [AppartenanceDatas, AppartenanceDatasColumns], "Chap": [ChapDatas, ChapDatasColumns] };

            // console.log(dico);

            liste.forEach(function (B) {
                var request = indexedDB.open(`MaBaseDeDonneesSpe_${B}`, i);

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
                        // console.log("Objet modifié avec succès !");
                    };

                    NewRequest.onerror = function (event) {
                        console.error("Erreur lors de l'ajout de l'objet :", event.target.error);
                    };
                };

                request.onerror = function (event) {
                    console.error("Erreur lors de l'ouverture de la base de données :", event.target.error);
                };
            });
        } catch (error) {
            console.error('Une erreur est survenue :', error);
        }

        modif = false;
        localStorage.setItem('modif_spe', modif);
    } else {
        var dico = {};
        try {
            var promesses = [];
            for (let B of liste) {
                var promesse = new Promise(function (resolve, reject) {
                    var request = indexedDB.open(`MaBaseDeDonneesSpe_${B}`, i);

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
                            // console.log("Récupération réussie pour :", B)
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
                        localStorage.setItem('modif_spe', modif);
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
            var [PersoDatas, PersoDatasColumns] = await TraiterSheetDatasSpe(Persodatas, WHERE);

            let Lieudatas = await RecupSheetDatas(SheetId, SheetTitleLieu, SheetRangeLieu);
            var [LieuDatas, LieuDatasColumns] = await TraiterSheetDatasSpe(Lieudatas, WHERE);

            let Appartenancedatas = await RecupSheetDatas(SheetId, SheetTitleAppartenance, SheetRangeAppartenance);
            var [AppartenanceDatas, AppartenanceDatasColumns] = await TraiterSheetDatasSpe(Appartenancedatas, WHERE);

            let Chapdatas = await RecupSheetDatas(SheetId, SheetTitleChapter, SheetRangeChapter);
            var [ChapDatas, ChapDatasColumns] = await TraiterSheetDatasSpe(Chapdatas, "None");

            var dico = { "Main": MainDatas, "Perso": [PersoDatas, PersoDatasColumns], "Lieu": [LieuDatas, LieuDatasColumns], "Appartenance": [AppartenanceDatas, AppartenanceDatasColumns], "Chap": [ChapDatas, ChapDatasColumns] };
            return dico;
        }
    }

    return dico;
}

async function DatasVictorySpe2(WHERE) {
    var modif = localStorage.getItem('modif_spe2');
    WHERE = String(Number(WHERE) - 1);
    if (modif === 'true') {
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

            // console.log(dico);

            liste.forEach(function (B) {
                var request = indexedDB.open(`MaBaseDeDonneesSpe2_${B}`, i);

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
                        // console.log("Objet modifié avec succès !");
                    };

                    NewRequest.onerror = function (event) {
                        console.error("Erreur lors de l'ajout de l'objet :", event.target.error);
                    };
                };

                request.onerror = function (event) {
                    console.error("Erreur lors de l'ouverture de la base de données :", event.target.error);
                };
            });
        } catch (error) {
            console.error('Une erreur est survenue :', error);
        }

        modif = false;
        localStorage.setItem('modif_spe2', modif);
    } else {
        var dico = {};
        try {
            var promesses = [];
            for (let B of liste) {
                var promesse = new Promise(function (resolve, reject) {
                    var request = indexedDB.open(`MaBaseDeDonneesSpe2_${B}`, i);

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
                            // console.log("Récupération réussie pour :", B)
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
                        localStorage.setItem('modif_spe2', modif);
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

async function generalModif() {
    localStorage.setItem('modif_spe', 'true');
    localStorage.setItem('modif_spe2', 'true');
    let dicoReturnPast = await DatasVictory(localStorage.getItem('where_solov'), false);
    // console.log("dicoReturnPast", dicoReturnPast, localStorage.getItem('where_solov'));
    var MainDatasPast = dicoReturnPast["Main"];
    var [PersoDatasPast, PersoDatasColumnsPast] = dicoReturnPast["Perso"];
    var [LieuDatasPast, LieuDatasColumnsPast] = dicoReturnPast["Lieu"];
    var [AppartenanceDatasPast, AppartenanceDatasColumnsPast] = dicoReturnPast["Appartenance"];
    var [ChapDatasPast, ChapDatasColumnsPast] = dicoReturnPast["Chap"];

    var divPro = document.getElementById("modification");

    [[PersoDatasPast, PersoDatasColumnsPast, "Personnages"], [LieuDatasPast, LieuDatasColumnsPast, "Locations"], [AppartenanceDatasPast, AppartenanceDatasColumnsPast, "Groupes"]].forEach(Datas => {
        var Text = `<div class='table-container'><table border=1 id='table'><caption>${Datas[2]} :<br></select></caption><thead><tr>`;
        Datas[1].forEach(element => {
            Text += `<th>${element}</th>`;
        });

        compteur = [0, 0];
        Text += `</tr></thead><tbody><tr id="${compteur[1]}">`;
        Datas[1].forEach(element => {
            if (compteur[0] === 0) {
                Text += `<td>${localStorage.getItem('where_solov')}</td>`;
            } else if (compteur[0] === 1) {
                Text += `<td><select id="numero" name="numero" onchange="modifierPage(this, '${Datas[2]}')"><option style="text-align: center;" value="" selected>NUMERO</option><option value="new">Nouveau</option>`;
                Object.keys(Datas[0]).forEach(element => {
                    Text += `<option value="${element}">${element} - ${Datas[0][element]["Nom"]}</option>`;
                });
                Text += `</select></td>`;
            } else {
                Text += `<td data-score="${MainDatasPast[Datas[1][compteur[0]]]}"></td>`;
            }
            compteur = [compteur[0] + 1, compteur[1]];
        });
        Text += "</tr></tbody></table></div>";
        divPro.innerHTML += Text;
    })
    var Text = `<div class='table-container'><table border=1 id='table'><caption>Chapitre :<br></select></caption><thead><tr>`;
    ChapDatasColumnsPast.forEach(element => {
        Text += `<th>${element}</th>`;
    });

    NewCompteur = 0;
    Text += `</tr></thead><tbody><tr id="${NewCompteur}">`;
    if (localStorage.getItem('where_solov') in ChapDatasPast) {
        ChapDatasColumnsPast.forEach(element => {
            if (NewCompteur === 0) {
                Text += `<td>${localStorage.getItem('where_solov')}</td>`;
            } else {
                switch (MainDatasPast[ChapDatasColumnsPast[NewCompteur]]) {
                    case "Info":
                        Text += `<td data-score='${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}'><div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${ChapDatasPast[localStorage.getItem('where_solov')][ChapDatasColumnsPast[NewCompteur]]}"></input></div></td>`;
                        break;
                    case "Persos":
                        Temp = "";
                        if (Array.isArray(ChapDatasPast[localStorage.getItem('where_solov')][ChapDatasColumnsPast[NewCompteur]][0])) {
                            ToEach = ChapDatasPast[localStorage.getItem('where_solov')][ChapDatasColumnsPast[NewCompteur]][0];
                        } else {
                            ToEach = ChapDatasPast[localStorage.getItem('where_solov')][ChapDatasColumnsPast[NewCompteur]];
                        }
                        ToEach.forEach(perso => {
                            Temp += `<div class="oui"><select style="color: red;">`;
                            Object.keys(PersoDatasPast).forEach(element => {
                                if (element === perso) {
                                    Temp += `<option selected value="${element}">${element} - ${PersoDatasPast[element]["Nom"]}</option>`;
                                } else {
                                    Temp += `<option value="${element}">${element} - ${PersoDatasPast[element]["Nom"]}</option>`;
                                }
                            });
                            Temp += `</select></div>`;
                        })
                        Text += `<td data-score='${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}'>` + Temp + `<button onclick="Add(this, '${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}')">Ajouter</button><button onclick="Supp(this)">Supprimer</button></td>`;
                        break;
                }
            }
            NewCompteur++;
        });
    } else {
        ChapDatasColumnsPast.forEach(element => {
            if (NewCompteur === 0) {
                Text += `<td>${localStorage.getItem('where_solov')}</td>`;
            } else {
                switch (MainDatasPast[ChapDatasColumnsPast[NewCompteur]]) {
                    case "Info":
                        Text += `<td data-score='${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}'><div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text" value=""></input></div></td>`;
                        break;
                    case "Persos":
                        Text += `<td data-score='${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}'><button onclick="Add(this, '${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}')">Ajouter</button><button onclick="Supp(this)">Supprimer</button></td>`;
                        break;
                }
            }
            NewCompteur++;
        });
    }
    Text += "</tr></tbody></table></div>";
    divPro.innerHTML += Text;
    /*
    var Text = "<div class='table-container'><table border=1 id='table'><caption>Personnages :<br></select></caption><thead><tr>";
    PersoDatasColumnsPast.forEach(element => {
        Text += `<th>${element}</th>`;
    });
    Res = Text + "</tr></thead></table></div>";
    divPro.innerHTML += Res;
    
    compteur = [0, 0];
    Text += `</tr></thead><tbody><tr id="${compteur[1]}">`;
    PersoDatasColumnsPast.forEach(element => {
        if (compteur[0] === 0) {
            Text += `<td>${localStorage.getItem('where_solov')}</td>`;
        } else if (compteur[0] === 1) {
            Text += `<td><select id="numero" name="numero" onchange="modifierPage(${compteur[1]})"><option style="text-align: center;" value="" selected>NUMERO</option><option value="new">Nouveau</option>`;
            Object.keys(PersoDatasPast).forEach(element => {
                Text += `<option value="${element}">${element} - ${PersoDatasPast[element]["Nom"]}</option>`;
            });
            Text += `</select></td>`;
        } else {
            Text += `<td data-score="${MainDatasPast[PersoDatasColumnsPast[compteur[0]]]}"></td>`;
        }
        compteur = [compteur[0] + 1, compteur[1]];
    });
    Text += "</tr></tbody></table></div>";
    divPro.innerHTML = Text;*/
}