# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - Unreleased

### Added
- Type-safe translation factory (`createTranslations`).
- `LocaleProvider`, `useLocale`, `useTranslate`, and `defineTranslation` hooks and helpers.
- Community recommended repository files (`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md`, `.editorconfig`).

### Changed
- Renamed `TranslationProvider` to `LocaleProvider` to clarify separation.
- Renamed `useTranslation` to `useLocale`.
- Separated `defineTranslation` logic out of the component scope in README examples.
- Updated the example application according to the recent API changes.
- Extracted locale directly from the `useLocale` hook instead of requiring it from the user.
- Moved the `useLocale` function at the top of the internal module.

## [1.0.0] - 2024-05-18

### Added
- Initial v1.0.0 release.
- Added license field.

## [0.2.0] - 2024-05-16

### Added
- Support for all React versions from 18+.

## [0.1.0] - 2024-05-16

### Added
- Initial project creation.
- Added explicit typing for the early API.