# Reddit client

Choose from different Reddit feeds and see the comments.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Features

- Browse Reddit feeds: Hot, New, and Top posts
- Paginated list of articles
- View and hide comments for each article
- Responsive UI with Bootstrap

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying [`pages/index.js`](pages/index.js). The page auto-updates as you edit the file.

## Testing

Run existing tests in the terminal:

```bash
npm test
# or
yarn test
```

## Project Structure

- `pages/` - Next.js pages (entry points)
- `components/` - React components (PaginatedList, CommentSection)
- `public/` - Static assets (e.g., loader.gif)
- `.next/` - Build output (auto-generated)
- `jest.config.js` - Jest configuration

## Dependencies

- next
- react
- react-dom
- bootstrap
- enzyme (for testing)
- jest (for testing)

## License

MIT (add your license here)