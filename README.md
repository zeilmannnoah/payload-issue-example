# Payload CMS — Relationship Filter Bug Repro

Minimal reproduction for a bug where selecting a value in a **relationship filter** on the admin list view causes the selected value to flash, clear, and then re-select.

[flicker.gif](/gif/flicker.gif)

## Bug Description

When filtering a collection by a `relationship` field in the admin list view, selecting a value from the dropdown causes the filter to:

1. Briefly show the selected value
2. Clear itself
3. Re-select the value

This flicker/double-select happens every time a relationship filter value is chosen.

## Setup

Requires Node.js and a running MongoDB instance.

```bash
git clone <this-repo>
cd <this-repo>
cp .env.example .env
pnpm install
pnpm dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) and log in with:

- **Email:** `dev@payloadcms.com`
- **Password:** `password`

These credentials are created automatically on first startup, along with seed data (5 tags and 8 posts).

## Reproducing the Bug

1. Go to the **Posts** collection in the admin panel
2. Click the **filter icon** (columns/filter controls at the top of the list)
3. Add a filter on the **Tag** field
4. Select any tag value from the dropdown (e.g. "Bug")
5. Observe the value flash, clear, then re-select

## Collections

- **Tags** — simple collection with a `name` field, used as the relationship target
- **Posts** — collection with a `title` (text) and `tag` (relationship to Tags), where the bug is visible

## Stack

- `payload@3.93.0`
- `@payloadcms/db-mongodb@3.93.0`
- MongoDB (local instance)
