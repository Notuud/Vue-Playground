// TODO: this should later use user settings as defaults for format, pos and cur
export function formatNumber(value: number | string, decimalPlaces: number = 2, format: string = 'Whitespace'): string {
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
        formats[format as keyof typeof formats] ?? formats.Whitespace

    const rounded: string = roundNumber(number, decimalPlaces).toFixed(decimalPlaces)
    const [intPartRaw, decimalPart] = rounded.split('.')

    // Add thousand separators
    const intPart: string = intPartRaw.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

    // Build formatted string
    const formatted: string = decimalPlaces > 0 && decimalPart ? `${intPart}${decimalSeparator}${decimalPart}` : intPart

    return formatted
}

export function formatMoney(
    value: number,
    decimalPlaces: number = 2,
    format: string = 'Whitespace',
    pos: string = 'After',
    cur: string = 'Kč'
): string {
    let formatted = formatNumber(value, decimalPlaces, format)

    // Add currency
    formatted = pos === 'Before' && cur ? `${cur} ${formatted}` : cur ? `${formatted} ${cur}` : formatted

    return formatted
}

export function roundNumber(value: number, decimalPlaces: number = 2): number {
    return Math.round((value + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces
}

const formatter = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function formatNumberPercent(val: unknown): string {
    if (typeof val !== 'number' || isNaN(val)) return String(val ?? '-')
    return `${val > 0 ? '+' : ''}${formatter.format(val)}%`
}
