# Theme System Guide

This document outlines the comprehensive theme system implemented in the Personal Portfolio application.

> The full project handbook is [`project_context.md`](project_context.md). Where this guide and the handbook disagree, the handbook is right. Known gaps in the theme system are listed at the end of this guide.

## Overview

The application supports a complete dark/light theme switching system that affects all components consistently. The theme is managed through React Context and persists across sessions using localStorage.

## Theme Context

### Location: `contexts/theme-context.tsx`

The theme context provides:
- **Theme state**: 'dark' | 'light'
- **toggleTheme()**: Function to switch between themes
- **Automatic persistence**: Theme preference saved to localStorage
- **Body class management**: Adds `bg-black text-white` or `bg-white text-black` to the document body. These classes currently have no effect: the `body` rule in `app/globals.css` overrides them, so the body stays black in both themes

### Usage

```tsx
import { useTheme } from "@/contexts/theme-context";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
      Content
    </div>
  );
}
```

## Theme Implementation Patterns

### 1. Conditional Classes Pattern

```tsx
className={`base-class ${theme === 'dark' ? 'dark-class' : 'light-class'}`}
```

### 2. Component Theme Integration

All UI components should:
1. Import `useTheme` hook
2. Apply conditional classes based on theme
3. Support both dark and light variants

### 3. Color Schemes

#### Dark Theme
- Background: `bg-black`, `bg-zinc-900`
- Text: `text-white`, `text-zinc-300`
- Borders: `border-zinc-800`, `border-zinc-900`
- Muted: `text-zinc-400`, `text-zinc-500`

#### Light Theme
- Background: `bg-white`, `bg-zinc-50`
- Text: `text-black`, `text-zinc-700`
- Borders: `border-zinc-200`, `border-zinc-300`
- Muted: `text-zinc-600`, `text-zinc-500`

## Updated Components

### Core UI Components
- ✅ **Card**: Full theme support with conditional styling
- ✅ **Text**: Dynamic text colors based on theme
- ✅ **Button**: All variants support theme switching
- ✅ **Navigation**: Complete theme integration
- ✅ **Footer**: Theme-aware border (the text colour is the same in both themes)
- ✅ **ThemeSeparator**: Theme-aware divider

### Sections
- ✅ **Hero**: Profile image background theme-aware
- ✅ **Experience**: Cards and content theme-adaptive
- ✅ **Projects**: Cards and content theme-adaptive
- ✅ **Contact**: Cards and content theme-support (there are no forms)
- **About**: Themed, but not mounted on the page

## Best Practices for Future Development

### 1. New Components
Always include theme support:
```tsx
"use client";
import { useTheme } from "@/contexts/theme-context";

export function NewComponent() {
  const { theme } = useTheme();
  
  return (
    <div className={`p-4 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
      {/* Content */}
    </div>
  );
}
```

### 2. Styling Guidelines
- Use the zinc scale classes directly; the CSS variables in `app/globals.css` do not change with the theme
- Maintain contrast ratios for accessibility
- Test both themes during development
- Use conditional classes for theme-specific styles

### 3. Theme Testing
1. Test theme switching functionality
2. Verify all components respond to theme changes
3. Check color contrast in both themes
4. Ensure theme persistence works

## Theme Switching Implementation

### Theme Toggle Button
Located in Navigation component:
- Uses Sun/Moon icons
- Smooth transitions
- Immediate visual feedback

### CSS Transitions
Most theme changes are instant. `transition-colors duration-300` is set only on `<body>`, whose colours do not change. Cards use `duration-200`, and links and buttons get a 150ms colour transition from `app/globals.css`.

## Future Enhancements

### Potential Improvements
1. **System Theme Detection**: Auto-detect OS theme preference
2. **Theme Variants**: Add more color schemes (blue, green, etc.)
3. **Theme Animations**: Add subtle animations during theme transitions
4. **Theme Customization**: Allow user color customization

### Implementation Considerations
- Always test theme changes across all breakpoints
- Ensure accessibility standards are met in both themes
- Consider performance impact of theme switching
- Maintain consistent design language across themes

## Troubleshooting

### Common Issues
1. **Component not responding to theme**: Ensure `useTheme` hook is imported and used
2. **Theme not persisting**: Check localStorage functionality
3. **Styling conflicts**: The rules for `body`, `h1`-`h6`, `p`, `a` and `button` in `app/globals.css` are outside Tailwind's layers, so they override utility classes on those elements whatever the specificity

### Debug Steps
1. Check browser console for errors
2. Verify theme context is properly initialized
3. Test localStorage persistence
4. Validate CSS class application

## Files Modified

- `contexts/theme-context.tsx` - Core theme management
- `app/layout.tsx` - Removed hardcoded body classes
- `app/sections/hero.tsx` - Profile image background theme
- `components/ui/card.tsx` - Complete theme support
- `components/ui/text.tsx` - Dynamic text colors
- `components/ui/button.tsx` - Theme-aware button variants
- All section components updated for theme consistency

## Known Gaps

- The first paint is always dark. A stored light preference is applied only after the page hydrates.
- The `dark` class set on `<html>` is not used by any CSS. Tailwind `dark:` utilities would follow the operating system setting, not the toggle.
- In light theme the body stays black (visible behind the footer), and the keyboard focus ring and selected text are white.
- A few colours ignore the theme: muted text in Experience and Projects, the footer text, the hero scroll arrow.

Details and fixes are tracked in the handbook's open-items section.
