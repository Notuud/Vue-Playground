import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

// Available for overriding default Aura theme styles with custom ones
export const MyPreset = definePreset(Aura, {
    components: {
        button: {
            colorScheme: {
                light: {
                    root: {
                        secondary: {
                            background: '{blue.500}',
                            hoverBackground: '{blue.600}',
                            activeBackground: '{blue.700}',
                            borderColor: '{blue.500}',
                            hoverBorderColor: '{blue.600}',
                            activeBorderColor: '{blue.700}',
                            color: '{gray.100}',
                            hoverColor: '{gray.100}',
                            activeColor: '{gray.100}',
                        },
                    },
                    outlined: {
                        secondary: {
                            hoverBackground: '{gray.50}',
                            activeBackground: '{gray.100}',
                            borderColor: '{gray.600}',
                            color: '{gray.600}',
                        },
                    },
                },
                dark: {
                    root: {
                        secondary: {
                            background: '{blue.500}',
                            hoverBackground: '{blue.400}',
                            activeBackground: '{blue.300}',
                            borderColor: '{blue.500}',
                            hoverBorderColor: '{blue.400}',
                            activeBorderColor: '{blue.300}',
                            color: '{gray.950}',
                            hoverColor: '{gray.950}',
                            activeColor: '{gray.950}',
                        },
                    },
                    outlined: {
                        secondary: {
                            hoverBackground: '{gray.950}',
                            activeBackground: '{gray.950}',
                            borderColor: '{gray.400}',
                            color: '{gray.400}',
                        },
                    },
                },
            },
        },
        tabs: {
            colorScheme: {
                light: {
                    tablist: {
                        background: '{gray.100}',
                    },
                    tabpanel: {
                        background: '{gray.100}',
                    },
                },
                dark: {
                    tablist: {
                        background: '{gray.900}',
                    },
                    tabpanel: {
                        background: '{gray.900}',
                    },
                },
            },
        },
    },
})
