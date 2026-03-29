---
description: produkcyjne wdrożenie x-tire.pl (Docker + HTTPS)
---
1. Zaloguj się na serwer i przejdź do katalogu projektu.
2. Zaktualizuj kod:
   - `git pull`
3. Sprawdź wymagania:
   - Docker i Docker Compose są zainstalowane
   - porty `80` i `443` są otwarte w firewallu
   - DNS wskazuje na serwer:
     - `x-tire.pl` -> A -> `<IP_SERWERA>`
     - `www.x-tire.pl` -> A -> `<IP_SERWERA>`
4. Uruchom produkcyjny stack:
   - `docker compose -f docker-compose.prod.yml up -d --build`
5. Zweryfikuj stan kontenerów:
   - `docker compose -f docker-compose.prod.yml ps`
6. Sprawdź logi reverse proxy i aplikacji:
   - `docker compose -f docker-compose.prod.yml logs -f caddy web`
7. Zweryfikuj działanie HTTPS:
   - `https://x-tire.pl`
   - `https://www.x-tire.pl` (powinno przekierować na domenę główną)
8. Po wdrożeniu sprawdź kluczowe strony:
   - strona główna, aktualności, regulamin, polityka prywatności, kontakt
9. Jeśli trzeba zatrzymać stack:
   - `docker compose -f docker-compose.prod.yml down`
