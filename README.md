# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
* Primera forma
```
docker compose up -d
```
* Segunda forma
```
docker-compose up -d
```

2. Crear una copia de el .env.template, y renombrarlo a .env

3. Reemplazar las variables de entornos

4. Ejecutar el comando ``` npm install ```

5. Ejecutar el comando ``` npm run dev ```

6. Ejecutar estos comandos de Prisma en la ruta del proyecto
``` 
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED para [crear la base de datos local](localhost;3000/api/seed)

## Nota: Usuario Por Defecto
__usuario__  test1@google.com
__password__ 123456


## Update Proyecto de Next 13 a Next 14
Pasos para actualizar Next

1. Instalar el siguiente paquete ``` npm i - g npm-check-updates ``` instalamos de forma global y como administrador de Super Usuario.

2. Ahora solo colocamos ``` ncu ``` en la Terminal  en el lugar donde se encuentra nuestro proyecto que queremos actualizar a la nueva version.

3. Y Finalmente colocamos ``` ncu --upgrade ``` para actualizar nuestro proyecto.

4. Tambien colocamos al ``` npm i ``` para reconstruir los jodulos
<hr/>

# Librerias o Paquetes Utilizados en el Proyecto del AdminTodos
## Prisma commands
Utilizando Prismas en Nextjs

1. Inicializamos prisma en next
```
npx prisma init
```

2. Cada vez que realicemos un cambio en nuestra DB, vamos a realizar una 'migración' con el siguiente comando
```
npx prisma migrate dev
```

3. Ahora Generamos el Cliente de Prisma, para poder realizar manipulaciones con la Base de Datos.
```
npx prisma generate 
```

## Prisma CLI Reference
Utilizando el comando ``` db pull ```, no permite que nos cree el modelo a partir de la tabla de la Base de datos
```
npx prisma db pull
```
* Lo conveniente es que cuando se crea el esquema 'schema', utilicemos el siguiente comando, para generar el cliente y poder trabajar con esa nueva tabla
```
npx prisma generate
```

* Ahora en caso de que realicemos un cambien en nuestro modelo de Prisma ejecutamos lo siguiente
```
npx prisma migrate dev
```

## Yup - Validation Schema
Utilizando yup para validar los campos enviados por el body

1. Instalamos de Yup
```
npm i yup
```

## Cookies-Next
Utilizando cookies-next para Obtener, Configurar y Eliminar cookies con Nextjs

1. Instalamos
```
npm i cookies-next
```

## Auth.js
Utilizando authjs para las Autenticaciones mediante algunos Proveedores como [google, github, ...etc]

1. Instalamos de authjs
```
npm i next-auth
```

2. Obtenemos el AUTH_SECRET
```
npx auth secret
```

## Adaptadores de Auth con Prisma - @auth/prisma-adapter
Utilizando los adaptadores de Prisma para Auth en Next.js

1. Instalamos los adapter
```
npm i @prisma/client @auth/prisma-adapter
npm i prisma -save-dev
```

## bcryptjs - Encryptar password
Utilizado para encriptar las contraseñas y no mandarlo como texto plano.

1. Instalamos los paquetes
```
npm i bcryptjs -E
npm i @types/bcryptjs -D
```

# Producción

# Stage
