# Guide Muni

Guide Muni is a production-focused React Native (Expo + TypeScript) mobile app that combines multimodal input (voice, image, text, and location) and AI backend integration to deliver helpful responses as both text and spoken English output.

## Features

- **Modern accessible UI** with pink/white gradient theme, decorative hero graphic, and large touch targets.
- **Home dashboard** with quick actions and backend connectivity status.
- **Voice module**
  - STT option (speech -> text -> backend)
  - Raw audio upload option
  - Transcription preview
- **Camera module** for image capture and backend image analysis.
- **Location module** using high accuracy fused location for GPS/network/tower-assisted location.
- **Response module**
  - Text response rendering
  - Server audio playback when available
  - Fallback text-to-speech in English
- **Offline-aware behavior**
  - Connectivity status indicator
  - Local response history with persistence
- **Scalable architecture** with screens, services, hooks, reusable components, Redux Toolkit state management, and utility layer.

## Project Structure

```text
src/
  assets/
  components/
  constants/
  hooks/
  navigation/
  screens/
  services/
  store/
  types/
  utils/
```

## Constants Strategy

The app now includes centralized constants in `src/constants/appConstants.ts`:

- app identity and locale
- API endpoints and backend polling intervals
- retry/storage limits
- shared UI text strings

This allows faster feature changes and safer scaling without hardcoded values scattered across modules.

## Tech Stack

- React Native + Expo
- TypeScript
- React Navigation
- Redux Toolkit
- Axios
- Expo Camera, Speech, AV, Location
- React Native Voice (speech recognition)
- AsyncStorage

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure backend

Update `APP_CONSTANTS.backend.baseUrl` in `src/constants/appConstants.ts` to your backend API host.

### 3) Run app

```bash
npm run start
```

For native builds:

```bash
npm run android
npm run ios
```

## Backend API Contract

Expected endpoints:

- `POST /analyze/audio`
- `POST /analyze/text`
- `POST /analyze/image`
- `POST /analyze/location`
- `GET /health`

Expected response:

```json
{
  "text_response": "...",
  "audio_response_url": "https://...",
  "confidence": 0.98
}
```

## Production Notes

- Add auth tokens/interceptors in `apiClient.ts`.
- Use secure storage for sensitive data.
- Add your own app icon/splash assets in `app.json` when preparing release builds.
- Wire actual audio recording flow for raw audio mode (`VoiceScreen`) if required by backend.
- Add E2E and unit tests before release.



## Note on binary assets

This repository intentionally avoids committed binary media files in `src/assets` to prevent PR/diff tooling issues with binary blobs.
