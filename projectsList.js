const navigationViews = [
  { title: "Informacje ogólne" },
  { title: "Kluczowe cechy" },
];

export const projectsList = [
  {
    githubRepoName: "portfolio",
    title: "Personal portfolio website",
    description: [
      "Jako programista, stworzyłem tę stronę jako centralne miejsce do prezentacji moich umiejętności, projektów i doświadczenia. Jest to dynamiczna witryna, która pozwala mi na bieżąco aktualizować moją twórczość.",
      "Strona jest zaprojektowana tak, aby wyróżnić kluczowe aspekty moich projektów, zapewnić łatwą nawigację i czytelność. Wykorzystuję najnowsze technologie front-endowe, aby zapewnić płynne i interaktywne doświadczenie użytkownika.",
      "Celem tego projektu jest stworzenie profesjonalnej i estetycznej wizytówki online, która pozwoli potencjalnym pracodawcom lub klientom szybko zapoznać się z moim dorobkiem i stylem pracy.",
    ],
    mainAspects: [
      {
        title: "Prezentacja Projektów",
        description:
          "Szczegółowe opisy moich projektów, z linkami do repozytoriów GitHub oraz live demo, pozwalające na dogłębne zapoznanie się z moim dorobkiem.",
      },
      {
        title: "Sekcja Umiejętności",
        description:
          "Przejrzysta lista technologii i narzędzi, którymi się posługuję, podzielona na kategorie, co ułatwia szybkie zorientowanie się w moich kompetencjach.",
      },
      {
        title: "Responsywny Design",
        description:
          "Strona jest w pełni responsywna, gwarantując optymalne wyświetlanie i użyteczność na wszystkich urządzeniach – od komputerów stacjonarnych po smartfony.",
      },
      {
        title: "Intuicyjna Nawigacja",
        description:
          "Logiczny układ menu i sekcji umożliwia użytkownikom łatwe odnalezienie poszukiwanych informacji.",
      },
      {
        title: "Formularz Kontaktowy",
        description:
          "Prosty i efektywny formularz kontaktowy, umożliwiający szybkie nawiązanie kontaktu ze mną w sprawie współpracy lub pytań.",
      },
      {
        title: "O Mnie",
        description:
          "Sekcja przedstawiająca moje doświadczenie, zainteresowania i ścieżkę kariery, dając pełniejszy obraz mojej osoby.",
      },
    ],
    technologies: [
      {
        title: "Frontend",
        values: [
          "ReactJS",
          "NextJS",
          "Tailwind-CSS",
          "Framer Motion",
          "React Query",
          "Redux",
          "React Hook Form",
        ],
      },
      {
        title: "Deployment",
        values: ["Vercel"],
      },
    ],
    link: "https://your-portfolio-url.com", // Replace with your actual portfolio URL
    views: navigationViews,
  },
  {
    githubRepoName: "and-wiert",
    title: "Website for deep wells drilling company",
    description: [
      "W ramach tego projektu byłem odpowiedzialny za całościowy rozwój zarówno frontendu i backendu. Był to pierwszy mój projekt, w którym wykorzystałem narzędzia AI do generowania zawartości strony.",
      "Mój klient chciał prosty system zarządzania blogiem, gdzie nie musiałby ręcznie wyszukiwać i przepisywać zawartości na posta. Dlatego też zintegrowałem zewnętrzne API Google Gemini, które na bazie słów kluczowych, tytułu oraz istniejacej już zawartości w poście potrafi wygenerować dodatkowe sekcje, zawartość przyspieszając pracę. Gdy nie mamy interesującego zdjęcia na serwerze możemy wyszukiwać je za pomocą dołączonej wyszukiwarki zdjęć pobieranych z platformy Pexels.",
      "Te dodatkowe aspekty przyczyniają się w znaczącym stopniu do generowania interesujących nas treści w nieporównywalnym dotychczas czasie.",
      "Stanem aplikacji zarządza Redux, do tworzenia zapytań wykorzystałem React Query, a do integracji bazy z aplikacją wykorzystałem Prisma. Aplikacja została skonteneryzowana za pomocą Docker oraz jest hostowana na serwerze OVH.",
    ],
    mainAspects: [
      {
        title: "Czysty i Nowoczesny Interfejs",
        description:
          "Minimalistyczny design z intuicyjną nawigacją, która prowadzi użytkownika przez ofertę i informacje.",
      },
      {
        title: "Intuicyjna Nawigacja",
        description:
          "Użytkownicy mogą łatwo znaleźć potrzebne informacje dzięki logicznemu układowi menu i sekcji.",
      },
      {
        title: "Animacje i Interakcje",
        description:
          "Wykorzystanie biblioteki Framer Motion do płynnych animacji, takich jak dynamiczne paski postępu w sekcji technologii czy animowane przejścia karuzeli, znacząco poprawia wrażenia estetyczne i interaktywność strony.",
      },
      {
        title: "Prezentacja Usług",
        description:
          "Szczegółowy opis oferowanych usług, takich jak wiercenie studni, montaż rur, dobór pomp, czyszczenie i konserwacja, oraz wykonanie przyłączy wodnych. Każda usługa jest jasno przedstawiona, aby potencjalny klient mógł szybko zrozumieć zakres działalności firmy.",
      },
      {
        title: "Sekcja Kontaktowa",
        description:
          "Intuicyjny formularz kontaktowy oraz widoczne dane teleadresowe, ułatwiające szybkie nawiązanie kontaktu i zapytanie o ofertę.",
      },
      {
        title: "Dynamiczny Blog/Artykuły",
        description:
          "Sekcja z artykułami eksperckimi na temat studni głębinowych, wyboru lokalizacji, aspektów prawnych i środowiskowych. Ta część pełni funkcję edukacyjną i buduje autorytet firmy w branży.",
      },
      {
        title: "Responsywny Design",
        description:
          "Strona jest w pełni responsywna, co zapewnia optymalne wyświetlanie i użyteczność na różnych urządzeniach – od komputerów stacjonarnych po tablety i smartfony.",
      },
      {
        title: "Generator Postów AI",
        description:
          "Na podstawie podanych słów kluczowych lub krótkich zarysów, moduł AI jest w stanie wygenerować pełne artykuły blogowe, oszczędzając czas i zasoby potrzebne na tworzenie contentu.",
      },
      {
        title: "Wsparcie SEO",
        description:
          "AI może pomóc w tworzeniu treści zoptymalizowanych pod kątem wyszukiwarek, zwiększając widoczność strony w wynikach wyszukiwania.",
      },
      {
        title: "Personalizacja posta",
        description:
          "Generowane treści mogą być następnie edytowane i dopasowywane przez administratora, co pozwala zachować unikalny ton i styl komunikacji firmy.",
      },
    ],
    technologies: [
      {
        title: "Frontend",
        values: [
          "ReactJS",
          "NextJS",
          "Tailwind-CSS",
          "Framer Motion",
          "React Query",
          "SplideJS",
          "Redux",
          "React Photo View",
          "React Hook Form",
          "SWR",
          "Node Mailer",
          "Pexels API",
          "Gemini API",
        ],
      },
      {
        title: "Backend",
        values: ["MySQL", "Prisma", "NextAuth", "Sitemap", "Sharp", "FS"],
      },
      { title: "Deployment", values: ["Docker", "OVH"] },
    ],
    link: "https://and-wiert.pl",
    views: navigationViews,
  },
  {
    githubRepoName: "flashcards",
    title: "Language learning app",
    description: [
      "A full-stack web application designed to help users learn and memorize information through interactive flashcards. Users can create, manage, and study custom sets of flashcards, making it an ideal tool for students, language learners, or anyone looking to master new concepts.",
      "The application supports various learning modes, allowing users to flip cards, mark them as known or unknown, and track their progress. It leverages modern web technologies to provide a smooth and engaging user experience, with a focus on ease of use and efficient knowledge retention.",
      "Key features include user authentication, deck management, and a responsive design that works across different devices.",
    ],
    mainAspects: [
      {
        title: "Tworzenie i Zarządzanie Fiszami (Flashcards)",
        description:
          "Użytkownicy mogą łatwo tworzyć nowe fiszki, dodając pytania i odpowiedzi. Aplikacja pozwala na organizowanie fiszek w zestawy (decks) dla lepszej struktury i kategoryzacji materiału.",
      },
      {
        title: "Tryby Nauki i Powtórek",
        description:
          "Zaimplementowano różne tryby nauki, w tym możliwość odwracania fiszek, oznaczania ich jako 'znane' lub 'do powtórzenia', co wspiera efektywną naukę i utrwalanie wiedzy.",
      },
      {
        title: "Śledzenie Postępów",
        description:
          "Aplikacja monitoruje postępy użytkownika, pozwalając mu śledzić, ile fiszek zostało opanowanych, a ile wymaga dalszej nauki. Może to obejmować statystyki i wizualizacje postępu.",
      },
      {
        title: "Autoryzacja i Uwierzytelnianie Użytkowników",
        description:
          "System uwierzytelniania użytkowników zapewnia bezpieczny dostęp do spersonalizowanych zestawów fiszek, umożliwiając każdemu użytkownikowi zarządzanie własnymi danymi.",
      },
      {
        title: "Responsywny Interfejs",
        description:
          "Projekt strony jest w pełni responsywny, co zapewnia optymalne wyświetlanie i funkcjonalność na różnych urządzeniach, od komputerów stacjonarnych po smartfony.",
      },
      {
        title: "Intuicyjny Design",
        description:
          "Czysty i intuicyjny interfejs użytkownika, który ułatwia nawigację i sprawia, że nauka z fiszkami jest przyjemna i efektywna.",
      },
    ],
    technologies: [
      {
        title: "Frontend",
        values: [
          "ReactJS",
          "NextJS",
          "Tailwind-CSS",
          "React Query",
          "React Router DOM",
          "InertiaJS",
          "React Hook Form",
          "SplideJS",
          "GSAP",
        ],
      },
      {
        title: "Backend",
        values: ["Laravel"],
      },
      {
        title: "Deployment",
        values: ["Docker"],
      },
    ],
    views: navigationViews,
  },
  {
    githubRepoName: "pogodynka-frontend",
    title: "Weather Web Application",
    description: [
      "Projekt stworzony w ramach jednego z przedmiotów akademickich. Aplikacja pogodowa jest podzielona na dwie sekcje, frontend'ową oraz backendową. W zespole byłem odpowiedzialny właśnie za część frontend'ową więc ta część znalazła się w moim portfolio.",
      "Widok interfejsu został stworzony z myślą o zapewnieniu intuicyjnego i estetycznego doświadczenia w przeglądaniu prognozy pogody. Skupia się na prezentacji danych pogodowych pobieranych z zewnętrznego API w przystępny i wizualnie atrakcyjny sposób.",
      "Aplikacja frontendowa odpowiedzialna jest za interakcję z użytkownikiem, wysyłanie zapytań do API znajdującym się na backend'ie oraz dynamiczne renderowanie otrzymanych informacji. Zapewnia responsywność i płynne działanie na różnych urządzeniach.",
      "Celem było stworzenie szybkiego i niezawodnego interfejsu, który w klarowny sposób przedstawia kluczowe dane pogodowe, takie jak temperatura, warunki atmosferyczne, prędkość wiatru i wilgotność.",
    ],
    mainAspects: [
      {
        title: "Dynamiczne Wyświetlanie Danych Pogodowych",
        description:
          "Prezentacja aktualnych i prognozowanych danych pogodowych dla wybranej lokalizacji, w tym temperatury, ikon pogodowych, wilgotności, ciśnienia i prędkości wiatru.",
      },
      {
        title: "Wyszukiwanie i Zarządzanie Lokalizacjami",
        description:
          "Możliwość wyszukiwania miast i dodawania ich do listy obserwowanych lokalizacji, z łatwym przełączaniem się między nimi.",
      },
      {
        title: "Responsywny i Adaptacyjny Design",
        description:
          "Interfejs użytkownika dostosowujący się do różnych rozmiarów ekranów i urządzeń, zapewniając optymalne wrażenia zarówno na komputerach stacjonarnych, jak i urządzeniach mobilnych.",
      },
      {
        title: "Intuicyjna Nawigacja",
        description:
          "Prosty i klarowny układ, który umożliwia użytkownikom łatwe odnalezienie potrzebnych informacji pogodowych.",
      },
      {
        title: "Obsługa Błędów i Stanów Ładowania",
        description:
          "Wizualne wskaźniki ładowania danych oraz elegancka obsługa błędów, np. w przypadku braku połączenia z API lub nieprawidłowej nazwy miasta.",
      },
      {
        title: "Animacje i Efekty Wizualne",
        description:
          "Wykorzystanie animacji i przejść do poprawy estetyki i płynności interfejsu użytkownika, np. przy zmianie lokalizacji lub aktualizacji danych.",
      },
    ],
    technologies: [
      {
        title: "Frontend",
        values: [
          "ReactJS",
          "NextJS",
          "Tailwind-CSS",
          "Redux",
          "OpenWeatherMap API",
          "Framer Motion",
        ],
      },
      {
        title: "Deployment",
        values: ["Vercel"],
      },
    ],
    // link: "https://pogodynka-eight.vercel.app/",
    views: navigationViews,
  },
  {
    githubRepoName: "cpp-weather-app",
    title: "Desktop Weather Application",
    description: [
      "Ten projekt to desktopowa aplikacja pogodowa, napisana w C++, która dostarcza użytkownikom aktualne informacje o warunkach atmosferycznych. Aplikacja łączy się z zewnętrznym API pogodowym, aby dynamicznie pobierać dane dla wybranej lokalizacji.",
      "Jest to przykład implementacji klienta API w języku C++, demonstrujący umiejętności w zakresie komunikacji sieciowej, parsowania danych (np. JSON) oraz tworzenia interfejsu użytkownika w środowisku desktopowym. Projekt skupia się na efektywnym przetwarzaniu danych i prezentacji ich w czytelny sposób.",
      "Celem było stworzenie niezawodnego narzędzia, które szybko i precyzyjnie dostarcza prognozę pogody, jednocześnie podkreślając moje umiejętności programowania w C++.",
    ],
    mainAspects: [
      {
        title: "Pobieranie Danych Pogodowych z API",
        description:
          "Aplikacja integruje się z zewnętrznym API pogodowym OpenWeatherMap, aby pobierać aktualne dane pogodowe, w tym temperaturę, wilgotność, prędkość wiatru i warunki atmosferyczne.",
      },
      {
        title: "Parsowanie Danych JSON/XML",
        description:
          "Wykorzystanie bibliotek to zarządzania danymi JSON, aby wyodrębnić i wyświetlić istotne informacje pogodowe.",
      },
      {
        title: "Wyszukiwanie Lokalizacji",
        description:
          "Możliwość wyszukiwania pogody dla różnych miast lub lokalizacji, co zwiększa użyteczność aplikacji dla użytkownika. Po wpisaniu pewnej ilości znaków użytkownik otrzymuje listę proponowanych miast, które mogą przyspieszyć wyszukiwanie.",
      },
      {
        title: "Intuicyjny Interfejs Użytkownika",
        description:
          "Projekt interfejsu graficznego zapewniający czytelną i zrozumiałą prezentację danych pogodowych.",
      },
      {
        title: "Obsługa Błędów i Wyjątków",
        description:
          "Zarządzanie potencjalnymi błędami, takimi jak brak połączenia z internetem, nieprawidłowe dane z API czy błędy parsowania, dla zapewnienia stabilności aplikacji.",
      },
      {
        title: "Dynamiczne tworzone wykresy",
        description:
          "Dla jeszcze leszej prezentacji danych zaimplementowany został moduł tworzenia dynamicznych wykresów dla temperatury oraz ilości opadów. Wraz ze wzrostem temperatury możemy obserwować zmianę kolorów na cieplejsze.",
      },
      {
        title: "Wsparcie wielojęzykowe",
        description:
          "By aplikacja była obsługiwana przez szersze grono odbiorców dodane zostały tłumaczenia na bazie DeepL API",
      },
    ],
    technologies: [
      {
        title: "Core Language",
        values: ["C++"],
      },
      {
        title: "Networking/API Integration",
        values: [
          "cURL",
          "libcurl",
          "nlohmann/json",
          "DeepL API",
          "Google Geolocation API",
          "Google Place Autocomplete API",
          "OpenWeather API",
        ],
      },
      {
        title: "User Interface",
        values: ["SFML"],
      },
      {
        title: "Build System",
        values: ["CMake"],
      },
    ],
    views: navigationViews,
  },
  {
    githubRepoName: "vet-clinic",
    title: "Vet Clinic Management System",
    description: [
      "System zarządzania kliniką weterynaryjną, mający na celu usprawnienie codziennych operacji i zarządzania danymi pacjentów, wizyt oraz leków. Byłem odpowiedzialny za kluczowe aspekty backendu i logiki biznesowej, a także za część interfejsu użytkownika.",
      "Moje główne zadania obejmowały projektowanie i implementację schematu bazy danych, integrację z Entity Framework, konfigurację wstrzykiwania zależności, koncepcją nawigacji w aplikacji, rozwój widoków i logiki biznesowej dla lekarzy weterynarii oraz zarządzanie listą leków.",
    ],
    mainAspects: [
      {
        title: "Projektowanie i Integracja Schematu Bazy Danych (MySQL)",
        description:
          "Stworzyłem schemat bazy danych MySQL, obejmujący relacje między pacjentami, wizytami, lekarzami i lekami. Następnie zintegrowałem go z aplikacją za pomocą Entity Framework, zapewniając efektywną persystencję danych.",
      },
      {
        title: "Konfiguracja Wstrzykiwania Zależności (DI)",
        description:
          "Zaimplementowałem wstrzykiwanie zależności, co znacząco poprawiło modularność, testowalność i elastyczność kodu, ułatwiając dalszy rozwój i utrzymanie aplikacji.",
      },
      {
        title: "Rozwój Widoków i Logiki Biznesowej dla Lekarzy",
        description:
          "Byłem odpowiedzialny za tworzenie widoków interfejsu użytkownika oraz implementację logiki biznesowej dedykowanej dla lekarzy weterynarii, co usprawniło ich pracę z systemem.",
      },
      {
        title: "Zarządzanie Listą Leków",
        description:
          "Opracowałem funkcjonalność do zarządzania listą dostępnych leków, umożliwiającą dodawanie, edytowanie i przeglądanie pozycji.",
      },
      {
        title: "Koncepcja Nawigacji w Aplikacji",
        description:
          "Zaprojektowałem i zaimplementowałem koncepcję nawigacji w aplikacji, zapewniając spójny i intuicyjny przepływ użytkownika między różnymi sekcjami systemu.",
      },
      {
        title: "Autoryzacja i autentykacja",
        description:
          "Zaimplementowałem logikę uwierzytelniania użytkowników - aplikacje przewiduje trzy różne typy użytkowników (administrator, doktor, klient) z różnymi uprawnieniami.",
      },
    ],
    technologies: [
      {
        title: "Core Language",
        values: ["C#"],
      },
      {
        title: "Database",
        values: ["MySQL"],
      },
      {
        title: "Libraries",
        values: ["Dependency Injection", "Entity Framework"], // Or specific DI container used
      },
      {
        title: "Frameworks",
        values: [".NET", "WPF"],
      },
    ],
    views: navigationViews,
  },
  {
    githubRepoName: "wpf-advanced-calculator",
    title: "Advanced Desktop Calculator",
    description: [
      "Ten projekt to desktopowa aplikacja kalkulatora, zbudowana z wykorzystaniem technologii WPF (Windows Presentation Foundation). Oferuje rozszerzoną funkcjonalność w porównaniu do standardowych kalkulatorów, umożliwiając wykonywanie złożonych operacji matematycznych.",
      "Aplikacja demonstruje umiejętności w zakresie tworzenia interfejsów użytkownika dla platformy Windows, zarządzania logiką biznesową oraz obsługi wejścia użytkownika w środowisku desktopowym.",
    ],
    mainAspects: [
      {
        title: "Rozszerzona Funkcjonalność Obliczeniowa",
        description:
          "Kalkulator wspiera zaawansowane operacje matematyczne poza podstawowymi, takie jak funkcje trygonometryczne, logarytmy, potęgi, pierwiastki, czy operacje na pamięci.",
      },
      {
        title: "Intuicyjny Interfejs Użytkownika (GUI)",
        description:
          "Estetyczny i funkcjonalny interfejs graficzny stworzony w WPF, zapewniający łatwą nawigację i wprowadzanie danych.",
      },
      {
        title: "Obsługa Wyrażeń Matematycznych",
        description:
          "Zdolność do prawidłowej interpretacji i obliczania złożonych wyrażeń matematycznych z uwzględnieniem kolejności operacji.",
      },
    ],
    technologies: [
      {
        title: "Core Language",
        values: ["C#"],
      },
      {
        title: "Framework/UI",
        values: ["WPF (.NET)"],
      },
      {
        title: "Development Environment",
        values: ["Visual Studio"],
      },
    ],
    views: navigationViews,
  },
];
