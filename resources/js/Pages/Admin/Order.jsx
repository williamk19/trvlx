import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import CardOrder from '@/Components/Admin/Order/CardOrder';

const Order = (props) => {
  let { url } = usePage();
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
    </AuthenticatedLayout>
  );
};

export default Order;