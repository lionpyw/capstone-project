# Cs50w Capstone Project

This is a consultation app , as part of the harvard cs50 web development program, that allows users to book, manage, and join online video consultations with experts.
([Demo](https://www.youtube.com/watch?v=MRFLZY4qtto))

The app is built using React for the front-end, TypeScript for type safety, Zustand(not fully implemented due to time constraint) and React Query libraries for data-fetching and state management, and Tailwind CSS and Daisy UI for UI design. For real time Video communication the [Dyte SDK](https://dyte.io/) has been integrated in the app. The Back-end is built using the Django framework.The Django REST Framework library has been employed for building the web API, and an httpOnly cookie storage based JWT Authentication using simple jwt and djoser libraries with csrf protected endpoints have been used for the authentication back-end. 

## Distinctiveness and Complexity 

The task involved designing and implementing an original web application with Python and JavaScript, distinct from the previous projects in the course. In its complexity the app goes a step further by employing react instead of vanilla js for the front-end design, and Tailwind CSS for styling. The design has various features like light/dark mode, mobile responsiveness etc. React Router library provides for client side routing. It also integrates an SDK for advanced features like real time video communication, built directly into the app. The complexity also lies in the implementation of httpOnly JWT cookie authentication, which ensures secure user sessions. The API endpoints are also protected using various permission classes. The Django app has been divided into smaller apps, one for user and authentication and the other for the consultations. The apps can be easily decoupled, and fulfill their purpose in any other project.

The app is also very distinct from the previous projects. Although the idea itself is not novel but it has been made using my own thoughts and ideas.
The design though basic lays the foundation for a complex and robust app, implementing a modern and interactive design.
Users have been divided into clients and consultants, with different UI functionality for both. Appointments requests put forward by clients can easily be managed between clients and consultants, without very clogged up forms. Dyte SDK provides high quality communication with a very interactive and feature rich video calling for consultations. All being said, there, however, exist some avoidable glitches in the UI, as the state management work hasnt been extended to the entirety of the app, due to a busy schedule and time constraint for submitting the project.

## Project Structure

The root directory contains the following folder:-

1. capstone: Django project folder, .
2. core: Django app for user and authentication management, 
3. consultation: Django app containing all the features of the app,
4. cap-frontend: React app, for the frontend as implied by the name of the folder,

The back-end and front-end are run on different servers in this project. The back-end server is running from the root directory containing the manage.py file.
The front-end server is run from within the __cap-frontend__ directory.
The structure of the backend folder in the root directory is typical of the django-admin created structure. The folder structure in the front-end is rendered using the __Vite__ framework, using create vite. 



## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the packages in the requirements.txt file in the parent folder and the node package manager [npm](https://npmjs.com) to install the the packages in the package.json file in the _cap-frontend_ folder.

```bash
pip install -r requirements.txt
cd cap-frontend
npm install
```
In the parent folder exist the files for running the back-end server. As a first step migrations are made to make changes to the database. And a superuser account is created to manage the django admin panel. The superuser also creates a client instance which can be deleted from the admin panel

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

The back-end server, along with the app can now be run using the build version of the react app.

`python manage.py runserver` 

To run the front-end on a separate server, first we navigate in the front-end folder and then we can run the development server after instantiating the backend server, using
```bash
cd cap-frontend
npm run dev
```


## Usage

Once the servers are up and running the app can be used by making user accounts. The register button allows for client registration, but Consultant accounts can only be made from the admin panel, either directly,_must tick the is_service_provider option while creating the user_, or by registering as a client from the front-end and deleting the client object and edit the user object to _is_service_provider_ and create a consultant object.

Once a few user accounts have been made all features can effortlessly be tested. Clients and consultants have a simple dashboard. Clients can make appointment request with consultants of their choice. For feature testing purposes strict behavior of the app has not been employed.

One request is possible with each consultant. Consultants can see those requests and once they give a scheduled time the client can accept them to turn the request into an actual appointment.
Once an appointment is made the option for live video communication is possible with the consultant.
Previous appointment records show for both consultants and clients. Both clients and consultants can manage their profiles, though not many options have been added. The profile image allows only 1 image to be stored in the backend, and previous images are deleted.


## Additional Information

The app had to be run on two servers due to some front-end issues. But ignoring a few glitches it can also be run from the python server.

A few files have also been used from other repositories, which I will link.
The cookie authentication doesn't come with the restframework_simplejwt package. It was incorporated from a similar package [django-rest-framework-simplejwt](https://github.com/schlunsen/django-rest-framework-simplejwt). The Dyte SDK backend and frontend were also incorporated from the service providers [Git Hub repository](https://github.com/dyte-io/blog-video-shopping) with modifications to suite my app.
