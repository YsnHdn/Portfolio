import { streamText } from 'ai'
import { VectorStore } from '@/lib/rag/vectorStore'
import { generateEmbedding } from '@/lib/rag/embeddings'
import { openrouter, MODELS, checkApiKey } from '@/lib/rag/config'
import type { EmbeddedDocument } from '@/lib/rag/types'
import fs from 'fs'
import path from 'path'

// Charger les embeddings au démarrage
let vectorStore: VectorStore | null = null

function loadVectorStore() {
  if (vectorStore) return vectorStore

  try {
    const embeddingsPath = path.join(process.cwd(), 'public/embeddings.json')

    if (!fs.existsSync(embeddingsPath)) {
      console.warn('⚠️  Fichier embeddings.json non trouvé. Exécutez: yarn generate-embeddings')
      return null
    }

    const embeddingsData = fs.readFileSync(embeddingsPath, 'utf-8')
    const documents: EmbeddedDocument[] = JSON.parse(embeddingsData)

    vectorStore = new VectorStore()
    vectorStore.load(documents)

    console.log(`✅ Vector store chargé avec ${vectorStore.size()} documents`)
    return vectorStore
  } catch (error) {
    console.error('❌ Erreur lors du chargement du vector store:', error)
    return null
  }
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== 'string') {
      return new Response('Message invalide', { status: 400 })
    }

    // Vérifier la clé API OpenRouter
    if (!checkApiKey()) {
      return new Response('OPENROUTER_API_KEY non configuré', { status: 500 })
    }

    // Charger le vector store
    const store = loadVectorStore()
    if (!store) {
      return new Response('Vector store non disponible. Veuillez générer les embeddings.', {
        status: 500,
      })
    }

    // Générer l'embedding de la question
    const queryEmbedding = await generateEmbedding(message)

    // Rechercher les documents pertinents
    const searchResults = store.search(queryEmbedding, 5)

    // Construire le contexte
    const context = searchResults
      .map((result, index) => {
        const { document, similarity } = result
        return `Document ${index + 1} (${document.metadata.type} - similarité: ${similarity.toFixed(3)}):
Titre: ${document.metadata.title}
${document.metadata.url ? `URL: ${document.metadata.url}` : ''}
${document.metadata.tags ? `Tags: ${document.metadata.tags.join(', ')}` : ''}

Contenu:
${document.content}

---`
      })
      .join('\n\n')

    // Générer la réponse avec streaming
    const result = await streamText({
      model: openrouter(MODELS.chat),
      system: `Tu es un assistant spécialisé pour répondre aux questions sur le portfolio, les projets et le blog de Yassine Handane, un ingénieur AI/ML passionné.

Utilise UNIQUEMENT les informations fournies dans le contexte ci-dessous pour répondre à la question de l'utilisateur.

Si la question n'a pas de réponse dans le contexte, dis-le poliment et suggère des sujets sur lesquels tu peux aider (projets AI/ML, expériences, articles de blog sur l'IA, etc.).

Contexte:
${context}

Règles:
- Réponds en français si la question est en français, en anglais si elle est en anglais
- Sois concis, précis et professionnel
- Cite les sources (titres des articles/projets) quand pertinent
- Si tu mentionnes un article ou projet, inclus l'URL si disponible
- Reste professionnel et informatif
- Montre l'expertise de Yassine en AI/ML dans tes réponses`,
      prompt: message,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Erreur dans l\'API RAG:', error)
    return new Response('Erreur lors du traitement de la requête', { status: 500 })
  }
}
