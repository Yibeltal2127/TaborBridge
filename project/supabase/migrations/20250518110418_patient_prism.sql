/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - role (enum)
      - email (text, unique)
      - first_name (text)
      - last_name (text)
      - mobile (text)
      - business_name (text)
      - business_type (enum)
      - business_address (text)
      - business_license (text)
      - tax_id (text)
      - industry (text)
      - verification_status (enum)
      - profile_completion (integer)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - materials
      - id (uuid, primary key)
      - seller_id (uuid, references users)
      - name (text)
      - category (text)
      - description (text)
      - price (numeric)
      - unit (text)
      - stock (integer)
      - min_order (integer)
      - specifications (jsonb)
      - images (text[])
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - orders
      - id (uuid, primary key)
      - buyer_id (uuid, references users)
      - seller_id (uuid, references users)
      - status (enum)
      - total_amount (numeric)
      - delivery_address (text)
      - delivery_method (text)
      - delivery_fee (numeric)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - order_items
      - id (uuid, primary key)
      - order_id (uuid, references orders)
      - material_id (uuid, references materials)
      - quantity (integer)
      - unit_price (numeric)
      - total_price (numeric)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create enums
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin');
CREATE TYPE business_type AS ENUM ('individual', 'small_business', 'medium_business', 'large_business');
CREATE TYPE verification_status AS ENUM ('pending', 'under_review', 'approved', 'requires_more_info');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role user_role NOT NULL,
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  mobile text,
  business_name text,
  business_type business_type,
  business_address text,
  business_license text,
  tax_id text,
  industry text,
  verification_status verification_status DEFAULT 'pending',
  profile_completion integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create materials table
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  unit text NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  min_order integer NOT NULL DEFAULT 1,
  specifications jsonb DEFAULT '{}',
  images text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid REFERENCES users(id) ON DELETE SET NULL,
  seller_id uuid REFERENCES users(id) ON DELETE SET NULL,
  status order_status DEFAULT 'pending',
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  delivery_address text NOT NULL,
  delivery_method text NOT NULL,
  delivery_fee numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  material_id uuid REFERENCES materials(id) ON DELETE SET NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric NOT NULL CHECK (unit_price >= 0),
  total_price numeric NOT NULL CHECK (total_price >= 0),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for users
CREATE POLICY "Users can view their own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for materials
CREATE POLICY "Anyone can view materials"
  ON materials
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Sellers can manage their materials"
  ON materials
  FOR ALL
  TO authenticated
  USING (auth.uid() = seller_id);

-- Create policies for orders
CREATE POLICY "Users can view their orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Buyers can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Users can update their orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Create policies for order items
CREATE POLICY "Users can view their order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_id
      AND (orders.buyer_id = auth.uid() OR orders.seller_id = auth.uid())
    )
  );

CREATE POLICY "Buyers can create order items"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_id
      AND orders.buyer_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS materials_seller_id_idx ON materials(seller_id);
CREATE INDEX IF NOT EXISTS materials_category_idx ON materials(category);
CREATE INDEX IF NOT EXISTS orders_buyer_id_idx ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS orders_seller_id_idx ON orders(seller_id);
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);
CREATE INDEX IF NOT EXISTS order_items_material_id_idx ON order_items(material_id);