# Frontend Challenge - Improved Version

## 📋 Overview

This project is a comprehensive frontend application built with **Next.js 16**, **React 19**, **TypeScript**, **Chakra UI v3**, and **Tailwind CSS 4**. It demonstrates modern web development practices including authentication, data fetching with React Query, and advanced UI components.

## ✨ Key Improvements Made

### 1. Advanced Select Component (AdvancedSelect)

The `AdvancedSelect` component has been completely redesigned with all requested features:

#### Features Implemented:
- ✅ **Headless UI (Listbox)**: Built using `@headlessui/react` for accessibility
- ✅ **Tailwind Styling**: Fully styled with Tailwind CSS utility classes
- ✅ **Search Functionality**: Real-time filtering of items
- ✅ **Multi-Select**: Select multiple items at once
- ✅ **Grouping**: Items can be grouped by category (using the `group` property)
- ✅ **Select All/None**: Buttons to quickly select or clear all items
- ✅ **Selection Count Display**: Shows number of selected items in the button
- ✅ **Virtualization**: Efficient rendering of large lists using `@tanstack/react-virtual`
- ✅ **Smooth Transitions**: Beautiful animations using Headless UI transitions
- ✅ **Results Counter**: Shows filtered results count

#### Usage Example:
```tsx
import AdvancedSelect from '@/app/_components/ui/AdvancedSelect/AdvancedSelect'
import { SelectItem } from '@/app/_components/ui/AdvancedSelect/types'

const [selected, setSelected] = useState<SelectItem[]>([])

const items: SelectItem[] = [
  { id: '1', label: 'Item 1', group: 'Category A' },
  { id: '2', label: 'Item 2', group: 'Category A' },
  { id: '3', label: 'Item 3', group: 'Category B' },
]

<AdvancedSelect 
  items={items} 
  value={selected} 
  onChange={setSelected}
  placeholder="Select items..."
  searchPlaceholder="Search..."
/>
```

### 2. Dashboard Pages - UI Improvements

#### Login Page (`/login`)
- 🎨 Beautiful gradient background
- 💳 Card-based layout with shadow effects
- 🔐 Form validation
- ⏳ Loading states
- 💡 Demo credentials displayed
- ✨ Smooth animations and transitions

#### Dashboard Home (`/dashboard`)
- 📊 Quick stats cards with icons
- 🎯 Interactive quick action cards
- 📈 Mock statistics display
- 🔗 Navigation links to all sections
- 💫 Hover effects and animations

#### Users Page (`/dashboard/users`)
- 📋 Enhanced table with avatar display
- 📊 Statistics cards (Total, Active, Page)
- 👤 User details including company and role
- 🎨 Badge components for status and roles
- 📱 Responsive grid layout

#### Products Page (`/dashboard/products`)
- 🛍️ Product grid with beautiful cards
- 🎨 Category badges
- ⭐ Star ratings display
- 💰 Price with discount information
- 🔍 Advanced filtering using the improved AdvancedSelect
- 📦 Product images with fallback
- ✨ Hover effects and animations

#### Product Detail Page (`/dashboard/products/[id]`)
- 🖼️ Large product image with gallery
- 💳 Detailed product information cards
- 📊 Comprehensive specifications
- 🏷️ Tags and categories
- ⭐ Ratings and reviews
- 💰 Price breakdown with savings calculation
- 📱 Responsive two-column layout

### 3. Games Section - UI Improvements

#### Games List Page (`/games`)
- 🎮 Beautiful game cards with images
- 🔍 Real-time search functionality
- ⭐ Game ratings display
- 🏷️ Platform badges
- 📊 Metacritic scores with color coding
- 📅 Release date information
- 📱 Responsive grid (1-4 columns)

#### Game Detail Page (`/games/[slug]`)
- 🎬 Hero banner with background image
- 📝 Detailed game description
- 🎮 Platform availability
- 🏷️ Genres and tags
- 📸 Screenshots gallery
- ⭐ Comprehensive ratings
- ℹ️ Full game information (developers, publishers, ESRB)
- 🔗 External links (website, Reddit)

## 🛠️ Technical Stack

### Core Technologies
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Chakra UI v3** - Component library
- **Tailwind CSS 4** - Utility-first CSS

### State Management & Data Fetching
- **@tanstack/react-query** - Server state management
- **@tanstack/react-virtual** - Virtualization for large lists

### UI Components
- **@headlessui/react** - Unstyled, accessible components
- **Framer Motion** - Animations

## 📁 Project Structure

```
app/
├── _components/
│   ├── layout/
│   │   └── Sidebar.tsx
│   └── ui/
│       └── AdvancedSelect/
│           ├── AdvancedSelect.tsx   # Main component
│           ├── types.ts              # TypeScript types
│           └── utils.ts              # Helper functions
├── _context/
│   └── AuthContext.tsx               # Authentication context
├── _hooks/
│   ├── useGames.ts                   # Games data hook
│   ├── useProducts.ts                # Products data hook
│   └── useUsers.ts                   # Users data hook
├── _services/
│   ├── auth.ts                       # Auth service
│   ├── dummyjson.ts                  # DummyJSON API
│   ├── fetcher.ts                    # Base fetcher
│   └── rawg.ts                       # RAWG API
├── _types/
│   └── index.ts                      # TypeScript types
├── dashboard/
│   ├── layout.tsx                    # Dashboard layout
│   ├── page.tsx                      # Dashboard home
│   ├── products/
│   │   ├── page.tsx                  # Products list
│   │   └── [id]/
│   │       └── page.tsx              # Product detail
│   └── users/
│       └── page.tsx                  # Users list
├── games/
│   ├── page.tsx                      # Games list
│   └── [slug]/
│       └── page.tsx                  # Game detail
├── login/
│   └── page.tsx                      # Login page
├── layout.tsx                        # Root layout
├── page.tsx                          # Home page
├── providers.tsx                     # React Query provider
├── theme.ts                          # Chakra UI theme
└── globals.css                       # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
NEXT_PUBLIC_RAWG_API_KEY=your_rawg_api_key_here
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Demo Credentials

For testing the login functionality:
- **Username**: `emilys`
- **Password**: `emilyspass`

## 📊 API Integration

### DummyJSON API
- **Users**: `https://dummyjson.com/users`
- **Products**: `https://dummyjson.com/products`
- **Authentication**: `https://dummyjson.com/auth/login`

### RAWG Video Games Database
- **Games**: `https://api.rawg.io/api/games`
- **Game Details**: `https://api.rawg.io/api/games/{slug}`
- Requires API key from [rawg.io](https://rawg.io/apidocs)

## 🎨 Design Features

### Color Scheme
- Primary: Blue (600) - `#4f46e5`
- Secondary: Purple (600) - `#7c3aed`
- Success: Green (600) - `#16a34a`
- Danger: Red (600) - `#dc2626`
- Warning: Orange (600) - `#ea580c`

### Typography
- System font stack for optimal performance
- Responsive font sizes
- Proper heading hierarchy

### Responsive Design
- Mobile-first approach
- Breakpoints: base, sm, md, lg, xl
- Grid and flex layouts
- Adaptive components

## ✅ Must-Have Checklist

- [x] All challenges implemented
- [x] Uploaded to personal GitHub
- [x] Comprehensive documentation in code and README
- [x] Properly tested and working
- [x] Professional standards applied

## 🌟 Nice-to-Have Features Implemented

- [x] Professional design patterns
- [x] SOLID principles in component design
- [x] Reusable component architecture
- [x] Responsive design throughout
- [x] Accessibility considerations
- [x] Loading states and error handling
- [x] Smooth animations and transitions
- [x] Type safety with TypeScript

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 Component Documentation

### AdvancedSelect Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | SelectItem[] | Yes | Array of items to display |
| value | SelectItem[] | Yes | Currently selected items |
| onChange | (items: SelectItem[]) => void | Yes | Callback when selection changes |
| placeholder | string | No | Placeholder text for button |
| searchPlaceholder | string | No | Placeholder text for search input |

### SelectItem Type

```typescript
type SelectItem = {
  id: string          // Unique identifier
  label: string       // Display label
  group?: string      // Optional group name
}
```

## 🎯 Performance Optimizations

1. **Virtualization**: Large lists use React Virtual for efficient rendering
2. **React Query**: Intelligent caching and background updates
3. **Code Splitting**: Automatic route-based code splitting
4. **Image Optimization**: Next.js Image component (where applicable)
5. **Memoization**: useMemo and useCallback for expensive operations

## 🔒 Security Features

1. JWT token authentication
2. Protected routes with middleware
3. Secure API calls
4. Environment variables for sensitive data

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is created for evaluation purposes.

## 👨‍💻 Author

Frontend Challenge Submission - Bahman 1403

## 🙏 Acknowledgments

- DummyJSON for the mock API
- RAWG for the games database API
- Chakra UI team for the excellent component library
- Tailwind CSS for the utility classes
- Headless UI for accessible components
