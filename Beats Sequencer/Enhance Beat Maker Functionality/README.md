
# Enhance Beat Maker Functionality

This is a code bundle for Enhance Beat Maker Functionality. The original project is available at https://www.figma.com/design/nqhTyfVxhnyPJkR9is0zXL/Enhance-Beat-Maker-Functionality.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Supabase Setup

### 1. Environment variables

Create a `.env.local` file in the project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Database — beats table

Run the following SQL in your Supabase project's **SQL Editor**:

```sql
create table beats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  pattern jsonb not null,
  tempo integer not null,
  created_at timestamptz default now()
);

alter table beats enable row level security;

create policy "Users can manage their own beats"
  on beats for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### 3. Authentication providers

In Supabase → Authentication → Providers, enable:
- **Email** (enabled by default)
- **Google** (requires a Google Cloud OAuth client ID + secret)
