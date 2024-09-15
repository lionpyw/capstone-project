#!/bin/bash


RUN_PORT="${PORT:-8000}"


python manage.py migrate --no-input
gunicorn capstone.wsgi:application --bind "0.0.0.0:$RUN_PORT"