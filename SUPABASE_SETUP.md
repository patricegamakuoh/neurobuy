# Supabase Setup Guide

Your Next.js app is now configured with Supabase for authentication, database operations, and file storage.

## 🚀 What's Been Set Up

### ✅ **Environment Configuration**
- Environment variables template ready
- Supabase client and server configurations
- TypeScript types for database schema

### ✅ **Authentication System**
- Client-side and server-side auth utilities
- OAuth providers support (Google, GitHub, etc.)
- Session management and user profiles
- Password reset and profile updates

### ✅ **Database Operations**
- CRUD operations for profiles, products, orders
- Search and pagination utilities
- Type-safe database queries

### ✅ **File Storage**
- Image upload utilities
- Public URL generation
- File deletion helpers

### ✅ **Middleware & Routes**
- Authentication middleware
- OAuth callback handling
- Protected route management

## 📁 File Structure

```
app/
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # Client-side Supabase client
│   │   ├── server.ts          # Server-side Supabase client
│   │   └── types.ts           # Database type definitions
│   ├── auth.ts                # Authentication utilities
│   ├── database.ts            # Database operation helpers
│   └── utils.ts               # General utilities
├── auth/
│   └── callback/
│       └── route.ts           # OAuth callback handler
└── middleware.ts              # Authentication middleware
```

## 🔧 Environment Setup

**Create `.env.local` file in your project root with:**

```env
# Supabase Configuration
# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://qlqwnkhtcyejarumscps.supabase.co

# Your Supabase anon/public key
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFscXdua2h0Y3llamFydW1zY3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5OTk2ODIsImV4cCI6MjA3NTU3NTY4Mn0.FG_62w7O9r80fFd5dwfUKxjuz0aV4Isp-_bY0I3QYcw

# Your Supabase service role key (for server-side operations)
# ⚠️ Keep this secret and never expose it to the client
# Get this from your Supabase project settings > API
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Optional: Database connection string for direct database access
# DATABASE_URL=postgresql://postgres:[password]@db.qlqwnkhtcyejarumscps.supabase.co:5432/postgres
```

## 🗄️ Database Schema

The following tables are configured in your types:

### **profiles**
- `id` (string) - User ID (matches auth.users)
- `email` (string) - User email
- `full_name` (string, nullable) - User's full name
- `avatar_url` (string, nullable) - Profile picture URL
- `created_at` (string) - Creation timestamp
- `updated_at` (string) - Last update timestamp

### **products**
- `id` (string) - Product ID
- `name` (string) - Product name
- `description` (string, nullable) - Product description
- `price` (number) - Product price
- `image_url` (string, nullable) - Product image URL
- `category` (string, nullable) - Product category
- `stock_quantity` (number) - Available stock
- `created_at` (string) - Creation timestamp
- `updated_at` (string) - Last update timestamp

### **orders**
- `id` (string) - Order ID
- `user_id` (string) - User who placed the order
- `total_amount` (number) - Total order amount
- `status` (string) - Order status
- `shipping_address` (JSON, nullable) - Shipping information
- `created_at` (string) - Creation timestamp
- `updated_at` (string) - Last update timestamp

### **order_items**
- `id` (string) - Order item ID
- `order_id` (string) - Associated order
- `product_id` (string) - Product in the order
- `quantity` (number) - Quantity ordered
- `price` (number) - Price at time of order
- `created_at` (string) - Creation timestamp

### Idempotent SQL Example

If you need to create tables manually in the SQL editor and avoid errors like `relation "users" already exists`, use idempotent SQL:

```sql
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text unique,
  role text check (role in ('customer','vendor','admin')),
  address text,
  phone text,
  created_at timestamp default now()
);

create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references users(id),
  store_name text,
  description text,
  logo_url text,
  rating numeric default 0,
  status text default 'active',
  joined_at timestamp default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid references vendors(id),
  name text,
  category text,
  description text,
  price numeric,
  currency text default 'XAF',
  stock int default 0,
  image_urls text[],
  created_at timestamp default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  vendor_id uuid references vendors(id),
  total_amount numeric,
  payment_status text default 'pending',
  logistics_tracking text,
  shipping_address text,
  created_at timestamp default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  product_id uuid references products(id),
  quantity int,
  price numeric
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  user_id uuid references users(id),
  amount numeric,
  currency text default 'XAF',
  method text,
  status text,
  created_at timestamp default now()
);

create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  product_link text,
  details text,
  status text default 'in_review',
  created_at timestamp default now()
);
```

Note: If you already created any of these tables with `uuid_generate_v4()`, replace it with `gen_random_uuid()` or enable the `uuid-ossp` extension.

## 🔐 Authentication Usage

### **Client-Side Authentication**

```tsx
import { auth } from '@/lib/auth'

// Sign up
const { data, error } = await auth.signUp(email, password, fullName)

// Sign in
const { data, error } = await auth.signIn(email, password)

// Sign in with Google
const { data, error } = await auth.signInWithGoogle()

// Sign out
const { error } = await auth.signOut()

// Get current user
const { user, error } = await auth.getCurrentUser()

// Listen to auth changes
const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session)
})
```

### **Server-Side Authentication**

```tsx
import { serverAuth } from '@/lib/auth'

// Get user in server component
const { user, error } = await serverAuth.getUser()

// Get session in server component
const { session, error } = await serverAuth.getSession()
```

## 🗃️ Database Operations

### **Products**

```tsx
import { products } from '@/lib/database'

// Get all products with pagination
const { data, error, count } = await products.getAll(1, 20)

// Get product by ID
const { data, error } = await products.getById(productId)

// Search products
const { data, error } = await products.search('laptop', 1, 20)

// Get products by category
const { data, error } = await products.getByCategory('electronics', 1, 20)
```

### **User Profiles**

```tsx
import { profiles } from '@/lib/database'

// Get user profile
const { data, error } = await profiles.get(userId)

// Update profile
const { data, error } = await profiles.update(userId, {
  full_name: 'John Doe',
  avatar_url: 'https://example.com/avatar.jpg'
})
```

### **Orders**

```tsx
import { orders } from '@/lib/database'

// Get user orders
const { data, error } = await orders.getUserOrders(userId, 1, 20)

// Create order
const { data, error } = await orders.create({
  user_id: userId,
  total_amount: 99.99,
  status: 'pending',
  shipping_address: { /* address object */ }
})
```

## 📁 File Storage

```tsx
import { utils } from '@/lib/database'

// Upload file
const { data: url, error } = await utils.uploadFile(
  'product-images', 
  'products/product-1.jpg', 
  file
)

// Get file URL
const url = utils.getFileUrl('product-images', 'products/product-1.jpg')

// Delete file
const { error } = await utils.deleteFile('product-images', 'products/product-1.jpg')
```

## 🛡️ Protected Routes

The middleware automatically protects routes:

- `/admin/*` - Requires authentication
- `/dashboard/*` - Requires authentication
- `/auth/signin` & `/auth/signup` - Redirects authenticated users

## 🚀 Next Steps

1. **Create the database tables** in your Supabase dashboard
2. **Set up Row Level Security (RLS)** policies
3. **Configure OAuth providers** in Supabase Auth settings
4. **Create your first components** using the auth and database utilities

## 📚 Supabase Dashboard

Access your project at: https://supabase.com/dashboard/project/qlqwnkhtcyejarumscps

### **Key Sections:**
- **Authentication** - User management and OAuth providers
- **Database** - Table editor and SQL editor
- **Storage** - File uploads and management
- **API** - API keys and documentation
- **Settings** - Project configuration

## 🔧 Additional Configuration

### **Enable OAuth Providers**
1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Google, GitHub, or other providers
3. Add your OAuth app credentials

### **Set up Row Level Security**
```sql
-- Enable RLS on tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Example policy for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

---

**Your Supabase integration is ready!** 🎉 Start building your e-commerce features with full authentication and database support.

## ⛏️ Running the schema safely

Use one of the following approaches to avoid duplicate table errors:

- Run the idempotent script from `supabase/schema.sql` in the Supabase SQL editor. It uses `create table if not exists` and `gen_random_uuid()` and can be executed multiple times.
- If you previously created tables with `uuid_generate_v4()`, either enable the `uuid-ossp` extension or update defaults to `gen_random_uuid()`.
- Never mix two `users` sources. Prefer linking to `auth.users` via a `profiles` table keyed by `auth.uid()`.
