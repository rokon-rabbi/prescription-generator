# Prescription Management System

A full-stack web app for managing prescriptions with authentication, CRUD operations, reports, and Swagger integration.

## Technologies Used

### Frontend
- **React**: React Router, Tailwind CSS for styling.
- **SweetAlert2**: Notifications.
- **Axios**: API calls.

### Backend
- **Spring Boot 3**: REST APIs, H2.
- **Spring Security**: Authentication.
- **SpringDoc OpenAPI**: Swagger UI for API docs.

## Features

### Authentication
- Secure login using Spring Security.
- No anonymous access; login required.

### Prescription Management
- **View**: Prescriptions for a date range (default: current month).
- **Create**: Add prescriptions with validation.
- **Edit/Delete**: Update or remove existing prescriptions.
- **Fields**:
  - Date, Patient Name, Age, Gender, Diagnosis, Medicines, Next Visit Date.

### Reports
- Day-wise prescription count [date, count].

### API Documentation
- Swagger UI: `http://localhost:8080/swagger-ui.html`.
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`.

## Running the Project

### Backend
1. Clone the backend repository.
2. Configure `application.properties` for H2.
3. Run the application: `./mvnw spring-boot:run`.

### Frontend
1. Clone the frontend repository.
2. Install dependencies: `npm install`.
3. Start the app: `npm run dev`.

## Notes
- Swagger UI requires public access via Spring Security configuration.
- Ensure backend runs on `http://localhost:8080` for frontend API calls.

---

