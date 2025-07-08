# E-Commerce Admin Dashboard Lite

This project is a simplified admin dashboard for an e-commerce platform, focusing on frontend UI development. It provides a foundational structure for managing products and viewing dashboard insights.

## Table of Contents

- [Features]
- [Technologies Used]
- [Project Structure]
- [How to Run Locally]

## Features

- **Responsive Layout:** Features a topbar and a collapsible sidebar that adapts to desktop, tablet, and mobile views.
- **Dashboard Overview:**
  - Summary cards displaying key metrics (Total Sales, Orders, Active Users).
  - A "Recent Orders" table populated with mock data, featuring sortable columns.
  - A basic bar chart visualizing sales data over the last 6 months.
- **Product Management Page:**
  - A comprehensive product table showcasing product images, titles, prices, and stock levels.
  - Integrated search functionality for products (by title or ID).
  - Sortable columns for Title, Price, and Stock.
  - "Add New Product" functionality with a modal form including fields for title, price, description, and image upload with preview.
  - "Edit Product" functionality via a modal pre-filled with existing product data.
  - Client-side validation implemented for required fields in product forms.
  - Product data is managed via local state (no backend integration required).
  - Functionality to delete products with confirmation.
- **Custom Styling:** Achieves a consistent look and feel through the thoughtful application of Material UI components and Bootstrap utility classes.
- **Component-Based Development:** The application is built using a component-based architecture, promoting reusability and maintainability.

## Technologies Used

- [React](https://react.dev/) - A JavaScript library for building user interfaces.
- [Material UI](https://mui.com/) - A comprehensive suite of UI tools for faster and easier web development.
- [Bootstrap](https://getbootstrap.com/) - A powerful, extensible, and feature-packed frontend toolkit for building responsive, mobile-first websites.
- [React Router DOM](https://reactrouter.com/en/main) - Declarative routing for React.
- [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/) - For flexible and visually appealing data visualization.

## Project Structure

The project is organized into logical directories to separate concerns and improve maintainability:

ecommerce-admin-dashboard/
├── node_modules/
├── public/
├── src/
│ ├── components/
│ │ ├── common/ # Reusable UI components (e.g., ConfirmationModal, SummaryCard)
│ │ │ ├── ConfirmationModal.js
│ │ │ └── SummaryCard.js
│ │ ├── dashboard/ # Components specific to the Dashboard page
│ │ │ ├── RecentOrdersTable.js
│ │ │ └── SalesChart.js
│ │ ├── layout/ # Layout components (e.g., Layout, Sidebar, Topbar)
│ │ │ ├── Layout.js
│ │ │ ├── Sidebar.js
│ │ │ └── Topbar.js
│ │ └── products/ # Components specific to the Product Management page
│ │ ├── ProductFormModal.js
│ │ └── ProductTable.js
│ ├── pages/ # Page-level components (e.g., DashboardPage, ProductManagementPage)
│ │ ├── DashboardPage.js
│ │ └── ProductManagementPage.js
│ ├── utils/ # Utility functions or mock data
│ │ └── mockData.js
│ ├── App.css
│ ├── App.js
│ ├── index.css
│ └── index.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

## How to Run Locally

Follow these steps to set up and run the project on your local machine:

1.  **Clone the repository:**

    git clone https://github.com/Prathamesh-Pawaskar/ecommerce-admin-dashboard-lite.git
    cd ecommerce-admin-dashboard

2.  **Install dependencies:**

    npm install

3.  **Start the development server:**

    npm start

    The application will open in your browser at `http://localhost:3000`.
