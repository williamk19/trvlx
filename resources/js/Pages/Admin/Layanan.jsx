import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import TableLayanan from '@/Components/Admin/Layanan/TableLayanan';
import NotificationAdmin from '@/Components/Admin/NotificationAdmin'; 
import { Inertia } from '@inertiajs/inertia';

const Layanan = (props) => {
  let { url } = usePage();
  const [notificationOpen, setNotificationOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(props.query);
  const base_url = url.split("?").slice(0, 1).join();

  useEffect(() => {
    if (notificationOpen === true) {
      setTimeout(() => {
        setNotificationOpen(false);
      }, 5000);
    }
  }, [notificationOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    if (searchQuery !== props.query) {
      Inertia.get(route(route().current()),
        { search: searchQuery },
        {
          replace: true,
          preserveState: true,
          preserveScroll: true
        }
      );
    } else if (searchQuery === "") {
      Inertia.visit(`${base_url}`, {
        replace: true,
        preserveState: true,
        preserveScroll: true
      });
    }
  }, [searchQuery]);

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
        searchQuery={searchQuery}
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
      <TableLayanan layanan={props.layanan} />
    </AuthenticatedLayout>
  );
}

export default Layanan;