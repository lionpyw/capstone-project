#!/bin/bash


RUN_PORT="${PORT:-8000}"

python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate
gunicorn capstone.wsgi:application --bind "0.0.0.0:$RUN_PORT"