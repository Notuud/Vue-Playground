// TODO: this should later use user settings as defaults for format, pos and cur
import { ref } from 'vue'

// Type for settings
interface NumberFormatSettings {
    decimalPlaces: number
    format: string
    position: string
    currency: string
}

// Expose default values
export const numberFormatSettings = ref<NumberFormatSettings>({
    decimalPlaces: 2,
    format: 'Whitespace',
    position: 'After',
    currency: 'Kč',
})

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

export function formatMoney(
    value: number,
    decimalPlaces: number = numberFormatSettings.value.decimalPlaces,
    cur: string = numberFormatSettings.value.currency
): string {
    let formatted = formatNumber(value, decimalPlaces)

    // Add currency
    formatted =
        numberFormatSettings.value.position === 'Before' && cur
            ? `${cur} ${formatted}`
            : cur
              ? `${formatted} ${cur}`
              : formatted

    return formatted
}

export function roundNumber(value: number, decimalPlaces: number = numberFormatSettings.value.decimalPlaces): number {
    return Math.round((value + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces
}

export function formatNumberPercent(val: unknown, showPlus: boolean = false): string {
    if (typeof val !== 'number' || isNaN(val)) return String(val ?? '-')
    return `${val > 0 && showPlus ? '+' : ''}${roundNumber(val, numberFormatSettings.value.decimalPlaces)}%`
}
