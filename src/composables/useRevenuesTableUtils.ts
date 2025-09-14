/**
 * Return a Tailwind background color class for a numeric value.
 *
 * Rules:
 * - If `val` is a number and not `NaN` and not zero: returns `bg-green-500` for
 *   positive values and `bg-red-500` for negative values.
 * - For non-numeric, `NaN`, or zero values, returns an empty string.
 *
 * This is useful for conditionally applying color backgrounds in table cells or
 * badges depending on whether a value represents a gain (positive) or a loss
 * (negative).
 *
 * @param val - The value to evaluate. May be any type; only numeric (non-NaN)
 *              values affect the output.
 * @returns A Tailwind CSS background class name or an empty string.
 *
 * @example
 * applyBgClass(10) // -> 'bg-green-500'
 * applyBgClass(-5) // -> 'bg-red-500'
 * applyBgClass(0) // -> ''
 */
export function applyBgClass(val: unknown): string {
    if (typeof val === 'number' && !isNaN(val) && val !== 0) {
        return val > 0 ? 'bg-green-500' : 'bg-red-500'
    }
    return ''
}

/**
 * Compute the maximum absolute value from an array of numbers (ignoring null/undefined/NaN).
 *
 * The function filters out non-number, `null`, `undefined`, and `NaN` entries, then
 * returns the maximum absolute value found. If there are no valid numbers, returns `0`.
 *
 * @param values - Array containing numbers or `null`/`undefined` placeholders.
 * @returns The largest absolute value (non-negative number). Returns `0` when no
 *          valid numeric entries are present.
 *
 * @example
 * getMaxAbs([1, -4, null, undefined]) // -> 4
 * getMaxAbs([NaN, null]) // -> 0
 */
export function getMaxAbs(values: Array<number | null | undefined>) {
    const nums = values.filter((v): v is number => typeof v === 'number' && !isNaN(v)).map((v) => Math.abs(v))
    return nums.length ? Math.max(...nums) : 0
}

/**
 * Generate a lightweight HSL background style object for a numeric value.
 *
 * The color hue indicates sign (greenish for positive, reddish for negative)
 * and the lightness is scaled by the value's magnitude relative to `maxAbs`.
 * If `maxAbs` is zero, `val` is `null`/`undefined`/`NaN`, or `val` is zero, an
 * empty object is returned (no inline style).
 *
 * @param val - The numeric value to visualise. May be `null` or `undefined`.
 * @param maxAbs - The maximum absolute value used to normalise intensity.
 * @param darkMode - When `true` chooses a darker lightness baseline suitable
 *                   for dark themes; defaults to `false`.
 * @returns An object with a `backgroundColor` CSS value (HSL) or an empty
 *          object when no style should be applied.
 *
 * @example
 * getGradientStyle(50, 100) // -> { backgroundColor: 'hsl(130, 60%, 55%)' }
 */
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

/**
 * Compute table header keys from table data.
 *
 * Expects an object with a `rows` array. The header order is preserved from the
 * keys of the first row object. If `tableData` is missing, doesn't have a
 * `rows` array, or the first row is falsy, an empty array is returned.
 *
 * @param tableData - Any object expected to contain a `rows: Array<Record<string, any>>`.
 * @returns An array of header keys (strings) in the order they appear on the first row.
 *
 * @example
 * computeTableHeaders({ rows: [{ year: 2020, revenue: 100 }] }) // -> ['year','revenue']
 */
export function computeTableHeaders(tableData: any) {
    if (!tableData || !Array.isArray(tableData.rows) || !tableData.rows[0]) return []
    // preserve order of keys from first row
    return Object.keys(tableData.rows[0])
}

/**
 * Extract all numeric values from an array of row objects, excluding certain keys.
 *
 * The function iterates each row and gathers values that are numbers (and not
 * `NaN`). It skips properties named `year` and `type` because those are often
 * not part of numeric series in this codebase. The returned array preserves the
 * discovery order.
 *
 * @param rows - Array of objects representing rows of data.
 * @returns An array of numbers extracted from the rows. May be empty.
 *
 * @example
 * allNumericValuesFromRows([{ year: 2020, a: 1, b: -2 }, { a: 3 }]) // -> [1, -2, 3]
 */
export function allNumericValuesFromRows(rows: Record<string, any>[]) {
    const vals: number[] = []
    rows.forEach((row) => {
        Object.entries(row).forEach(([k, v]) => {
            if (k === 'year' || k === 'type') return
            if (typeof v === 'number' && !isNaN(v)) vals.push(v)
        })
    })
    return vals
}
