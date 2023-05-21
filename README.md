NetMapper

NetMapper est une application de balayage réseau utilisant Nmap. Il vous permet de scanner des hôtes et des ports réseau, et d'obtenir des informations détaillées sur les services en cours d'exécution.
Fonctionnalités

Balayage réseau avec différentes options de balayage.
Spécification d'options supplémentaires personnalisées.
Affichage des résultats du balayage.
Enregistrement des résultats dans une base de données MongoDB.

Installation

Clonez ce dépôt de code sur votre machine :

    git clone https://github.com/NathW4/dantu_netMapper.git

Accédez au répertoire du projet :

    cd dantu_netMapper

Installez les dépendances du projet à l'aide de npm :

    npm install

Configurez les variables d'environnement :

    Créez un fichier .env à la racine du projet.

Définissez les variables d'environnement suivantes dans le fichier .env :

    URI_DB=<URL_de_connexion_à_votre_base_de_données_MongoDB>

Utilisation

Lancez l'application :

    npm run dev

Accédez à l'application dans votre navigateur à l'adresse suivante : http://localhost:3000

    Utilisez l'interface utilisateur pour spécifier les options de balayage et effectuer un balayage réseau.
