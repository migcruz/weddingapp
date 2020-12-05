# React-Django-Heroku Web App Deployment

## Introduction

This is a simple Todo web application built using React.js (front-end) and Django (back-end).

There are mainly two ways you can deploy this kind of web app:

1. **Separating Back-end and Front-end:**
   In this method, you server your back-end and front-end apps separately and they connect to each other with their respective URIs. One major overead of this approach is you have to configure CORS yourself. If you don't know about CORS you can learn more here.

   In this project, we will be demonstrating this longer, more complex but more flexible approach.

2. **Serving from the same host:**
   In this method you will be serving the app from the same URI so it removes the CORS overhead. Also, it makes it easier to maintain smaller-medium sized apps. You don't want to create two separate repositories for some simple sites like a blog, to-do etc.

   This method requires building the React app first (npm run build) and update both the Django views (views.py) and urls (urls.py) to render the index.html template directly:

   ```Shell
    CODE FOR METHOD 2
    ``` 

## Technology Stack

### Front-end
* react@17.0.1
    * react-dom@17.0.1
* axios@0.21.0
* bootstrap@4.5.3
* reactstrap@8.7.1
### Back-end
* Django==3.1.3
    * djangorestframework==3.12.2
    * django-cors-headers==3.5.0
    * dj-database-url==0.5.0
    * django-heroku==0.3.1
* gunicorn==20.0.4
* whitenoise==5.2.0
* python-dotenv==0.15.0
* psycopg2==2.8.6
* psycopg2-binary==2.8.6

## Prerequisites

### 1. Install Node.js
Download Node.js and Node Package Manager (NPM) **[here](https://nodejs.org/en/)**.

### 2. Set up Virtual Environment

a. Using venv (preferred)

- To **create** virtual environment:
    ```Shell
    $ python3 -m venv venv
    ``` 
- To **activate** virtual environment (Linux/Mac OS):
    ```Shell
    $ source venv/bin/activate
    ``` 

b. Using pipenv

- Install pipenv:
    ```Shell
    $ pip install pipenv # Python 2
    $ pip3 install pipenv # Python 3
    ``` 
- Enter virtual environment shell:
    ```Shell
    $ pipenv shell
    ``` 

# Method 1: Separating Back-end and Front-end

## Setting up the Backend

### 1. Create new project directory

```
$ mkdir (DIR_NAME)
$ cd (DIR_NAME)
``` 

### 2. Install dependencies
Run the following command inside your virtual environment:

- Using pipenv:
    ```Shell
    $ pipenv install -r requirements.txt # (Python 2)
    $ pipenv3 install -r requirements.txt # (Python 3)
    ``` 
- Using venv:
    ```Shell
    $ pip install -r requirements.txt # (Python 2)
    $ pip3 install -r requirements.txt # (Python 3)
    ``` 

### 3. Create new Django project
Run the following command inside your virtual environment:
```Shell
$ django-admin startproject backend
``` 

### 4. Extract all Django project files to parent directory (recommended)
The directory should look as follows:
```
.
├── README.md
├── backend
│   ├── __init__.py
│   ├── __pycache__
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
├── manage.py
```
### 5. Create new Django app
First, navigate into the newly created backend folder. Then, start a new Django app, in this case called todo since we want to create a todo app. We will also run migrations and start up the server:
```Shell
$ cd backend
$ python manage.py startapp todo
$ python manage.py migrate
$ python manage.py runserver
``` 

If everything works well, we should see an instance of a Django application running on this address — http://localhost:8000

![alt text](https://scotch-res.cloudinary.com/image/upload/v1542486456/ia8jlkozut4uxwatnqwp.png)
### 6. Register new Django app

Open the backend/settings.py file and update the INSTALLED_APPS section as so:
```Python
# backend/settings.py

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'todo' # Add this
]
``` 

### 7. Set up the APIs

In order to allow for API CRUD operations between both front and back end, we need to utilise the **Django REST Framework** as well as **Django CORS Headers**.

**Django REST framework** is a powerful and flexible toolkit for building Web APIs, while **Django CORS Headers** is a Django app for handling the server headers required for Cross-Origin Resource Sharing (CORS).

The image below essentially sums up the application architecture of a React-Django stack web app:
![alt text](https://bezkoder.com/wp-content/uploads/2020/03/django-react-axios-rest-framework-crud-architecture.png)

* Django exports REST APIs using Django REST Framework and interacts with Database using Django Model.
* React Client sends HTTP Requests and retrieve HTTP Responses using axios, shows data on the components.

After installing all the necessary requirements in Step 2, we need to add rest_framework and corsheaders to the list of installed applications, so open the backend/settings.py file and update the INSTALLED_APPS and MIDDLEWARE sections accordingly:

```Python
# backend/settings.py

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',            # add this
    'rest_framework',         # add this
    'todo',
  ]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',    # add this
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
``` 

At the bottom of the ```backend/settings.py``` file, you need to choose to add either the following:

```Python
# # Whitelist localhost:3000 because that's where frontend will be served
# CORS_ORIGIN_WHITELIST = [
#     'https://localhost:3000',
# ]

CORS_ORIGIN_ALLOW_ALL = True
``` 

Whitelist means allowing a set of URLs to access the Django server. In this case, localhost:3000 needs to be whitelisted because that's where frontend will be served.

If you want to allow all access to the Django server, ```CORS_ORIGIN_ALLOW_ALL``` should be set to True.

### 6. Creating serializers for the Django model and views

We need serializers to c**onvert model instances to JSON** so that the frontend can work with the received data easily. We will create a ```todo/serializers.py``` file:

```Shell
touch todo/serializers.py
``` 

Open the ```todo/serializers.py``` file and update it with the following code:

```Python
# todo/serializers.py
from rest_framework import serializers # This is important
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')
```

For any type of Django app, you can configure its own model as long as serializers are imported and  ```serializers.ModelSerializer``` model class parameter is defined

For the views in ```todo/views.py```:

```Python
# todo/views.py

from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import TodoSerializer      # add this
from .models import Todo                     # add this

class TodoView(viewsets.ModelViewSet):       # add this
    serializer_class = TodoSerializer          # add this
    queryset = Todo.objects.all()              # add this
```

The **viewsets base class** provides the implementation for CRUD operations by default, what we had to do was specify the serializer class and the query set.

Finally, we need to update the ```backend/urls.py```:

```Python
# backend/urls.py

from django.contrib import admin
from django.urls import path, include                   # add this
from rest_framework import routers                      # add this
from todo import views                                  # add this

router = routers.DefaultRouter()                        # add this
router.register(r'todos', views.TodoView, 'todo')       # add this

urlpatterns = [
    path('admin/', admin.site.urls),         
    path('api/', include(router.urls))                   # add this
]
```

The router class allows us to make the following queries:

* /todos/ - This returns a list of all the Todo items (Create and Read operations can be done here).
* /todos/id - this returns a single Todo item using the id primary key (Update and Delete operations can be done here).

## Setting up the Frontend

### 1. Create a new React application

Once Node.js is installed,  you can quick start creating your first React app by using the following commands:

```Shell
$ npx create-react-app frontend
$ cd my-app
$ npm start
``` 

In this case, the app we are creating is called front-end to compliment the Django's 'backend' project name. This will take a few minutes to complete.

When everything is done, a new folder will be created with the following directory tree:

```Shell
.
├── README.md
├── backend
│   ├── __init__.py
│   ├── __pycache__
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
├── manage.py
└── frontend
    ├── README.md
    ├── node_modules
    ├── package.json
    ├── .gitignore
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    └── src
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── index.css
        ├── index.js
        ├── logo.svg
        └── reportWebVitals.js
        └── setupTests.js
```
### 2. Extract all React project files to parent directory (recommended)
In order to make things much easier later in the process, you are advised to move all the files inside  ```frontend``` to the parent directory (same level as  ```backend/``` folder) as follows:

```Shell
.
├── README.md
├── backend
│   ├── __init__.py
│   ├── __pycache__
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
├── manage.py
├── node_modules
├── package-lock.json
├── package.json
├── public
├── requirements.txt
├── runtime.txt
├── src
└── todo
```

### 3. Develop your React application
For this step, it is entirely up to you on how you are going to develop your React application

### 4. Connecting Django with React using axios
For us to make requests to the API endpoints on the Django back-end server, we will need install a JavaScript library called **axios**.

**Axios** is a popular, promise-based HTTP client that sports an easy-to-use API and can be used in both the browser and Node.js.

First, we need to install axios using NPM:

```Shell
$ npm install axios
```

Once ```axios``` is successfully installed, head over to the ```package.json``` file and add a **proxy** like so:

```JSON
// package.json

[...]       
"name": "frontend",
"version": "0.1.0",
"private": true,
"proxy": "http://localhost:8000",
"dependencies": {
    "axios": "^0.18.0",
    "bootstrap": "^4.1.3",
    "react": "^16.5.2",
    "react-dom": "^16.5.2",
    "react-scripts": "2.0.5",
    "reactstrap": "^6.5.0"
},
[...]
```

The proxy will help in tunnelling API requests to http://localhost:8000 where the Django application will handle them, so we can simplify writing the requests like this in React:

```JavaScript
axios.get("/api/todos/")
```
Instead of this:

```JavaScript
axios.get("http://localhost:8000/api/todos/")
```

After that, you need to modify the React codes (```App.js ```)

Here's a snippet on how to use axios:

```JavaScript
// src/App.js

handleSubmit = item => {
    this.toggle();
    if (item.id) {
    axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
    return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then(res => this.refreshList());
};

handleDelete = item => {
    axios
        .delete(`http://localhost:8000/api/todos/${item.id}`)
        .then(res => this.refreshList());
};
```

For further information and example, please refer to this **[Digital Ocean guide](https://www.digitalocean.com/community/tutorials/react-axios-react)**. 

### 5. Test the Web Application
You can check whether everything is working by running both React and Django concurrently at your local development server:

```Shell
$ npm start
$ python manage.py runserver
``` 

Test whether both the UI and API requests are working or not. 

## Deploying the Web App using Heroku

Here is a outline following Heroku's from-product-to-productionized instructions for a Django deployment to Heroku:

1. Signup for **[Heroku](https://signup.heroku.com/)** if you don't have an existing account
2. Install the **[Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)**. For MacOS:
    ```Shell
    $ brew tap heroku/brew && brew install heroku 
    ``` 
3. Log in to your Heroku account and enter your credentials:
    ```Shell
    $ heroku login
    ``` 
### 1. Set up Heroku account and CLI

If you

### 2. Configure the Django side

#### settings.py

First, import the necessary libraries for deployment purposes:

```Python
# backend/settings.py

import django_heroku
import dotenv
import dj_database_url
``` 

Next, we need to set up the **database** configuration:

```Python
# backend/settings.py


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

dotenv_file = os.path.join(BASE_DIR, ".env")
if os.path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)



``` 

