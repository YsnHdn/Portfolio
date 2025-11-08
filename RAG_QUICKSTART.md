# Guide de Démarrage Rapide - Système RAG

Ce guide vous aidera à configurer et utiliser le système RAG en 5 minutes.

## 🚀 Configuration Rapide

### 1. Installer les dépendances

Les dépendances sont déjà installées. Sinon, exécutez :
```bash
yarn install
```

### 2. Configurer la clé API OpenAI

Créez un fichier `.env.local` à la racine du projet :

```bash
echo "OPENAI_API_KEY=your_api_key_here" > .env.local
```

Remplacez `your_api_key_here` par votre vraie clé API OpenAI.

> 💡 **Obtenir une clé API** : https://platform.openai.com/api-keys

### 3. Générer les embeddings

```bash
yarn generate-embeddings
```

Cette commande va :
- ✅ Lire tous vos blog posts
- ✅ Lire vos projets et expériences
- ✅ Créer des embeddings pour chaque contenu
- ✅ Sauvegarder dans `/public/embeddings.json`

**Temps estimé** : 30 secondes - 2 minutes selon le nombre de documents

### 4. Lancer l'application

```bash
yarn dev
```

Ouvrez http://localhost:3000 dans votre navigateur.

### 5. Tester le chat RAG

1. Cherchez le **bouton de chat flottant** en bas à droite
2. Cliquez dessus pour ouvrir le chat
3. Posez une question, par exemple :
   - "Quels sont les projets de Yassine ?"
   - "Parle-moi de son expérience chez Aimigo"
   - "Quels articles de blog parle de l'IA ?"

## ✅ Vérification

Le système fonctionne si :
- ✅ Le bouton de chat apparaît en bas à droite
- ✅ Le chat s'ouvre quand vous cliquez
- ✅ Vous recevez des réponses pertinentes à vos questions
- ✅ Les réponses citent vos articles/projets

## ⚠️ Problèmes Courants

### "Vector store non disponible"

**Solution** : Vous avez oublié l'étape 3. Exécutez :
```bash
yarn generate-embeddings
```

### "OPENAI_API_KEY non configuré"

**Solution** : Vérifiez que `.env.local` existe et contient votre clé API :
```bash
cat .env.local
```

### Le chat ne répond pas

**Vérifications** :
1. Ouvrez la console du navigateur (F12) pour voir les erreurs
2. Vérifiez les logs du serveur dans votre terminal
3. Vérifiez que votre quota OpenAI n'est pas dépassé

## 📝 Mise à Jour du Contenu

Chaque fois que vous ajoutez/modifiez un blog post, projet, ou expérience :

```bash
yarn generate-embeddings
```

**Astuce** : Vous pouvez automatiser cela dans votre build :
```json
{
  "scripts": {
    "build": "yarn generate-embeddings && next build"
  }
}
```

## 🎨 Personnalisation Rapide

### Changer les couleurs du chat

Éditez `/components/RAGChat.tsx` et changez les classes Tailwind :

```tsx
// Couleur primaire du bouton et en-tête
bg-primary-500 → bg-blue-500
bg-primary-600 → bg-blue-600
```

### Changer le message de bienvenue

Dans `/components/RAGChat.tsx`, ligne 17 :

```tsx
content: 'Votre message personnalisé !'
```

### Changer le nombre de documents récupérés

Dans `/app/api/rag/route.ts`, ligne 49 :

```tsx
const searchResults = store.search(queryEmbedding, 5) // 5 → 10
```

## 💰 Coûts

Pour un portfolio typique :
- **Génération d'embeddings** : < $0.01 (une fois)
- **Par requête** : ~$0.001 - $0.005
- **1000 questions/mois** : ~$3-5

## 📚 Documentation Complète

Consultez [RAG_README.md](./RAG_README.md) pour :
- Architecture détaillée
- Personnalisation avancée
- Dépannage complet
- Déploiement production

## 🆘 Support

Besoin d'aide ? Vérifiez :
1. Cette documentation
2. [RAG_README.md](./RAG_README.md)
3. Les logs serveur/navigateur
4. Votre quota OpenAI

---

**C'est tout !** Vous avez maintenant un système RAG fonctionnel sur votre portfolio. 🎉
