import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Limit } from '../types'

const limits = atom({ plugin: 'limit-bar', key: 'limits' } as const, [] as Limit[], { shape: 'limits-1' })
const ctx = atom({ plugin: 'limit-bar', key: 'ctx' } as const, null as number | null, { shape: 'ctx-1' })
const hasReading = atom({ plugin: 'limit-bar', key: 'hasReading' } as const, false, { shape: 'reading-1' })

const NAME: Record<string, string> = {
  five_hour: 'ขีดจำกัด 5 ชั่วโมง',
  seven_day: 'ขีดจำกัด 7 วัน',
  spend_limit: 'งบใช้จ่าย',
}

const colorFor = (p: number) => (p >= 90 ? '#e5484d' : p >= 70 ? '#f5a524' : '#3dd68c')

const left = (resetsAt: string | undefined, now: number) => {
  if (!resetsAt) return ''
  const ms = Date.parse(resetsAt) - now
  if (!Number.isFinite(ms) || ms <= 0) return ' · รีเซ็ตแล้ว'
  const m = Math.round(ms / 60000)
  const d = Math.floor(m / 1440)
  const h = Math.floor((m % 1440) / 60)
  const mm = m % 60
  return ' · รีเซ็ตใน ' + (d > 0 ? `${d} วัน ${h} ชม.` : h > 0 ? `${h} ชม. ${mm} น.` : `${mm} น.`)
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    try {
      const u = await $.session.usage()
      await update($, limits, () => u.rateLimits.map(r => ({ kind: r.kind, percentUsed: r.percentUsed, resetsAt: r.resetsAt })))
      await update($, ctx, () => u.context.percent ?? null)
      await update($, hasReading, () => true)
    } catch {}
    return next(e)
  })

  on('session.measure', async ($, e, next) => {
    await update($, limits, () => e.rateLimits.map(r => ({ kind: r.kind, percentUsed: r.percentUsed, resetsAt: r.resetsAt })))
    await update($, ctx, () => e.context.percent ?? null)
    await update($, hasReading, () => true)
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const { Box, Text, Progress } = $.ui.resolve(e)
    const rows = await read($, limits)
    const c = await read($, ctx)
    const got = await read($, hasReading)
    const now = await $.clock.now()

    if (rows.length === 0 && c === null) {
      return (
        <Box>
          <Text dimColor>{got ? 'หลอดลิมิต: ยังไม่มีข้อมูลจากแผนนี้' : 'หลอดลิมิต: รอข้อมูลหลังข้อความแรก…'}</Text>
        </Box>
      )
    }

    return (
      <Box flexDirection="column">
        {rows.map(r => (
          <Progress
            key={r.kind}
            label={NAME[r.kind] ?? r.kind}
            value={Math.min(100, r.percentUsed)}
            max={100}
            valueText={`${r.percentUsed}%${left(r.resetsAt, now)}`}
            color={colorFor(r.percentUsed)}
          />
        ))}
        {c !== null ? (
          <Progress key="ctx" label="บริบทแชต (context)" value={c} max={100} valueText={`${c}%`} color={colorFor(c)} />
        ) : null}
      </Box>
    )
  })
}
