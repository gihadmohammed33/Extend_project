Description
This full-stack application allows users to browse, search, and filter products, with additional features like pagination and sorting. The front-end is built using React.js, while the back-end is powered by NestJS or Express.js. PostgreSQL is used for data storage, and the project includes both user-facing and optional admin functionalities.

Features
Front-End (React.js):

Product List Page: Displays all products in a grid or list format, with pagination and sorting options.
Product Detail Page: Shows detailed information for each product.
Search and Filter: Users can search for products by name and filter them by category.
Pagination: Allows users to navigate through multiple pages of products.
Sorting: Users can sort products by price or name in ascending or descending order.
Responsive Design: The UI is designed to work well on both mobile and desktop devices using SCSS and a UI framework like Bootstrap or Ant Design.
Back-End (NestJS / Express.js)

API Endpoints:

GET /products: Retrieve all products, with pagination and sorting support.
GET /products/:id: Retrieve a single product by its ID.
POST /products: Create a new product.
PUT /products/:id: Update an existing product.
DELETE /products/:id: Delete a product.
Database: PostgreSQL with a products table containing fields like id, name, price, creationDate, and description. Database interaction is handled using Prisma or TypeORM.

Admin Interface:

Allows admins to create, update, and delete products.
Basic JWT authentication or session-based authentication is implemented for admin access.

Pages and Routing:

/ - Product List Page: Displays all products with pagination and sorting options.
/product/:id - Product Detail Page: Displays detailed information for a single product.
Admin Routes:

/admin - Admin dashboard for product management (create, edit, delete products).

Prerequisites
Node.js 
PostgreSQL 
Git
