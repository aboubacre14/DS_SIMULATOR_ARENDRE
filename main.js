import { getValues, calculAmortissement, remplirTableau } from './calculations.js';

// Utilisation de la délégation d'événements
document.addEventListener("input", function(event) {
    if (event.target.matches('input')) {
        let {
            montant,
            tauxMensuel,
            mois,
            annee
        } = getValues();
        // appel soit amortissementM ou amortissementY
        let {
            amortissementM
        } = calculAmortissement(montant, tauxMensuel, mois, annee);

        remplirTableau(amortissementM);
    }
});

// Gestion de l'événement de clic pour le bouton "Afficher les courbes"
document.getElementById('showCharts').addEventListener('click', function() {
    let {
        montant,
        tauxMensuel,
        mois,
        annee
    } = getValues();
    let {
        amortissementM
    } = calculAmortissement(montant, tauxMensuel, mois, annee);

    // Préparer les données pour le graphique
    const totalCapitalAmorti = amortissementM.reduce((sum, item) => sum + item.capitalAmorti, 0);
    const totalInteret = amortissementM.reduce((sum, item) => sum + item.interet, 0);
    const totalCapitalRestantDu = amortissementM[amortissementM.length - 1].capitalRestantDu;

    // Créer le graphique
    const ctx = document.getElementById('amortissementChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Capital amorti', 'Intérêts payés', 'Capital restant dû'],
            datasets: [{
                data: [totalCapitalAmorti, totalInteret, totalCapitalRestantDu],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Répartition de l\'amortissement'
                }
            }
        }
    });
});