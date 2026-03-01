# 🐾 VetScheduler — Veterinary Clinic Scheduling Dashboard

A full-stack veterinary clinic scheduling platform built with **Next.js** (frontend) and **NestJS** (backend). Receptionists can browse clinic services, filter/search, and book appointments for pets.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Backend | NestJS 11, TypeScript |
| HTTP Client | Axios |

---

## Features

### Part 1: Service Listing & Filtering
- Fetches services for a clinic from the backend API
- Displays services as cards (name, price, duration, category, available slots)
- Filter by category (All / Checkup / Vaccination / Surgery)
- Search by service name
- Both filters work together
- Loading skeleton, error state, and empty state handling

### Part 2: Appointment Booking Flow
- "Book Now" button on each service card (disabled if unavailable)
- Modal booking form with pet name, owner name, owner phone, and time slot selector
- Calls POST `/api/appointments` on submit
- Shows success message with appointment ID or error message
- Booked slot is removed from the UI after successful booking

### Part 3: Multi-Tenant Awareness (Bonus)
- Displays clinic name and currency from the API response in the header
- All prices formatted using the clinic's currency (e.g., $500, €500, £500, ₹500)

---

## Prerequisites

- **Node.js** v20.11.0 or higher
- **npm** v10.0.0 or higher

---

## Project Structure

```
UplersAssignment2026/
├── client/                          # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx             # Home page
│   │   │   └── dashboard/
│   │   │       ├── page.tsx         # Dashboard page
│   │   │       └── components/
│   │   │           ├── SearchBar.tsx
│   │   │           ├── CategoryFilter.tsx
│   │   │           ├── ServiceCard.tsx
│   │   │           ├── ServiceList.tsx
│   │   │           ├── LoadingSkeleton.tsx
│   │   │           ├── ErrorState.tsx
│   │   │           └── BookingForm.tsx
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── Card.tsx
│   │   │       └── Button.tsx
│   │   ├── hooks/
│   │   │   └── useServices.ts
│   │   ├── lib/
│   │   │   └── api.ts
│   │   └── types/
│   │       └── DashboardTypes.ts
│   └── package.json
│
├── server/                          # NestJS Backend
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   └── modules/
│   │       ├── services/
│   │       │   ├── services.module.ts
│   │       │   ├── services.controller.ts
│   │       │   └── services.service.ts
│   │       └── appointments/
│   │           ├── appointments.module.ts
│   │           ├── appointments.controller.ts
│   │           └── appointments.service.ts
│   └── package.json
│
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/UplersAssignment2026.git
cd UplersAssignment2026
```

### 2. Setup the backend (NestJS)

```bash
cd server
npm install
npm run start:dev
```

The backend will start on **http://localhost:4000**

### 3. Setup the frontend (Next.js)

Open a **new terminal**:

```bash
cd client
npm install
npm run dev
```

The frontend will start on **http://localhost:3000**

### 4. Open in browser

- **Home page:** http://localhost:3000
- **Dashboard:** http://localhost:3000/dashboard?clinicId=clinic_abc

---

## API Endpoints

### GET `/api/services`

Fetches services for a clinic.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `clinicId` | string | Yes | The clinic identifier |
| `category` | string | No | Filter by category (checkup / vaccination / surgery) |

**Example:**
```
GET http://localhost:4000/api/services?clinicId=clinic_abc
GET http://localhost:4000/api/services?clinicId=clinic_abc&category=surgery
```

### POST `/api/appointments`

Books an appointment.

**Request Body:**
```json
{
  "clinicId": "clinic_abc",
  "serviceId": "svc_1",
  "petName": "Buddy",
  "ownerName": "John Doe",
  "ownerPhone": "+1-9876543210",
  "slot": "09:00"
}
```

**Response:**
```json
{
  "appointmentId": "apt_a1b2c3",
  "status": "confirmed"
}
```

---

## Available Scripts

### Frontend (client)

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |

### Backend (server)

| Command | Description |
|---|---|
| `npm run start:dev` | Start development server with hot reload on port 4000 |
| `npm run start` | Start production server |
| `npm run build` | Build for production |
