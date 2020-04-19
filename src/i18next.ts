import i18next from "i18next";

const LANGUAGES: string[] = ["en", "es"];
const DEFAULT_LANGUAGE = Object.freeze("es");

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: DEFAULT_LANGUAGE,
  resources: {
    en: {
      translation: {
        translation: {
          features: {
            tasks: {
              empty: "No hay tareas, puedes comenzar añadiendo alguna!",
              add: {
                placeholder: "Add new task...",
                button: "Add",
              },
              ensure: {
                empty: "El texto no puede ser vacío",
              },
              exception: {
                "not-found": "Tarea no encontrada",
                create: "Error al intentar agregar una nueva tarea",
                status: "Error al intental cambiar el estado de una tarea",
                remove: "Error al intentar eliminar una tarea",
              },
            },
          },
        },
      },
    },
    es: {
      translation: {
        features: {
          tasks: {
            empty: "No hay tareas, puedes comenzar añadiendo alguna!",
            add: {
              placeholder: "Agrega una nueva tarea...",
              button: "Añadir",
            },
            ensure: {
              empty: "El texto no puede ser vacío",
            },
            exception: {
              "not-found": "Tarea no encontrada",
              create: "Error al intentar agregar una nueva tarea",
              status: "Error al intental cambiar el estado de una tarea",
              remove: "Error al intentar eliminar una tarea",
            },
          },
        },
      },
    },
  },
});

export default i18next;
export { LANGUAGES, DEFAULT_LANGUAGE };
