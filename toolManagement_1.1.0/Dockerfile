# Pull base image
FROM python:3.6-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /web

# Install dependencies
COPY requirements.txt /web/
ENV PIP_INDEX_URL="https://mirrors.bfsu.edu.cn/pypi/web/simple/"
RUN pip install --upgrade pip  && \
    pip install -r requirements.txt

# CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["uwsgi", "--ini", "uwsgi.ini"]