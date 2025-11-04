# Use a lightweight Nginx image to serve the static site
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static site assets into the web root
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY app.js /usr/share/nginx/html/app.js
COPY blog.html /usr/share/nginx/html/blog.html
COPY blog.css /usr/share/nginx/html/blog.css
COPY check.js /usr/share/nginx/html/check.js
COPY check.ts /usr/share/nginx/html/check.ts
COPY ad.jpg /usr/share/nginx/html/ad.jpg
COPY f.jpg /usr/share/nginx/html/f.jpg
COPY local.jpg /usr/share/nginx/html/local.jpg
COPY r.jpg /usr/share/nginx/html/r.jpg
COPY t.jpg /usr/share/nginx/html/t.jpg

# Expose the default HTTP port
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
