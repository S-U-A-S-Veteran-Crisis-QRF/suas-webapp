# SUAS Veteran Crisis Q.R.F. — Telegram bot

A small, **stateless** Telegram bot that acts as a **crisis-resource signpost**.
It is deliberately *not* an AI counselor: every reply leads with the Veterans
Crisis Line (988, press 1 / text 838255) and routes people to real human and
clinical help. It runs as a [Cloudflare Worker](https://developers.cloudflare.com/workers/)
webhook — no server to babysit, free tier is plenty.

Bot: [t.me/suasqrfclaudebot](https://t.me/suasqrfclaudebot)

## Why it's built this way

- **GitHub Pages can't host a bot.** The main site is a static export with no
  server runtime, so the bot needs its own home. A Worker webhook is free,
  real-time, and requires nothing always-on.
- **Crisis safety first.** It never tries to triage or advise. Any message it
  doesn't recognize gets the crisis line plus a nudge to reach a real person.
- **No secrets in the repo.** This repo is public. The bot token and webhook
  secret live only in encrypted Cloudflare Worker secrets.

## Commands

| Command | Response |
|---------|----------|
| `/start`, `/help` | Welcome + crisis line + menu |
| `/crisis` (`/988`, `/emergency`) | Crisis line, text line, chat, 911 |
| `/services` (`/about`) | What SUAS does + key site links |
| `/contact` | Email, phone, contact form |
| `/donate` | Donation link (501(c)(3), tax-deductible) |
| `/volunteer` | Pilot / nonprofits / counties / contact |
| *anything else* | Crisis line + "I'm an automated bot, here's how to reach a person" |

Edit copy in [`src/messages.ts`](src/messages.ts); routing in [`src/index.ts`](src/index.ts).

---

## Deploy (one-time, ~10 minutes)

### 0. Rotate the token first ⚠️

The original BotFather token was shared in a chat, so treat it as compromised.
In Telegram, message **@BotFather → `/revoke` → pick the bot** to get a fresh
token. Use that fresh token below and never paste it into a chat, a file, or a
commit again.

### 1. Install tooling

```bash
cd bot
npm install
npx wrangler login   # opens a browser to authorize your Cloudflare account
```

### 2. Set the secrets (stored encrypted by Cloudflare, not in the repo)

```bash
# The fresh token from BotFather:
npx wrangler secret put BOT_TOKEN

# A long random string you invent (used to verify requests really come from
# Telegram). Generate one with:  openssl rand -hex 32
npx wrangler secret put WEBHOOK_SECRET
```

### 3. Deploy the Worker

```bash
npm run deploy
```

Wrangler prints the Worker URL, e.g.
`https://suas-qrf-bot.<your-subdomain>.workers.dev`. Copy it.

### 4. Point Telegram at the Worker

Register the webhook, passing the **same** `WEBHOOK_SECRET` you set in step 2 so
the Worker can verify incoming requests:

```bash
BOT_TOKEN="<fresh-token>"
WORKER_URL="https://suas-qrf-bot.<your-subdomain>.workers.dev"
WEBHOOK_SECRET="<the-same-secret-from-step-2>"

curl -sS "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
  -d "url=${WORKER_URL}" \
  -d "secret_token=${WEBHOOK_SECRET}"
```

Expect `{"ok":true,...}`. Check status any time with:

```bash
curl -sS "https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo"
```

### 5. (Optional) Register the command menu in Telegram

```bash
curl -sS "https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands" \
  -H "Content-Type: application/json" \
  -d '{"commands":[
    {"command":"crisis","description":"Veterans Crisis Line & emergency help"},
    {"command":"services","description":"What SUAS does"},
    {"command":"contact","description":"Reach a real person"},
    {"command":"donate","description":"Support the mission"},
    {"command":"volunteer","description":"Get involved"},
    {"command":"help","description":"Show the menu"}
  ]}'
```

### 6. Test

Open [t.me/suasqrfclaudebot](https://t.me/suasqrfclaudebot), send `/start`, and
confirm the crisis line shows up. Try `/donate` and a random message too.

---

## Local development

```bash
cp .dev.vars.example .dev.vars   # fill in a token + secret; .dev.vars is git-ignored
npm run dev                      # runs the Worker locally
npm run typecheck                # tsc --noEmit
```

To exercise the local endpoint without Telegram:

```bash
curl -X POST http://localhost:8787 \
  -H "X-Telegram-Bot-Api-Secret-Token: <your WEBHOOK_SECRET>" \
  -H "Content-Type: application/json" \
  -d '{"message":{"chat":{"id":1},"text":"/start","from":{"first_name":"Test"}}}'
```

(It will try to call the real Telegram API to deliver the reply; a fake chat id
will 400 from Telegram, which is expected — you're just checking routing.)

## Updating the bot later

Edit `src/messages.ts` / `src/index.ts`, then `npm run deploy`. The webhook URL
doesn't change, so no re-registration is needed.
