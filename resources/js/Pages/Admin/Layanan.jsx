import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import TableLayanan from '@/Components/Admin/Layanan/TableLayanan';

export default function Dashboard(props) {
  let { url } = usePage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Layanan</h2>}
    >
      <Head title="Layanan" />
      <HeaderAdmin
        title={'Layanan 🧑‍💻'}
        url={url}
        buttonLink={route('layanan.create')}
        handleSearch={handleSearch}
        addButton={true}
      />
      <TableLayanan layanan={props.layanan} />
    </AuthenticatedLayout>
  );
}
