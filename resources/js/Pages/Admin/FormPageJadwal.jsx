import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import HeaderAdmin from '@/Components/admin/HeaderAdmin';
import { usePage } from '@inertiajs/react';
import FormLayanan from '@/Components/admin/Layanan/FormLayanan';
import FormJadwal from '@/Components/admin/Jadwal/FormJadwal';

const FormPageJadwal = (props) => {
  let { url } = usePage();

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
    >
      <Head title="Buat Jadwal" />
      <HeaderAdmin
        title={'Buat Jadwal Baru 🧑‍💻'}
        url={url}
        buttonLink={route('jadwal.create')}
        addButton={false}
      />
      <FormJadwal
        itemJadwal={props.jadwal}
        listSopir={props.listSopir}
        listLayanan={props.listLayanan}
        listKendaraan={props.listKendaraan}
      />
    </AuthenticatedLayout>
  );
};

export default FormPageJadwal;
