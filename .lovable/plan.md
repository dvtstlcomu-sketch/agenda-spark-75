# Admin Panel & Authentication for CEO

The CEO needs a private area to manage property uploads and user registrations. This involves setting up authentication, user roles (specifically an 'admin' role for the CEO), and a dedicated dashboard.

## User Review Required

> [!IMPORTANT]
> - We will use **Lovable Cloud** (Supabase) for authentication and data storage.
> - The CEO will need to sign up first, and then I will manually (or via script) promote that account to 'admin'.

## Proposed Changes

### Backend & Security
- Enable **Lovable Cloud** (Supabase) for the project.
- Create a `user_roles` table and a `has_role` security definer function to manage admin permissions securely.
- Update the `PROPERTIES` management to use a database table instead of local state, with RLS policies allowing only admins to "validate" or delete them.

### Authentication & Authorization
- Create a `src/routes/auth.tsx` page for Login/Signup.
- Create a pathless layout `src/routes/_authenticated.tsx` to protect admin routes.
- Implement a `requireSupabaseAuth` middleware for server functions.

### CEO Admin Panel
- Create a new route `src/routes/_authenticated/admin/dashboard.tsx`.
- **Photo Validation**: A list of recently uploaded properties where the CEO can mark them as "Validated" (making them public) or "Rejected".
- **User Management**: A view to see registered users and their details.

### UI Improvements
- Add a "CEO Login" link in the footer (discreet).
- Update the property upload flow to save to the database as "pending validation".

## Technical Details
- **Tables**: `properties` (id, title, description, status, image_url, beds, baths, area, location, validated, created_by), `user_roles` (user_id, role).
- **RLS**: `SELECT` on `properties` allowed for all where `validated = true`. `INSERT` allowed for authenticated users. Full access for `admin` role.
- **Framework**: TanStack Start v1, React 19, Tailwind CSS v4.
