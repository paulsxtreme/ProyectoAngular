# Frontend - Productos Financieros Banco Pichincha

Este proyecto es una aplicación frontend desarrollada para la gestión y visualización de productos financieros del Banco Pichincha. La aplicación permite listar, buscar, agregar, editar y eliminar productos financieros a través de una interfaz web moderna y responsive.

## 🚀 Características Principales

- **Gestión completa de productos financieros**
- **Interfaz de usuario moderna y responsive**
- **Validaciones en tiempo real**
- **Búsqueda y filtrado de productos**
- **Operaciones CRUD completas**

## 📋 Funcionalidades

### F1. Listado de Productos Financieros
- Visualización de todos los productos financieros ofertados por el Banco Pichincha
- Carga de datos desde API REST
- Interfaz basada en el diseño D1

### F2. Búsqueda de Productos
- Campo de búsqueda de texto para filtrar productos
- Búsqueda en tiempo real
- Interfaz integrada en el diseño D1

### F3. Control de Registros
- Visualización del número total de resultados
- Selector de cantidad de registros por página (5, 10, 20)
- Paginación automática

### F4. Agregar Producto
- Botón "Agregar" para navegación al formulario de registro
- Formulario con validaciones completas:
  - **ID**: Requerido, 3-10 caracteres, verificación de unicidad
  - **Nombre**: Requerido, 5-100 caracteres
  - **Descripción**: Requerido, 10-200 caracteres
  - **Logo**: Requerido
  - **Fecha de Liberación**: Requerida, igual o mayor a fecha actual
  - **Fecha de Revisión**: Requerida, exactamente un año posterior a fecha de liberación
- Botones "Agregar" y "Reiniciar"
- Validación visual de errores por campo

### F5. Editar Producto
- Menú contextual dropdown por producto
- Formulario de edición con ID deshabilitado
- Mismas validaciones que el formulario de creación
- Navegación fluida entre pantallas

### F6. Eliminar Producto
- Opción de eliminar en menú contextual
- Modal de confirmación con botones "Cancelar" y "Eliminar"
- Eliminación segura con confirmación

## 🎨 Diseños de Referencia

El proyecto implementa los siguientes diseños:

- **D1**: Listado principal y búsqueda de productos
- **D2**: Formularios de creación y edición
- **D3**: Menús contextuales y botón principal
- **D4**: Modal de confirmación de eliminación

## 🛠️ Tecnologías Utilizadas

```
- HTML5
- CSS3
- JavaScript (ES6+)
- [Framework/Librería utilizada - ej: React, Angular, Vue]
- [Otras dependencias específicas]
```

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd frontend-banco-pichincha
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
# Edita .env con la configuración de tu API
```

4. Ejecuta el proyecto:
```bash
npm start
```

## 🔧 Configuración

Asegúrate de configurar correctamente:

- **API_BASE_URL**: URL base de la API de productos financieros
- **API_ENDPOINTS**: Endpoints específicos para cada operación

## 📚 Estructura del Proyecto

```
src/
├── components/
│   ├── ProductList/
│   ├── ProductForm/
│   ├── SearchBar/
│   └── Modal/
├── services/
│   └── api.js
├── styles/
├── utils/
└── App.js
```

## 🧪 Validaciones Implementadas

### Validaciones de Formulario

| Campo | Validaciones |
|-------|-------------|
| ID | Requerido, 3-10 caracteres, unicidad via API |
| Nombre | Requerido, 5-100 caracteres |
| Descripción | Requerido, 10-200 caracteres |
| Logo | Requerido |
| Fecha Liberación | Requerida, >= fecha actual |
| Fecha Revisión | Requerida, = fecha liberación + 1 año |

## 🔍 API Endpoints

- `GET /products` - Obtener lista de productos
- `POST /products` - Crear nuevo producto
- `PUT /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto
- `GET /products/verification/:id` - Verificar ID único

## 🚀 Deployment

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm run start
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia [NOMBRE_LICENCIA]. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**[Tu Nombre]**
- Email: [tu-email@ejemplo.com]
- LinkedIn: [tu-perfil-linkedin]
- GitHub: [tu-usuario-github]

## 📞 Soporte

Para soporte o preguntas sobre el proyecto:
- Crea un issue en GitHub
- Contacta al equipo de desarrollo

---

⭐ **¡No olvides dar una estrella al proyecto si te fue útil!**
