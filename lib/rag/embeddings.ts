// Utilitaires pour générer des embeddings avec OpenAI (API directe)

/**
 * Générer un embedding pour un texte donné en appelant directement l'API OpenAI
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: text,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OpenAI API error: ${response.status} - ${error}`)
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
