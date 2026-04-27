# Zoomr

Zoomr is a video conferencing app built with Next.js, Clerk, and Stream. It lets authenticated users create meetings, join calls, schedule meetings, view recordings, and use a personal room for recurring one-on-one or private meetings.

## Features

- Authentication with Clerk sign-in and sign-up flows.
- Instant meeting creation from the home dashboard.
- Scheduled meetings with a date/time picker and optional description.
- Meeting join flow through direct invitation links.
- Personal room with a reusable meeting link.
- Active call controls, including layout switching, participant list toggle, call stats, and leaving or ending the meeting.
- Recordings page for past recorded meetings.
- Protected routes so only signed-in users can access the app.

## Tech Stack

- Next.js App Router
- React 19
- Clerk for authentication and route protection
- Stream Video for real-time meetings
- Tailwind CSS for styling
- Sonner for notifications

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root and add:

```bash
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_api_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

You will also need the Clerk environment variables required by your Clerk setup, such as the publishable key and secret key.

### 3. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## How To Use

### Authentication

Sign up or sign in first. The app protects the main routes, so unauthenticated users are redirected to the Clerk auth pages.

### Home Dashboard

The home page shows the current time and date, plus four main actions:

- New Meeting: create an instant meeting.
- Schedule Meeting: set a date, time, and optional description, then create a future meeting.
- View Recordings: open the recordings list.
- Join Meeting: paste an invitation link and join directly.

### Meeting Room

Inside a meeting you can:

- Switch between grid and speaker layouts.
- Show or hide the participants panel.
- View meeting stats.
- Leave the meeting.
- End the call for everyone if you are the host.

### Upcoming, Previous, and Recordings

- Upcoming shows upcoming calls.
- Previous shows past calls.
- Recordings shows available meeting recordings and lets you play them.

### Personal Room

The personal room page gives you a dedicated meeting ID and invite link. You can start the room directly or copy the invitation link for others.

## Folder Structure

```text
actions/            Server actions for Stream token generation
app/                Next.js App Router routes and layouts
	(auth)/           Clerk sign-in and sign-up pages
	(root)/           Protected app routes
		(home)/         Dashboard, upcoming, previous, recordings, personal room
		meeting/[id]/   Meeting room page
	api/              API routes
components/         Reusable UI and meeting components
constants/          Shared static data such as sidebar items
hooks/              Custom data-fetching hooks
lib/                Shared utility helpers
providers/          App providers, including Stream client setup
public/             Static assets like icons, images, and avatars
```

## Key Routes

- `/` - Home dashboard
- `/upcoming` - Upcoming meetings
- `/previous` - Previous meetings
- `/recordings` - Meeting recordings
- `/personal-room` - Personal room details
- `/meeting/[id]` - Live meeting room
- `/sign-in` - Clerk sign-in
- `/sign-up` - Clerk sign-up

## Notes

- The app expects `NEXT_PUBLIC_BASE_URL` to match the host you are using locally or in production.
- Stream tokens are generated on the server, so both the public API key and the secret key must be set correctly.
- Make sure you are signed in before using the protected app routes.
