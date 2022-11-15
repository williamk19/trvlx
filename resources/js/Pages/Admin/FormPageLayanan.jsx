import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import { usePage } from '@inertiajs/inertia-react';
import FormLayanan from '@/Components/Admin/Layanan/FormLayanan';

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
      <FormLayanan />
    </AuthenticatedLayout>
  );
};

export default FormPageLayanan;