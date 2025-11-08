// Utilitaires pour générer des embeddings avec OpenRouter (API directe)

import { MODELS } from './config'

/**
 * Générer un embedding pour un texte donné en appelant directement l'API OpenRouter
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://yassine-handane.vercel.app',
        'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Yassine Handane Portfolio',
      },
      body: JSON.stringify({
        model: MODELS.embedding,
        input: text,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OpenRouter API error: ${response.status} - ${error}`)
    }

    const data = await response.json()
    return data.data[0].embedding
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
