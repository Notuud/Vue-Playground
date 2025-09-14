// TODO: this should later use user settings as defaults for format, pos and cur
import { ref } from 'vue'

/**
 * Number format settings used by the formatting helpers.
 *
 * @property decimalPlaces - Number of decimal places to use when formatting numbers
 * @property format - Visual format for thousands/decimal separators. One of: 'Whitespace', 'Dot', 'Comma'
 * @property position - Position of the currency symbol relative to the formatted value. 'Before' or 'After'
 * @property currency - Default currency symbol/string to append or prepend when formatting money
 */
interface NumberFormatSettings {
    decimalPlaces: number
    format: string
    position: string
    currency: string
}

/**
 * Reactive settings object used by the formatting functions. Components can import
 * and update this reactive ref to change application-wide formatting behaviour.
 *
 * Example:
 * ```ts
 * import { numberFormatSettings } from '@/composables/useNumberFormat'
 * numberFormatSettings.value.format = 'Dot'
 * numberFormatSettings.value.decimalPlaces = 0
 * ```
 */
export const numberFormatSettings = ref<NumberFormatSettings>({
    decimalPlaces: 2,
    format: 'Whitespace',
    position: 'After',
    currency: 'Kč',
})

/**
 * Format a number using the global `numberFormatSettings`.
 *
 * Handles string input by coercing to Number. Returns an empty string for invalid numbers.
 * Thousand and decimal separators are chosen based on `numberFormatSettings.value.format`.
 *
 * @param value - Number or numeric string to format
 * @param decimalPlaces - Optional override for decimal places (defaults to `numberFormatSettings.value.decimalPlaces`)
 * @returns A localized formatted number string (without currency symbol)
 *
 * @example
 * formatNumber(12345.678) // "12 345,68" (given default settings)
 */
export function formatNumber(
    value: number | string,
    decimalPlaces: number = numberFormatSettings.value.decimalPlaces
): string {
    const number = typeof value === 'string' ? Number(value) : value

    if (isNaN(number)) {
        return ''
    }

    const formats = {
        Whitespace: { thousand: ' ', decimal: ',' },
        Dot: { thousand: '.', decimal: ',' },
        Comma: { thousand: ',', decimal: '.' },
    } as const

    const { thousand: thousandSeparator, decimal: decimalSeparator } =
        formats[numberFormatSettings.value.format as keyof typeof formats] ?? formats.Whitespace

    const rounded: string = roundNumber(number, decimalPlaces).toFixed(decimalPlaces)
    const [intPartRaw, decimalPart] = rounded.split('.')

    // Add thousand separators
    const intPart: string = intPartRaw?.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) ?? '0'

    // Build formatted string
    const formatted: string = decimalPlaces > 0 && decimalPart ? `${intPart}${decimalSeparator}${decimalPart}` : intPart

    return formatted
}

/**
 * Format a numeric value as money using the global settings.
 *
 * Will use `numberFormatSettings.value.currency` and place it before or after the
 * formatted number according to `numberFormatSettings.value.position`.
 *
 * @param value - Numeric value to format
 * @param decimalPlaces - Optional override for decimal places
 * @param cur - Optional currency string override (defaults to `numberFormatSettings.value.currency`)
 * @returns Formatted money string including currency
 *
 * @example
 * formatMoney(1234.5) // "1 234,50 Kč"
 */
export function formatMoney(
    value: number,
    decimalPlaces: number = numberFormatSettings.value.decimalPlaces,
    cur: string = numberFormatSettings.value.currency
): string {
    let formatted = formatNumber(value, decimalPlaces)

    // Add currency
    if (cur) {
        formatted = numberFormatSettings.value.position === 'Before' ? `${cur} ${formatted}` : `${formatted} ${cur}`
    }

    return formatted
}

/**
 * Round a number to the given number of decimal places using a safe rounding technique.
 *
 * @param value - The number to round
 * @param decimalPlaces - Number of decimal places (defaults to `numberFormatSettings.value.decimalPlaces`)
 * @returns Rounded number
 */
export function roundNumber(value: number, decimalPlaces: number = numberFormatSettings.value.decimalPlaces): number {
    return Math.round((value + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces
}

/**
 * Format a percentage value as a string.
 *
 * Returns `'-'` for non-number inputs (mirrors prior behaviour which returned String(val ?? '-')).
 * When `showPlus` is true, positive values will be prefixed with `+`.
 *
 * @param val - Value to format as percent (expected number)
 * @param showPlus - Whether to prefix positive values with `+`
 * @returns Formatted percent string, e.g. "+12.34%" or "-3.00%"
 */
export function formatNumberPercent(val: unknown, showPlus: boolean = false): string {
    if (typeof val !== 'number' || isNaN(val)) return String(val ?? '-')
    return `${val > 0 && showPlus ? '+' : ''}${roundNumber(val, numberFormatSettings.value.decimalPlaces)}%`
}
