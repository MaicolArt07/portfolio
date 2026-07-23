export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const ui = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.career': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.tech': 'Tecnología',
    'nav.contact': 'Contacto',

    'hero.greeting': 'Hola, soy',
    'hero.downloadCV': 'Descargar CV',
    'hero.downloadPdf': 'Descarga el PDF',
    'hero.contactMe': 'Contactarme',
    'hero.viewProjects': 'Ver Proyectos',

    'about.title': 'Sobre mí',
    'about.subtitle': 'Quién soy y cómo trabajo',
    'about.highlight.leadership': 'Liderazgo de equipos',
    'about.highlight.architecture': 'Arquitectura de software',
    'about.highlight.dbOptimization': 'Optimización de bases de datos',
    'about.highlight.aiAutomation': 'Automatización con IA',

    'career.title': 'Experiencia Profesional',
    'career.subtitle': 'Mi trayectoria construyendo y liderando proyectos de software',

    'projects.title': 'Proyectos Destacados',
    'projects.subtitle': 'Una selección de trabajo profesional, aplicaciones publicadas y prototipos.',
    'projects.comingSoonTitle': 'Próximamente',
    'projects.comingSoonText': 'Estoy preparando esta sección para mostrar mis proyectos. Vuelve pronto.',
    'projects.repoLabel': 'Repositorio',
    'projects.demoLabel': 'Demo',

    'tech.title': 'Tecnologías',
    'tech.subtitle': 'Mis habilidades técnicas, organizadas por dominio y nivel',
    'tech.levelExpert': 'Experto',
    'tech.levelProficient': 'Competente',
    'tech.levelBasic': 'Básico',

    'skills.title': 'Habilidades',
    'skills.subtitle': 'Fortalezas que aplico en cada proyecto, más allá del código',

    'stats.yearsExperience': 'Años de experiencia',
    'stats.companies': 'Empresas',
    'stats.technologies': 'Tecnologías dominadas',
    'stats.projectsCompleted': 'Proyectos realizados',
    'stats.certifications': 'Certificaciones',

    'education.title': 'Educación',
    'education.subtitle': 'Formación académica',

    'certifications.title': 'Certificaciones',
    'certifications.subtitle': 'Formación complementaria',

    'contact.title': 'Contacto',
    'contact.subtitle': 'Estoy abierto a nuevos proyectos y oportunidades. Escríbeme.',
    'contact.formName': 'Nombre',
    'contact.formEmail': 'Email',
    'contact.formMessage': 'Mensaje',
    'contact.placeholderName': 'Tu nombre',
    'contact.placeholderEmail': 'tu@email.com',
    'contact.placeholderMessage': 'Cuéntame sobre tu proyecto...',
    'contact.send': 'Enviar mensaje',
    'contact.emailSubjectPrefix': 'Contacto desde el portfolio',

    'chat.toggleLabel': 'Consulta mi experiencia',
    'chat.openAriaLabel': 'Abrir asistente virtual',
    'chat.headerTitle': 'Asistente virtual',
    'chat.clearTitle': 'Limpiar conversación',
    'chat.closeTitle': 'Cerrar',
    'chat.welcomeMessage': 'Hola. Soy el asistente virtual de este portfolio. Puedes preguntarme sobre experiencia profesional, habilidades, tecnologías y proyectos desarrollados.',
    'chat.inputPlaceholder': 'Escribe tu pregunta...',
    'chat.inputAriaLabel': 'Tu pregunta',
    'chat.sendAriaLabel': 'Enviar',
    'chat.suggested1': '¿Cuál es tu experiencia profesional?',
    'chat.suggested2': '¿Qué tecnologías manejás?',
    'chat.suggested3': '¿Qué proyectos has desarrollado?',
    'chat.suggested4': '¿Tenés experiencia con Laravel?',
    'chat.suggested5': '¿Qué bases de datos utilizás?',
    'chat.suggested6': '¿Cómo puedo contactarte?',
    'chat.noInfoReply': 'No tengo información suficiente sobre ese tema dentro de este portfolio. Puedo contarte sobre experiencia profesional, tecnologías, proyectos, educación, certificaciones o cómo contactarme.',
    'chat.offTopicReply': 'Soy un asistente especializado exclusivamente en la experiencia, habilidades y proyectos profesionales presentados en este portfolio.',
    'chat.thanksReply': '¡De nada! Si tenés otra pregunta sobre mi experiencia, tecnologías o proyectos, con gusto te respondo.',
    'chat.whoAreYouReply': 'Soy un asistente que responde preguntas sobre la experiencia, habilidades y proyectos de Maicol Arteaga, usando únicamente la información publicada en este portfolio.',
    'chat.greetingReply': 'Hola. Puedo contarte sobre mi experiencia profesional, tecnologías, proyectos, educación o cómo contactarme. ¿Qué te gustaría saber?',
    'chat.processingError': 'No fue posible procesar la consulta.',

    'lang.switchTo': 'English',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.career': 'Experience',
    'nav.projects': 'Projects',
    'nav.tech': 'Tech',
    'nav.contact': 'Contact',

    'hero.greeting': "Hi, I'm",
    'hero.downloadCV': 'Download CV',
    'hero.downloadPdf': 'Download the PDF',
    'hero.contactMe': 'Contact Me',
    'hero.viewProjects': 'View Projects',

    'about.title': 'About Me',
    'about.subtitle': 'Who I am and how I work',
    'about.highlight.leadership': 'Team Leadership',
    'about.highlight.architecture': 'Software Architecture',
    'about.highlight.dbOptimization': 'Database Optimization',
    'about.highlight.aiAutomation': 'AI Automation',

    'career.title': 'Professional Experience',
    'career.subtitle': 'My track record building and leading software projects',

    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A selection of professional work, published apps, and prototypes.',
    'projects.comingSoonTitle': 'Coming Soon',
    'projects.comingSoonText': "I'm preparing this section to showcase my projects. Check back soon.",
    'projects.repoLabel': 'Repository',
    'projects.demoLabel': 'Demo',

    'tech.title': 'Technologies',
    'tech.subtitle': 'My technical skills, organized by domain and level',
    'tech.levelExpert': 'Expert',
    'tech.levelProficient': 'Proficient',
    'tech.levelBasic': 'Basic',

    'skills.title': 'Skills',
    'skills.subtitle': 'Strengths I apply to every project, beyond the code',

    'stats.yearsExperience': 'Years of Experience',
    'stats.companies': 'Companies',
    'stats.technologies': 'Technologies Mastered',
    'stats.projectsCompleted': 'Projects Completed',
    'stats.certifications': 'Certifications',

    'education.title': 'Education',
    'education.subtitle': 'Academic background',

    'certifications.title': 'Certifications',
    'certifications.subtitle': 'Additional training',

    'contact.title': 'Contact',
    'contact.subtitle': "I'm open to new projects and opportunities. Write to me.",
    'contact.formName': 'Name',
    'contact.formEmail': 'Email',
    'contact.formMessage': 'Message',
    'contact.placeholderName': 'Your name',
    'contact.placeholderEmail': 'you@email.com',
    'contact.placeholderMessage': 'Tell me about your project...',
    'contact.send': 'Send message',
    'contact.emailSubjectPrefix': 'Contact from the portfolio',

    'chat.toggleLabel': 'Ask about my experience',
    'chat.openAriaLabel': 'Open virtual assistant',
    'chat.headerTitle': 'Virtual Assistant',
    'chat.clearTitle': 'Clear conversation',
    'chat.closeTitle': 'Close',
    'chat.welcomeMessage': 'Hi. I’m this portfolio’s virtual assistant. You can ask me about professional experience, skills, technologies, and projects I’ve built.',
    'chat.inputPlaceholder': 'Type your question...',
    'chat.inputAriaLabel': 'Your question',
    'chat.sendAriaLabel': 'Send',
    'chat.suggested1': "What's your professional experience?",
    'chat.suggested2': 'What technologies do you work with?',
    'chat.suggested3': 'What projects have you built?',
    'chat.suggested4': 'Do you have experience with Laravel?',
    'chat.suggested5': 'What databases do you use?',
    'chat.suggested6': 'How can I contact you?',
    'chat.noInfoReply': "I don't have enough information on that topic within this portfolio. I can tell you about professional experience, technologies, projects, education, certifications, or how to contact me.",
    'chat.offTopicReply': "I'm an assistant specialized exclusively in the professional experience, skills, and projects presented in this portfolio.",
    'chat.thanksReply': "You're welcome! If you have another question about my experience, technologies, or projects, I'm happy to help.",
    'chat.whoAreYouReply': "I'm an assistant that answers questions about Maicol Arteaga's experience, skills, and projects, using only the information published in this portfolio.",
    'chat.greetingReply': 'Hi. I can tell you about my professional experience, technologies, projects, education, or how to contact me. What would you like to know?',
    'chat.processingError': 'The request could not be processed.',

    'lang.switchTo': 'Español',
  },
} as const;

export function t(lang: Lang, key: keyof typeof ui['es']): string {
  return ui[lang]?.[key] ?? ui[defaultLang][key];
}
