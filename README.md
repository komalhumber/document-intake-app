# Document Intake Web Application

## Overview
This application allows users to submit documents through a web form. Each document is validated, stored, and processed using predefined workflow rules. The backend is built using Node.js and follows a layered architecture.

## How to Run the Application
1. Open the project folder in VS Code
2. Open the terminal
3. Run:
   node src/server.js
4. Open a browser and go to:
   http://localhost:3000

## Implemented REST Endpoints
- POST /api/documents  
  Submits a new document and applies validation rules

- PATCH /api/documents/:id  
  Updates document status (APPROVED or REJECTED)

- DELETE /api/documents/:id  
  Deletes a document if its status is REJECTED

## Asynchronous Behavior
The application uses asynchronous operations for handling HTTP requests, reading request data, and processing document workflows. Async/await is used to ensure non-blocking execution.

## Modern ECMAScript Usage
This project uses modern JavaScript features such as async/await, arrow functions, const and let variables, and modular file structure.

## Microservice Architecture Component

### What is a Microservice?
A microservice is a small, independent service that performs a specific business function and communicates with other services using APIs.

### How This Application Fits a Microservice Architecture
This document intake application can operate as an independent microservice responsible only for handling document submissions and validations.

### Two Additional Services in a Larger System
1. User Authentication Service – manages users and permissions  
2. Notification Service – sends email or SMS updates when document status changes

### Scalability Benefit
This service can be scaled independently. If document submissions increase, only this service needs additional resources without affecting other parts of the system.
