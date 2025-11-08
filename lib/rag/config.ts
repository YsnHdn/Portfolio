// Configuration OpenRouter pour le système RAG

import { createOpenAI } from '@ai-sdk/openai'

// Créer une instance OpenAI configurée pour OpenRouter
export const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || '',
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://yassine-handane.vercel.app',
    'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Yassine Handane Portfolio',
  },
})

// Modèles recommandés pour OpenRouter
export const MODELS = {
  // Pour les embeddings - IMPORTANT : Préfixer avec openai/ pour OpenRouter
  embedding: 'openai/text-embedding-3-small', // OpenAI via OpenRouter

  // Pour la génération de texte (vous pouvez choisir parmi ces options)
  chat: 'openai/gpt-4o-mini', // Rapide et économique
  // Alternatives :
  // chat: 'openai/gpt-4o', // Plus puissant mais plus cher
  // chat: 'anthropic/claude-3.5-sonnet', // Excellent pour les conversations
  // chat: 'google/gemini-pro-1.5', // Bon équilibre qualité/prix
  // chat: 'meta-llama/llama-3.1-70b-instruct', // Open source, rapide
}

// Vérifier que la clé API est configurée
export function checkApiKey(): boolean {
  return !!process.env.OPENROUTER_API_KEY
}
