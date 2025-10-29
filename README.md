# Thy Nguyen - GitHub Pages Landing

A minimal, techy landing page built with React and CSS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The project is set up with GitHub Actions for automatic deployment:

1. Push your code to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Make sure GitHub Pages is enabled in your repository settings:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"

### Manual Deployment

If you prefer manual deployment:

1. Build the project: `npm run build`
2. The `dist/` folder contains the production build
3. Copy the contents of `dist/` to your repository root (or use gh-pages package)

