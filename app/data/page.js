import { fetchNasaDataServer } from '@/lib/nasa-api';
import DataPageContent from '@/components/DataPageContent';

// ISR: revalide toutes les 24 heures pour sync avec les MAJ de NASA
// et éviter les mismatch avec le cache de la route
export const revalidate = 86400; // 24 heures

export default async function DataPage() {
  const data = await fetchNasaDataServer();

  return <DataPageContent data={data} />;
}