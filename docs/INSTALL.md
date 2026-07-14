# Frontend

## 1. Node (tramite nvm)
**Installa**
```Bash
nvm install 22
```
**Imposta default**
```Bash
nvm alias default 22
```
**Verifica**
```Bash
nvm current
node -v
npm -v
```

---

## 2. Angular CLI
**Installa (globale)**
```Bash
npm install -g @angular/cli@22
```
**Verifica**
```Bash
ng version
```
**Crea progetto (ultima versione)**
```Bash
ng new frontend 
```

Durante il wizard:
```PlainText
1. Which stylesheet format would you like to use? → SCSS
2. Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? → n
3. Do you want to create a 'zoneless' application without zone.js? → Y
Which AI tools do you want to configure with Angular best practices? https://angular.dev/ai/develop-with-ai → None
```

**Verifica**  
```Bash
ng serve
```

Durante il wizard:
```PlainText
1. Would you like to share pseudonymous usage data about this project with the Angular Team at Google under Google's Privacy Policy at https://policies.google.com/privacy. For more details and how to change this setting, see https://angular.dev/cli/analytics. → N
```

**Apri URL**
```Bash
http://localhost:4200
```

---

## 3. Taiga UI**
**Installa**
```Bash
cd frontend
ng add taiga-ui
```

Durante il wizard:
```PlainText
1. The package taiga-ui@^5.14.0 will be installed and executed.
Would you like to proceed? → n
2. ? Choose additional packages to install
❯◯ addon-doc         Taiga UI based library for developing documentation portals for Angular libraries
 ◯ addon-charts      Components for various charts, graphs and visualizations
 ◯ addon-commerce    Money-related extension with currencies, credit card inputs and validators
 ◯ addon-mobile      Components and tools specific to mobile version of the app
 ◯ addon-table       Interactive table component and related utilities
 ◯ layout            Layout components
 
 Choose → layout
```

---

## 4. Less
Taiga UI utilizza i file Less per i suoi stili globali (come i temi e i font che vedi nell'errore), ma l'orchestrazione di Angular (tramite esbuild/Vite) ha bisogno del preprocessore ufficiale per poterli compilare in CSS standard.

**Installa (dipendenza di sviluppo)**
```Bash
npm install less --save-dev
```

---

## 5. SSH

**ssh-add**
```Bash
ssh-add -K ~/.ssh/id_ed25519_git
```

---

## 6. Docker
**Spegni il container corrente**
```Bash
docker compose down
```

**Costruisci immagine (senza cache)**
```Bash
docker compose build --no-cache frontend
```

**Avvia servizio**
```Bash
docker compose down frontend

docker compose build --no-cache frontend

docker compose up frontend
```

---

## 7. npm

**Crea componente**
```Bash
npm ng g c shared/card --skip-tests --type=component
```

**Lista (dipendenza)**
```Bash
npm list @angular/animations
```

**Installa (dipendenza)**
```Bash
npm install @angular/animations
```

**Installa (dipendenza specifica)**
```Bash
npm install @angular/animations@20.3.25
```

**Versione (dipendenza)**
```Bash
npm npm view primeicons version
```


## 8. Environments
**Esegui**
```Bash
ng generate environments
```

---

**Struttura progetto**

```PlainText
src/app/
├── core/
│   ├── auth                <-- autenticatione JWToken + interceptor, chiamate EP /auth/login /auth/refresh /auth/logout
│   └── altro?              <-- altro che può servire
├── features/               <-- Qui c'è il cuore dell'ERP (Logica + UI dedicata)
│   ├── customers/          <-- Feature Clienti (con data/, ui/, orchestratore)
│   └── invoices/           <-- Feature Fatture (con data/, ui/, orchestratore)
│
└── shared/                 <-- La tua cassetta degli attrezzi (Solo cose riutilizzabili)
    ├── ui/
    │   ├── card.ts         <-- La famosa card senza ".component"
    │   ├── button.ts
    │   └── modal.ts
    └── pipes/
        └── currency-format.pipe.ts
```

---

## Manutenzione
**Se hai già tentato installazioni**

Pulisci prima il progetto:
```Bash
npm cache clean --force 

rm -rf node_modules package-lock.json   

npm install
```













