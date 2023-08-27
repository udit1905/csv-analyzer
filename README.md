# crux_assignment
A web application that allows users to upload a CSV file containing data, interact
with a chat-like interface, and utilize the OpenRouter API for text analysis.
# Tech Stack
- Django Rest Framework (for rest api server)
- React (for frontend)

# Specifications for code deployment on local

1. Node.js version -> 16.20
2. Terminal -> Git bash
3. Code editor -> VS code
4. Python version -> 3.11

# Code Deployment 


1. clone project.

```
git clone https://github.com/starkkumarkk1611/crux_assignment.git
```

2. Navigate to frontend folder.

```
cd frontend
```

3. Install node modules.

```
npm install
```

4. Start local development server

```
npm start
```

5. New tab in browser will open.
6. In another terminal navigate to backend

```
cd backend
```

7. Create a virtual environment for Django Server.

```
python -m venv .venv
```

8. Activate virtual environment

```
source .venv/Scripts/activate
```

12. Install the required python packages.

```
pip install -r requirements.txt
```
13. Navigate to backend/crux and run database migration 

```
python manage.py migrate
```

13. To  start development server. (run command in 'backend/crux' dir.)

```
python manange.py runserver 
```
