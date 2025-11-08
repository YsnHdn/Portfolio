# 🚀 Guide OpenRouter - Chat RAG Assistant

Félicitations ! Votre portfolio dispose maintenant d'un assistant RAG professionnel utilisant OpenRouter.

## ✨ Nouvelles Fonctionnalités

### Chat Interface Moderne
- **Design professionnel** inspiré de Facebook Messenger et LinkedIn
- **4 tailles de fenêtre** :
  - 🔹 **Normal** : 380x500px - Parfait pour des questions rapides
  - 🔹 **Agrandie** : 450x700px - Plus d'espace pour la conversation
  - 🔹 **Plein écran** : Mode immersif pour des discussions approfondies
  - 🔹 **Minimisé** : Juste un bouton flottant

- **Animations fluides** avec Framer Motion
- **Badge de notification** pour attirer l'attention
- **Indicateur de frappe** animé
- **Suggestions de questions** rapides
- **Horodatage** sur chaque message
- **Mode sombre** automatique

### OpenRouter - Pourquoi c'est mieux ?
- ✅ **Accès à plusieurs LLMs** : OpenAI, Anthropic, Google, Meta, etc.
- ✅ **Prix compétitifs** : Souvent moins cher qu'OpenAI direct
- ✅ **Flexibilité** : Changez de modèle facilement
- ✅ **Pas de quota strict** : Meilleure disponibilité
- ✅ **API unique** pour tous les modèles

## 🎯 Démarrage Rapide (5 minutes)

### Étape 1 : Votre clé API est déjà configurée ✅

J'ai déjà ajouté votre clé OpenRouter dans `.env.local` :
```bash
OPENROUTER_API_KEY=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
```

**⚠️ IMPORTANT : Ne partagez JAMAIS cette clé publiquement !**

### Étape 2 : Générer les Embeddings

```bash
yarn generate-embeddings
```

Ce script va :
- 📚 Lire tous vos blog posts
- 💼 Lire vos projets
- 🏢 Lire vos expériences
- 🧠 Générer des embeddings via OpenRouter
- 💾 Sauvegarder dans `public/embeddings.json`

**Durée estimée** : 30-60 secondes

### Étape 3 : Lancer l'Application

```bash
yarn dev
```

Ouvrez http://localhost:3000

### Étape 4 : Tester le Chat

1. Cliquez sur le **bouton violet flottant** en bas à droite
2. Le chat s'ouvre en taille normale
3. Cliquez sur l'**icône agrandir** pour passer en mode étendu
4. Re-cliquez pour le mode **plein écran**
5. Posez une question comme :
   - "Quels sont les projets de Yassine en AI ?"
   - "Parle-moi de son expérience chez Aimigo"
   - "Résume l'article sur les tendances AI"

## 🎨 Personnalisation

### Changer le Modèle LLM

Éditez `/lib/rag/config.ts`, ligne 20 :

```typescript
export const MODELS = {
  embedding: 'text-embedding-3-small',

  // Choisissez votre modèle préféré :
  chat: 'openai/gpt-4o-mini',        // ✅ Actuellement configuré - Rapide & économique

  // Alternatives disponibles :
  // chat: 'openai/gpt-4o',                    // Plus puissant, plus cher
  // chat: 'anthropic/claude-3.5-sonnet',      // Excellent pour conversations
  // chat: 'google/gemini-pro-1.5',            // Bon équilibre
  // chat: 'meta-llama/llama-3.1-70b-instruct' // Open source, rapide
}
```

### Changer les Couleurs

Le chat utilise les couleurs `primary-500/600` de votre portfolio.

Pour personnaliser, éditez `/components/RAGChat.tsx` :
- Ligne 163 : Couleur du bouton flottant
- Ligne 241 : Couleur de l'en-tête
- Ligne 340 : Couleur des bulles de message utilisateur

### Modifier les Suggestions

Éditez `/components/RAGChat.tsx`, ligne 430-432 :

```typescript
{[
  'Parle-moi des projets AI',      // ← Personnalisez ici
  'Expériences professionnelles',  // ← Personnalisez ici
  'Articles de blog',              // ← Personnalisez ici
].map((suggestion) => (
```

### Changer le Message de Bienvenue

Ligne 22 dans `/components/RAGChat.tsx` :

```typescript
content: "👋 Votre message personnalisé ici !",
```

## 💰 Coûts OpenRouter

Avec `gpt-4o-mini` via OpenRouter :

| Opération | Coût par appel | Volume mensuel | Coût mensuel |
|-----------|---------------|----------------|--------------|
| Génération embeddings | ~$0.001 | 1 fois | **~$0.001** |
| Question simple | ~$0.002 | 100 questions | **~$0.20** |
| Question complexe | ~$0.005 | 100 questions | **~$0.50** |

**Estimation pour 1000 questions/mois : ~$2-4** 💸

(Beaucoup moins cher qu'OpenAI direct !)

## 🔧 Fonctionnalités du Chat

### Tailles de Fenêtre

| Taille | Dimensions | Usage |
|--------|-----------|--------|
| Normal | 380x500px | Questions rapides |
| Agrandie | 450x700px | Conversations moyennes |
| Plein écran | 95% viewport | Discussions approfondies |

### Navigation

- **Clic sur bouton flottant** : Ouvrir/Fermer
- **Icône agrandir (header)** : Cycle entre les tailles
- **X (header)** : Minimiser

### Animations

- ✨ Ouverture/fermeture fluide (spring animation)
- 💬 Messages apparaissent progressivement
- ⌨️ Indicateur de frappe animé
- 🎯 Hover effects sur tous les boutons

## 📊 Comment ça Marche ?

```
Question utilisateur
     ↓
Génération embedding (OpenRouter)
     ↓
Recherche similarité cosine (local)
     ↓
Top 5 documents pertinents
     ↓
Contexte + Question → LLM (OpenRouter)
     ↓
Réponse streamée en temps réel
     ↓
Affichage progressif
```

## 🐛 Dépannage

### Le chat ne s'affiche pas

**Vérifiez** :
```bash
# Le composant RAGChat est importé dans app/layout.tsx ?
grep "RAGChat" app/layout.tsx
```

### Erreur "Vector store non disponible"

**Solution** :
```bash
yarn generate-embeddings
```

Vérifiez que `public/embeddings.json` existe :
```bash
ls -lh public/embeddings.json
```

### Erreur "OPENROUTER_API_KEY non configuré"

**Vérifiez** `.env.local` :
```bash
cat .env.local | grep OPENROUTER
```

Devrait afficher votre clé API.

### Le chat répond lentement

**Causes possibles** :
1. Modèle LLM trop puissant → Utilisez `gpt-4o-mini`
2. Trop de documents → Réduisez le nombre dans l'API route
3. Connexion internet lente

### Erreur de streaming

**Dans la console** :
```bash
yarn dev
```

Regardez les logs serveur pour identifier l'erreur.

## 🚀 Déploiement sur Vercel

### 1. Variables d'Environnement

Dans Vercel Dashboard → Settings → Environment Variables :

```
OPENROUTER_API_KEY=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
NEXT_PUBLIC_SITE_URL=https://yassine-handane.vercel.app
NEXT_PUBLIC_SITE_NAME=Yassine Handane Portfolio
```

### 2. Générer les Embeddings

**Option A - Local puis commit** :
```bash
yarn generate-embeddings
git add public/embeddings.json
git commit -m "Add embeddings"
git push
```

**Option B - Dans le build** (⚠️ augmente le temps de build) :

Modifiez `package.json` :
```json
{
  "scripts": {
    "build": "yarn generate-embeddings && cross-env INIT_CWD=$PWD next build && ..."
  }
}
```

### 3. Déployer

```bash
git push
```

Vercel détectera automatiquement et déploiera !

## 🎓 Bonnes Pratiques

### Sécurité

1. ✅ Ne commitez JAMAIS `.env.local`
2. ✅ Utilisez des variables d'environnement Vercel en production
3. ✅ Ajoutez un rate limiting en production (voir Upstash)
4. ✅ Monitorer les coûts OpenRouter régulièrement

### Performance

1. ✅ Générez les embeddings AVANT chaque déploiement
2. ✅ Utilisez `gpt-4o-mini` pour la rapidité
3. ✅ Limitez le contexte à 5 documents max
4. ✅ Activez le caching si possible

### Maintenance

1. 🔄 Régénérez les embeddings après chaque nouveau blog post
2. 📊 Vérifiez les logs OpenRouter pour détecter les erreurs
3. 💬 Testez le chat après chaque déploiement
4. 📈 Suivez les métriques d'utilisation

## 📚 Ressources

- [OpenRouter Documentation](https://openrouter.ai/docs)
- [OpenRouter Models](https://openrouter.ai/models)
- [OpenRouter Pricing](https://openrouter.ai/docs#models)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🆘 Support

Si vous rencontrez un problème :

1. Vérifiez cette documentation
2. Consultez les logs serveur (`yarn dev`)
3. Vérifiez la console navigateur (F12)
4. Vérifiez votre quota OpenRouter
5. Vérifiez que les embeddings sont générés

## 🎉 Profitez !

Votre portfolio a maintenant un assistant RAG professionnel ! Vos visiteurs peuvent :

- 💬 Poser des questions sur vos projets
- 📚 Explorer vos articles de blog
- 🏢 En savoir plus sur vos expériences
- 🤖 Interagir avec une IA qui connaît votre travail

**Le tout avec une interface moderne et professionnelle !** 🚀

---

Créé avec ❤️ pour Yassine Handane
Powered by OpenRouter 🌐
