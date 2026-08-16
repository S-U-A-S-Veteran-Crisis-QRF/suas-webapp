# Tailscale — linking the three SUAS devices

A private mesh network across the **Beelink PC**, the **MacBook Pro**, and the
**Android phone**, so each device can reach the others directly no matter which
network they're on. Every device joins one *tailnet* (your private network) and
gets a stable `100.x.y.z` address plus a MagicDNS name that never changes.

> **This has to be run by hand on each device.** Cloud Claude sessions run in a
> throwaway container with no access to your physical machines — nobody can
> install or authenticate Tailscale on the Beelink, the MacBook, or the phone
> remotely. This document is the runbook; the ~10 minutes of clicking is yours.

> **Public-repo rule:** never commit your tailnet name, device names, `100.x`
> addresses, or auth keys to this repo. Placeholders only. If you need to record
> the real values, they belong in the private second brain (`SUAS-QRF` vault),
> not here.

## Why SUAS wants this

- Reach the Beelink PC (the always-on machine) from the MacBook or the phone
  without port-forwarding the home router or exposing anything to the internet.
- Move files between devices directly with Taildrop instead of emailing them to
  yourself — which matters because SUAS material must not transit third-party
  inboxes.
- Optionally serve a local `npm run dev` preview of this site to the phone for
  real-device testing, over the tailnet only.

Tailscale is **not** a replacement for the git-based sync in
[`cross-device-sync.md`](cross-device-sync.md). That stays the channel for
Claude session state and program files. Tailscale is the network layer
underneath — useful for files, remote desktop, and local previews.

## Step 0 — create the tailnet (once, five minutes)

Do this first, on whichever device is in front of you.

1. Go to <https://login.tailscale.com/start>.
2. Sign in with a **single identity you will reuse on all three devices** — the
   SUAS Google account is the right choice, since every device already has it.
   Mixing identities (Google here, GitHub there) creates *separate tailnets* that
   cannot see each other, and it is the most common way this setup goes wrong.
3. That account becomes the tailnet owner. The admin console lives at
   <https://login.tailscale.com/admin/machines>.

The free **Personal** plan covers this comfortably: up to 6 users and
**unlimited** user devices as of Tailscale's April 2026 pricing change, so three
devices costs nothing and leaves room for board members later.

## Step 1 — Beelink PC

### If it runs Windows 11

1. Download the installer from <https://tailscale.com/download/windows> and run
   it. Accept the driver prompt (it installs a virtual network adapter).
2. Tailscale lands in the system tray. Click it → **Log in** → sign in with the
   same account from Step 0.
3. Because this is the always-on box, set it to start with Windows: tray icon →
   **Preferences** → confirm **Run Tailscale when I log in** is checked.

### If it runs Linux

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

`tailscale up` prints a login URL — open it and approve in the browser. The
installer enables the `tailscaled` service at boot automatically.

### Then, for either OS

Because the Beelink is the machine you'll want to reach *from* the others, turn
off key expiry for it so it doesn't silently drop off the tailnet every 180 days:
in the admin console → **Machines** → the Beelink's `⋯` menu → **Disable key
expiry**. Do this for this device only; leave expiry on for the laptop and phone,
which are the ones that could get lost or stolen.

## Step 2 — MacBook Pro

1. Install from the Mac App Store (<https://apps.apple.com/app/tailscale/id1475387142>)
   or the standalone build at <https://tailscale.com/download/mac>. The App Store
   version updates itself and is the easier choice.
2. Launch it, sign in with the **same account as Step 0**.
3. Approve the VPN configuration prompt macOS shows — Tailscale uses the system
   VPN slot, so you'll get a keychain/permission dialog once.
4. Menu-bar icon → confirm the Beelink appears in the device list.

## Step 3 — Android phone

1. Install Tailscale from Play Store:
   <https://play.google.com/store/apps/details?id=com.tailscale.ipn>
2. Open it, **Sign in**, same account again.
3. Android will ask to add a VPN configuration — allow it. The persistent key
   notification is normal and means the tunnel is up.
4. Optional but recommended on a phone: enable **Settings → Run Tailscale as
   VPN on demand** so it reconnects after reboots.

## Step 4 — verify all three are actually linked

From the MacBook (or the Beelink, if Linux):

```bash
tailscale status          # every device should be listed
tailscale ping <device>   # direct connectivity check, not ICMP
```

`tailscale ping` is the honest test — it reports whether the connection is
**direct** or **relayed via DERP**. Relayed still works but is slower; it usually
means a restrictive NAT, and it's fine to leave alone unless you notice lag.

From the phone, the app's device list is the equivalent check.

In the admin console, all three machines should be listed under one tailnet with
green "Connected" status. If a device is missing, it almost certainly signed in
with a different identity — sign out on that device and redo it with the Step 0
account.

## Step 5 — turn on MagicDNS

Admin console → **DNS** → enable **MagicDNS**. After this you address devices by
name instead of memorizing `100.x` addresses:

```bash
ssh jacob@beelink            # instead of ssh jacob@100.x.y.z
```

Names are stable across reboots and network changes, which is the whole point.

## Useful once it's running

**Taildrop (device-to-device file transfer).** Enable in admin console →
**Settings → Feature previews → Taildrop**. Then share a file to the Tailscale
app on Android, or `tailscale file cp <file> <device>:` from a terminal. Files go
straight between your devices — nothing lands on a third-party server.

**Preview this site on the real phone.** From the repo on the MacBook or Beelink:

```bash
npm run dev
tailscale serve 3000        # serves it inside the tailnet only
```

Open the printed URL on the phone. This is the right way to check the crisis
banner and the `/app` demo on a real device — and unlike `tailscale funnel`, it
is **not** exposed to the public internet.

**Do not enable Funnel** for SUAS work without a deliberate decision. Funnel
publishes a local service to the open internet, which crosses the same
public/outbound line as any other publish.

**Exit nodes:** you don't need one for this setup. Leave "Use exit node" off on
all three devices unless you're specifically trying to route phone traffic
through the house connection — turning it on sends *all* your phone traffic
through the Beelink, which is rarely what you want.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| A device never appears in the list | Signed in with a different identity, creating a second tailnet | Sign out on that device, sign back in with the Step 0 account |
| Device shows but won't connect | Key expired (180-day default) | Re-authenticate on the device; disable key expiry for the always-on Beelink |
| All traffic marked `relay` | Restrictive NAT / CGNAT on one side | Works, just slower. Enable UPnP on the router, or accept it |
| macOS says "VPN configuration not permitted" | Permission dialog was dismissed | System Settings → General → VPN & Device Management → allow Tailscale |
| Android drops off after reboot | On-demand not enabled | Tailscale app → Settings → enable run-as-VPN-on-demand |

## Sources

- [Tailscale free plans and limits](https://tailscale.com/docs/account/manage-plans/free-plans-discounts)
- [Tailscale pricing](https://tailscale.com/pricing)
- [Download page](https://tailscale.com/download)
