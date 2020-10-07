docker build -t joshbhodges/joshbot .
docker stop DJKieran
docker rm DJKieran
docker run --name=DJKieran --restart=always