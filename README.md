# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Commands

En el directorio del proyecto, puedes ejecutar:

### `docker-compose up --build`

Construye e inicia todos los servicios definidos en el archivo docker-compose.yml.
La opción `--build` asegura que las imágenes de Docker se reconstruyan utilizando el código y la configuración más recientes.
Es útil cuando se han realizado cambios en el código fuente o en archivos relacionados con Docker.

### `npm run dev`

Ejecuta la aplicación en modo desarrollo.
Este comando normalmente utiliza herramientas como `nodemon`, `vite` o `next` para habilitar la recarga automática cuando se detectan cambios en el código.
Abre [http://localhost:3000](http://localhost:3000) (o el puerto especificado) para verla en tu navegador.

La página se recargará automáticamente si realizas ediciones.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

## Tipo de arquitectura

Este proyecto cuenta con un tipo de arquitectura basada en componentes de forma atomizada, creando cada componente de forma separada e integrandolo a las paginas que correspondan.

## Modulos y componentes identificados

- Components .- Con todos los componentes individuales del sistema
- Config .- Con la configuracion de la base de datos
- Context .- Para el contexto del usuario que ingrese a la aplicacion
- Pages .- Con las paginas de la aplicacion
- Server .- Con todo el backend desde los controllers hasta la configuracion de las rutas
- Utils .- Con todos los auxiliares o extras necearios para valicaciones u/o verificaciones de seguridad.

## Mejoras arquitectonicas propuestas

Se podria considerar una capa de validacion de datos antes de ingresarlos a la DB para mejorar y proteger la integridad de los mismos. Adicional a eso se podria mejorar el manejo del contexto del usuario para que soporte a varios conectados de forma simultanea.
