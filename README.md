
# 🧊 Cube 3D Controller (Full Stack App)


This project allows users to interact with one or two 3D cubes rendered in the browser. Users can add/remove a second cube, and for each cube, rotate, move, save, and reset its state. All state changes are synced with a MongoDB database using a backend API.

---


## 📦 Features

- 3D cubes rendered with Three.js (supports up to 2 cubes)
- Add or remove a second cube (Box 2) dynamically
- Each cube can be rotated using its own slider
- Move each cube with its own directional buttons
- Save each cube's position and rotation speed to MongoDB
- Reset each cube to its original state
- Focus camera on either cube with dedicated buttons
- Full-stack: frontend + backend + database
- Deployed using Render

---

## 🛠️ Technology Stack

| Layer        | Tech Used                       | Reason |
|--------------|----------------------------------|--------|
| **Frontend** | HTML, CSS, Vanilla JS, Three.js  | Light & interactive 3D UI |
|              | Vite (build tool)               | Fast dev server & bundling |
| **Backend**  | Node.js + Express               | Lightweight REST API |
| **Database** | MongoDB Atlas                   | Cloud NoSQL database |
| **Deployment**| Render.com                      | Easy full-stack hosting |

---


## 🚀 Live Links

- 🔗 **Frontend**: [https://cube-frontend.onrender.com](https://cube-frontend.onrender.com)
- 🛠️ **Backend**: [https://cube-backend.onrender.com](https://cube-backend.onrender.com)
- 🧪 **API Test**: [https://cube-backend.onrender.com/api/cubes/cube_1](https://cube-backend.onrender.com/api/cubes/cube_1)

---

## 🧑‍💻 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/cube3d
cd cube3d
```


### 2. Backend Setup (`/backend`)

```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGO_URI=your-mongo-db-uri
PORT=5000
```


Start backend:
```bash
node server.js
```

---


### 3. Frontend Setup (`/cubeassi`)

```bash
cd ../cubeassi
npm install
```

Create `.env` file:
```env
VITE_BACKEND_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```


Now open `http://localhost:5173` in your browser.

---

## 🆕 Second Cube (Box 2) Feature

- Click the **Add Box** button to add a second cube (Box 2) to the scene. The button toggles to **Remove Box** to remove it.
- Box 2 has its own set of controls for moving, rotating, saving, resetting, and focusing the camera.
- Box 2's state is also synced with the backend and MongoDB.

### Box 2 Controls

- **Add/Remove Box**: Toggle the presence of the second cube.
- **Directional Buttons**: Move Box 2 within the scene.
- **Rotation Slider**: Adjust Box 2's rotation speed.
- **Save**: Save Box 2's position and rotation speed to the backend.
- **Reset**: Reset Box 2 to its default state (position and rotation).
- **Focus**: Move the camera to focus on Box 2.

---

---


## 📡 API Documentation


### GET `/api/cubes/cube_1` and `/api/cubes/cube_2`

- **Description**: Returns current position and rotation speed of the specified cube (`cube_1` or `cube_2`).
- **Response**:
```json
{
  "cubeId": "cube_1" | "cube_2",
  "position": { "x": 0, "y": 0, "z": 0 },
  "rotationSpeed": 0.01,
  "updatedAt": "timestamp",
  "lastSaved": "timestamp"
}
```

---

### POST `/api/cubes/cube_1/save` and `/api/cubes/cube_2/save`

- **Description**: Saves current position and rotation speed of the specified cube.
- **Body**:
```json
{
  "x": 1,
  "y": 2,
  "z": 0,
  "rotationSpeed": 0.05
}
```
- **Response**:
```json
{ "message": "Cube saved successfully" }
```

---

### POST `/api/cubes/cube_1/reset` and `/api/cubes/cube_2/reset`

- **Description**: Resets the specified cube state to default.
- **Response**:
```json
{ "message": "Cube reset to default state" }
```

---

## ⚠️ Known Issues or Limitations

- ⚠️ Cannot interact with cube on touchscreen (no mobile support yet)
- ❌ Cube rotation resets if page is manually reloaded before saving
- 🚫 No authentication — anyone with API access can modify state
- 📉 Cube state is limited to one `cube_1` object — multi-cube not implemented

---

## 💬 Code Comments

Code is well-commented, especially in:
- `main.js` → rendering logic and event handling
- `server.js` → API route explanations
- `cubemodels.js` → Mongoose schema

---

## 🧑‍🎓 Author

**Harsh Mishra**  
Built as a full-stack assignment for FrameNext Innovations

---

## 📄 License

MIT – Use freely with credit
