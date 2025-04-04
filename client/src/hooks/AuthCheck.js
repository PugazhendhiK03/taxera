// src/hooks/useAuthCheck.js
export function useAuthCheck() {
    const [isLoading, setIsLoading] = useState(true);
    const { setUser } = useAuth();
  
    useEffect(() => {
      apiClient.get('/api/user')
        .then(res => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setIsLoading(false));
    }, []);
  
    return isLoading;
  }