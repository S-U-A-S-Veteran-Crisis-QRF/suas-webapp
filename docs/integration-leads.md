# Integration leads — ride & shelter dispatch

Service/API leads for turning the demo dispatch flows (`/app`) into real
integrations. Sourced from community feedback received 2026-07-20 (Hacker Dojo
demo). Nothing here is committed roadmap — these are researched options for
when the pilot needs real fulfillment behind the Food / Ride / Shelter taps.

## Ride — Lyft Business "Concierge"

Fits the SUAS dispatch model unusually well:

- **Books rides on behalf of someone else** — the veteran does not need the
  Lyft app, an account, or even a smartphone. They get SMS updates at the
  phone number provided.
- **Prepaid round trips** — e.g. ride to a VA appointment; when it ends, the
  veteran replies to an SMS and the prepaid return ride home is initiated.
- **Two adoption stages:**
  1. **Human dispatch (no code):** responders book rides from the Concierge
     admin portal — works today for the phone-line case (veteran calls the
     SUAS number, a responder dispatches the ride manually).
     Launch guide: <https://www.lyft.com/business/launch-guides/concierge/admin>
  2. **API dispatch:** the app's backend calls the Concierge API directly so a
     veteran's tap dispatches a vehicle without human intervention. API access
     is by request; a community-shared OpenAPI description:
     <https://github.com/api-evangelist/lyft/blob/main/openapi/lyft-concierge-openapi.yml>

Stage 1 needs no backend at all, so it is compatible with the current
static-export site plus a responder workflow. Stage 2 requires the pilot
backend (the static site cannot hold API credentials).

## Shelter — Expedia Group Rapid API

For programmatically booking motel/hotel rooms from an application backend:

- Rapid API property content/booking explorer:
  <https://developers.expediagroup.com/rapid/api/explorer#get-/properties/content>
- Server-side only (credentialed) — same constraint as Lyft stage 2: needs the
  pilot backend, not the static site.

## Sequencing note

Both leads share the same shape: **manual/portal first, API second.** The
demo → pilot path can therefore start with responder-driven fulfillment (no
new infrastructure) and graduate to API dispatch when the pilot backend
exists.
