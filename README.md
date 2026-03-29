# X-Tire v1.0 — Sklep Internetowy

Statyczna strona sklepu X-Tire zbudowana na HTML + CSS + JavaScript z integracją Snipcart.

## Technologia

- **Frontend:** Statyczny HTML5 + CSS3 + Vanilla JavaScript
- **Koszyk i płatności:** [Snipcart v3](https://snipcart.com)
- **Hosting:** GitHub Pages

## Konfiguracja Snipcart

1. Zarejestruj konto na [dashboard.snipcart.com](https://dashboard.snipcart.com)
2. Pobierz **Public API Key** z panelu → Account → API Keys
3. Zastąp `YOUR_PUBLIC_API_KEY` w każdym pliku HTML swoim kluczem
4. W panelu Snipcart → Domains & URLs → dodaj `mroova1982.github.io`
5. Skonfiguruj płatności: Stripe (karty) lub PayU (BLIK)

## Strona publiczna

https://mroova1982.github.io/xTirev_1.0/

## Wdrożenie produkcyjne (Docker + HTTPS)

Projekt zawiera gotową konfigurację produkcyjną dla domeny `x-tire.pl` oraz `www.x-tire.pl`:

- `docker-compose.prod.yml` — kontenery `web` + `caddy`
- `Caddyfile` — automatyczny TLS (Let's Encrypt) i przekierowanie `www -> apex`

### Wymagania serwera

1. Docker + Docker Compose
2. Publiczny adres IP serwera
3. Rekordy DNS ustawione na serwer:
   - `x-tire.pl` -> A -> `<IP_SERWERA>`
   - `www.x-tire.pl` -> A -> `<IP_SERWERA>`
4. Otwarte porty: `80` i `443`

### Start produkcyjny

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

### Przydatne komendy

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f
docker compose -f docker-compose.prod.yml down
```

## Produkty

| ID | Nazwa | Cena |
|---|---|---|
| `xtire-trail-29` | X-Tire Trail 29" | 299 PLN |
| `xtire-enduro-pro-29` | X-Tire Enduro Pro 29" | 349 PLN |