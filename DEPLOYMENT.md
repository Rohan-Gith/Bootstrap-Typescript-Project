# Deployment Guide

This project is a static Bootstrap application. The easiest way to deploy it is with a lightweight Docker container running Nginx. The following instructions will build and run the site locally; you can use the same image with any container-friendly hosting service (e.g., AWS ECS, Google Cloud Run, Azure Container Apps, Render, Railway, Fly.io, etc.).

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed locally.

## Build the image
```bash
docker build -t astrology-site .
```

## Run the container locally
```bash
docker run --rm -p 8080:80 astrology-site
```

Open your browser to <http://localhost:8080> to view the site.

## Deploying to a cloud provider
1. Push the image to a container registry (Docker Hub, GitHub Container Registry, etc.).
   ```bash
   docker tag astrology-site YOUR_REGISTRY_USERNAME/astrology-site:latest
   docker push YOUR_REGISTRY_USERNAME/astrology-site:latest
   ```
2. Create a service in your preferred provider using the pushed image.
3. Map port 80 inside the container to the public HTTP port (usually 80 or 443 behind an HTTPS load balancer).

The site is static, so no environment variables or persistent storage are required.
