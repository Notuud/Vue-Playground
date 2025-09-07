export function applyBgClass(val: unknown): string {
    if (typeof val === 'number' && !isNaN(val) && val !== 0) {
        return val > 0 ? 'bg-green-500' : 'bg-red-500'
    }
    return ''
}

export function getMaxAbs(values: Array<number | null | undefined>) {
    const nums = values
        .filter((v): v is number => typeof v === 'number' && !isNaN(v))
        .map(v => Math.abs(v))
    return nums.length ? Math.max(...nums) : 0
}

export function getGradientStyle(val: number | null | undefined, maxAbs: number, darkMode = false) {
    if (val == null || isNaN(val as any) || maxAbs === 0 || val === 0) return {}
    const intensity = Math.min(1, Math.abs(val) / maxAbs)
    let light: number
    if (darkMode) {
        light = 10 + 30 * (1 - intensity)
    } else {
        light = 80 - 50 * intensity
    }
    const hsl = val > 0 ? `hsl(130, 60%, ${light}%)` : `hsl(355, 70%, ${light}%)`
    return { backgroundColor: hsl }
}

export function computeTableHeaders(tableData: any) {
    if (!tableData || !Array.isArray(tableData.rows) || !tableData.rows[0]) return []
    // preserve order of keys from first row
    return Object.keys(tableData.rows[0])
}

export function allNumericValuesFromRows(rows: Record<string, any>[]) {
    const vals: number[] = []
    rows.forEach(row => {
        Object.entries(row).forEach(([k, v]) => {
            if (k === 'year' || k === 'type') return
            if (typeof v === 'number' && !isNaN(v)) vals.push(v)
        })
    })
    return vals
}
