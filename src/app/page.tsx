import { redirect } from 'next/navigation';

export default function Home() {
  // Ana sayfa için varsayılan dile yönlendirme
  redirect('/tr');

  // Not: Bu return ifadesi sadece TypeScript hatasını önlemek için
  // Redirect zaten önceki satırda çalışacaktır
  return null;
}
