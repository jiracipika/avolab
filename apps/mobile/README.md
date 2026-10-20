# Avolab Hub — Android-first preview

Native React Native / Expo app. The company website remains at the repository root. No stores, signing accounts, or production releases are configured by this preview.

## What's here

- Discover: searchable bundled product catalogue, Tools / Games / Audio filters, offline artwork, product details and native sharing.
- Library: locally persisted favourites and six most recently opened products.
- Play: Pulse, a fully native offline reaction game with a persisted personal best, plus links to Avolab games.
- About: storage explanation, links to privacy and terms, and confirmed device-data reset.

Products open in the system browser; they are not embedded or represented as native implementations. The catalogue is a snapshot of `lib/apps.ts`, not a real-time availability feed. No hub account, analytics, camera or microphone access is needed. External products have their own policies and internet requirements.

## Run from scratch

Use Node 22 and JDK 21 with Android SDK 36 / Android Studio. An Android emulator or USB-debugging-enabled phone is required for native runtime testing.

    cd apps/mobile
    npm ci
    npm run catalog
    npm run typecheck
    npm test
    npx expo prebuild --platform android --no-install
    npm run android

`npm run android` runs a development build with Metro. For a self-contained APK that runs without Metro:

    cd apps/mobile
    npx expo prebuild --platform android --no-install
    cd android
    ./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a,x86_64 --max-workers=2

APK: `android/app/build/outputs/apk/release/app-release.apk`.

The generated Expo project uses its development keystore for this local release variant. This is an installable preview, NOT a production-signed store artifact. Keep native folders generated and ignored; app configuration is in `app.json`. IDs `ca.avolab.hub` are provisional until checked in the store accounts.

## Catalogue changes

Edit the existing website's `lib/apps.ts`, then run `npm run catalog` in this directory. This updates the mobile JSON snapshot and bundled images. The generator never fetches or modifies product repositories.

## Verification

    npm run typecheck
    npm test

Also run `npm run lint && npm run build` from the repository root to check the website remains independent. Manual native checks: fresh launch, search/reset and empty results, category filters, product detail/back, save/remove and restart persistence, browser launch/history, native share, Pulse early tap/result/best, background cancellation, airplane-mode catalogue/game, clear-data cancel/confirm, and no AndroidRuntime/ReactNativeJS fatal logs.

## Design

Dark studio-universe theme: background #0a0a0f, cards #1c1c2e, white text, lavender #ad94ff, mint reaction cue. Left-aligned system typography, large editorial heading, real bundled product imagery, four stable bottom tabs. Rounded product panels are secondary to the editorial featured product. No looping decorative motion. Native transition on details; readable text cues accompany colour changes.

## Next / not yet done

Physical-phone feedback, tablet/large-font testing, richer in-app tools, catalogue curation and destination health review, SDK/dependency security review before distribution, app-specific privacy-policy review, final icons/screenshots, iOS native build and runtime verification, Codemagic account connection, production signing, Play closed testing, TestFlight.

Do not modify automated-newsletter or pitchforge/pitch-therapy repositories during hub work. Their existing catalogue entries are data only.
