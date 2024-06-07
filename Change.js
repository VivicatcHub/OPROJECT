function AddButton(DATA, CASE) {
    let Div = document.createElement('div');
    let Button1 = document.createElement('button');
    Button1.textContent = 'Ajouter';
    Button1.onclick = function () { Add(this, DATA); };
    Div.appendChild(Button1);
    let Button2 = document.createElement('button');
    Button2.textContent = 'Supprimer';
    Button2.onclick = function () { Supp(this, DATA); };
    Div.appendChild(Button2);
    CASE.appendChild(Div);
}

async function Add(ELEMENT, TYPE) {
    let Datas_Range = await DatasRange();
    let Dico_Return_Past = await DatasVictory(localStorage.getItem(`Where${ANIME}`), false, Datas_Range);
    var Child = ELEMENT.parentElement.parentElement;
    ELEMENT.parentElement.remove();
    let New_Element = document.createElement('div');
    New_Element.className = 'oui';
    // console.log(Data);
    var Text_Temp = "";
    TYPE = TYPE.split("|");
    TYPE.forEach(D => {
        switch (D) {
            case "Info":
            case "Infom":
                Text_Temp += '<input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>';
                break;
            case "Infos":
                Text_Temp += ' | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>';
                break;
            case "Duree":
                Text_Temp += ' | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>';
                break;
            case "Date":
                Text_Temp += '<input style="color: red;" oninput="ajusterTaille(this)" type="date"></input>';
                break;
            default:
                try {
                    let Dico = Dico_Return_Past[D];
                    let Temp = `<select style="color: red;">`;
                    Object.keys(Dico[0]).forEach(Element => {
                        Temp += `<option value="${Element}">${Element} - ${Dico[0][Element]["Nom"]}</option>`;
                    });
                    Text_Temp += Temp + `</select>`;
                    break;
                } catch (Error) {
                    console.log("Erreur,", D, "n'existe pas dans le dico");
                }
        }
    });
    New_Element.innerHTML = Text_Temp;
    Child.appendChild(New_Element);
    AddButton(TYPE, Child);
}

function GetElementFromEnd(COLLECTION, INDEX_FROM_END) {
    var Length = COLLECTION.length;
    var Positive_Index = Length + INDEX_FROM_END;
    if (Positive_Index >= 0 && Positive_Index < Length) {
        return COLLECTION[Positive_Index];
    } else {
        return undefined;
    }
}

function Supp(ELEMENT, DATA) {
    var Child = ELEMENT.parentElement.parentElement;
    var As = GetElementFromEnd(Child.children, -2);
    As.remove();
    ELEMENT.parentElement.remove();
    AddButton(DATA, Child);
}

function AjusterTaille(INPUT) {
    var Div = document.createElement('div');
    Div.style.width = 'auto';
    Div.style.position = 'absolute';
    Div.style.visibility = 'hidden';
    Div.style.whiteSpace = 'pre'; // Pour conserver les espaces et les retours à la ligne
    Div.textContent = INPUT.value;
    document.body.appendChild(Div);
    INPUT.style.width = Div.offsetWidth + 'px';
    document.body.removeChild(Div);
}

async function Modification(ELEMENT) {
    let Datas_Range = await DatasRange();
    let Dico_Return_Past = await DatasVictory(localStorage.getItem(`Where${ANIME}`), false, Datas_Range);
    // console.log(Element, Data);
    var Parent = ELEMENT.parentElement;
    ELEMENT.remove();
    var Type = Parent.parentElement.getAttribute('data-score');
    var Text_Temp = "";
    Type = Type.split("|");
    Type.forEach(D => {
        switch (D) {
            case "Info":
            case "Infom":
                Parent.className = "oui";
                Text_Temp += `=><input data-score="SS" style="color: red;" oninput="ajusterTaille(this)" type="text"></input>`;
                break;
            case "Infos":
                Text_Temp += ' | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>';
                break;
            case "Duree":
                Text_Temp += ' | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input>';
                break;
            case "Date":
                Text_Temp += '=><input style="color: red;" oninput="ajusterTaille(this)" type="date"></input>';
                break;
            default:
                try {
                    let Dico = Dico_Return_Past[D];
                    let Temp = `=><select style="color: red;">`;
                    Object.keys(Dico[0]).forEach(Element => {
                        Temp += `<option value="${Element}">${Element} - ${Dico[0][Element]["Nom"]}</option>`;
                    });
                    Text_Temp += Temp + `</select>`;
                    break;
                } catch (Error) {
                    console.log("Erreur,", D, "n'existe pas dans le dico");
                }
        }
    });
    Parent.innerHTML += Text_Temp;
}

function InDatas(DATA, RANGE) {
    // console.log("RANGE:", RANGE, "DATA:", DATA, "=>", RANGE.some(element => JSON.stringify(element[0]) === JSON.stringify(DATA)));
    return RANGE.some(element => JSON.stringify(element[0]) === JSON.stringify(DATA));
}

function FirstValueOrOnlyOne(DATA, BOOL) {
    switch (BOOL) {
        case 0:
        case 1:
            return DATA;
        default:
            return DATA[0];
    }
}

function DivOrNot(BOOL, I, BUTTON) {
    if (BOOL === I + 1 && BUTTON) {
        return "<button onclick='Modification(this)'>Modif</button></div>";
    } else if (BOOL === I + 1)  {
        return "</div>";
    } else {
        return "";
    }
}

async function ModifierPage(INPUT, TYPE) {
    var Choix = INPUT.value;
    var Ligne = INPUT.parentElement.parentElement;
    let Dico_Return_Past = await DatasVictorySpe2(localStorage.getItem(`Where${ANIME}`));
    // console.log(dicoReturPast);
    var Main_Datas_Past = Dico_Return_Past["Main"];
    var [PersoDatasPast, PersoDatasColumnsPast] = Dico_Return_Past["Perso"];
    var [LieuDatasPast, LieuDatasColumnsPast] = Dico_Return_Past["Lieu"];
    var [AppartenanceDatasPast, AppartenanceDatasColumnsPast] = Dico_Return_Past["Appartenance"];

    let Dico_Return = await DatasVictorySpe(localStorage.getItem(`Where${ANIME}`));
    // console.log("dicoReturn", dicoReturn, localStorage.getItem(`Where${ANIME}`));
    var PersoDatas = Dico_Return["Perso"][0];
    var LieuDatas = Dico_Return["Lieu"][0];
    var AppartenanceDatas = Dico_Return["Appartenance"][0];

    // console.log(TYPE)
    var [DATA1, DATA2, DATA3] = {
        "Perso": [PersoDatasPast, PersoDatasColumnsPast, PersoDatas],
        "Lieu": [LieuDatasPast, LieuDatasColumnsPast, LieuDatas],
        "Appartenance": [AppartenanceDatasPast, AppartenanceDatasColumnsPast, AppartenanceDatas]
    }[TYPE];

    var Compteur = 0;
    Array.from(Ligne.children).forEach(function (Child) {
        let [Ligne_Past, Column] = Dico_Return_Past[TYPE];
        let Ligne_Act = Dico_Return[TYPE][0];
        // console.log("compteur:", compteur, "choix:", choix, "Ligne_Past:", Ligne_Past, "Ligne_Past[choix][Column[compteur]]:", Ligne_Past[choix][Column[compteur]], "Ligne_Act:", Ligne_Act, "Ligne_Act[choix][Column[compteur]]:", Ligne_Act[choix][Column[compteur]]);
        if (Compteur === 1) {
            Child.innerHTML = Choix;
        } else if (Compteur > 1 && Choix !== "new" && ((Choix in Ligne_Past && Ligne_Past[Choix][Column[Compteur]] !== null) || (Choix in Ligne_Act && Ligne_Act[Choix][Column[Compteur]] !== null))) {
            var Text_Temp = "";
            let Type = Main_Datas_Past[Column[Compteur]].split("|");
            if (Choix in Ligne_Past && Ligne_Past[Choix][Column[Compteur]] !== null) {
                Ligne_Past[Choix][Column[Compteur]].forEach(Data => {
                    let Div = DivOrNot(Type.length, 0, true);
                    switch (Type[0]) {
                        case "Info":
                        case "Infom":
                            if (Ligne_Act[Choix] === undefined || Ligne_Act[Choix][Column[Compteur]] === null || InDatas(Data, Ligne_Act[Choix][Column[Compteur]][0]) === false) {
                                Temp_Data = FirstValueOrOnlyOne(Data, Type.length);
                                Text_Temp += `<div><input oninput="ajusterTaille(this)" type="text" value="${Temp_Data}"></input>${Div}`;
                            }
                            break;
                        default:
                            try {
                                let Dico = Dico_Return_Past[Type[0]];
                                let Temp = `<div><select>`;
                                Object.keys(Dico[0]).forEach(Element => {
                                    if (Data[0] == Element) {
                                        Temp += `<option selected value="${Element}">${Element} - ${Dico[0][Element]["Nom"]}</option>`;
                                    } else {
                                        Temp += `<option value="${Element}">${Element} - ${Dico[0][Element]["Nom"]}</option>`;
                                    }
                                });
                                Text_Temp += Temp + `</select>${Div}`;
                                break;
                            } catch (Error) {
                                console.log("Erreur,", Type[0], "n'existe pas dans le dico");
                            }
                            break;
                    }
                    for (let i = 1; i < Type.length; i++) {
                        let Div = DivOrNot(Type.length, i, true);
                        switch (Type[i]) {
                            case "Duree":
                                Text_Temp += ` | <input oninput="ajusterTaille(this)" type="text" value="${Data[i].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${Data[i].split("-")[1]}"></input>${Div}`;
                                break;
                            case "Infos":
                                Text_Temp += ` | <input oninput="ajusterTaille(this)" type="text" value="${Data[i]}">${Div}`;
                                break;
                        }
                    }
                });
            }
            if (Choix in Ligne_Act && Ligne_Act[Choix][Column[Compteur]] !== null) {
                Ligne_Act[Choix][Column[Compteur]].forEach(Data => {
                    let Div = DivOrNot(Type.length, 0, false);
                    switch (Type[0]) {
                        case "Info":
                        case "Infom":
                            console.log(Data)
                            if (Array.isArray(Data[0])) {
                                Text_Temp += `<div class="oui"><input oninput="ajusterTaille(this)" type="text" value="${Data[1][0]}"></input>`;
                            } else {
                                Text_Temp += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${Data[0]}"></input>${Div}`;
                            }
                            break;
                        default:
                            try {
                                let Dico = Dico_Return[Type[0]];
                                if (Array.isArray(Data[0])) {
                                    var Temp = `<div class="oui"><select>`;
                                } else {
                                    var Temp = `<div class="oui"><select style="color: red;">`;
                                }
                                Object.keys(Dico[0]).forEach(Element => {
                                    console.log(Data, Array.isArray(Data))
                                    Temp += `<option value="${Element}">${Element} - ${Dico[0][Element]["Nom"]}</option>`;
                                });
                                Text_Temp += Temp + `</select>`;
                                if (Array.isArray(Data[0])) {
                                    Text_Temp += '${Div}';
                                }
                                break;
                            } catch (Error) {
                                console.log("Erreur,", D, "n'existe pas dans le dico");
                            }
                            break;
                    }
                    for (let i = 1; i < Type.length; i++) {
                        let Div = DivOrNot(Type.length, i, false);
                        switch (Type[i]) {
                            case "Duree":
                                if (Array.isArray(Data[0])) {
                                    Text_Temp += ` | <input oninput="ajusterTaille(this)" type="text" value="${Data[0][i].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${Data[0][i].split("-")[1]}"></input>`;
                                } else {
                                    Text_Temp += ` | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${Data[i].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${Data[i].split("-")[1]}"></input>${Div}`;
                                }
                                break;
                            case "Infos":
                                if (Array.isArray(Data[0])) {
                                    Text_Temp += ` | <input oninput="ajusterTaille(this)" type="text" value="${Data[0][i]}"></input>`;
                                } else {
                                    Text_Temp += ` | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${Data[i]}"></input>${Div}`;
                                }
                                break;
                        }
                    }
                    Div = DivOrNot(Type.length, 0, false);
                    switch (Type[0]) {
                        case "Info":
                        case "Infom":
                            if (Array.isArray(Data[0])) {
                                Text_Temp += `=><input data-score="SS" style="color: red;" oninput="ajusterTaille(this)" type="text" value="${Data[1][0]}"></input>${Div}`;
                            }
                            break;
                        default:
                            try {
                                if (Array.isArray(Data[0])) {
                                    let Dico = Dico_Return_Past[Type[0]];
                                    let Temp = `=><select data-score="SS">`;
                                    Object.keys(Dico[0]).forEach(Element => {
                                        Temp += `<option style="color: red;" value="${Element}">${Element} - ${Dico[0][Element]["Nom"]}</option>`;
                                    });
                                    Text_Temp += Temp + `</select>${Div}`;
                                }
                                break;
                            } catch (Error) {
                                console.log("Erreur,", D, "n'existe pas dans le dico");
                            }
                            break;
                    }
                    for (let i = 1; i < Type.length; i++) {
                        let Div = DivOrNot(Type.length, i, false);
                        switch (Type[i]) {
                            case "Duree":
                                if (Array.isArray(Data[i])) {
                                    Text_Temp += ` | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${Data[i][1].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${Data[i][1].split("-")[1]}"></input>${Div}`;
                                }
                                break;
                            case "Infos":
                                if (Array.isArray(Data[0])) {
                                    Text_Temp += ` | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${Data[i]}"></input>${Div}`;
                                }
                                break;
                        }
                    }
                });
            }
            Child.innerHTML += Text_Temp;
            /*
            switch (Main_Datas_Past[Column[Compteur]]) {
                case "Infom":
                case "Info":
                    if (Choix in Ligne_Past && Ligne_Past[Choix][Column[Compteur]] !== null) {
                        Ligne_Past[Choix][Column[Compteur]].forEach(data => {
                            // console.log("data:", data, "Ligne_Act[choix][Column[compteur]]:", Ligne_Act[choix][Column[compteur]]);
                            if (Ligne_Act[Choix] === undefined || Ligne_Act[Choix][Column[Compteur]] === null || InDatas(data, Ligne_Act[Choix][Column[Compteur]][0]) === false) {
                                Child.innerHTML += `<div><input oninput="ajusterTaille(this)" type="text" value="${data}"></input><button onclick="Modification(this)">Modif</button></div>`;
                            }
                        });
                    }
                    if (Choix in Ligne_Act && Ligne_Act[Choix][Column[Compteur]] !== null) {
                        Ligne_Act[Choix][Column[Compteur]].forEach(data => {
                            // console.log("data", data);
                            if (Array.isArray(data[0])) {
                                Child.innerHTML += `<div class="oui"><input oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input>=><input data-score="SS" style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input></div>`;
                            } else {
                                Child.innerHTML += `<div class="oui"><input oninput="ajusterTaille(this)" type="text" value="${data}"></input></div>`;
                            }
                        });
                    }
                    break;
                case "Info\\Duree":
                    if (Choix in Ligne_Past && Ligne_Past[Choix][Column[Compteur]] !== null) {
                        Ligne_Past[Choix][Column[Compteur]].forEach(data => {
                            if (Ligne_Act[Choix] === undefined || Ligne_Act[Choix][Column[Compteur]] === null || InDatas(data, Ligne_Act[Choix][Column[Compteur]]) === false) {
                                Child.innerHTML += `<div><input oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[1]}"></input><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (Choix in Ligne_Act && Ligne_Act[Choix][Column[Compteur]] !== null) {
                        Ligne_Act[Choix][Column[Compteur]].forEach(data => {
                            // console.log("data", data);
                            if (Array.isArray(data[0])) {
                                Child.innerHTML += `<div class="oui"><input oninput="ajusterTaille(this)" type="text" value="${data[0][0]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[0][1].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[0][1].split("-")[1]}"></input>=><input data-score="SS" style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][0]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][1].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][1].split("-")[1]}"></input></div>`;
                            } else {
                                Child.innerHTML += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[1]}"></input></div>`;
                            }
                        });
                    }
                    break;
                case "Info\\Infos\\Duree":
                    if (Choix in Ligne_Past && Ligne_Past[Choix][Column[Compteur]] !== null) {
                        Ligne_Past[Choix][Column[Compteur]].forEach(data => {
                            if (Ligne_Act[Choix] === undefined || Ligne_Act[Choix][Column[Compteur]] === null || InDatas(data, Ligne_Act[Choix][Column[Compteur]]) === false) {
                                Child.innerHTML += `<div><input oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[1]}"></input><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (Choix in Ligne_Act && Ligne_Act[Choix][Column[Compteur]] !== null) {
                        Ligne_Act[Choix][Column[Compteur]].forEach(data => {
                            // console.log("data", data);
                            if (Array.isArray(data[0])) {
                                Child.innerHTML += `<div class="oui"><input oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input> | <input oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[1]}"></input>=><input data-score="SS" style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[1]}"></input></div>`;
                            } else {
                                Child.innerHTML += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[0]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[2].split("-")[1]}"></input></div>`;
                            }
                        });
                    }
                    break;
                case "Lieu\\Duree":
                    TempLieu = { ...LieuDatas, ...LieuDatasPast };
                    if (Choix in Ligne_Past && Ligne_Past[Choix][Column[Compteur]] !== null) {
                        Ligne_Past[Choix][Column[Compteur]].forEach(data => {
                            if (Ligne_Act[Choix] === undefined || Ligne_Act[Choix][Column[Compteur]] === null || InDatas(data, Ligne_Act[Choix][Column[Compteur]]) === false) {
                                Text = `<div><select>`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                // console.log("data", data);
                                Child.innerHTML += Text + `</select> | <input oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[1]}"></input><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (Choix in Ligne_Act && Ligne_Act[Choix][Column[Compteur]] !== null) {
                        Ligne_Act[Choix][Column[Compteur]].forEach(data => {
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
                                Child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][1].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][1].split("-")[1]}"></input></div>`;
                            } else {
                                Text = `<div class="oui"><select style="color: red;">`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                Child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[1]}"></input></div>`;
                            }
                        });
                    }
                    break;
                case "Perso\\Infos":
                    TempPerso = { ...PersoDatas, ...PersoDatasPast }
                    // console.log(TempPerso);
                    if (Choix in Ligne_Past && Ligne_Past[Choix][Column[Compteur]] !== null) {
                        Ligne_Past[Choix][Column[Compteur]].forEach(data => {
                            if (Ligne_Act[Choix] === undefined || Ligne_Act[Choix][Column[Compteur]] === null || InDatas(data, Ligne_Act[Choix][Column[Compteur]]) === false) {
                                Text = `<div><select>`;
                                // console.log("data", data);
                                Object.keys(TempPerso).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempPerso[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempPerso[element]["Nom"]}</option>`;
                                    }
                                });
                                Child.innerHTML += Text + `</select> | <input oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (Choix in Ligne_Act && Ligne_Act[Choix][Column[Compteur]] !== null) {
                        Ligne_Act[Choix][Column[Compteur]].forEach(data => {
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
                                Child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input></div>`;
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
                                Child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1]}"></input></div>`;
                            }
                        });
                    }
                    break;
                case "Lieu":
                    TempLieu = { ...LieuDatas, ...LieuDatasPast };
                    if (Choix in Ligne_Past && Ligne_Past[Choix][Column[Compteur]] !== null) {
                        Ligne_Past[Choix][Column[Compteur]].forEach(data => {
                            if (Ligne_Act[Choix] === undefined || Ligne_Act[Choix][Column[Compteur]] === null || InDatas(data, Ligne_Act[Choix][Column[Compteur]]) === false) {
                                Text = `<div><select>`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                // console.log("data", data);
                                Child.innerHTML += Text + `</select><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (Choix in Ligne_Act && Ligne_Act[Choix][Column[Compteur]] !== null) {
                        Ligne_Act[Choix][Column[Compteur]].forEach(data => {
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
                                Child.innerHTML += Text + `</select></div>`;
                            } else {
                                Text = `<div class="oui"><select style="color: red;">`;
                                Object.keys(TempLieu).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempLieu[element]["Nom"]}</option>`;
                                    }
                                });
                                Child.innerHTML += Text + `</select></div>`;
                            }
                        });
                    }
                    break;
                case "Appartenance":
                    TempApp = { ...AppartenanceDatas, ...AppartenanceDatasPast };
                    if (Choix in Ligne_Past && Ligne_Past[Choix][Column[Compteur]] !== null) {
                        Ligne_Past[Choix][Column[Compteur]].forEach(data => {
                            if (Ligne_Act[Choix] === undefined || Ligne_Act[Choix][Column[Compteur]] === null || InDatas(data, Ligne_Act[Choix][Column[Compteur]]) === false) {
                                Text = `<div><select>`;
                                Object.keys(TempApp).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempApp[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempApp[element]["Nom"]}</option>`;
                                    }
                                });
                                // console.log("data", data);
                                Child.innerHTML += Text + `</select><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (Choix in Ligne_Act && Ligne_Act[Choix][Column[Compteur]] !== null) {
                        Ligne_Act[Choix][Column[Compteur]].forEach(data => {
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
                                Child.innerHTML += Text + `</select></div>`;
                            } else {
                                Text = `<div class="oui"><select style="color: red;">`;
                                Object.keys(TempApp).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempApp[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempApp[element]["Nom"]}</option>`;
                                    }
                                });
                                Child.innerHTML += Text + `</select></div>`;
                            }
                        });
                    }
                    break;
                case "Appartenance\\Duree":
                    TempApp = { ...AppartenanceDatas, ...AppartenanceDatasPast };
                    if (Choix in Ligne_Past && Ligne_Past[Choix][Column[Compteur]] !== null) {
                        Ligne_Past[Choix][Column[Compteur]].forEach(data => {
                            if (Ligne_Act[Choix] === undefined || Ligne_Act[Choix][Column[Compteur]] === null || InDatas(data, Ligne_Act[Choix][Column[Compteur]]) === false) {
                                Text = `<div><select>`;
                                Object.keys(TempApp).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempApp[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempApp[element]["Nom"]}</option>`;
                                    }
                                });
                                // console.log("data", data);
                                Child.innerHTML += Text + `</select> | <input oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[1]}"></input><button onclick="Modification(this)">Modif</button</div>`;
                            }
                        });
                    }
                    if (Choix in Ligne_Act && Ligne_Act[Choix][Column[Compteur]] !== null) {
                        Ligne_Act[Choix][Column[Compteur]].forEach(data => {
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
                                Text += `</select> | <input oninput="ajusterTaille(this)" type="text" value="${data[0][1].split("-")[0]}"></input> - <input oninput="ajusterTaille(this)" type="text" value="${data[0][1].split("-")[1]}"></input>=><select data-score="SS" style="color: red;">`;
                                Object.keys(TempApp).forEach(element => {
                                    if (element === data[1][0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempApp[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempApp[element]["Nom"]}</option>`;
                                    }
                                });
                                Child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][1].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1][1].split("-")[1]}"></input></div>`;
                            } else {
                                Text = `<div class="oui"><select style="color: red;">`;
                                Object.keys(TempApp).forEach(element => {
                                    if (element === data[0]) {
                                        Text += `<option value="${element}" selected>${element} - ${TempApp[element]["Nom"]}</option>`;
                                    } else {
                                        Text += `<option value="${element}">${element} - ${TempApp[element]["Nom"]}</option>`;
                                    }
                                });
                                Child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[0]}"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${data[1].split("-")[1]}"></input></div>`;
                            }
                        });
                    }
                    break;
            }
            */
        } else {
            switch (Main_Datas_Past[Column[Compteur]]) {
                case "Info":
                case "Infom":
                    Child.innerHTML += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text"></input></div>`;
                    break;
                case "Info\Duree":
                    Child.innerHTML += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input></div>`;
                    break;
                case "Info\Infos\Duree":
                    Child.innerHTML += `<div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input></div>`;
                    break;
                case "Lieu\Duree":
                    Text = `<div class="oui"><select style="color: red;">`;
                    Object.keys(LieuDatasPast).forEach(element => {
                        Text += `<option value="${element}">${element} - ${LieuDatasPast[element]["Nom"]}</option>`;
                    });
                    Child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input></div>`;
                    break;
                case "Perso\Infos":
                    Text = `<div class="oui"><select style="color: red;">`;
                    Object.keys(PersoDatasPast).forEach(element => {
                        Text += `<option value="${element}">${element} - ${PersoDatasPast[element]["Nom"]}</option>`;
                    });
                    Child.innerHTML += Text + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input></div>`;
                    break;
                case "Lieu":
                    Text = `<div class="oui"><select style="color: red;">`;
                    Object.keys(LieuDatasPast).forEach(element => {
                        Text += `<option value="${element}">${element} - ${LieuDatasPast[element]["Nom"]}</option>`;
                    });
                    Child.innerHTML += Text + `</select></div>`;
                    break;
                case "Appartenance":
                    Text = `<div class="oui"><select style="color: red;">`;
                    Object.keys(AppartenanceDatasPast).forEach(element => {
                        Text += `<option value="${element}">${element} - ${AppartenanceDatasPast[element]["Nom"]}</option>`;
                    });
                    Child.innerHTML += Text + `</select></div>`;
                    break;
                case "Appartenance\Duree":
                    let TempAppa = `<div class="oui"><select style="color: red;">`;
                    Object.keys(AppartenanceDatasPast).forEach(element => {
                        TempAppa += `<option value="${element}">${element} - ${AppartenanceDatasPast[element]["Nom"]}</option>`;
                    });
                    Child.innerHTML = TempAppa + `</select> | <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input> - <input style="color: red;" oninput="ajusterTaille(this)" type="text"></input></div>`;
                    break;
            }
        }
        if (Compteur > 1) {
            Child.innerHTML += `<div><button onclick="Add(this, '${Main_Datas_Past[DATA2[Compteur]]}')">Ajouter</button><button onclick="Supp(this, '${Main_Datas_Past[DATA2[Compteur]]}')">Supprimer</button></div>`;
        }
        Compteur++;
    });
    let DATAS_RANGE = await DatasRange();
    let dicoReturnPast = await DatasVictory(localStorage.getItem(`Where${ANIME}`), false, DATAS_RANGE);
    // console.log("dicoReturnPast", dicoReturnPast, localStorage.getItem(`Where${ANIME}`));
    var Main_Datas_Past = dicoReturnPast["Main"];
    var [PersoDatasPast, PersoDatasColumnsPast] = dicoReturnPast["Perso"];
    var [LieuDatasPast, LieuDatasColumnsPast] = dicoReturnPast["Lieu"];
    var [AppartenanceDatasPast, AppartenanceDatasColumnsPast] = dicoReturnPast["Appartenance"];

    [DATA1, DATA2] = {
        "Perso": [PersoDatasPast, PersoDatasColumnsPast],
        "Lieu": [LieuDatasPast, LieuDatasColumnsPast],
        "Appartenance": [AppartenanceDatasPast, AppartenanceDatasColumnsPast]
    }[TYPE];

    var table = Ligne.parentElement.parentElement.getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    Compteur = [0, table.rows.length];
    newRow.id = `${Compteur[1]}`
    Text = ``;
    DATA2.forEach(element => {
        if (Compteur[0] === 0) {
            Text += `<td>${localStorage.getItem(`Where${ANIME}`)}</td>`;
        } else if (Compteur[0] === 1) {
            Text += `<td><select id="numero" name="numero" onchange="ModifierPage(this, '${TYPE}')"><option style="text-align: center;" value="" selected>NUMERO</option><option value="new">Nouveau</option>`;
            Object.keys(DATA1).forEach(element => {
                Text += `<option value="${element}">${element} - ${DATA1[element]["Nom"]}</option>`;
            });
            Text += `</select></td>`;
        } else {
            Text += `<td data-score="${Main_Datas_Past[DATA2[Compteur[0]]]}"></td>`;
        }
        Compteur = [Compteur[0] + 1, Compteur[1]];
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
        for (var I = 0; I < table.rows.length - Vi; I++) {
            for (var j = 2 - Vj, cell; cell = table.rows[I].cells[j]; j++) {
                // console.log(cell.innerHTML);
                if (j === 2 && cell.innerHTML.includes("<input") === false) {
                    break;
                }
                switch (cell.getAttribute('data-score')) {
                    case "Info":
                    case "This":
                    case "Appartenance":
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
                    case "Perso":
                        Text = ""
                        cell.querySelectorAll('select').forEach(function (child) {
                            if (child.parentElement.className === "oui") {
                                Text += child.value + ",";
                            }
                        });
                        cell.innerHTML = Text.slice(0, -1);
                        break;
                    case "Appartenance|Duree":
                    case "Info|Duree":
                    case "Lieu|Duree":
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
                    case "Perso|Infos":
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
                    case "Info|Infos|Duree":
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

async function DatasVictorySpe(WHERE) {
    let DATAS_RANGE = await DatasRange();
    var LISTE = [];
    Object.keys(DATAS_RANGE).forEach(ele => {
        LISTE.push(ele);
    })
    var modif = localStorage.getItem('ModifSpe');
    if (modif === 'true') {
        try {
            var Dico = {};
            var promises = LISTE.map(async function (Element) { // Création d'un tableau de promesses
                Dico[Element] = await TraiterSheetDatas(await RecupSheetDatas(SHEET_ID, Element, DATAS_RANGE[Element]), await WhereOrNot(Element, WHERE), Element, true);
            });
            await Promise.all(promises); // Attendre que toutes les promesses se terminent
            // console.log(Dico);

            // console.log(dico);

            LISTE.forEach(function (Element) {
                var request = indexedDB.open(`MaBaseDeDonneesSpe${ANIME}_${Element}`, I);

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
                    Data = Dico[Element];
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
        localStorage.setItem('ModifSpe', modif);
    } else {
        var Dico = {};
        try {
            var promesses = [];
            LISTE.forEach(function (Element) {
                var promesse = new Promise(function (resolve, reject) {
                    var request = indexedDB.open(`MaBaseDeDonneesSpe${ANIME}_${Element}`, I);

                    request.onsuccess = function (event) {
                        // Obtention de la référence à la base de données ouverte
                        var db = event.target.result;
                        // Utilisation de la base de données pour effectuer des opérations
                        // par exemple, récupérer des données depuis un objet store
                        var transaction = db.transaction(['MonObjet'], 'readonly');
                        var objectStore = transaction.objectStore('MonObjet');
                        var getRequest = objectStore.get(1);

                        getRequest.onsuccess = function (event) {
                            Dico[Element] = getRequest.result;
                            // console.log("Récupération réussie pour :", Element)
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
                        localStorage.setItem('ModifSpe', modif);
                        I++;
                        localStorage.setItem('I', I);
                        location.reload();
                    };
                });
                promesses.push(promesse);
            });
            await Promise.all(promesses).catch(function (error) {
                console.error('Une erreur est survenue lors de la récupération des données :', error);
            });

        } catch (error) {
            console.error('Une erreur est survenue :', error);
            var Dico = {};
            var promises = LISTE.map(async function (Element) { // Création d'un tableau de promesses
                Dico[Element] = await TraiterSheetDatas(await RecupSheetDatas(SHEET_ID, Element, DATAS_RANGE[Element]), await WhereOrNot(Element, WHERE), Element, true);
            });
            await Promise.all(promises); // Attendre que toutes les promesses se terminent
            // console.log(Dico);
            return Dico;
        }
    }

    return Dico;
}

async function DatasVictorySpe2(WHERE) {
    let DATAS_RANGE = await DatasRange();
    var LISTE = [];
    Object.keys(DATAS_RANGE).forEach(ele => {
        LISTE.push(ele);
    })
    // console.log(LISTE);
    var modif = localStorage.getItem('ModifSpe2');
    WHERE = String(Number(WHERE) - 1);
    if (modif === 'true') {
        try {
            var Dico = {};
            var promises = LISTE.map(async function (Element) { // Création d'un tableau de promesses
                Dico[Element] = await TraiterSheetDatas(await RecupSheetDatas(SHEET_ID, Element, DATAS_RANGE[Element]), await WhereOrNot(Element, WHERE), Element, false);
            });
            await Promise.all(promises); // Attendre que toutes les promesses se terminent

            // console.log(dico);

            LISTE.forEach(function (Element) {
                var request = indexedDB.open(`MaBaseDeDonneesSpe2${ANIME}_${Element}`, I);

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
                    Data = Dico[Element];
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
        localStorage.setItem('ModifSpe2', modif);
    } else {
        var Dico = {};
        try {
            var promesses = [];
            LISTE.forEach(function (Element) {
                var promesse = new Promise(function (resolve, reject) {
                    var request = indexedDB.open(`MaBaseDeDonneesSpe2${ANIME}_${Element}`, I);

                    request.onsuccess = function (event) {
                        // Obtention de la référence à la base de données ouverte
                        var db = event.target.result;
                        // Utilisation de la base de données pour effectuer des opérations
                        // par exemple, récupérer des données depuis un objet store
                        var transaction = db.transaction(['MonObjet'], 'readonly');
                        var objectStore = transaction.objectStore('MonObjet');
                        var getRequest = objectStore.get(1);

                        getRequest.onsuccess = function (event) {
                            Dico[Element] = getRequest.result;
                            // console.log("Récupération réussie pour :", Element)
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
                        localStorage.setItem('ModifSpe2', modif);
                        I++;
                        localStorage.setItem('I', I);
                        location.reload();
                    };
                });
                promesses.push(promesse);
            });
            await Promise.all(promesses).catch(function (error) {
                console.error('Une erreur est survenue lors de la récupération des données :', error);
            });

        } catch (error) {
            console.error('Une erreur est survenue :', error);
            var Dico = {};
            var promises = LISTE.map(async function (Element) { // Création d'un tableau de promesses
                Dico[Element] = await TraiterSheetDatas(await RecupSheetDatas(SHEET_ID, Element, DATAS_RANGE[Element]), await WhereOrNot(Element, WHERE), Element, false);
            });
            await Promise.all(promises); // Attendre que toutes les promesses se terminent
            // console.log(Dico);
            return Dico;
        }
    }

    // console.log(Dico);
    return Dico;
}

async function generalModif() {
    let DATAS_RANGE = await DatasRange();
    localStorage.setItem('ModifSpe', 'true');
    localStorage.setItem('ModifSpe2', 'true');
    let dicoReturnPast = await DatasVictory(localStorage.getItem(`Where${ANIME}`), false, DATAS_RANGE);
    // console.log("dicoReturnPast", dicoReturnPast, localStorage.getItem(`Where${ANIME}`));
    var MainDatasPast = dicoReturnPast["Main"];
    var [PersoDatasPast, PersoDatasColumnsPast] = dicoReturnPast["Perso"];
    var [LieuDatasPast, LieuDatasColumnsPast] = dicoReturnPast["Lieu"];
    var [AppartenanceDatasPast, AppartenanceDatasColumnsPast] = dicoReturnPast["Appartenance"];
    var [ChapDatasPast, ChapDatasColumnsPast] = dicoReturnPast["Chapter"];
    
    var divPro = document.getElementById("modification");
    
    var Liste = [];
    Object.keys(DATAS_RANGE).forEach(element => {
        if (!(["Chapter", "Main", "id"].includes(element))) {
            Liste.push(dicoReturnPast[element].concat([element]));
        }
    })
    console.log("Liste", Liste);
    Liste.forEach(Datas => {
        var Text = `<div class='table-container'><table border=1 id='table'><caption>${Datas[2]} :<br></select></caption><thead><tr>`;
        Datas[1].forEach(element => {
            Text += `<th>${element}</th>`;
        });

        compteur = [0, 0];
        Text += `</tr></thead><tbody><tr id="${compteur[1]}">`;
        Datas[1].forEach(element => {
            if (compteur[0] === 0) {
                Text += `<td>${localStorage.getItem(`Where${ANIME}`)}</td>`;
            } else if (compteur[0] === 1) {
                Text += `<td><select id="numero" name="numero" onchange="ModifierPage(this, '${Datas[2]}')"><option style="text-align: center;" value="" selected>NUMERO</option><option value="new">Nouveau</option>`;
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
    if (localStorage.getItem(`Where${ANIME}`) in ChapDatasPast) {
        ChapDatasColumnsPast.forEach(element => {
            if (NewCompteur === 0) {
                Text += `<td>${localStorage.getItem(`Where${ANIME}`)}</td>`;
            } else {
                switch (MainDatasPast[ChapDatasColumnsPast[NewCompteur]]) {
                    case "Info":
                        Text += `<td data-score='${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}'><div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text" value="${ChapDatasPast[localStorage.getItem(`Where${ANIME}`)][ChapDatasColumnsPast[NewCompteur]]}"></input></div></td>`;
                        break;
                    case "Perso":
                        Temp = "";
                        if (Array.isArray(ChapDatasPast[localStorage.getItem(`Where${ANIME}`)][ChapDatasColumnsPast[NewCompteur]])) {
                            if (Array.isArray(ChapDatasPast[localStorage.getItem(`Where${ANIME}`)][ChapDatasColumnsPast[NewCompteur]][0])) {
                                ToEach = ChapDatasPast[localStorage.getItem(`Where${ANIME}`)][ChapDatasColumnsPast[NewCompteur]][0];
                            } else {
                                ToEach = ChapDatasPast[localStorage.getItem(`Where${ANIME}`)][ChapDatasColumnsPast[NewCompteur]];
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
                        }
                        Text += `<td data-score='${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}'>` + Temp + `<div><button onclick="Add(this, '${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}')">Ajouter</button><button onclick="Supp(this, '${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}')">Supprimer</button></div></td>`;
                        break;
                }
            }
            NewCompteur++;
        });
    } else {
        ChapDatasColumnsPast.forEach(element => {
            if (NewCompteur === 0) {
                Text += `<td>${localStorage.getItem(`Where${ANIME}`)}</td>`;
            } else {
                switch (MainDatasPast[ChapDatasColumnsPast[NewCompteur]]) {
                    case "Info":
                        Text += `<td data-score='${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}'><div class="oui"><input style="color: red;" oninput="ajusterTaille(this)" type="text" value=""></input></div></td>`;
                        break;
                    case "Perso":
                        Text += `<td data-score='${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}'><div><button onclick="Add(this, '${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}')">Ajouter</button><button onclick="Supp(this, '${MainDatasPast[ChapDatasColumnsPast[NewCompteur]]}')">Supprimer</button></div></td>`;
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
            Text += `<td>${localStorage.getItem(`Where${ANIME}`)}</td>`;
        } else if (compteur[0] === 1) {
            Text += `<td><select id="numero" name="numero" onchange="ModifierPage(${compteur[1]})"><option style="text-align: center;" value="" selected>NUMERO</option><option value="new">Nouveau</option>`;
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
