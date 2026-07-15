# Stage 8 log: privacy policy and personal data consent

Date: 2026-07-15
Branch: `dev`

## Scope

Stage 8 covers the separate privacy policy page and the consent text in the contact form.

## Actions completed

- Added `privacy.html` as a separate service page linked from the contact form and footer.
- Added privacy policy sections:
  - operator contacts;
  - categories of collected data;
  - processing purposes;
  - consent wording;
  - third-party delivery services;
  - storage period;
  - data protection;
  - data subject rights;
  - policy update rules.
- Confirmed the policy reflects the current implementation:
  - contact form fields: name, phone, email, business industry, revenue range;
  - delivery through Gmail SMTP and Telegram Bot API;
  - no analytics counters or advertising pixels.
- Updated the contact form consent text.
- Added responsive styles for the legal page.
- Updated `docs/site-structure.md`.

## Checks

- `index.html` links to `./privacy.html` from the consent checkbox and footer.
- `privacy.html` links back to the main one-page site sections.
- The policy does not include invented legal entity details such as INN, OGRNIP, address, or tax status.

## Open questions

- Before public launch, the policy text should be reviewed with the operator's actual legal status and реквизиты.
- If cookies, analytics, CRM, mailing lists, or payment tools are added later, the policy must be updated.
