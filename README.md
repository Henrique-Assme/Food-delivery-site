# 🍔 Food Delivery App

This project is a food delivery system that allows users to place orders, process payment via Stripe and track their purchases.

# 🚀 Technologies Used

**Frontend**
* React (Vite)
* React Router
* CSS
* Axios
* Vercel (deploy)

**Backend** 
* Node.js (Express)
* MongoDB (Atlas)
* Mongoose
* Stripe API (Payments)
* JWT (Authentication)
* Render (Deployment)
* Jest (Testing)
* CI/CD with Jenkins

# 📦 Installation and Execution
1️⃣ Clone the Repository
```
git clone https://github.com/Henrique-Assme/Food-delivery-site.git
cd Food-delivery-site
```
2️⃣ Configure the Backend
```
cd backend
npm install
```
Create a `.env` file and add your credentials:
```
MONGO_URL=mongodb+srv://USER:PASSWORD@cluster0.swtuz.mongodb.net/food-delivery
JWT_SECRET=YOUR_SECRET_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_KEY
VITE_FRONT_URL=https://food-delivery-site-ten.vercel.app
```
Start the backend:
```
npm run server
```

3️⃣ Configure the Frontend
```
cd frontend
npm install
```
Create a `.env` file in the frontend and add:
```
NODE_ENV="dev"
VITE_API_URL="https://food-delivery-api-v1rv.onrender.com"
```
Start the frontend:
```
npm run dev
```
4️⃣ Configure the admin page
```
cd frontend
npm install
```
Create a `.env` file in the frontend and add:
```
NODE_ENV="dev"
VITE_API_URL="https://food-delivery-api-v1rv.onrender.com"
```
Start the frontend:
```
npm run dev
```

# 🚀 Deployment and CI/CD
**Backend (Render)**

The backend is hosted on Render. API Access: [Food Delivery API](https://food-delivery-api-v1rv.onrender.com)

**Frontend and Admin (Vercel)**

The frontend is hosted on Vercel: [Food Delivery](https://food-delivery-site-ten.vercel.app/)

The admin page is hosted on Vencel: [Food Delivery admin page](https://food-delivery-site-admin.vercel.app/)

**CD/CD with Jenkins**

This project uses Jenkins for automated testing and deployments. The pipeline is configured to:
* Run automted tests with Jest after each commit
To use jenkins, run:
```
./start_ci_ci.sh
```
This script will generate the CloudFlare Tunnel from a local docker running jenkins on port 8080. Copy the generated URL in the repo Webhook:
```
generated_url/github-webhook/
```

# 🛠 Testing
The backend includes some automated tests using Jest. To run the tests locally:
```
npm test
```
Or to run an specfic test file:
```
npm test test_file_name
```
Tests include:
* Unit tests for conrollers and services (under development)
* Integration tests for the mais API routes

# 📌 Features
* 📌 JWT Authentication (Login and Registration)
* 🛒 Cart Management
* 💳 Stripe Payment Processing
* 📦 Order History
* 🛠 Admin Panel for Order Management
* 🔄 Automated Testing and Deployment with Jenkins

# 💡 Contributions

Although this is a study purpose project, it is open to suggestions, improvements, and enhancements! Feel free to submit issues or pull requests to help improve it.
