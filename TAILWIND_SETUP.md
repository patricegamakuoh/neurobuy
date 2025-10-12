# Tailwind CSS Setup Guide

This project is configured with **Tailwind CSS v4** for modern, responsive design.

## 🚀 Features

- ✅ **Tailwind CSS v4** - Latest version with improved performance
- ✅ **Custom Design System** - Comprehensive color palette and theme variables
- ✅ **Dark Mode Support** - Automatic dark/light mode switching
- ✅ **Responsive Components** - Pre-built layout components
- ✅ **Custom Utilities** - Extended utility classes for common patterns
- ✅ **TypeScript Support** - Full type safety for configuration

## 📁 Project Structure

```
app/
├── components/
│   └── layout/
│       ├── Container.tsx    # Responsive container component
│       ├── Grid.tsx         # Flexible grid system
│       └── Flex.tsx         # Flexbox utilities
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
├── globals.css             # Global styles and Tailwind imports
└── layout.tsx              # Root layout with fonts
```

## 🎨 Design System

### Color Palette
- **Primary**: Dark slate for main actions
- **Secondary**: Light gray for secondary elements
- **Muted**: Subtle text and backgrounds
- **Accent**: Interactive hover states
- **Destructive**: Error and warning states

### Custom CSS Variables
All colors are defined as CSS variables for easy theming:

```css
:root {
  --primary: #0f172a;
  --secondary: #f1f5f9;
  --muted: #f1f5f9;
  /* ... and more */
}
```

## 🧩 Layout Components

### Container
Responsive container with max-width constraints:

```tsx
<Container size="lg">
  <h1>Your content here</h1>
</Container>
```

### Grid
Flexible grid system with responsive breakpoints:

```tsx
<Grid cols={3} gap="lg" responsive>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### Flex
Flexbox utilities with responsive direction:

```tsx
<Flex justify="between" align="center" gap="md">
  <span>Left content</span>
  <span>Right content</span>
</Flex>
```

## 🎯 Custom Utility Classes

### Button Variants
```css
.btn-primary    /* Primary button style */
.btn-secondary  /* Secondary button style */
.btn-outline    /* Outlined button style */
.btn-ghost      /* Ghost button style */
```

### Size Variants
```css
.btn-sm         /* Small button */
.btn-md         /* Medium button */
.btn-lg         /* Large button */
```

### Layout Utilities
```css
.container      /* Responsive container */
.section-padding /* Consistent section spacing */
.grid-responsive /* Responsive grid */
.grid-auto-fit  /* Auto-fitting grid */
```

### Animations
```css
.animate-fade-in   /* Fade in animation */
.animate-slide-up  /* Slide up animation */
```

## 📱 Responsive Breakpoints

- **xs**: 475px
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px
- **3xl**: 1600px

## 🌙 Dark Mode

Dark mode is automatically enabled based on system preferences. All components and utilities support both light and dark themes.

## 🛠️ Configuration Files

### `tailwind.config.ts`
Extended configuration with custom colors, fonts, animations, and breakpoints.

### `postcss.config.mjs`
PostCSS configuration with Tailwind CSS plugin.

### `globals.css`
Global styles, CSS variables, and custom utility classes.

## 🚀 Getting Started

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **View the demo page** at `http://localhost:3000`

## 📝 Usage Examples

### Basic Responsive Layout
```tsx
<div className="container section-padding">
  <Grid cols={3} gap="lg" responsive>
    <div className="card p-6">
      <h3 className="text-xl font-semibold mb-4">Feature 1</h3>
      <p className="text-muted-foreground">Description here</p>
    </div>
  </Grid>
</div>
```

### Responsive Navigation
```tsx
<Flex justify="between" align="center" className="py-4">
  <h1 className="text-2xl font-bold">Logo</h1>
  <nav className="hidden sm:flex gap-6">
    <a href="#" className="hover:text-primary transition-colors">Home</a>
    <a href="#" className="hover:text-primary transition-colors">About</a>
  </nav>
</Flex>
```

### Button with Hover Effects
```tsx
<button className="btn btn-primary btn-lg hover:shadow-lg transition-shadow">
  Get Started
</button>
```

## 🎨 Customization

### Adding New Colors
1. Add CSS variables to `globals.css`
2. Map them in the `@theme inline` block
3. Update `tailwind.config.ts` if needed

### Creating New Components
Use the existing layout components as templates and extend them with additional props and styling.

### Adding Animations
Define keyframes in `globals.css` and add corresponding utility classes.

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS v4 Guide](https://tailwindcss.com/docs/v4-beta)
- [Next.js Documentation](https://nextjs.org/docs)
- [Responsive Design Patterns](https://tailwindcss.com/docs/responsive-design)

---

**Happy coding!** 🎉 Your Tailwind CSS setup is ready for building beautiful, responsive e-commerce interfaces.
