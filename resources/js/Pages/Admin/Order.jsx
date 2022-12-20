import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import CardOrder from '@/Components/Admin/Order/CardOrder';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const Order = (props) => {
  let { url } = usePage();
  useEffect(() => {
    if (!_.isEmpty(props.flash.message) && props.flash.message.type === "info") {
      toast.info(`Order Berhasil Diubah`, {
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
      toast.error(`Order Berhasil Dihapus`, {
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
      toast.success(`Order Berhasil Dibuat`, {
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

  const items = [
    {
      id: 0,
      category: '1',
      title: 'Input Order Travel',
      link: 'order.create',
      content: 'Memasukan data order travel pengguna ke dalam database',
    },
    {
      id: 1,
      category: '2',
      title: 'Daftar Order Travel',
      link: 'order.list',
      content: 'Melihat semua orderan yang diterima oleh penyedia jasa travel',
    }
  ];

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kendaraan</h2>}
    >
      <Head title="Travel Order" />
      <HeaderAdmin
        title='Travel Order ⏩'
        url={url}
        buttonLink={route('order.create')}
        addButton={true}
      />
      <div className="grid grid-cols-12 gap-6">
        {items.map((item) => (
          <CardOrder
            key={item.id}
            id={item.id}
            category={item.category}
            title={item.title}
            link={item.link}
            content={item.content}
          />
        ))}
      </div>
      <ToastContainer />
    </AuthenticatedLayout>
  );
};

export default Order;