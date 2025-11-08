// Utilitaires pour générer des embeddings

import { openai } from '@ai-sdk/openai'
import { embed } from 'ai'

// Modèle d'embedding à utiliser
const EMBEDDING_MODEL = 'text-embedding-3-small'

/**
 * Générer un embedding pour un texte donné
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const { embedding } = await embed({
      model: openai.embedding(EMBEDDING_MODEL),
      value: text,
    })
    return embedding
  } catch (error) {
    console.error('Erreur lors de la génération de l\'embedding:', error)
    throw error
  }
}

/**
 * Générer des embeddings pour plusieurs textes
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const embeddings = await Promise.all(texts.map((text) => generateEmbedding(text)))
  return embeddings
}

/**
 * Préparer le texte pour l'embedding (nettoyer et limiter la taille)
 */
export function prepareTextForEmbedding(text: string, maxLength: number = 8000): string {
  // Nettoyer le texte (supprimer les espaces multiples, sauts de ligne, etc.)
  let cleaned = text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, ' ')
    .trim()

  // Limiter la longueur
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength)
  }

  return cleaned
}
