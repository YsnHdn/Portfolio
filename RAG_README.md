# Système RAG (Retrieval-Augmented Generation)

Ce portfolio intègre un système RAG qui permet aux visiteurs de poser des questions sur vos projets, expériences et articles de blog via un assistant conversationnel intelligent.

## 🎯 Fonctionnalités

- **Recherche sémantique** : Trouve automatiquement le contenu pertinent basé sur le sens de la question
- **Réponses contextuelles** : Génère des réponses précises basées uniquement sur votre contenu
- **Interface chat intuitive** : Widget de chat flottant accessible depuis n'importe quelle page
- **Multilingue** : Répond en français ou en anglais selon la langue de la question
- **Citations de sources** : Inclut les liens vers les articles/projets mentionnés

## 📁 Structure du système

```
Portfolio/
├── lib/rag/
│   ├── types.ts           # Types TypeScript pour le système RAG
│   ├── vectorStore.ts     # Store de vecteurs avec recherche par similarité
│   └── embeddings.ts      # Utilitaires pour générer les embeddings
│
├── scripts/
│   └── generate-embeddings.mjs  # Script pour indexer le contenu
│
├── app/api/rag/
│   └── route.ts           # API endpoint pour les requêtes RAG
│
├── components/
│   └── RAGChat.tsx        # Composant UI du chat
│
└── public/
    └── embeddings.json    # Base de données vectorielle (généré)
```

## 🚀 Installation et Configuration

### 1. Prérequis

- Node.js 18+ et Yarn
- Une clé API OpenAI ([obtenir ici](https://platform.openai.com/api-keys))

### 2. Configuration de l'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Générer les embeddings

Avant d'utiliser le système RAG, vous devez générer les embeddings de votre contenu :

```bash
yarn generate-embeddings
```

Ce script va :
1. Lire tous vos blog posts (depuis `/data/blog/`)
2. Lire vos projets (depuis `/data/projectsData.ts`)
3. Lire vos expériences (depuis `/data/experiencesData.ts`)
4. Générer des embeddings pour chaque document
5. Sauvegarder le tout dans `/public/embeddings.json`

**Note** : Vous devez regénérer les embeddings chaque fois que vous :
- Ajoutez un nouveau blog post
- Modifiez un article existant
- Mettez à jour vos projets ou expériences

### 4. Lancer l'application

```bash
yarn dev
```

Le widget de chat RAG apparaîtra automatiquement dans le coin inférieur droit de toutes les pages.

## 💡 Comment ça marche ?

### Architecture RAG

```
┌─────────────┐
│ Question    │
│ utilisateur │
└──────┬──────┘
       │
       v
┌──────────────────┐
│ Génération       │
│ embedding        │ ← OpenAI text-embedding-3-small
│ de la question   │
└──────┬───────────┘
       │
       v
┌──────────────────┐
│ Recherche        │
│ similarité       │ ← Calcul de similarité cosine
│ cosine           │
└──────┬───────────┘
       │
       v
┌──────────────────┐
│ Top 5 documents  │
│ pertinents       │
└──────┬───────────┘
       │
       v
┌──────────────────┐
│ Génération       │
│ réponse avec     │ ← OpenAI GPT-4o-mini
│ contexte         │
└──────┬───────────┘
       │
       v
┌──────────────────┐
│ Réponse          │
│ streaming        │
└──────────────────┘
```

### Flux de données

1. **Indexation** (une fois) :
   - Le script `generate-embeddings.mjs` lit tout le contenu
   - Génère un vecteur d'embedding pour chaque document via OpenAI
   - Sauvegarde dans `public/embeddings.json`

2. **Requête** (à chaque question) :
   - L'utilisateur pose une question
   - L'API génère un embedding pour la question
   - Recherche les 5 documents les plus similaires par similarité cosine
   - Envoie la question + contexte à GPT-4o-mini
   - Streaming de la réponse à l'utilisateur

## 🔧 Personnalisation

### Modifier le nombre de résultats

Dans `/app/api/rag/route.ts`, ligne 49 :

```typescript
const searchResults = store.search(queryEmbedding, 5) // Changer 5 à votre valeur
```

### Changer le modèle LLM

Dans `/app/api/rag/route.ts`, ligne 69 :

```typescript
model: openai('gpt-4o-mini'), // Remplacer par 'gpt-4' pour plus de qualité
```

### Personnaliser le prompt système

Dans `/app/api/rag/route.ts`, lignes 70-88, modifiez le prompt `system` :

```typescript
system: `Votre prompt personnalisé...`
```

### Changer le modèle d'embedding

Dans `/lib/rag/embeddings.ts` et `/scripts/generate-embeddings.mjs` :

```typescript
const EMBEDDING_MODEL = 'text-embedding-3-small' // ou 'text-embedding-3-large'
```

### Personnaliser l'apparence du chat

Modifiez `/components/RAGChat.tsx` pour changer :
- Les couleurs (classes Tailwind `bg-primary-500`, etc.)
- La taille de la fenêtre (`h-[600px] w-[400px]`)
- La position (`bottom-6 right-6`)
- Le message de bienvenue

## 📊 Coûts estimés

Avec OpenAI :

**Génération d'embeddings** (text-embedding-3-small) :
- ~$0.02 pour 1M tokens
- Pour un portfolio typique (10 articles + 5 projets) : **< $0.01**

**Requêtes RAG** (gpt-4o-mini) :
- ~$0.15 / 1M input tokens
- ~$0.60 / 1M output tokens
- Coût par requête : **~$0.001 - $0.005**

**Estimation mensuelle** pour 1000 questions : **~$3-5**

## 🔒 Sécurité et bonnes pratiques

### Variables d'environnement

- Ne commitez JAMAIS votre `.env.local`
- Ajoutez `.env.local` à `.gitignore`
- Utilisez les variables d'environnement Vercel pour la production

### Limitation de taux (Rate limiting)

Pour éviter les abus en production, considérez :
- Implémenter un rate limiting (ex: [Upstash Rate Limit](https://upstash.com/docs/redis/features/ratelimiting))
- Ajouter un CAPTCHA pour les utilisateurs anonymes
- Limiter le nombre de messages par session

### Gitignore

Assurez-vous que `/public/embeddings.json` est dans `.gitignore` si le fichier est volumineux.

## 🐛 Dépannage

### "Vector store non disponible"

**Cause** : Le fichier `embeddings.json` n'existe pas

**Solution** :
```bash
yarn generate-embeddings
```

### "OPENAI_API_KEY non configuré"

**Cause** : La variable d'environnement n'est pas définie

**Solution** :
1. Créez `.env.local`
2. Ajoutez `OPENAI_API_KEY=votre_clé`
3. Redémarrez le serveur

### Le chat ne répond pas

**Vérifiez** :
1. Console navigateur pour les erreurs
2. Console serveur pour les logs
3. Quota API OpenAI
4. Format de `embeddings.json`

### Embeddings obsolètes

**Symptôme** : Le chat ne connaît pas vos nouveaux articles

**Solution** : Régénérez les embeddings après chaque modification de contenu :
```bash
yarn generate-embeddings
```

## 🚀 Déploiement sur Vercel

1. Ajoutez `OPENAI_API_KEY` dans les variables d'environnement Vercel
2. Générez les embeddings localement : `yarn generate-embeddings`
3. Commitez le fichier `public/embeddings.json` (ou générez-le dans un build script)
4. Déployez normalement

**Option alternative** : Générer les embeddings à chaque build en ajoutant à `package.json` :

```json
"scripts": {
  "build": "yarn generate-embeddings && next build"
}
```

⚠️ Attention : Cela augmentera le temps et coût de build.

## 📚 Ressources

- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [RAG Pattern](https://www.promptingguide.ai/techniques/rag)

## 🤝 Support

Pour toute question ou problème :
1. Vérifiez cette documentation
2. Consultez les logs serveur
3. Ouvrez une issue sur GitHub

---

Créé avec ❤️ par Yassine Handane
