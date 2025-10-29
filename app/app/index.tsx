import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/hooks/useAuthStore';

export default function Index() {
  const isSignedIn = useAuthStore((s) => s.isSignedIn);
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // 延迟导航以确保路由系统完全初始化
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isReady) {
      if (!isSignedIn) router.replace('/(auth)/login' as any);
      else router.replace('/(tabs)/trips' as any);
    }
  }, [isSignedIn, router, isReady]);
  
  return null;
}
