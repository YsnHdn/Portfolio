interface ExperienceData {
  company: string
  position: string
  duration: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
  logo?: string
  website?: string
}

const experiencesData: ExperienceData[] = [
  {
    company: 'Aimigo',
    position: 'AI for Education Intern',
    duration: 'April 2025 - Present',
    location: 'France',
    description: 'Developed cutting-edge AI solutions for education technology, focusing on content extraction and evaluation systems to enhance learning experiences through automated document processing and intelligent content generation.',
    achievements: [
      'Built custom document extraction pipeline with fine-tuned YOLO models, enabling automated conversion of educational PDFs to structured formats for enhanced content accessibility',
      'Optimized multimodal recognition models (LLAMA, Mistral) and online services for interpreting unstructured educational data via specialized AI agents',
      'Developed AI evaluation framework using prompt engineering and model comparison, optimizing content extraction accuracy across multiple LLM architectures',
      'Implemented RAG system for automated quiz generation, creating personalized learning experiences for end users through intelligent content processing'
    ],
    technologies: ['Python', 'NLP', 'RAG', 'LLMs', 'Prompt Engineering', 'Gen AI', 'YOLO', 'LLAMA', 'Mistral', 'LangChain', 'Vector Stores'],
    logo: '/static/images/experiences/Aimigo.webp',
    website: 'https://aimigo.ai/'
  },
  {
    company: 'Avignon Computer Science Laboratory',
    position: 'Machine Learning Research Intern',
    duration: 'March 2024 - October 2024',
    location: 'Avignon, France',
    description: 'Conducted research on Artificial Intelligence for Semantically controlled Speech Understanding, developing cutting-edge speech analysis systems that combine voice recognition with natural language understanding.',
    achievements: [
      'Designed and developed an automatic speech analysis system combining voice recognition and NLU',
      'Optimized speech recognition models (Whisper) and language understanding models (DistilBERT, CamemBERT) for French and English',
      'Developed machine learning algorithms for contextual analysis of long inputs',
      'Built and deployed a multi-service web demonstration application with PDF, chat, and voice recognition capabilities'
    ],
    technologies: ['Python', 'R', 'PyTorch', 'Transformers', 'LLMs', 'Flask', 'JavaScript', 'Docker', 'SLURM', 'Web Scraping'],
    logo: '/static/images/experiences/lia.jpeg',
    website: 'https://lia.univ-avignon.fr/'
  },
  {
    company: 'BMCI Group BNP Paribas',
    position: 'Data Analysis Intern',
    duration: 'June 2023 - September 2023',
    location: 'Casablanca, Morocco',
    description: 'Focused on banking performance analysis and customer behavior study, implementing comprehensive data science solutions for financial insights and predictive modeling.',
    achievements: [
      'Implemented ETL pipelines for large-scale banking data processing and integration',
      'Developed an ML model for customer churn prediction achieving 85% accuracy',
      'Created multiple data stories in Tableau to analyze banking performance, customer behavior, and market trends',
      'Designed interactive dashboards with advanced KPIs for monitoring agency and regional performance'
    ],
    technologies: ['Python', 'Pandas', 'ETL', 'SQL', 'Tableau Desktop', 'Machine Learning', 'Data Visualization'],
    logo: '/static/images/experiences/BNP.png',
    website: 'https://www.bmcinet.ma/'
  },
  {
    company: 'University of Paris Cité',
    position: 'Master\'s Student - Machine Learning',
    duration: '2024 - Present',
    location: 'Paris, France',
    description: 'Pursuing advanced studies in Machine Learning for Data Science, focusing on cutting-edge AI techniques and their applications in real-world scenarios.',
    achievements: [
      'Specialized coursework in Deep Learning, Natural Language Processing, and Computer Vision',
      'Research projects in advanced machine learning algorithms and optimization techniques',
      'Collaborative projects with industry partners on AI applications',
      'Academic excellence in theoretical foundations and practical implementations'
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Deep Learning', 'NLP', 'Computer Vision', 'Research'],
    logo: '/static/images/experiences/UPC.png',
    website: 'https://u-paris.fr/'
  },
  {
    company: 'ENSIAS',
    position: 'Engineering Student - Data Science & IoT',
    duration: '2021 - 2024',
    location: 'Rabat, Morocco',
    description: 'Completed engineering degree specializing in Data Science and Internet of Things, building strong foundations in software engineering, data analysis, and emerging technologies.',
    achievements: [
      'Graduated with distinction in Data Science and IoT specialization',
      'Led multiple team projects combining IoT systems with machine learning applications',
      'Developed comprehensive skills in software engineering and system architecture',
      'Active participation in research projects and academic competitions'
    ],
    technologies: ['Python', 'Java', 'IoT', 'Machine Learning', 'Data Science', 'System Design', 'Project Management'],
    logo: '/static/images/experiences/ensias.jpg',
    website: 'https://ensias.um5.ac.ma/'
  }
]

export default experiencesData