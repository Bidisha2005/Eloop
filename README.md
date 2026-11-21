# E-LOOP React frontend

React + Vite starter frontend for the E-LOOP electronic-waste marketplace.

## 1. Requirements
- Node.js 18 or newer
- npm

Check installation:
```bash
node -v
npm -v
```

## 2. Install and run
Open a terminal in this folder:
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (normally http://localhost:5173).

## 3. Demo mode
The app starts with mock data. This means the pages, listing flow, category suggestion demo, and purchase-request demo work without starting the backend.

Copy `.env.example` to `.env` if you want to edit the settings:
```env
VITE_USE_MOCK_DATA=true
VITE_API_BASE_URL=http://localhost:5000/api
```
Restart Vite after changing `.env`.

## 4. Connect your backend
When your Node/Express backend is ready, set:
```env
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=http://localhost:5000/api
```
Then restart the frontend. The API adapter is `src/services/api.js`.

The adapter currently expects:
- `GET /listings`
- `GET /listings/:id`
- `POST /listings` (multipart form data)
- `POST /predict` (multipart image field named `image`)
- `POST /requests` (JSON with `listingId` and `message`)
- `GET /requests`

These are frontend expectations, not a guarantee that the current backend already implements every route. Compare them with the actual Express routes and adjust only `src/services/api.js` to match. In particular, confirm the prediction route, upload field name, response property names, and listing payload shape with the backend developer.

## 5. Included pages
- `/` Home
- `/marketplace` Browse/search/filter listings
- `/sell` Upload photo, request category suggestion, publish listing
- `/listing/:id` Listing details and purchase request form
- `/dashboard` Demo listing and request summary

## 6. Important notes
- The category prediction shown in mock mode is only a filename-based demo. It does not run the trained MobileNetV3 model.
- Real model predictions happen only after connecting the actual Python/Node prediction API.
- The AI category is a suggestion; the seller must verify it.
- No material-detection feature is included.
- Authentication, seller-specific ownership, seller accept/reject actions, and production request tracking require corresponding backend APIs.
