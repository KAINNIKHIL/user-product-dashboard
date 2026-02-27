# Project Objective

This project evaluates practical frontend skills including:

- Authentication handling
- REST API integration
- Global state management
- Responsive UI design
- Performance optimization
- Clean architecture & documentation
All backend data is fetched from:
```
https://dummyjson.com/
```

###  Tech Stack
- Technology	Purpose
- Next.js	Framework (App Router)
- Material UI (MUI)	UI Components & Responsive Layout
- Zustand	Global State Management
- NextAuth	Authentication handling
- DummyJSON API	Public REST API
- Axios / Fetch	API calls

###  Features Overview
##  1. Authentication

API Used
```
POST https://dummyjson.com/auth/login
```
Implemented:

- Admin login page using MUI
- Authentication via DummyJSON API
- Token stored in Zustand (optionally persisted in localStorage)
- Protected dashboard routes
- Automatic redirect after login
- Unauthorized users blocked from dashboard access

##  2. Users Module
##  Users List Page

APIs
```
GET https://dummyjson.com/users?limit=10&skip=0
GET https://dummyjson.com/users/search?q=...
```
Features:

- Responsive MUI table
- Server-side pagination using limit & skip
- Search functionality
- Displays:
Name
Email
Gender
Phone
Company

Client-side caching via Zustand
##  Single User Page

API
```
GET https://dummyjson.com/users/{id}
```
Features:

- Complete user details
- Organized MUI layout
- Back navigation to users list

##  3. Products Module
##  Products List Page

APIs
```
GET https://dummyjson.com/products?limit=10&skip=0
GET https://dummyjson.com/products/search?q=...
GET https://dummyjson.com/products/category/{category}
```
Features:

- Responsive MUI grid layout
- Pagination
- Search bar
- Category dropdown filter

Displays:
- Product image
- Title
- Price
- Category
- Rating
- 
## Single Product Page

API
```
GET https://dummyjson.com/products/{id}
```
Features:
- Product image carousel
- Description
- Product specifications
- Back navigation

## State Management – Zustand

### Zustand manages:

- Authentication state
- Users list & single user
- Products list & single product
- Loading & error states
- Cached responses

### Why Zustand?

- Lightweight 
- Minimal boilerplate
- Built-in async support
- Cleaner than Redux for small–medium apps

No reducers/actions complexity

Easy global state access
### Performance Optimization
Implemented:

- API-side pagination (prevents large data loads)
- React.memo for reusable components
- useCallback for event handlers
- useMemo for derived data
- Zustand caching to avoid repeat API calls

### Client-Side Caching Strategy

- List responses stored in Zustand store
- Data reused if already fetched
- Reduces:
- Network calls
- Load time
- Server dependency
- Improves perceived performance

### UI / UX Implementation

- Entire UI built using Material UI
- Fully responsive:
- Login page
- Users page
- Products page
- Detail pages
- Clean layout
- Proper spacing & alignment
- Mobile-friendly grid system

Folder Structure
/app
  /login
  /dashboard
  /users
  /products

/components
  /common
  /users
  /products

/store
  authStore.js
  userStore.js
  productStore.js

/services
  api.js

/utils
  helpers.js
### Environment Variables

Create .env.local

NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
 Installation

Clone repository:

git clone <your-repo-link>
cd project-name

Install dependencies:

npm install
 Run Development Server
npm run dev

Visit:
```
http://localhost:3000
```
## Route Protection

- Dashboard routes are wrapped with authentication check.
- Unauthenticated users are redirected to /login.
- Token validation handled via NextAuth + Zustand.

### Functional Checklist
- Login	
- Protected Routes	
- Pagination	
- Search	
- User Detail Page	
- Product Detail Page	
- Zustand State	
- Async API Handling	
- Responsive UI	
- Performance Optimization	

### Folder Structure
```
/app
  /login
  /dashboard
  /users
  /products

/components
  /common
  /users
  /products

/store
  authStore.js
  userStore.js
  productStore.js

/services
  api.js

/utils
  helpers.js
```
### Environment Variables

Create .env.local
```
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Installation

Clone repository:
```
git clone <your-repo-link>
cd project-name
```
Install dependencies:
```
npm install
```
### Run Development Server
```
npm run dev
```
Visit:
```
http://localhost:3000
```
### Route Protection

- Dashboard routes are wrapped with authentication check.
- Unauthenticated users are redirected to /login.
- Token validation handled via NextAuth + Zustand.
