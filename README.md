# Employee Records – Angular + NgRX

This project is a simple employee management demo built with **Angular** and **NgRX** for state management.
It simulates a basic CRUD (Create, Read, Update, Delete) system for managing employee records, using a local **JSON server** as a mock backend.

---

## 🚀 Features

* View a list of employees from a mock database
* Add, edit, and delete employee records
* State management handled via **NgRX**
* Fully client-side demo with a local JSON server as backend

---

## 🧩 Prerequisites

Before running the project, make sure you have the following installed:

* [Node.js](https://nodejs.org/) (version 16 or higher recommended)
* [Angular CLI](https://angular.io/cli)
* [json-server](https://www.npmjs.com/package/json-server)

You can install `json-server` globally using:

```bash
npm install -g json-server
```

---

## ⚙️ Installation and Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/DavideNas/Employee-Records-Angular-NgRX.git
   cd Employee-Records-Angular-NgRX
   ```

2. **Install project dependencies**

   ```bash
   npm install
   ```

3. **Start the mock backend**
   The JSON server provides mock data for the employee records.
   Run the following command to start it:

   ```bash
   json-server --watch src/data/db.json
   ```

4. **Start the Angular development server**

   ```bash
   ng serve
   ```

5. **Open the application**
   Once both servers are running, open the app in your browser at:

   ```
   http://localhost:4200/employee
   ```

---

## 📁 Project Structure

```
src/
 ├── app/
 │   ├── components/       # Angular components (Employee list, forms, etc.)
 │   ├── services/         # Services for data access
 │   ├── store/            # NgRX store setup
 │   └── app.module.ts
 ├── data/
 │   └── db.json           # Mock data for JSON server
 ├── assets/
 ├── environments/
 └── main.ts
```

---

## 💡 Notes

* The app uses **NgRX** for managing global state and simulating asynchronous data loading.
* All data operations (GET, POST, PUT, DELETE) are handled by `json-server` locally.
* This is a front-end demonstration — no real backend or authentication is implemented.

---

## 🧑‍💻 Author

**Davide Nas**
[GitHub Profile](https://github.com/DavideNas)
