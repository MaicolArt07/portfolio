// Builds the chatbot's knowledge base directly from the site's own data
// files (single source of truth — adding a project to src/data/projects.json
// makes it available to the chat automatically, no prompt changes needed).
import home from '../../src/data/home.json' with { type: 'json' };
import about from '../../src/data/about.json' with { type: 'json' };
import career from '../../src/data/career.json' with { type: 'json' };
import education from '../../src/data/education.json' with { type: 'json' };
import certifications from '../../src/data/certifications.json' with { type: 'json' };
import skills from '../../src/data/skills.json' with { type: 'json' };
import tech from '../../src/data/tech.json' with { type: 'json' };
import projects from '../../src/data/projects.json' with { type: 'json' };

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(new RegExp('[\\u0300-\\u036f]', 'g'), '');
}

function keywordsFrom(...texts) {
  const words = normalize(texts.filter(Boolean).join(' '))
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
  return Array.from(new Set(words));
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
    });
  }

  return chunks.map((chunk) => ({
    ...chunk,
    keywords: keywordsFrom(chunk.title, chunk.text, chunk.category),
  }));
}
