import { useRouter } from 'vue-router'
import { ROUTE_NAMES, type RouteName } from '@/constants/routeNames'

type NavigationFunctions<T extends Record<string, string>> = {
    [K in keyof T as K extends string ? `navigateTo${T[K]}` : never]: () => void // never means leave it out
}

/**
 * Provides strongly-typed, reusable navigation helpers for common routes
 * and generic router operations. Centralizes route access.
 *
 * ### Summary
 * - **Named route helpers**: Quickly navigate to `Login`, `Register`, `Dashboard`
 * - **Auth-related**: Clear local auth token and redirect to login
 * - **Generic helpers**: Navigate by route `name` or go back
 *
 * ### Returns
 * An object with the following functions:
 * - `logout(): void` → clear token and redirect to login
 * - `navigateToViaName(name: string): void` → generic navigation by route name
 * - `goBack(): void` → navigate back in history
 * - `navigateToROUTE_NAME(): void` → these are auto-generated based on ROUTE_NAMES in constants/routeNames
 *
 * @example
 * ```ts
 * const { navigateToLogin } = useNavigation()
 * navigateToLogin()
 * ```
 */
export function useNavigation() {
    const router = useRouter()

    /**
     * Navigate to a route by its **name**.
     *
     * @param name - The name of the route to navigate to.
     */
    function navigateToViaName(name: RouteName): void {
        router.push({ name })
    }

    /**
     * Auto-generate navigation functions from ROUTE_NAMES.
     */
    const navigationFunctions = Object.entries(ROUTE_NAMES).reduce(
        (acc, entry) => {
            const routeName: RouteName = entry[1] // entry[1] to take the routeName, since entry[0] is key
            const fnName: string = `navigateTo${routeName}`
            ;(acc as Record<string, () => void>)[fnName] = () => navigateToViaName(routeName)
            return acc
        },
        {} as NavigationFunctions<typeof ROUTE_NAMES>
    )

    /**
     * Logs out the current user by clearing the `authToken`
     * from localStorage and redirecting to the Login page.
     */
    function logout(): void {
        localStorage.removeItem('authToken') // TODO: consider moving to useAuth composable
        navigationFunctions.navigateToLogin()
    }

    /**
     * Go back to the previous page in browser history.
     */
    function goBack(): void {
        router.back()
    }

    return {
        ...navigationFunctions,
        logout,
        navigateToViaName,
        goBack,
    }
}
