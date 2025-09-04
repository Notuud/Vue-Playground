import { useRouter } from 'vue-router'

export function useNavigation() {
    const router = useRouter()

    /** Named route helpers */
    function navigateToLogin() {
        router.push({ name: 'Login' })
    }

    function navigateToRegister() {
        router.push({ name: 'Register' })
    }

    function navigateToDashboard() {
        router.push({ name: 'Home' })
    }

    function navigateToPortfolio(id?: string) {
        router.push({ name: 'Portfolio', params: id ? { id } : {} })
    }

    /** Auth-related */
    function logout() {
        localStorage.removeItem('authToken') // TODO: consider moving to useAuth composable
        navigateToLogin()
    }

    /** Generic helpers */
    function navigateToViaName(name: string) {
        router.push({ name: name });
    }

    function navigateToViaPath(path: string) {
        router.push(path)
    }

    function goBack() {
        router.back()
    }

    return {
        navigateToLogin,
        navigateToRegister,
        navigateToDashboard,
        navigateToPortfolio,
        logout,
        navigateToViaPath,
        navigateToViaName,
        goBack,
    }
}
