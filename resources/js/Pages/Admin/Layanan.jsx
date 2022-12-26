import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import HeaderAdmin from '@/Components/admin/HeaderAdmin';
import TableLayanan from '@/Components/admin/Layanan/TableLayanan';
import { Inertia } from '@inertiajs/inertia';
import { toast, ToastContainer } from 'react-toastify';

const Layanan = (props) => {
  let { url } = usePage();
  const [searchQuery, setSearchQuery] = useState(props.query);
  const base_url = url.split("?").slice(0, 1).join();

  useEffect(() => {
    if (!_.isEmpty(props.flash.message) && props.flash.message.type === "info") {
      toast.info(`${props.flash.message.kota_asal} - ${props.flash.message.kota_tujuan} Berhasil Diubah`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (!_.isEmpty(props.flash.message) && props.flash.message.type === "error") {
      toast.error(`${props.flash.message.kota_asal} - ${props.flash.message.kota_tujuan} Berhasil Dihapus`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (!_.isEmpty(props.flash.message)) {
      toast.success(`${props.flash.message.kota_asal}, ${props.flash.message.kota_tujuan} Berhasil Dibuat`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [props.flash]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    if (searchQuery !== props.query) {
      if (searchQuery === "") {
        Inertia.visit(`${base_url}`, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      } else {
        Inertia.get(route(route().current()),
          { search: searchQuery },
          {
            replace: true,
            preserveState: true,
            preserveScroll: true
          }
        );
      }
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
      <TableLayanan layanan={props.layanan} />
      <ToastContainer />
    </AuthenticatedLayout>
  );
};

export default Layanan;