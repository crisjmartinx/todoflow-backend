import * as bcrypt from 'bcrypt';

interface SeedUser {
  email: string;
  password: string;
  name: string;
  roles: string[];
}

interface SeedNotes {
  title: string;
  content: string;
  tag: ValidTagsItems[];
  color: string;
  isPinned: boolean;
  isArchived: boolean;
}

interface SeedTags {
  name: ValidTags;
  color: string;
  items: string[];
}

type ValidTags =
  | 'Trabajo y Estudios'
  | 'Vida Personal'
  | 'Creatividad y Pasatiempos'
  | 'Organización y Productividad'
  | 'Social y Comunidad'
  | 'Tecnología'
  | 'Salud y Bienestar';

type ValidTagsItems =
  | 'Trabajo'
  | 'Proyectos'
  | 'Tareas pendientes'
  | 'Reuniones'
  | 'Ideas'
  | 'Investigación'
  | 'Notas de clase'
  | 'Exámenes'
  | 'Recordatorios'
  | 'Personal'
  | 'Diario'
  | 'Reflexiones'
  | 'Metas'
  | 'Salud'
  | 'Finanzas'
  | 'Compras'
  | 'Cumpleaños'
  | 'Viajes'
  | 'Ideas creativas'
  | 'Arte'
  | 'Música'
  | 'Lectura'
  | 'Películas/Series'
  | 'Recetas'
  | 'Fotografía'
  | 'Hobby'
  | 'Inspiración'
  | 'Urgente'
  | 'Importante'
  | 'Prioridad baja'
  | 'Semanal'
  | 'Mensual'
  | 'A largo plazo'
  | 'Checklist'
  | 'Agenda'
  | 'Planificación'
  | 'Amigos'
  | 'Familia'
  | 'Voluntariado'
  | 'Eventos'
  | 'Redes sociales'
  | 'Contactos'
  | 'Desarrollo'
  | 'Diseño'
  | 'Referencias técnicas'
  | 'Solución de problemas'
  | 'Enlaces útiles'
  | 'Software/Apps'
  | 'Ejercicio'
  | 'Dieta'
  | 'Meditación'
  | 'Citas médicas'
  | 'Terapia'
  | 'Hábitos saludables';

interface SeedData {
  users: SeedUser[];
  notes: SeedNotes[];
  tags: SeedTags[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test@gmail.com',
      name: 'invitado',
      password: bcrypt.hashSync('Test123!@Ajfhk', 10),
      roles: ['user'],
    },
  ],
  tags: [
    {
      name: 'Vida Personal',
      color: '#FF5733',
      items: [
        'Salud',
        'Diario',
        'Reflexiones',
        'Metas',
        'Finanzas',
        'Compras',
        'Cumpleaños',
        'Viajes',
      ],
    },
    {
      name: 'Trabajo y Estudios',
      color: '#28A745',
      items: [
        'Trabajo',
        'Proyectos',
        'Tareas pendientes',
        'Reuniones',
        'Ideas',
        'Investigación',
        'Notas de clase',
        'Exámenes',
        'Recordatorios',
      ],
    },
    {
      name: 'Creatividad y Pasatiempos',
      color: '#007BFF',
      items: [
        'Personal',
        'Ideas creativas',
        'Arte',
        'Música',
        'Lectura',
        'Películas/Series',
        'Recetas',
        'Fotografía',
        'Hobby',
        'Inspiración',
      ],
    },
    {
      name: 'Organización y Productividad',
      color: '#FFEB3B',
      items: [
        'Urgente',
        'Importante',
        'Prioridad baja',
        'Semanal',
        'Mensual',
        'A largo plazo',
        'Checklist',
        'Agenda',
        'Planificación',
      ],
    },
    {
      name: 'Social y Comunidad',
      color: '#9C27B0',
      items: [
        'Amigos',
        'Familia',
        'Voluntariado',
        'Eventos',
        'Redes sociales',
        'Contactos',
      ],
    },
    {
      name: 'Tecnología',
      color: '#00BCD4',
      items: [
        'Desarrollo',
        'Diseño',
        'Referencias técnicas',
        'Solución de problemas',
        'Enlaces útiles',
        'Software/Apps',
      ],
    },
    {
      name: 'Salud y Bienestar',
      color: '#8BC34A',
      items: [
        'Ejercicio',
        'Dieta',
        'Meditación',
        'Citas médicas',
        'Terapia',
        'Hábitos saludables',
      ],
    },
  ],

  notes: [
    {
      title: 'Mi primer día en el trabajo',
      content: 'Hoy conocí a mis compañeros...',
      tag: ['Salud'],
      color: '#FF573399',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Mi rutina diaria de ejercicio',
      content: 'Hoy hice mi rutina de 30 minutos de ejercicio...',
      tag: ['Diario'],
      color: '#33AFFF99',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'La importancia de un buen descanso',
      content: 'Dormir bien es clave para una vida saludable...',
      tag: ['Reflexiones'],
      color: '#FFC30099',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Mis metas de este mes',
      content: 'Tengo como objetivo correr 5 km esta semana...',
      tag: ['Metas'],
      color: '#FF149399',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Gestión de mis finanzas personales',
      content: 'Hoy revisé mi presupuesto y ahorros...',
      tag: ['Finanzas'],
      color: '#32CD3299',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Lista de compras para esta semana',
      content: 'Necesito comprar leche, pan, frutas y verduras...',
      tag: ['Compras'],
      color: '#FFD70099',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Preparando el cumpleaños de Ana',
      content: 'Esta semana organizaré una fiesta sorpresa para Ana...',
      tag: ['Cumpleaños'],
      color: '#FF69B499',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Planificación de mis próximos viajes',
      content: 'Estoy pensando en viajar a la playa el próximo mes...',
      tag: ['Viajes'],
      color: '#00FA9A99',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Tareas pendientes del trabajo',
      content: 'Tengo que terminar el informe y enviar el presupuesto...',
      tag: ['Trabajo'],
      color: '#8A2BE299',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Proyectos en curso para el trabajo',
      content: 'Estamos desarrollando un proyecto nuevo para un cliente...',
      tag: ['Proyectos'],
      color: '#DA70D699',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Tareas pendientes en mi lista',
      content: 'Hoy debo responder correos y hacer llamadas...',
      tag: ['Tareas pendientes'],
      color: '#C7158599',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Reunión importante con el cliente',
      content: 'Debo presentar los avances del proyecto al cliente mañana...',
      tag: ['Reuniones'],
      color: '#FF634799',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Generando nuevas ideas para el proyecto',
      content:
        'Hoy pensé en algunas nuevas estrategias para mejorar el diseño...',
      tag: ['Ideas'],
      color: '#8B451399',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Investigación de nuevas tendencias de tecnología',
      content:
        'He estado explorando nuevas herramientas para integrar en el sistema...',
      tag: ['Investigación'],
      color: '#00BFFF99',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Notas de clase sobre JavaScript',
      content: 'Hoy aprendí sobre funciones de alto orden en JavaScript...',
      tag: ['Notas de clase'],
      color: '#A52A2A99',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Preparación para los exámenes',
      content:
        'Estoy estudiando para el examen de matemáticas de la próxima semana...',
      tag: ['Exámenes'],
      color: '#9ACD3299',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Recordatorio de tareas a realizar',
      content: 'Tengo que completar la tarea de diseño antes de las 5 PM...',
      tag: ['Recordatorios'],
      color: '#20B2AA99',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'La importancia de la creatividad en el trabajo',
      content: 'Hoy me inspiré para empezar un proyecto personal...',
      tag: ['Personal'],
      color: '#D2691E99',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Ideas creativas para nuevos proyectos',
      content:
        'Estoy pensando en crear una aplicación para gestionar mis tareas...',
      tag: ['Ideas creativas'],
      color: '#4169E199',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Mi primera pintura al óleo',
      content: 'Hoy comencé a pintar mi primer cuadro con óleo...',
      tag: ['Arte'],
      color: '#8B000099',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Estudiando teoría musical para mejorar mi bajo',
      content: 'Hoy practiqué nuevos acordes en el bajo...',
      tag: ['Música'],
      color: '#2E8B5799',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Lectura sobre filosofía y crecimiento personal',
      content:
        'Estoy leyendo un libro sobre cómo mejorar mis habilidades sociales...',
      tag: ['Lectura'],
      color: '#E9967A99',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Películas recomendadas para este mes',
      content: 'Tengo que ver una nueva serie de Netflix...',
      tag: ['Películas/Series'],
      color: '#FF450099',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Recetas de cocina fáciles y rápidas',
      content: 'Hoy quiero probar una receta de lasaña vegetariana...',
      tag: ['Recetas'],
      color: '#F0E68C99',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Fotos de mi última excursión a la montaña',
      content: 'Subí unas fotos de mi aventura en la montaña...',
      tag: ['Fotografía'],
      color: '#C7158599',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Un nuevo hobby: jardinería',
      content: 'Hoy comencé a plantar algunas flores en mi jardín...',
      tag: ['Hobby'],
      color: '#00640099',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Inspiración para nuevos proyectos creativos',
      content:
        'Encontré unas ideas increíbles en Pinterest para mi próximo proyecto...',
      tag: ['Inspiración'],
      color: '#B0E0E699',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Lista de tareas urgentes para esta semana',
      content:
        'Las tareas urgentes para esta semana son: terminar el informe y llamar al cliente...',
      tag: ['Urgente'],
      color: '#FF149399',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Organizando mis prioridades para el mes',
      content:
        'Este mes debo concentrarme en mi salud y en mis proyectos más importantes...',
      tag: ['Importante'],
      color: '#DAA52099',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Mis tareas de baja prioridad',
      content:
        'Hay tareas que puedo dejar para más tarde, como organizar mi escritorio...',
      tag: ['Prioridad baja'],
      color: '#E0FFFF99',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Planificación semanal de tareas',
      content:
        'Esta semana tengo que finalizar algunos proyectos y asistir a una reunión importante...',
      tag: ['Semanal'],
      color: '#80008099',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Revisión mensual de mis metas personales',
      content:
        'Este mes he cumplido muchas de mis metas, pero algunas todavía requieren más trabajo...',
      tag: ['Mensual'],
      color: '#228B2299',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Tareas a largo plazo para este año',
      content: 'A largo plazo quiero aprender nuevos idiomas y viajar más...',
      tag: ['A largo plazo'],
      color: '#6A5ACD99',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Mi checklist de cosas por hacer',
      content: 'Tengo que hacer la compra, estudiar y revisar el proyecto...',
      tag: ['Checklist'],
      color: '#00008B99',
      isPinned: false,
      isArchived: false,
    },
    {
      title: 'Mi agenda de la próxima semana',
      content: 'Este fin de semana debo preparar todo para el viaje...',
      tag: ['Agenda'],
      color: '#F4A30099',
      isPinned: false,
      isArchived: false,
    },
  ],
};
