import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import HeaderAdmin from '@/Components/admin/HeaderAdmin';

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
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <HeaderAdmin
        title={'Layanan 🧑‍💻'}
        url={url}
        handleSearch={handleSearch}
        addButton={true}
      />
    </AuthenticatedLayout>
  );
}
