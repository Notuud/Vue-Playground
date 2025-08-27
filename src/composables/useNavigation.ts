import { useRouter } from 'vue-router'

export function useNavigation() {
    const router = useRouter()

    function navigateToLogin() {
        router.push('/login')
    }

    function navigateToRegister() {
        router.push('/register')
    }

    function logout() {
        localStorage.removeItem('authToken')
        router.push('/login')
    }

    function navigateToDashboard() {
        router.push('/dashboard')
    }

    function navigateToPortfolio(id?: string) {
        router.push(id ? `/portfolio/${id}` : '/portfolio')
    }

    /** Generic helpers */
    function navigateTo(path: string) {
        router.push(path)
    }

    function goBack() {
        router.back()
    }

    return {
        navigateToLogin,
        navigateToRegister,
        logout,
        navigateToDashboard,
        navigateToPortfolio,
        navigateTo,
        goBack,
    }
}
