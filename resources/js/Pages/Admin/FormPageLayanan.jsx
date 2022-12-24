import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import HeaderAdmin from '@/Components/admin/HeaderAdmin';
import { usePage } from '@inertiajs/inertia-react';
import FormLayanan from '@/Components/admin/Layanan/FormLayanan';

const FormPageLayanan = (props) => {
  let { url } = usePage();

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
    >
      <Head title="Create Layanan" />
      <HeaderAdmin
        title={'Layanan 🧑‍💻'}
        url={url}
        buttonLink={route('layanan.create')}
        addButton={false}
      />
      <FormLayanan
        itemLayanan={props.layanan}
        itemSopir={props.sopir}
        itemKendaraan={props.kendaraan}
        listSopir={props.listSopir}
        listKendaraan={props.listKendaraan}
      />
    </AuthenticatedLayout>
  );
};

export default FormPageLayanan;