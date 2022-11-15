import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import TableLayanan from '@/Components/Admin/Layanan/TableLayanan';
import NotificationAdmin from '@/Components/Admin/NotificationAdmin';

export default function Dashboard(props) {
  let { url } = usePage();
  const [searchQuery, setSearchQuery] = useState('');
  const [layanan, setLayanan] = useState(props.layanan);
  const [notificationOpen, setNotificationOpen] = useState(true);

  useEffect(() => {
    const temp = props.layanan.filter((l) => (l.kota_asal.toLowerCase().includes(searchQuery) || l.kota_tujuan.toLowerCase().includes(searchQuery)));
    setLayanan(temp);
  }, [searchQuery]);

  useEffect(() => {
    if (notificationOpen === true) {
      setTimeout(() => {
        setNotificationOpen(false);
      }, 5000);
    }
  }, [notificationOpen]);

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
      {props.flash?.message && (
        <NotificationAdmin
          type={props.flash?.message.type}
          className={'transition-all delay-1000 absolute font-bold top-20 right-8'}
          open={notificationOpen}
          setOpen={setNotificationOpen}>
          {`${props.flash?.message}`}
        </NotificationAdmin>
      )}
      <TableLayanan layanan={layanan} />
    </AuthenticatedLayout>
  );
}
