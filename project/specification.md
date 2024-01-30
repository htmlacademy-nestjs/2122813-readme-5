# Проект «Readme»

## Docker

В директории project выполнить команды
- Сервис blog 
```
docker compose -f ./apps/blog/docker-compose.dev.yml --project-name "project" up -d
```

- Сервис notify 
```  
docker compose -f ./apps/notify/docker-compose.dev.yml --project-name "project" up -d
```

- Сервис uploader 
```
docker compose -f ./apps/uploader/docker-compose.dev.yml --project-name "project" up -d
```

- Сервис users 
```
docker compose -f ./apps/users/docker-compose.dev.yml --project-name "project" up -d
```

## Переменные окружения

Файлы с переменными окружения
- Сервис blog `project/apps/blog/.blog.env`
- Сервис notify `project/apps/notify/.notify.env`
- Сервис uploader `project/apps/uploader/uploader.env`
- Сервис users `project/apps/users/users.env`

Для подключения к базе данных сервиса blog переменные окружения в файле `project/libs/models/prisma/.env`

## База данных сервиса blog

- Миграции 
```
nx run blog:db:migrate
```

- Генерация Prisma-client 
```
nx run blog:db:generate
```

- Сидер 
```
nx run blog:db:seed
```

## Старт проекта в dev режиме

В директории project выполнить команды

- Установить зависимости
```
npm i
```
- Запустить сервисы 

```
nx run-many -t serve -p users blog notify uploader
```
