# Join – Kanban Project Management Tool

Join is a Kanban-style task management web application that lets teams organize,
assign and track their work across customizable board columns. It is built as a
Multi-Page Application (MPA) using vanilla HTML, CSS and JavaScript, with a
Firebase Realtime Database as the shared backend.

> Portfolio version of the Join project.

---

## 📋 Projektbeschreibung

Join hilft Teams dabei, Aufgaben (Tasks) übersichtlich zu verwalten. Tasks
werden als Karten auf einem Kanban-Board dargestellt und können per Drag & Drop
zwischen den Spalten **To Do**, **In Progress**, **Await Feedback** und **Done**
verschoben werden. Kontakte lassen sich anlegen, bearbeiten und Tasks zuweisen.
Alle Nutzer (inkl. Gast-Login) arbeiten auf demselben geteilten Datenbestand.

---

## ✨ Features

- **Login & Gast-Login** – Zugang mit Benutzerkonto oder als Gast ohne Registrierung
- **Sign-Up** – Registrierung neuer Benutzer
- **Summary / Dashboard** – Überblick über offene Tasks, Deadlines und Status
- **Kanban-Board** – Tasks in vier Spalten, Drag & Drop zwischen den Spalten
- **Add Task** – Tasks mit Titel, Beschreibung, Datum, Priorität, Kategorie,
  zugewiesenen Kontakten und Subtasks anlegen
- **Edit/Detail-Overlay** – Tasks ansehen, bearbeiten und löschen
- **Subtasks** – Teilaufgaben mit Fortschrittsanzeige
- **Kontaktverwaltung** – Kontakte anlegen, bearbeiten, löschen (mit Farb-Badges)
- **Responsive Design** – Desktop- und Mobile-Ansicht
- **Live-Suche** – Filtern von Tasks auf dem Board

---

## 🛠️ Tech-Stack

| Bereich        | Technologie                          |
| -------------- | ------------------------------------ |
| Struktur       | HTML5 (Multi-Page-Application)       |
| Styling        | CSS3 (modulare Stylesheet-Struktur)  |
| Logik          | JavaScript (Vanilla, ES6+)           |
| Backend / DB   | Firebase Realtime Database (REST)    |
| Fonts          | Figtree, Inter                       |

---

## 🚀 Live-Demo

> 🔗 Live-Demo-Link: _noch offen / coming soon_

---

## 🖼️ Screenshots

> Platzhalter – Screenshots werden noch ergänzt.

| Login | Summary | Board |
| ----- | ------- | ----- |
| _![Login](docs/screenshots/login.png)_ | _![Summary](docs/screenshots/summary.png)_ | _![Board](docs/screenshots/board.png)_ |

| Add Task | Contacts |
| -------- | -------- |
| _![Add Task](docs/screenshots/add-task.png)_ | _![Contacts](docs/screenshots/contacts.png)_ |

---

## 📂 Projektstruktur

```
Join/
├── index.html          # Login-Seite (Einstieg)
├── script.js           # Globale, seitenübergreifende Logik
├── style.css           # Globale Styles
├── html/               # Einzelne Seiten (board, add_task, contacts, ...)
├── scripts/            # JS pro Seite + Templates + Includes
├── styles/             # Modulare CSS-Dateien pro Seite/Komponente
├── assets/             # Bilder & Icons
└── fonts/              # Schriftarten (Figtree, Inter)
```

---

## ⚙️ Lokale Ausführung

Da die App über `fetch` mit Firebase kommuniziert, sollte sie über einen
lokalen Webserver ausgeliefert werden (nicht per `file://`):

```bash
# Beispiel mit Python
python3 -m http.server 5500
# danach im Browser öffnen:
# http://localhost:5500/index.html
```

---

Willkommen bei unserem Join-Projekt!
