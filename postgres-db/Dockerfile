FROM postgres:13
COPY init.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_USER=todo_user
ENV POSTGRES_PASSWORD=todo_password
ENV POSTGRES_DB=todo_db