#!/usr/bin/env node

/**
 * Script pour générer les embeddings du contenu (blog posts, projets, expériences)
 * et les sauvegarder dans un fichier JSON
 *
 * Utilise OpenRouter pour générer les embeddings
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import { createOpenAI } from '@ai-sdk/openai'
import { embed } from 'ai'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') })

// Configuration OpenRouter
const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || '',
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://yassine-handane.vercel.app',
    'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Yassine Handane Portfolio',
  },
})

// IMPORTANT : Préfixer avec openai/ pour OpenRouter
const EMBEDDING_MODEL = 'openai/text-embedding-3-small'
const OUTPUT_FILE = path.join(__dirname, '../public/embeddings.json')

// Fonction pour générer un embedding
async function generateEmbedding(text) {
  const { embedding } = await embed({
    model: openrouter.embedding(EMBEDDING_MODEL),
    value: text,
  })
  return embedding
}

// Fonction pour préparer le texte
function prepareText(text, maxLength = 8000) {
  let cleaned = text.replace(/\s+/g, ' ').replace(/\n+/g, ' ').trim()
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength)
  }
  return cleaned
}

// Fonction pour lire les blog posts
async function getBlogPosts() {
  const blogDir = path.join(__dirname, '../data/blog')
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))

  const posts = []

  for (const file of files) {
    const filePath = path.join(blogDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    // Ignorer les brouillons
    if (data.draft) continue

    const slug = file.replace(/\.(mdx|md)$/, '')
    const fullText = `${data.title}\n\n${data.summary || ''}\n\n${content}`

    posts.push({
      id: `blog-${slug}`,
      content: prepareText(fullText),
      metadata: {
        type: 'blog',
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        url: `/blog/${slug}`,
      },
    })
  }

  return posts
}

// Fonction pour lire les projets
async function getProjects() {
  const projectsPath = path.join(__dirname, '../data/projectsData.ts')

  // Lire le fichier TypeScript (simple extraction, pas d'évaluation)
  const content = fs.readFileSync(projectsPath, 'utf-8')

  // Extraire les projets (parsing simple)
  const projectMatches = content.matchAll(/{\s*title:\s*['"](.+?)['"]\s*,\s*description:\s*['"](.+?)['"]\s*(?:,\s*href:\s*['"](.+?)['"])?\s*(?:,\s*imgSrc:\s*['"](.+?)['"])?\s*}/gs)

  const projects = []
  let index = 0

  for (const match of projectMatches) {
    const [, title, description, href, imgSrc] = match

    projects.push({
      id: `project-${index}`,
      content: prepareText(`${title}\n\n${description}`),
      metadata: {
        type: 'project',
        title: title,
        url: href || '',
      },
    })

    index++
  }

  return projects
}

// Fonction pour lire les expériences
async function getExperiences() {
  const experiencesPath = path.join(__dirname, '../data/experiencesData.ts')

  // Lire le fichier TypeScript
  const content = fs.readFileSync(experiencesPath, 'utf-8')

  // Extraire les expériences (parsing simple pour les champs de base)
  const expMatches = content.matchAll(/{\s*company:\s*['"](.+?)['"]\s*,\s*position:\s*['"](.+?)['"]\s*,\s*(?:duration:\s*['"](.+?)['"]\s*,)?\s*(?:location:\s*['"](.+?)['"]\s*,)?\s*description:\s*['"](.+?)['"]/gs)

  const experiences = []
  let index = 0

  for (const match of expMatches) {
    const [, company, position, duration, location, description] = match

    experiences.push({
      id: `experience-${index}`,
      content: prepareText(`${position} at ${company}\n\n${description}`),
      metadata: {
        type: 'experience',
        title: `${position} at ${company}`,
        date: duration || '',
      },
    })

    index++
  }

  return experiences
}

// Fonction principale
async function main() {
  console.log('🚀 Génération des embeddings avec OpenRouter...\n')

  // Vérifier que la clé API OpenRouter est définie
  if (!process.env.OPENROUTER_API_KEY) {
    console.error('❌ Erreur: OPENROUTER_API_KEY n\'est pas défini dans les variables d\'environnement')
    console.error('   Créez un fichier .env.local avec: OPENROUTER_API_KEY=votre_clé')
    process.exit(1)
  }

  try {
    // Récupérer tous les documents
    console.log('📚 Récupération du contenu...')
    const blogPosts = await getBlogPosts()
    const projects = await getProjects()
    const experiences = await getExperiences()

    const allDocuments = [...blogPosts, ...projects, ...experiences]
    console.log(`   - ${blogPosts.length} blog posts`)
    console.log(`   - ${projects.length} projets`)
    console.log(`   - ${experiences.length} expériences`)
    console.log(`   Total: ${allDocuments.length} documents\n`)

    // Générer les embeddings
    console.log('🔄 Génération des embeddings...')
    const embeddedDocuments = []

    for (let i = 0; i < allDocuments.length; i++) {
      const doc = allDocuments[i]
      console.log(`   [${i + 1}/${allDocuments.length}] ${doc.metadata.title}`)

      try {
        const embedding = await generateEmbedding(doc.content)
        embeddedDocuments.push({
          ...doc,
          embedding,
        })
      } catch (error) {
        console.error(`   ❌ Erreur pour "${doc.metadata.title}":`, error.message)
      }

      // Petit délai pour éviter de dépasser les limites de taux
      if (i < allDocuments.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 200))
      }
    }

    // Sauvegarder dans un fichier JSON
    console.log(`\n💾 Sauvegarde des embeddings...`)
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(embeddedDocuments, null, 2))
    console.log(`   ✅ Sauvegardé dans ${OUTPUT_FILE}`)

    console.log(`\n✨ Terminé! ${embeddedDocuments.length} documents avec embeddings générés.`)
    console.log(`\n📊 Prochaine étape: Lancez votre application avec 'yarn dev'`)
  } catch (error) {
    console.error('\n❌ Erreur:', error)
    process.exit(1)
  }
}

main()
