import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import HeaderKendaraan from '@/Components/Kendaraan/HeaderKendaraan';
import TableKendaraan from '@/Components/Kendaraan/TableKendaraan';

const Kendaraan = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [kendaraan, setKendaraan] = useState(props.kendaraan);
  let { url } = usePage();

  useEffect(() => {
    const temp = props.kendaraan.filter((k) => (
      k.nama_mobil.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.merk_mobil.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    setKendaraan(temp);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kendaraan</h2>}
    >
      <Head title="Kendaraan" />
      <HeaderKendaraan
        url={url}
        handleSearch={handleSearch}
      />
      <TableKendaraan kendaraan={kendaraan} />
    </AuthenticatedLayout>
  );
};

export default Kendaraan;