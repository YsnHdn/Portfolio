// Simple vector store utilisant le produit scalaire pour la similarité cosine

import type { EmbeddedDocument, SearchResult } from './types'

export class VectorStore {
  private documents: EmbeddedDocument[] = []

  // Charger les documents depuis le fichier JSON
  load(documents: EmbeddedDocument[]) {
    this.documents = documents
  }

  // Calculer la similarité cosine entre deux vecteurs
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error('Les vecteurs doivent avoir la même dimension')
    }

    let dotProduct = 0
    let normA = 0
    let normB = 0

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i]
      normA += a[i] * a[i]
      normB += b[i] * b[i]
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
  }

  // Rechercher les documents les plus similaires
  search(queryEmbedding: number[], topK: number = 5): SearchResult[] {
    const results = this.documents.map((doc) => ({
      document: {
        id: doc.id,
        content: doc.content,
        metadata: doc.metadata,
      },
      similarity: this.cosineSimilarity(queryEmbedding, doc.embedding),
    }))

    // Trier par similarité décroissante
    results.sort((a, b) => b.similarity - a.similarity)

    // Retourner les top K résultats
    return results.slice(0, topK)
  }

  // Obtenir tous les documents
  getAll(): EmbeddedDocument[] {
    return this.documents
  }

  // Obtenir le nombre de documents
  size(): number {
    return this.documents.length
  }
}
