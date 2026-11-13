/**
 * Treści PLAN B oparte na oficjalnym źródle: „Poradnik bezpieczeństwa” (gov.pl).
 * Każde zalecenie poniżej pochodzi z poradnika; `page` = numer strony w pliku PDF.
 * Nie dopisuj zaleceń bez źródła. Rozszerzenia oznaczaj osobnym źródłem.
 */

export const SOURCE = {
  label: "Poradnik bezpieczeństwa (gov.pl)",
  url: "https://poradnikbezpieczenstwa.gov.pl/",
};

export type GearId = "zasilanie" | "oswietlenie" | "lacznosc" | "woda" | "plecaki";
export type Illustration = "power" | "flashlight" | "radio" | "water" | "backpack" | "siren";

/* ---------- Checklista 72 h (Poradnik, PDF s. 21–22 „Zapasy domowe na minimum 3 dni”) ---------- */

export type ChecklistGroup = { id: string; title: string; gear?: GearId; scenario?: string; items: { id: string; label: string }[] };

export const CHECKLIST: ChecklistGroup[] = [
  {
    id: "woda", title: "Woda", gear: "woda", scenario: "brak-wody",
    items: [
      { id: "woda-3l", label: "Woda pitna: minimum 3 litry na osobę na dobę" },
      { id: "woda-filtr", label: "Filtry lub tabletki do uzdatniania wody" },
    ],
  },
  {
    id: "zywnosc", title: "Żywność",
    items: [
      { id: "zyw-gotowa", label: "Żywność gotowa do spożycia (np. konserwy, suchary, batony)" },
      { id: "zyw-przeglad", label: "Zapasy przejrzane, terminy przydatności sprawdzone" },
    ],
  },
  {
    id: "swiatlo", title: "Oświetlenie", gear: "oswietlenie", scenario: "blackout",
    items: [
      { id: "sw-latarka", label: "Latarka z zapasem baterii" },
      { id: "sw-swiece", label: "Świeczki do użytku domowego i zapalniczka" },
    ],
  },
  {
    id: "zasilanie", title: "Zasilanie i ciepło", gear: "zasilanie", scenario: "blackout",
    items: [
      { id: "zas-powerbank", label: "Naładowany powerbank" },
      { id: "zas-kable", label: "Ładowarka, pasujące kable i baterie" },
      { id: "zas-cieplo", label: "Koce, śpiwory i ciepła odzież" },
      { id: "zas-ogrzewanie", label: "Alternatywne źródło ogrzewania, które nie działa na prąd" },
    ],
  },
  {
    id: "lacznosc", title: "Łączność", gear: "lacznosc", scenario: "brak-lacznosci",
    items: [
      { id: "lacz-radio", label: "Radio na baterie lub na korbkę" },
      { id: "lacz-telefon", label: "Naładowany telefon" },
      { id: "lacz-alt", label: "Alternatywna łączność (np. krótkofalówki, CB radio)" },
    ],
  },
  {
    id: "apteczka", title: "Leki i pierwsza pomoc",
    items: [
      { id: "apt-leki", label: "Leki przyjmowane na stałe" },
      { id: "apt-zestaw", label: "Apteczka: leki przeciwbólowe, bandaże, opatrunki, rękawiczki, środki antyseptyczne" },
      { id: "apt-opaska", label: "Opaska do tamowania krwotoków" },
      { id: "apt-folia", label: "Folia termiczna" },
    ],
  },
  {
    id: "dokumenty", title: "Dokumenty i gotówka", scenario: "ewakuacja",
    items: [
      { id: "dok-kopie", label: "Dokumenty i ich kopie (np. na pendrivie)" },
      { id: "dok-gotowka", label: "Gotówka w różnych nominałach" },
      { id: "dok-medyczne", label: "Dokumentacja medyczna domowników w jednym miejscu" },
    ],
  },
  {
    id: "higiena", title: "Higiena", scenario: "brak-wody",
    items: [
      { id: "hig-podst", label: "Papier toaletowy, chusteczki nawilżane, środki higieny osobistej" },
      { id: "hig-dezynf", label: "Środki dezynfekujące" },
      { id: "hig-worki", label: "Worki na śmieci i wiadro z pokrywą" },
    ],
  },
];

export const CHECKLIST_TOTAL = CHECKLIST.reduce((n, g) => n + g.items.length, 0);

/* ---------- Scenariusze ---------- */

export type Scenario = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  short: string;
  illustration: Illustration;
  steps: { text: string; page: string }[];
  checklist: string[]; // id grup z CHECKLIST
  gear: GearId[];
  videoMatch?: string[]; // fragmenty tytułów prawdziwych filmów z content/videos.json (bez rozróżniania wielkości liter)
};

export const SCENARIOS: Scenario[] = [
  {
    slug: "blackout",
    index: "01",
    title: "Blackout",
    kicker: "72 godziny bez prądu",
    short: "Wielodniowa przerwa w dostawie prądu odcina też wodę, ogrzewanie, internet, telefon i płatności kartą.",
    illustration: "power",
    steps: [
      { text: "Brak prądu może potrwać nawet kilka dni. Możesz wtedy stracić dostęp do wody, ogrzewania, internetu, telefonu i płatności kartą.", page: "s. 33" },
      { text: "Przygotuj alternatywne źródła światła (latarki z zapasem baterii), ogrzewania i łączności (radio na baterie, krótkofalówki, CB radio).", page: "s. 33" },
      { text: "Naładuj powerbanki. Włącz w telefonie tryb oszczędzania energii.", page: "s. 33" },
      { text: "Przygotuj żywność gotową do spożycia i wodę: minimum 3 litry dziennie na osobę.", page: "s. 33" },
      { text: "Miej przy sobie zapas gotówki w różnych nominałach.", page: "s. 33" },
    ],
    checklist: ["swiatlo", "zasilanie", "lacznosc", "woda"],
    gear: ["zasilanie", "oswietlenie", "lacznosc"],
    videoMatch: ["72h bez prądu"],
  },
  {
    slug: "brak-lacznosci",
    index: "02",
    title: "Brak internetu i łączności",
    kicker: "Gdy telefon milknie",
    short: "Awaria lub atak może odciąć internet i sieć komórkową. Liczy się wtedy, skąd weźmiesz informacje.",
    illustration: "radio",
    steps: [
      { text: "Przygotuj się na brak dostępu do telefonu i internetu.", page: "s. 17" },
      { text: "Miej radio na baterie lub na korbkę, naładowany telefon, powerbank i pasujące kable.", page: "s. 22" },
      { text: "Przygotuj dodatkowe środki łączności, np. krótkofalówki lub CB radio.", page: "s. 16, 33" },
      { text: "Korzystaj z wiarygodnych źródeł, przede wszystkim rządowych: Alerty RCB, Regionalny System Ostrzegania (RSO), radio i telewizja.", page: "s. 24, 52" },
    ],
    checklist: ["lacznosc", "zasilanie"],
    gear: ["lacznosc", "zasilanie"],
    videoMatch: ["WYŁĄCZYĆ INTERNET", "e-urzędy na 72h"],
  },
  {
    slug: "brak-wody",
    index: "03",
    title: "Brak bieżącej wody",
    kicker: "Woda, higiena, toaleta",
    short: "Przerwa w dostawie wody to nie tylko picie. To także higiena i sanitariaty.",
    illustration: "water",
    steps: [
      { text: "Zgromadź wodę pitną: minimum 3 litry na osobę na dobę, na co najmniej 3 dni.", page: "s. 21" },
      { text: "Miej filtry lub tabletki do uzdatniania wody.", page: "s. 26" },
      { text: "Bez bieżącej wody używaj chusteczek nawilżanych i płynów do dezynfekcji.", page: "s. 45" },
      { text: "Prowizoryczną toaletę zrobisz, nakładając plastikową torbę na wiadro. Służby komunalne poinformują, jak pozbywać się nieczystości.", page: "s. 45" },
    ],
    checklist: ["woda", "higiena"],
    gear: ["woda"],
  },
  {
    slug: "ewakuacja",
    index: "04",
    title: "Ewakuacja i plecak awaryjny",
    kicker: "Gotowy do wyjścia",
    short: "Gdy trzeba opuścić dom, nie ma czasu na pakowanie. Plecak ewakuacyjny powinien mieć każdy domownik.",
    illustration: "backpack",
    steps: [
      { text: "Gdy służby zdecydują o ewakuacji, bezwzględnie zastosuj się do poleceń.", page: "s. 25" },
      { text: "Zamknij okna i dopływ wody, wyłącz urządzenia elektryczne i gazowe, wygaś źródła ognia.", page: "s. 25" },
      { text: "Zabierz plecak ewakuacyjny. Powiadom bliskich, że się ewakuujesz, w jaki sposób i dokąd.", page: "s. 25" },
      { text: "W plecaku: woda, apteczka i leki, dokumenty z kopiami, gotówka, latarka, radio, powerbank, żywność gotowa do spożycia, ubranie dopasowane do pory roku.", page: "s. 26–27" },
      { text: "Nie oddawaj dokumentów osobom, które oferują pomoc lub transport.", page: "s. 25" },
    ],
    checklist: ["dokumenty", "apteczka", "woda"],
    gear: ["plecaki", "oswietlenie", "lacznosc"],
  },
  {
    slug: "alarmy",
    index: "05",
    title: "Alarmy i sytuacje kryzysowe",
    kicker: "Rozpoznaj sygnał",
    short: "W Polsce są tylko dwa sygnały alarmowe. Warto je znać, zanim usłyszysz syrenę.",
    illustration: "siren",
    steps: [
      { text: "Ogłoszenie alarmu: ciągły, modulowany dźwięk syreny przez 3 minuty.", page: "s. 24" },
      { text: "Odwołanie alarmu: ciągły, jednostajny dźwięk syreny przez 3 minuty.", page: "s. 24" },
      { text: "Jeśli usłyszysz sygnał alarmowy, włącz radio lub telewizor i stosuj się do komunikatów.", page: "s. 24" },
      { text: "Sprawdź, gdzie jest najbliższe miejsce schronienia.", page: "s. 52" },
    ],
    checklist: ["lacznosc", "dokumenty"],
    gear: ["lacznosc", "plecaki"],
    videoMatch: ["SYRENĘ ALARMOWĄ"],
  },
];

/* ---------- Kategorie sprzętu ---------- */

export const GEAR: { id: GearId; name: string; illustration: Illustration; what: string; who: string; when: string; limits: string }[] = [
  {
    id: "zasilanie", name: "Zasilanie awaryjne", illustration: "power",
    what: "Powerbanki i przenośne stacje zasilania do ładowania telefonu, lampy czy radia.",
    who: "Każdy, kto chce utrzymać łączność i światło podczas przerwy w dostawie prądu.",
    when: "Blackout, ewakuacja, wyjazd poza zasięg sieci.",
    limits: "Pojemność jest ograniczona. Porównuj pojemność (Wh) z zapotrzebowaniem urządzeń, które chcesz zasilić.",
  },
  {
    id: "oswietlenie", name: "Oświetlenie", illustration: "flashlight",
    what: "Latarki, latarki czołowe i lampy niezależne od sieci.",
    who: "Każde gospodarstwo domowe.",
    when: "Wieczór bez prądu, ewakuacja, awaria w budynku.",
    limits: "Działają tak długo jak baterie. Rządowy poradnik zaleca zapas baterii.",
  },
  {
    id: "lacznosc", name: "Łączność", illustration: "radio",
    what: "Radio na baterie lub korbkę, krótkofalówki, CB radio.",
    who: "Każdy, kto chce odbierać komunikaty, gdy nie działa internet.",
    when: "Brak internetu i sieci komórkowej, ogłoszenie alarmu.",
    limits: "Krótkofalówki mają ograniczony zasięg. Radio pozwala odbierać, nie nadawać.",
  },
  {
    id: "woda", name: "Woda i filtracja", illustration: "water",
    what: "Pojemniki na wodę, filtry i tabletki do uzdatniania.",
    who: "Każde gospodarstwo domowe, szczególnie z dziećmi i seniorami.",
    when: "Przerwa w dostawie wody, ewakuacja.",
    limits: "Filtry różnią się skutecznością. Sprawdzaj w specyfikacji producenta, co dokładnie usuwają.",
  },
  {
    id: "plecaki", name: "Plecaki i ewakuacja", illustration: "backpack",
    what: "Plecak ewakuacyjny i jego wyposażenie: folia termiczna, multitool, mapy drukowane.",
    who: "Każdy domownik, także dzieci.",
    when: "Nagła konieczność opuszczenia domu.",
    limits: "Plecak musi być lekki na tyle, by go nieść. Dopasuj zawartość do siebie, a nie do listy.",
  },
];

/* ---------- Własne poradniki cyfrowe (planowane, niedostępne w sprzedaży) ---------- */

export const DIGITAL_GUIDES = [
  { id: "72h", kind: "power" as Illustration, no: "01", title: "72 godziny bez prądu", plan: ["Plan na pierwsze godziny", "Światło, ciepło i łączność", "Lista zakupów i przeglądów"] },
  { id: "plecak", kind: "backpack" as Illustration, no: "02", title: "Plecak ewakuacyjny", plan: ["Lista dla każdego domownika", "Jak spakować i gdzie trzymać", "Kalendarz przeglądów"] },
  { id: "7dni", kind: "water" as Illustration, no: "03", title: "Domowa gotowość na 7 dni", plan: ["Zapasy krok po kroku", "Rodzinny plan kryzysowy", "Wydrukowane checklisty"] },
];
