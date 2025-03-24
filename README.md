# Getting Started with CRUD React App

This project was releated to React CRUD Operations

## How to start the project

step 1: Clone the Repository from Github ------> git clone https://github.com/Manihellodjango/crud-react-app.git

step 2: Install node modules ---------> npm install 

step 3: Run the Backend JSON SERVER ----------> npx json-server --watch db.json 

step 4: Run the Frontend application -------> npm start 


# Task Management Anwendung

Eine einfache und intuitive Anwendung zur Aufgabenverwaltung, die mit React erstellt wurde. Mit dieser Anwendung können Benutzer Aufgaben anzeigen, hinzufügen, bearbeiten, als abgeschlossen markieren und löschen. Sie verwendet React Router für die Navigation, Context API für die Statusverwaltung und JSON Server für die Simulation einer Backend-API. 

## Funktionen

### 1. **Aufgabenverwaltung**
- **Liste aller Aufgaben anzeigen**: Sehen Sie alle Aufgaben in einer übersichtlichen und organisierten Tabelle.
- **Neue Aufgaben hinzufügen**: Fügen Sie auf einfache Weise neue Aufgaben mit Titel, Beschreibung, Start- und Enddatum sowie Prioritätsstufe der Aufgabe hinzu.
- **Aufgaben als erledigt markieren**: Schalten Sie den Erledigungsstatus von Aufgaben um.
- **Aufgaben bearbeiten**: Aktualisieren Sie den Titel, die Beschreibung und andere Details von bestehenden Aufgaben.
- **Aufgaben löschen**: Entfernen Sie Aufgaben, die nicht mehr benötigt werden.


### 2. **Technische Anforderungen**
- **React with Hooks**:  Aufbauend auf funktionalen Komponenten und React Hooks (`useState`, `useEffect`).
- **React Router**: Supports multiple pages:
  - `/tasks`: Übersicht über alle Aufgaben.
  - `/tasks/:id`: Detaillierte Ansicht einer bestimmten Aufgabe..
- **JSON Server**:  Simuliert eine Backend-API für CRUD-Operationen.
- **Context API**: Verwaltet den globalen Status für Aufgaben.
- **Error Handling**: Behandelt fehlerhafte API-Anfragen und zeigt benutzerfreundliche Fehlermeldungen an.

### 3. **Zusätzliche Bewertungskriterien**
- **Unit Tests**: Enthält mit Jest geschriebene Unit-Tests..
- **Optimized Performance**: Verwendet Lazy Loading und Memoization für bessere Leistung.
- **Mobile Responsiveness**: Entwickelt, um sowohl auf dem Desktop als auch auf mobilen Geräten nahtlos zu funktionieren (jede Aufgabe wird als Karte angezeigt).
- **Benutzerfreundliche UI/UX**: Bietet Feedback durch Toast-Nachrichten und sanfte Animationen.

---