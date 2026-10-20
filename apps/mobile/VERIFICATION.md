# Android preview verification

Avolab Hub 0.1.0, Android-first. Native build and runtime verified locally, not store-ready.

## Executed results

- `npm ci` from the mobile lockfile: successful.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm test`: 8/8 model tests passed.
- `npx expo-doctor`: 20/20 checks passed.
- Expo Android prebuild and Gradle `assembleRelease`: successful (arm64-v8a and x86_64).
- APK installed and exercised on Android 14 / API 34 x86_64 emulator, without Metro.
- `scripts/android-smoke.py`: 24 runtime checks passed, including native share sheet, Chrome intent handoff, process-restart persistence, search/category intersection and empty results, early-tap rejection, score persistence, background cancellation, airplane-mode catalogue/library/game, reset cancel/confirm, and absence of AndroidRuntime/ReactNativeJS fatal errors.
- Screenshots reviewed for actual rendering; fixed JSX literal newline escapes before the final build.
- Root website `npm run lint && npm run build`: passed, including TypeScript and static page generation. Root lint/tsconfig intentionally exclude the separate mobile project.
- No store login, upload, production signing or release performed. No other product repositories modified.

## Local handoff

APK: `/Volumes/HARD/projects/avolab-builds/avolab-hub-0.1.0-preview.apk`

SHA-256: `ac609fb4db15d3e8aa6a01fe526f9f89071240bb08df965756521fd227d1ddce`

Evidence directory: `/Volumes/HARD/dev-cache/avolab-evidence` (screenshots, runtime log and `results.json`).

Re-run emulator smoke (clears only this test app's state; rejects physical devices):

    ADB=/path/to/adb python3 scripts/android-smoke.py /absolute/evidence/directory

The browser test expects the existing emulator's Chrome browser. It verifies system-browser handoff, not product web-app functionality; Chrome's first-run setup is outside this app.

## Outstanding

- Physical-phone testing, font scaling and tablets.
- iOS native build/runtime validation, signing and app-specific App Store Connect setup.
- Codemagic CI integration, Android upload signing, Play Console registration and closed testing.
- Full dependency/security review before any store distribution. The current Expo 55 / RN 0.83 snapshot reports 32 production-tree audit findings (21 high, 11 moderate, 0 critical), including tooling transitive dependencies. Expo Doctor compatibility checks do not mean security approval. Do not apply `npm audit fix --force`: its proposal includes an Expo downgrade to 44 and an incompatible RN jump. Upgrade the Expo SDK as a tested unit or apply individually validated compatible fixes, then rebuild and rerun native smoke.
- A Hub-specific privacy-policy review: current links point to existing website policies; not yet certified as store-compliant.
- Larger native feature set and catalogue/destination curation before store submission. The catalogue snapshot contains 12 products, not a live availability feed.

## Architecture note

This blank-template preview uses local native tabs and a product Modal in `App.tsx`, not Expo Router. The scaffold's generic AGENTS.md routing recommendation does not describe the current implementation. Plan a navigation migration before adding deep links or multi-screen product flows.
