// Sélectionner le bouton
const boutonModifierWhere = document.getElementById("modifierWhere");
var where = localStorage.getItem(`Where${ANIME}`);

// Ajouter un écouteur d'événements pour le clic sur le bouton
boutonModifierWhere.addEventListener("click", () => {
    // Afficher une boîte de dialogue (alert) avec un champ de saisie
    const nouvelleValeur = prompt(
        `À quel chapitre êtes-vous actuellement ? (Pour l'intant : ${localStorage.getItem(
            `Where${ANIME}`
        )})`
    );
    // Vérifier si l'utilisateur a cliqué sur OK
    if (nouvelleValeur !== null) {
        // Stocker la nouvelle valeur dans le localStorage avec la clé 'nom'
        localStorage.setItem(`Where${ANIME}`, nouvelleValeur);
        localStorage.setItem("Modif", true);
        // Afficher un message pour confirmer que la valeur a été modifiée
        alert(
            "La valeur a été modifiée avec succès ! Nouvelle valeur : " +
            nouvelleValeur
        );
        location.reload();
    }
});

if (where === null) {
    boutonModifierWhere.click();
}

const menu = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");
menu.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-menu");
});
