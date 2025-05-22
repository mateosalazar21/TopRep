# 🏋️‍♂️ TopRep – App de seguimiento y motivación para atletas de CrossFit

**TopRep** es una aplicación móvil desarrollada como proyecto de tesis para la Universidad San Francisco de Quito. Está diseñada para mejorar la motivación, disciplina y rendimiento de los atletas en entornos de entrenamiento funcional como CrossFit.

> 📦 Versión final entregada: `v1.0-tesis-final`  
> 🛠 Basado en Expo SDK 52  
> 👨‍💻 Desarrollado con React Native, Supabase y NativeWind

---

## 🚀 Funcionalidades clave

- 📊 **Metas SMART** personalizadas por atleta (fuerza, resistencia, bienestar, composición corporal)
- 📈 **Seguimiento de progreso** basado en desempeño real (WODs completados, PRs, tiempos)
- 🏆 **Desafíos semanales** con ranking interno y sistema de inscripción automática
- 👥 **Comunidad activa** y visualización de estadísticas individuales vs colectivas
- 📋 **Formulario de perfil atlético** adaptado a metas y nivel de entrenamiento

---

## ⚙️ Tecnologías utilizadas

- [Expo SDK 52](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [Supabase](https://supabase.com/) – Auth, Base de datos y almacenamiento
- [NativeWind](https://www.nativewind.dev/) – Tailwind CSS para React Native
- [React Navigation](https://reactnavigation.org/)
- `react-native-reanimated`, `lucide-react-native`, `react-native-chart-kit`, entre otras.

---

## 🧠 Arquitectura

- `app/` – Estructura principal de rutas con `expo-router`
- `components/` – Componentes UI reutilizables
- `hooks/` – Hooks personalizados
- `lib/` – Integraciones con Supabase y lógica compartida
- `supabase/` – Cliente y esquemas de base de datos
- `screens/` – Formularios, metas, estadísticas, comunidad
- `assets/` – Imágenes optimizadas de ejercicios y marca

---

## 🧪 Cómo correr el proyecto

### Requisitos

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Cuenta de Supabase (ya configurada en este proyecto)

### Pasos

```bash
git clone https://github.com/mateosalazar21/TopRep.git
cd TopRep
git checkout toprep-app-base
npm install
npx expo start
```

---

## ✅ Versión entregada

Esta es la versión final y funcional del proyecto presentada como entrega de tesis.  
Se encuentra bajo la etiqueta:

```bash
git checkout v1.0-tesis-final
```

---

## 🎓 Proyecto de Tesis

**Carrera:** Diseño en Medios Interactivos  
**Universidad:** Universidad San Francisco de Quito  
**Autor:** Mateo Salazar  
**Tutor:** Andrés Parra

---

## 📬 Contacto

- GitHub: [mateosalazar21](https://github.com/mateosalazar21)
- Correo: mateo.salazar.21@gmail.com
