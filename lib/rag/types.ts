// Types pour le système RAG

export interface Document {
  id: string
  content: string
  metadata: {
    type: 'blog' | 'project' | 'experience'
    title: string
    date?: string
    tags?: string[]
    url?: string
  }
}

export interface EmbeddedDocument extends Document {
  embedding: number[]
}

export interface SearchResult {
  document: Document
  similarity: number
}
