# GeoGame - README

## Opis aplikacji
GeoGame to interaktywna gra, w której gracz musi odgadnąć losowo wybrane państwo na podstawie określonych wskaźników statystycznych. Każdego dnia wybierane jest inne państwo, a gracz otrzymuje kluczowe dane o tym kraju. Celem gry jest wykorzystanie podanych wskazówek, aby zgadnąć, które państwo zostało wybrane. 
- **Największe miasto 🏙️** - Procent osób zamieszkujący największy ośrodek miejski
- **Import 🚢** - Procent importu w stosunku do PKB
- **PKB per capita 💰** - PKB na mieszkańca
- **Elektryczność ⚡** - Procent dostępu do energii elektrycznej
- **Zalesienie 🌲** - Procent powierzchni lasów na terenie kraju
- **Surowce ⛏️** - Procent eksportu surowców w stosunku do PKB
- **Ludność miejska 🏢** - Liczba mieszkańców zamieszkujących miasta

Aplikacja została stworzona przy użyciu biblioteki React bazującej na TypeScript. Dane o konkretnych krajach pobierane są z World Bank API. Informacje dotyczące poszczególnych państw pochodzą z 2021 roku. Więcej szczegółów można znaleźć na oficjalnej stronie [World Bank](https://documents.worldbank.org/).


![image](https://github.com/user-attachments/assets/1a8191e2-c2da-4dd4-8eed-c54638b8119e)
![image](https://github.com/user-attachments/assets/9aa47290-05eb-43b5-8443-dcc7c60a94ef)

## Instalacja
Upewnij się, że masz zainstalowane na swoim komputerze:

- **Node.js** (wersja 16.x lub wyższa)

- **npm** (Node Package Manager)

```bash
git clone https://github.com/PiotrMarcinczuk/GeoGame.git

cd GeoGame

npm install --save-dev vite

npm run dev
```
