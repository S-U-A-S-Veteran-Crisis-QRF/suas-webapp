#!/usr/bin/env node
// SAM.gov API helper for the SUAS grant program.
// Reads SAM_GOV_API_KEY from the environment or the repo-root .env file;
// the value itself lives in the org's private key vault (docs/api-keys.md).
//
//   npm run sam -- check           validate the key against SAM.gov
//   npm run sam -- entity <UEI>    SAM registration status for an entity
//   npm run sam -- opps [words]    federal opportunities from the last 90 days

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

function loadKey() {
  if (process.env.SAM_GOV_API_KEY) return process.env.SAM_GOV_API_KEY
  try {
    const m = readFileSync(path.join(root, '.env'), 'utf8').match(/^SAM_GOV_API_KEY=(.+)$/m)
    if (m) return m[1].trim()
  } catch {}
  console.error('SAM_GOV_API_KEY is not set. Copy it from the org key vault into .env (see docs/api-keys.md).')
  process.exit(1)
}

async function get(url, params) {
  const qs = new URLSearchParams({ ...params, api_key: loadKey() })
  const res = await fetch(`${url}?${qs}`)
  const body = await res.text()
  if (!res.ok) {
    console.error(`HTTP ${res.status} from ${url}`)
    console.error(body.slice(0, 500))
    process.exit(1)
  }
  return JSON.parse(body)
}

const fmt = (d) =>
  `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`
const lastDays = (n) => {
  const to = new Date()
  return { postedFrom: fmt(new Date(to.getTime() - n * 86400e3)), postedTo: fmt(to) }
}

const [cmd, ...args] = process.argv.slice(2)

if (cmd === 'check') {
  await get('https://api.sam.gov/opportunities/v2/search', { ...lastDays(7), limit: '1' })
  console.log('Key is valid — SAM.gov accepted the request.')
} else if (cmd === 'entity') {
  if (!args[0]) {
    console.error('Usage: npm run sam -- entity <UEI>')
    process.exit(1)
  }
  const data = await get('https://api.sam.gov/entity-information/v3/entities', { ueiSAM: args[0] })
  const r = data.entityData?.[0]?.entityRegistration
  if (!r) {
    console.log('No entity found for that UEI.')
  } else {
    console.log(`Legal name:  ${r.legalBusinessName ?? '?'}`)
    console.log(`Status:      ${r.registrationStatus ?? '?'}`)
    console.log(`Expires:     ${r.registrationExpirationDate ?? '?'}`)
    console.log(`Purpose:     ${r.purposeOfRegistrationDesc ?? '?'}`)
  }
} else if (cmd === 'opps') {
  const params = { ...lastDays(90), limit: '10' }
  if (args.length) params.title = args.join(' ')
  const data = await get('https://api.sam.gov/opportunities/v2/search', params)
  console.log(`${data.totalRecords ?? 0} opportunities posted in the last 90 days${args.length ? ` matching "${args.join(' ')}"` : ''}\n`)
  for (const o of data.opportunitiesData ?? []) {
    console.log(`- [${o.postedDate}] ${o.title}`)
    console.log(`  ${o.fullParentPathName ?? ''} — type ${o.type ?? '?'} — deadline ${o.responseDeadLine ?? 'n/a'}`)
    if (o.uiLink) console.log(`  ${o.uiLink}`)
  }
} else {
  console.log('Usage: npm run sam -- <check | entity <UEI> | opps [keyword...]>')
  console.log('Grant search itself is on Grants.gov (no key needed); the SAM.gov key')
  console.log('covers entity registration status and federal opportunity data.')
  process.exit(cmd ? 1 : 0)
}
