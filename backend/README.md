
# FastAPI App Setup Guide

This guide explains how to set up and run the FastAPI application locally using a Python virtual environment.

---

## 🚀 Prerequisites

- Python 3.8 or higher installed  
- Git (optional, if cloning a repository)

---

## 🐍 Step 1: Create a Virtual Environment

### Windows
```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux
```bash
python3 -m venv venv
source venv/bin/activate
```

> ✅ Once activated, your shell should show `(venv)` prefix.

---

## 📦 Step 2: Install Dependencies

Make sure you are inside the virtual environment, then run:

```bash
pip install -r requirements.txt
```

---

## ▶️ Step 3: Run the FastAPI App

If your FastAPI app is in a file called `main.py` with the app instance named `app`, run:

```bash
uvicorn app.main:app --reload
```

- `--reload`: Enables auto-reloading on code changes (useful for development)
- The app will typically run on: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- API docs available at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## ❌ Deactivate Virtual Environment

When you're done working:

```bash
deactivate
```

---

## 📁 Project Structure (Example)

```
.
├── main.py
├── requirements.txt
└── README.md
```

---

## 🧩 Troubleshooting

- **`ModuleNotFoundError`**: Ensure the virtual environment is activated.
- **Port already in use**: Try a different port like `uvicorn main:app --reload --port 8001`

---

Happy coding! ✨
