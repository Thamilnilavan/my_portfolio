# Portfolio admin setup

## 1. Create MongoDB Atlas

1. Create a MongoDB Atlas project and free cluster.
2. Create a database user with read/write access.
3. Add the Vercel deployment network to Atlas Network Access. For a simple
   Vercel setup, Atlas commonly uses `0.0.0.0/0` together with a strong database
   username and password.
4. Copy the application connection string.

If the database password contains reserved URL characters, URL-encode it before
placing it in the connection string.

## 2. Generate admin credentials

Run:

```bash
npm run admin:secrets
```

Save the one-time password in a password manager. Copy the generated hash and
session secret into the environment variables below.

## 3. Configure environment variables

Add these values to `.env.local` for local development and to Vercel Project
Settings → Environment Variables for Production and Preview:

```env
MONGODB_URI=
MONGODB_DB=portfolio
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=
ADMIN_SESSION_SECRET=
```

Never commit real values or the one-time admin password.

## 4. Import existing content

1. Restart the local development server or redeploy Vercel.
2. Open `/admin/login`.
3. Sign in with `ADMIN_EMAIL` and the one-time password.
4. Select **Import current content** once.

After importing, the public portfolio reads published records from MongoDB.
Unpublished records remain visible only inside the admin dashboard.

## Image uploads

Images uploaded from the admin dashboard are stored in the MongoDB `uploads`
collection and served from `/api/images/<image-id>`. No additional storage
service is required. On Vercel, each image must be 4 MB or smaller.
