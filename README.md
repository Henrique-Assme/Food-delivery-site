CI:

docker restart jenkins - rodando na porta 8080

cloudflared tunnel --url http://localhost:8080
Colocar o link gerado nas configurações de WeebHook do repositório como url + /github-webhook/

A partir disso está configurado, qualquer push ativará o pipeline

run tests:
npm test roda todos os testes
para rodar individualmente npm test arquivo_que_quer_rodar