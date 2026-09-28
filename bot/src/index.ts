// Cloudflare Worker — Telegram webhook for the SUAS Veteran Crisis Q.R.F. bot.
//
// This is a stateless webhook: Telegram POSTs each update here, we reply, done.
// There is NO polling and NO stored state.
//
// Secrets (set with `wrangler secret put ...`, NEVER committed):
//   BOT_TOKEN       — the Telegram bot token from @BotFather
//   WEBHOOK_SECRET  — a random string; also passed to Telegram's setWebhook as
//                     `secret_token`. Telegram echoes it back in the
//                     X-Telegram-Bot-Api-Secret-Token header on every request,
//                     so we can reject anything that isn't really from Telegram.

import * as M from "./messages";

export interface Env {
  BOT_TOKEN: string;
  WEBHOOK_SECRET: string;
}

interface TgUpdate {
  message?: {
    chat: { id: number };
    text?: string;
    from?: { first_name?: string };
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Health check / friendly GET.
    if (request.method === "GET") {
      return new Response("SUAS Veteran Crisis QRF bot — webhook is live.", {
        status: 200,
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Reject anything that isn't Telegram carrying our shared secret.
    const got = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
    if (!env.WEBHOOK_SECRET || got !== env.WEBHOOK_SECRET) {
      return new Response("Forbidden", { status: 403 });
    }

    let update: TgUpdate;
    try {
      update = (await request.json()) as TgUpdate;
    } catch {
      return new Response("Bad Request", { status: 400 });
    }

    const msg = update.message;
    // Ignore anything that isn't a text message (edits, joins, stickers, etc.).
    // Always return 200 so Telegram doesn't retry.
    if (msg?.chat?.id == null) {
      return new Response("ok", { status: 200 });
    }

    const reply = route(msg.text ?? "", msg.from?.first_name);

    try {
      await sendMessage(env, msg.chat.id, reply);
    } catch (err) {
      // Log but still 200 — a failed send should not trigger endless retries.
      console.error("sendMessage failed", err);
    }

    return new Response("ok", { status: 200 });
  },
};

// Map an incoming text to a reply. Commands may arrive as "/donate" or
// "/donate@suasqrfclaudebot" and may carry arguments — we match the first word.
function route(text: string, firstName?: string): string {
  const cmd = text.trim().split(/\s+/)[0]?.toLowerCase().split("@")[0] ?? "";
  switch (cmd) {
    case "/start":
      return M.START(firstName);
    case "/help":
      return M.HELP(firstName);
    case "/crisis":
    case "/988":
    case "/emergency":
      return M.CRISIS;
    case "/services":
    case "/about":
      return M.SERVICES;
    case "/contact":
      return M.CONTACT;
    case "/donate":
      return M.DONATE;
    case "/volunteer":
    case "/help_out":
      return M.VOLUNTEER;
    default:
      return M.FALLBACK;
  }
}

async function sendMessage(env: Env, chatId: number, textHtml: string): Promise<void> {
  const res = await fetch(
    `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: textHtml,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`Telegram API ${res.status}: ${await res.text()}`);
  }
}
