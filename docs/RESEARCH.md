# Sygnał Jutra PLAN B: research i pochodzenie zasobów (faza 1)

Stan na 2026-11-13. Gałąź `premium-rebuild`.

## Kierunek wizualny

Referencja: fotografia produktowa „blue hour” (granatowe niebo, ciemny teren, ciepłe światło na produkcie).
Zasady po korekcie art directora:
- Najmocniejsza kompozycja sprzętu tylko w hero strony głównej.
- /sklep, /instrukcje, /pdfy: granatowe gradienty, subtelne światło, faktura (grain) zamiast pejzaży na całą szerokość.
- Obrazy kategorii to wizualizacje, nigdy zdjęcia konkretnych produktów z porównania.

## Strony referencyjne (techniki do adaptacji, bez kopiowania)

| Strona | Technika |
|---|---|
| ankersolix.com | Hero zaczyna od scenariusza awarii („Grid Down”), kalkulator czasu pracy urządzeń |
| ecoflow.com/us/delta-pro-ultra | Narracja „przed / w trakcie / po burzy”, duże liczby (kWh, kW), zakładki specyfikacji |
| polestar.com/us/polestar-4 | Rząd dużych liczb z małymi etykietami, para ujęć dzień/noc |
| teenage.engineering/products/op-1 | Kontrast typograficzny, zwięzłe pary etykieta/wartość w specyfikacji |
| arcteryx.com | Krótkie etykiety w wersalikach nad dużymi nagłówkami, nocna fotografia z czołówkami |
| goalzero.com | Hasło w trzech taktach, kafelki zastosowań (kontrprzykład: produkty na białym tle) |

## Licencje źródeł obrazów (sprawdzone na stronach licencji)

| Źródło | Użycie komercyjne | Atrybucja | Uwagi |
|---|---|---|---|
| Unsplash (unsplash.com/license) | tak | niewymagana | nie sprzedawać bez istotnej modyfikacji; Unsplash+ to osobna licencja |
| Pexels (pexels.com/license) | tak | niewymagana | nie sugerować poparcia osób/marek ze zdjęć |
| Poly Haven (polyhaven.com/license) | tak, CC0 | niewymagana | |
| ambientCG (docs.ambientcg.com/license) | tak, CC0 | niewymagana | |

W fazie 1 nie użyto zdjęć z tych serwisów.

## Obrazy w `public/visual/`

Wszystkie wygenerowane 2026-11-13 w Meshy (model nano-banana-pro) na koncie właściciela projektu, z promptów
wykluczających tekst, logotypy i nazwy marek. Przedstawiają nieoznakowany, ogólny sprzęt, nigdy konkretne modele ze sklepu.
Kierunek: mockupy A–D dostarczone przez właściciela (strona główna, Instrukcje, Sklep, PDF-y).

| Plik | Gdzie użyty |
|---|---|
| hero-sprzet-desktop.jpg, hero-sprzet-mobile.jpg | Hero strony głównej (kadr poziomy / pionowy przez `<picture>`) |
| instrukcje-przekroj.jpg | /instrukcje i zapowiedź na stronie głównej (przekrój polskiego bloku i domu) |
| produkty/{kategoria}-{poziom}.jpg (18 plików) | Karty poziomów w /sklep; wariant „polecany” także w kaflach kategorii. Opisane na stronie jako wizualizacje typów sprzętu |
| pdf-*.jpg | Okładki w /pdfy i na stronie głównej |

## Produkty

18 produktów (6 kategorii × 3 poziomy) w `content/shop-products.json`. Każdy wpis ma URL producenta, URL sprzedawcy,
cenę orientacyjną i `lastVerified`. Zasady:
- Brak umów partnerskich: `affiliate: false`, zwykłe linki do sklepów.
- `image: null`: żaden producent nie ma publicznej biblioteki zdjęć prasowych; zdjęcia produktów dopiero po uzyskaniu zgody.
- Wątpliwości zapisane w polu `notes` (np. cena z Allegro dla kanistra Hünersdorff, promocja Anker z kodem do 30.11.2026, rozbieżne dane HELP BAG).

Sklepy blokujące automatyczne pobieranie (403): Media Expert, euro.com.pl, x-kom (częściowo), oleole, teleskopy.pl. Ceny z nich nie są używane, chyba że strona została odczytana w przeglądarce.
