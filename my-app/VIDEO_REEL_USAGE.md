# Video Reel Section Usage Guide

The `VideoReelSection` component displays a vertical video (9:16 reel format) below the hero section on your homepage.

## Props

```typescript
interface VideoReelSectionProps {
  videoUrl: string;        // Required: URL of the video
  title?: string;          // Optional: Section title
  subtitle?: string;       // Optional: Section subtitle
  thumbnail?: string;      // Optional: Thumbnail image URL (for non-Instagram videos)
}
```

## Usage Examples

### 1. YouTube Video (Shorts/Regular)

```tsx
<VideoReelSection
  videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  title="Experience SyncRetreat"
  subtitle="See what a month of deep work and adventure looks like"
  thumbnail="/images/video-thumbnail.jpg"
/>

// Or YouTube Shorts:
<VideoReelSection
  videoUrl="https://youtube.com/shorts/XXXXXXXXXXX"
/>
```

### 2. Instagram Reel

```tsx
<VideoReelSection
  videoUrl="https://www.instagram.com/reel/ABC123xyz/"
  title="Life at SyncRetreat"
  subtitle="A glimpse into our community"
/>
```

### 3. Direct Video File

```tsx
<VideoReelSection
  videoUrl="/video.mp4"
  title="Behind the Scenes"
  subtitle="Watch our retreat in action"
  thumbnail="/images/video-cover.jpg"
/>

// Or external CDN:
<VideoReelSection
  videoUrl="https://cdn.example.com/videos/retreat-tour.mp4"
/>
```

## How to Update Video on Homepage

1. Open `src/app/page.tsx`
2. Find the `<VideoReelSection />` component (right after `<Hero />`)
3. Replace the `videoUrl` prop with your video URL:

```tsx
<VideoReelSection
  videoUrl="YOUR_VIDEO_URL_HERE"
  title="Custom Title"
  subtitle="Custom subtitle"
/>
```

## Features

- **Responsive Design**: Automatically adjusts to mobile/desktop
- **9:16 Aspect Ratio**: Perfect for Instagram/TikTok/YouTube Shorts
- **Play Button**: Shows thumbnail with play button before playing
- **Mute Control**: For direct video files (not needed for YouTube/Instagram)
- **Auto-sizing**: Max width of 400px with proper vertical scrolling

## Video Format Recommendations

- **Aspect Ratio**: 9:16 (1080x1920 or 1080x1350)
- **Duration**: 15-60 seconds recommended
- **File Size**: Keep under 50MB for direct uploads
- **Formats**: MP4, WebM for direct files

## Current Location

The video reel appears on:
- Homepage (`/`) - between Hero and Calendar sections

## Styling

The component uses:
- Rounded corners (rounded-3xl)
- Shadow effects (shadow-2xl)
- Gradient backgrounds for placeholder
- Emerald color scheme matching your brand
