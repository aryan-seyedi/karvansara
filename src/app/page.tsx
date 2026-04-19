import { supabase } from '@/lib/supabase';
import ClientHome from '@/components/ClientHome';

export const revalidate = 3600; // Cache for 1 hour

export default async function Home() {
  const { data: poets } = await supabase
    .from('poets')
    .select('*')
    .order('name_en', { ascending: true });

  return <ClientHome initialPoets={poets || []} />;
}
