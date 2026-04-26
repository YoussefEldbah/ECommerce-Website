# FreshCart E-Commerce (React)

A responsive e-commerce web app built with React that supports product browsing, authentication, cart and wishlist management, checkout, and order history.

## Live Demo

- Add your deployed link here: `https://your-demo-link.vercel.app`

## Key Features

- Public product browsing for better first-time visitor experience.
- Authentication with login, register, forgot password, and reset password.
- Protected actions: cart, wishlist, checkout, and orders require login.
- Product details page with image slider and search by product title.
- Cart management (add, update quantity, remove, clear cart).
- Wishlist add/remove flow with user feedback notifications.

## Tech Stack

- `React`
- `React Router`
- `Context API`
- `React Query`
- `Axios`
- `Formik` + `Yup`
- `Bootstrap`
- `react-hot-toast`

## UX Notes

- Users can open the app and browse products without logging in.
- If a user clicks actions like **Add To Cart** or **Wishlist** while logged out, they are redirected to `Login` with a clear message.

## Run Locally

```bash
git clone <your-repo-url>
cd ECommerce-Website-main
npm install
npm start
```

App runs on: [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/Components` - UI pages and reusable sections.
- `src/Context` - global app state (token, cart).
- `src/Assets` - static images and icons.

## Future Improvements

- Add skeleton loaders and empty-state illustrations across more pages.
- Add unit/integration tests for cart and authentication flows.
- Improve accessibility attributes and keyboard interactions.

## Author

- Add your name and GitHub profile here.
