// Builds the static chat's knowledge base directly from the site's own data
// files (single source of truth — adding a project to src/data/projects.json
// makes it available to the chat automatically, no other changes needed).
// Runs at BUILD TIME only (imported from chat-widget.astro's frontmatter);
// the resulting plain JSON is what actually ships to the browser.
import home from '../data/home.json';
import about from '../data/about.json';
import career from '../data/career.json';
import education from '../data/education.json';
import certifications from '../data/certifications.json';
import skills from '../data/skills.json';
import tech from '../data/tech.json';
import projects from '../data/projects.json';
import { stemsOf } from './chatRetrieval.js';

function keywordsFrom(...texts) {
  return Array.from(new Set(stemsOf(texts.filter(Boolean).join(' '))));
}

export function buildKnowledgeBase() {
  const chunks = [];

  chunks.push({
    category: 'Perfil',
    title: home.name,
    text: `${home.name} — ${home.role}. Especialidades: ${(home.specialties || []).join(', ')}. ${about.paragraphs.join(' ')}`,
  });

  for (const job of career) {
    chunks.push({
      category: 'Experiencia',
      title: `${job.role} en ${job.company}`,
      text: `${job.role} en ${job.company} (${job.period}). ${job.achievements.join(' ')} Tecnologías utilizadas: ${job.tech.join(', ')}.`,
    });
  }

  for (const project of projects) {
    chunks.push({
      category: 'Proyecto',
      title: project.title,
      text: `Proyecto "${project.title}" (${project.category}). ${project.description} Tecnologías: ${(project.tech || []).join(', ') || 'no especificadas en el portfolio'}.${project.status ? ` Estado: ${project.status}.` : ''}`,
    });
  }

  for (const edu of education) {
    chunks.push({
      category: 'Educación',
      title: edu.degree,
      text: `${edu.degree} — ${edu.institution} (${edu.period}).`,
      // Search synonyms only (not shown to the visitor) — the question
      // "¿dónde estudiaste?" doesn't share a single literal word with the
      // displayed text above, so retrieval would otherwise miss it.
      synonyms: 'estudios estudiaste estudio universidad carrera titulo graduado formacion academica colegio escuela',
    });
  }

  for (const cert of certifications) {
    chunks.push({
      category: 'Certificación',
      title: cert.title,
      text: `${cert.title} — ${cert.issuer}.`,
    });
  }

  for (const skill of skills) {
    chunks.push({
      category: 'Habilidad',
      title: skill.name,
      text: `${skill.name}: ${skill.description}`,
    });
  }

  for (const category of tech.categories) {
    chunks.push({
      category: 'Tecnología',
      title: category.title,
      text: `Tecnologías de ${category.title}: ${category.skills.map((s) => s.name).join(', ')}.`,
    });
  }

  const contacts = (home.socials || []).filter(
    (s) => s.url && s.url !== '#' && s.showInContact
  );
  if (contacts.length) {
    chunks.push({
      category: 'Contacto',
      title: 'Información de contacto',
      text: contacts.map((s) => `${s.name}: ${s.url.replace('mailto:', '')}`).join(' | '),
      synonyms: 'contacto contactar contactarte escribir escribirte mensaje comunicarme comunicarte hablar red social',
    });
  }

  return chunks.map(({ synonyms, ...chunk }) => ({
    ...chunk,
    keywords: keywordsFrom(chunk.title, chunk.text, chunk.category, synonyms),
  }));
}
