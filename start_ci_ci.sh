#!/bin/bash

echo "🔧 Restarting docker and jenkins..."
docker stop jenkins && docker rm jenkins
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts

echo "⏳ Wait for Jenkins to start..."
sleep 5

echo "🌐 Starting Cloudflare Tunnel..."
cloudflared tunnel --url http://localhost:8080 > tunnel.log 2>&1 &

sleep 5
TUNNEL_URL=$(grep -oE "https://[a-zA-Z0-9.-]+.trycloudflare.com" tunnel.log | tail -1)
echo "✅ Cloudflare Tunnel active: $TUNNEL_URL"

echo "🔗 Set github Webhook to: $TUNNEL_URL/github-webhook/"
