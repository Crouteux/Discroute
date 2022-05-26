# Discroute

Un bot Discord.

## Démarrage

Vous pouvez utiliser la version de Node.js que vous préférez, mais la fonctionnalité musique fonctionnera mieux avec la version 14.

```sh
# Installer les dépendances
npm install
# Compiler le code source
npm run build
# Exécuter les tests unitaires
npm test
# Démarrer le bot
npm start
```

## Commandes

Discroute implémente un gestionnaire de commandes minimaliste, créer une commande est relativement simple:

Créez un fichier TypeScript dans `src/commands` qui exporte une commande.

```ts
import { Command } from '../command';

const whoami: Command = {
    name: 'whoami',
    description: 'Who am I',
    run: (message) => {
        message.channel.send('You are ${message.member.displayName}');
    },
};

export default whoami;
```

Cette commande répond par le nom d'utilisateur de celui qui l'a appelé.
