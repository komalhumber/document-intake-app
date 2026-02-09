## Microservice Architecture Component

A microservice is a small, independent application that focuses on one specific function and communicates with other services through APIs.

This Document Intake application can be deployed as a microservice because it handles only one responsibility: receiving, validating, and storing documents. It runs independently and exposes REST API endpoints that other systems can use.

In a larger system, additional microservices could include:
1. A User Authentication Service to manage user login and permissions.
2. A Notification Service to send email or SMS alerts when documents are approved or rejected.

One scalability benefit of microservices is that this document intake service can be scaled independently. If document uploads increase, only this service needs more resources, without affecting other parts of the system.


# Document Intake Web Application

## How to Run the Application
1. Open terminal in the project folder
2. Run the command:
   node src/server.js
3. Open browser and go to:
   http://localhost:3000

## Implemented REST Endpoints
- POST /api/documents
- GET /api/documents
- GET /api/documents?type=ID_PROOF
- PATCH /api/documents/:id
- DELETE /api/documents/:id

## Asynchronous Behavior
The application uses asynchronous operations to handle HTTP requests, file system operations, and JSON parsing. Async and await are used to ensure non-blocking execution and better performance.

## Modern ECMAScript Usage
The project uses modern JavaScript features such as arrow functions, async/await, const and let, and template literals to improve readability and maintainability.

## Microservice Architecture Component
(PASTE STEP 11 TEXT HERE)
