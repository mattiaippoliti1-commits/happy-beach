# 🏐 Happy Beach

Happy Beach è una semplice applicazione React per la gestione di un torneo di beach volley.

L'app permette di inserire i risultati delle partite e genera automaticamente la classifica aggiornata in tempo reale.

## Funzionalità

- 📋 Calendario delle partite predefinito
- 🏆 Classifica aggiornata automaticamente
- 📊 Calcolo dei punti e dei set vinti/persi
- 💾 Salvataggio automatico tramite Local Storage
- 🔄 Reset completo del torneo
- 📱 Interfaccia moderna e responsive

---

## Struttura del progetto

```
src/
│
├── App.js          # Interfaccia principale
├── teams.js        # Elenco delle squadre
├── matches.js      # Calendario iniziale delle partite
├── index.js
└── ...
```

---

## Regole della classifica

Per ogni partita conclusa:

- Vittoria → **3 punti**
- Sconfitta → **0 punti**

A parità di punti viene utilizzata la differenza:

```
Set vinti - Set persi
```

---

## Salvataggio dei dati

Lo stato del torneo viene salvato automaticamente nel browser tramite **Local Storage**.

Alla riapertura dell'app il torneo viene ripristinato automaticamente.

Il pulsante **Reset** elimina tutti i risultati e ripristina il calendario iniziale.

---

## Installazione

Clonare il repository:

```bash
git clone <repository>
```

Entrare nella cartella del progetto:

```bash
cd volley-app
```

Installare le dipendenze:

```bash
npm install
```

Avviare il server di sviluppo:

```bash
npm start
```

L'app sarà disponibile all'indirizzo:

```
http://localhost:3000
```

---

## Tecnologie utilizzate

- React
- JavaScript (ES6)
- CSS inline
- Local Storage API

---

## Possibili sviluppi futuri

- Modal grafico per l'inserimento dei risultati
- Raggruppamento delle partite per giornata
- Ricerca delle squadre
- Esportazione della classifica in PDF
- Gestione di più tornei
- Statistiche avanzate
- Tema chiaro/scuro

---

## Autore

Realizzato da **Mattia Ippoliti**.