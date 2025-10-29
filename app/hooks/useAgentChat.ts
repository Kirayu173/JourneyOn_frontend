import { useCallback, useRef, useState } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

export function useAgentChat({ tripId, stage }: { tripId: string; stage: string | undefined }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '你好，我是你的旅行智能体助手。' },
  ]);
  const streamTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const send = useCallback((text: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }]);

    const full = `已收到你的需求（trip:${tripId} stage:${stage}）。\n\n建议：\n- 为你生成 3 天行程草案\n- 添加“预订酒店”到待办\n- 查看目的地天气`;

    let acc = '';
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    const words = full.split(/(\s+)/);
    let i = 0;
    if (streamTimer.current) clearInterval(streamTimer.current);
    streamTimer.current = setInterval(() => {
      acc += words[i] ?? '';
      i += 1;
      setMessages((prev) => {
        const copy = [...prev];
        for (let j = copy.length - 1; j >= 0; j--) {
          if (copy[j].role === 'assistant') {
            copy[j] = { role: 'assistant', content: acc };
            break;
          }
        }
        return copy;
      });
      if (i >= words.length && streamTimer.current) {
        clearInterval(streamTimer.current);
        streamTimer.current = null;
      }
    }, 25);
  }, [tripId, stage]);

  return { messages, send };
}
