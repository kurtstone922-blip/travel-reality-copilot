# Security, Privacy and Rights Review

Review date: 2026-09-03

Release target: `0.1.0-alpha`

## Result

No credentials, private travel records or hidden local artifacts were detected in the release directory. The package is suitable for a private GitHub Alpha after the intentional public identity fields below are confirmed by the author.

## Checks performed

- Scanned all files, including hidden files, for common API-key, access-token, password, bearer-token, private-key and credential patterns.
- Checked for `.env` files, certificates, key stores, credential files, symbolic links, large binaries and temporary artifacts.
- Scanned for local absolute filesystem paths, email addresses, phone numbers, passport/identity references and other direct personal identifiers.
- Reviewed the example Trip State for real traveler names, booking references, flight numbers, contact details and exact hotel reservations.
- Reviewed outbound URLs, third-party product names, copyright language and the repository License.

## Findings

### Secrets and local artifacts

- No API keys, passwords, private keys, access Tokens or credential files found.
- No symbolic links or bundled binary assets found.
- No author-specific local filesystem paths found inside package content.
- `.gitignore` excludes environment files, common key/certificate files, credential JSON files, local Trip State and generated exports.

### Personal information

The following information is intentionally public-facing and is not a hidden leak:

- author/developer name: `Weicheng Shi`.

The name appears in the Plugin manifest, README and License. Remove or replace it before publication if the author does not want this identity associated with the repository. No personal website URL is included.

The sample itinerary contains fictional/general planning data only. It contains no traveler name, email, phone number, passport number, booking code, flight number, precise home address or real hotel reservation.

### Third-party names and content

Google Maps, Amap, Booking, Marriott Bonvoy and Tabelog are referenced descriptively to explain optional interoperability or example data. No third-party logos, screenshots, review text, photos, proprietary datasets or bundled API responses are included. The package does not claim endorsement or partnership.

Before adding screenshots, map images, hotel photos, reviews or copied travel content later, confirm reuse rights and retain source/attribution metadata where required.

### License and authorization

The repository uses a custom Personal Evaluation License. It permits private personal, non-commercial evaluation and restricts redistribution, modification, commercial use and product integration without written permission.

This is source-available, not open source. A public GitHub repository remains technically viewable and copyable even when copying or reuse would breach the License. Use a private repository for controlled Alpha access. Obtain qualified legal review if enforceability or commercial licensing becomes important.

## Publication decision

Safe for a private Alpha, subject to confirming that the author name is intentionally disclosed. Re-run this review immediately before changing the repository to public and after adding any real examples, screenshots, exports, analytics or API integrations.
