import React, { useEffect } from 'react';
import SidebarOrder from './SidebarOrder';
import DataOrder from './DataOrder';
import { useForm, usePage } from '@inertiajs/inertia-react';
import DataJemput from './DataJemput';
import DataTujuan from './DataTujuan';

const FormOrder = ({ type }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    nama_penumpang: '',
    tanggal_pemberangkatan: new Date(),
    jumlah_seat: 1,
  });

  const onHandleChange = (event) => {
    if (event.target.name === 'telepon_user') {
      const re = /^[0-9\b]+$/;
      let number = event.target.value.replace(/^0+/, '');
      if (event.target.value === '' || re.test(event.target.value)) {
        setData(event.target.name, number);
      }
    } else if (event.target.type === 'checkbox') {
      setData(event.target.name, event.target.checked);
    } else {
      setData(event.target.name, event.target.value);
    }
  };

  const onDateChange = (date) => {
    setData('tanggal_pemberangkatan', date);
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  const formType = () => {
    switch (type) {
      case "data":
        return (
          <DataOrder
            data={data}
            errors={errors}
            onDateChange={onDateChange}
            onHandleChange={onHandleChange} />
        );
      case "jemput":
        return (
          <DataJemput
            data={data}
            onHandleChange={onHandleChange} />);
      case "tujuan":
        return (<DataTujuan />);
      default:
        return (<DataOrder />);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg mb-8">
        <div className="flex flex-col md:flex-row md:-mr-px">
          <SidebarOrder />
          {formType()}
        </div>
      </div>
    </div>
  );
};

export default FormOrder;