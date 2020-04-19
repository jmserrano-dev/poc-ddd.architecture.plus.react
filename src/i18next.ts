import i18next from "i18next";
import { Locale } from "@domain/locale";

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: Locale.DEFAULT,
  whitelist: Locale.ALL,
  resources: {
    en: {
      translation: {
        menu: {
          tasks: "Tasks",
        },
        features: {
          language: {
            title: "Language",
            exception: {
              "not-found": "Language not found",
            },
          },
          tasks: {
            empty: "There are no tasks, you can start by adding some!",
            add: {
              placeholder: "Add new task...",
              button: "Add",
            },
            ensure: {
              empty: "The description cannot empty",
            },
            exception: {
              "not-found": "Task not found",
              create: "Error trying to add a new task",
              status: "Error trying to change task status",
              remove: "Error trying to remove task",
            },
          },
        },
      },
    },
    es: {
      translation: {
        menu: {
          tasks: "Tareas",
        },
        features: {
          tasks: {
            empty: "No hay tareas, puedes comenzar añadiendo alguna!",
            add: {
              placeholder: "Agrega una nueva tarea...",
              button: "Añadir",
            },
            ensure: {
              empty: "La descripción no puede estar vacía",
            },
            exception: {
              "not-found": "Tarea no encontrada",
              create: "Error al intentar agregar una nueva tarea",
              status: "Error al intentar cambiar el estado de una tarea",
              remove: "Error al intentar eliminar una tarea",
            },
          },
        },
      },
    },
  },
});

export default i18next;
