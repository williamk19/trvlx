import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import HeaderAdmin from '@/Components/admin/HeaderAdmin';
import { usePage } from '@inertiajs/inertia-react';
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
        itemSopir={props.sopir}
        itemKendaraan={props.kendaraan}
        listSopir={props.listSopir}
        listLayanan={props.listLayanan}
        listKendaraan={props.listKendaraan}
      />
    </AuthenticatedLayout>
  );
};

export default FormPageJadwal;
