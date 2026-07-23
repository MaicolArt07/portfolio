// Builds the static chat's knowledge base directly from the site's own data
// files (single source of truth — adding a project to src/data/projects.json
// makes it available to the chat automatically, no other changes needed).
// Runs at BUILD TIME only (imported from chat-widget.astro's frontmatter);
// the resulting plain JSON is what actually ships to the browser. Bilingual:
// pass lang: 'es' | 'en' to build the base in that language.
import esHome from '../data/home.json';
import esAbout from '../data/about.json';
import esCareer from '../data/career.json';
import esEducation from '../data/education.json';
import esCertifications from '../data/certifications.json';
import esSkills from '../data/skills.json';
import esTech from '../data/tech.json';
import esProjects from '../data/projects.json';

import enHome from '../data/en/home.json';
import enAbout from '../data/en/about.json';
import enCareer from '../data/en/career.json';
import enEducation from '../data/en/education.json';
import enCertifications from '../data/en/certifications.json';
import enSkills from '../data/en/skills.json';
import enTech from '../data/en/tech.json';
import enProjects from '../data/en/projects.json';

import { stemsOf } from './chatRetrieval.js';

const DATA = {
  es: {
    home: esHome, about: esAbout, career: esCareer, education: esEducation,
    certifications: esCertifications, skills: esSkills, tech: esTech, projects: esProjects,
  },
  en: {
    home: enHome, about: enAbout, career: enCareer, education: enEducation,
    certifications: enCertifications, skills: enSkills, tech: enTech, projects: enProjects,
  },
};

const LABELS = {
  es: {
    profile: 'Perfil', experience: 'Experiencia', project: 'Proyecto',
    education: 'Educación', certification: 'Certificación', skill: 'Habilidad',
    tech: 'Tecnología', contact: 'Contacto', contactInfoTitle: 'Información de contacto',
    specialties: 'Especialidades', at: 'en', techUsed: 'Tecnologías utilizadas',
    projectWord: 'Proyecto', techLabel: 'Tecnologías', unspecifiedTech: 'no especificadas en el portfolio',
    status: 'Estado', techOf: 'Tecnologías de',
    educationSynonyms: 'estudios estudiaste estudio universidad carrera titulo graduado formacion academica colegio escuela',
    contactSynonyms: 'contacto contactar contactarte escribir escribirte mensaje comunicarme comunicarte hablar red social',
  },
  en: {
    profile: 'Profile', experience: 'Experience', project: 'Project',
    education: 'Education', certification: 'Certification', skill: 'Skill',
    tech: 'Technology', contact: 'Contact', contactInfoTitle: 'Contact information',
    specialties: 'Specialties', at: 'at', techUsed: 'Technologies used',
    projectWord: 'Project', techLabel: 'Technologies', unspecifiedTech: 'not specified in the portfolio',
    status: 'Status', techOf: 'Technologies of',
    educationSynonyms: 'studies studied study university degree college school graduated academic',
    contactSynonyms: 'contact reach message write email talk social',
  },
};

function keywordsFrom(...texts) {
  return Array.from(new Set(stemsOf(texts.filter(Boolean).join(' '))));
}

export function buildKnowledgeBase(lang = 'es') {
  const { home, about, career, education, certifications, skills, tech, projects } = DATA[lang] || DATA.es;
  const L = LABELS[lang] || LABELS.es;
  const chunks = [];

  chunks.push({
    category: L.profile,
    title: home.name,
    text: `${home.name} — ${home.role}. ${L.specialties}: ${(home.specialties || []).join(', ')}. ${about.paragraphs.join(' ')}`,
  });

  for (const job of career) {
    chunks.push({
      category: L.experience,
      title: `${job.role} ${L.at} ${job.company}`,
      text: `${job.role} ${L.at} ${job.company} (${job.period}). ${job.achievements.join(' ')} ${L.techUsed}: ${job.tech.join(', ')}.`,
    });
  }

  for (const project of projects) {
    chunks.push({
      category: L.project,
      title: project.title,
      text: `${L.projectWord} "${project.title}" (${project.category}). ${project.description} ${L.techLabel}: ${(project.tech || []).join(', ') || L.unspecifiedTech}.${project.status ? ` ${L.status}: ${project.status}.` : ''}`,
    });
  }

  for (const edu of education) {
    chunks.push({
      category: L.education,
      title: edu.degree,
      text: `${edu.degree} — ${edu.institution} (${edu.period}).`,
      // Search synonyms only (not shown to the visitor) — a question like
      // "where did you study?" doesn't share a literal word with the
      // displayed text above, so retrieval would otherwise miss it.
      synonyms: L.educationSynonyms,
    });
  }

  for (const cert of certifications) {
    chunks.push({
      category: L.certification,
      title: cert.title,
      text: `${cert.title} — ${cert.issuer}.`,
    });
  }

  for (const skill of skills) {
    chunks.push({
      category: L.skill,
      title: skill.name,
      text: `${skill.name}: ${skill.description}`,
    });
  }

  for (const category of tech.categories) {
    chunks.push({
      category: L.tech,
      title: category.title,
      text: `${L.techOf} ${category.title}: ${category.skills.map((s) => s.name).join(', ')}.`,
    });
  }

  const contacts = (home.socials || []).filter(
    (s) => s.url && s.url !== '#' && s.showInContact
  );
  if (contacts.length) {
    chunks.push({
      category: L.contact,
      title: L.contactInfoTitle,
      text: contacts.map((s) => `${s.name}: ${s.url.replace('mailto:', '')}`).join(' | '),
      synonyms: L.contactSynonyms,
    });
  }

  return chunks.map(({ synonyms, ...chunk }) => ({
    ...chunk,
    keywords: keywordsFrom(chunk.title, chunk.text, chunk.category, synonyms),
  }));
}
