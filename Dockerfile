#Builder
FROM python:3.12-slim-bullseye as builder

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc\
    libpq-dev libjpeg-dev libcairo2 \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

# install python dependencies
COPY ./requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r requirements.txt


#########
# FINAL #
#########

FROM python:3.12-slim-bullseye

RUN mkdir -p /home/app

# create the app user
RUN addgroup --system app && adduser --system --group app

# create the appropriate directories
ENV HOME=/home/app
ENV APP_HOME=/home/app/web
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends netcat
COPY --from=builder /usr/src/app/wheels /wheels
COPY --from=builder /usr/src/app/requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache /wheels/*

# copy entrypoint.prod.sh
COPY ./db-entrypoint.sh .
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g'  $APP_HOME/db-entrypoint.sh
RUN chmod +x  $APP_HOME/db-entrypoint.sh
RUN chmod +x  $APP_HOME/entrypoint.sh

# copy project
COPY . $APP_HOME

# get react build file
RUN cd $APP_HOME/cap-frontend/ && ls | grep -P "^[^d]" | xargs -d "\n" rm -rf && cd ..

# chown all the files to the app user
RUN chown -R app:app $APP_HOME

# Clean up apt cache to reduce image size
RUN apt-get remove --purge -y \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# change to the app user
USER app

# run db-entrypoint.sh
EXPOSE 8000
ENTRYPOINT ["/home/app/web/db-entrypoint.sh"]
