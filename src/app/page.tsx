import { supabase } from '@/lib/supabase';
import ClientHome from '@/components/ClientHome';

export const revalidate = 3600; // Cache for 1 hour

export default async function Home() {
  try {
    const { data: poets, error } = await supabase
      .from('poets')
      .select('*')
      .order('name_en', { ascending: true });

    if (error) {
      console.error('Supabase error in Home:', error);
    }

    return <ClientHome initialPoets={poets || []} />;
  } catch (err) {
    console.error('Unexpected error in Home:', err);
    return <ClientHome initialPoets={[]} />;
  }
}
