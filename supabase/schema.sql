-- Idempotent schema for NeuroBuy
-- Safe to run multiple times in Supabase SQL editor

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


