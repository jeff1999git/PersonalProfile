# Theme System Guide

This document outlines the comprehensive theme system implemented in the Personal Portfolio application.

## Overview

The application supports a complete dark/light theme switching system that affects all components consistently. The theme is managed through React Context and persists across sessions using localStorage.

## Theme Context

### Location: `contexts/theme-context.tsx`

The theme context provides:
- **Theme state**: 'dark' | 'light'
- **toggleTheme()**: Function to switch between themes
- **Automatic persistence**: Theme preference saved to localStorage
- **Body class management**: Automatically applies appropriate classes to document body

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
- ✅ **Footer**: Theme-aware styling

### Sections
- ✅ **Hero**: Profile image background theme-aware
- ✅ **About**: All text and cards theme-responsive
- ✅ **Projects**: Cards and content theme-adaptive
- ✅ **Contact**: Forms and content theme-support

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
- Use semantic color tokens (zinc scale)
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
All theme changes include smooth transitions:
```css
transition-colors duration-300
```

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
3. **Styling conflicts**: Verify CSS specificity and Tailwind class ordering

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

This theme system ensures a consistent and accessible experience across both light and dark modes throughout the application.
