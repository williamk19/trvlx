import React, { useEffect, useState } from 'react';
import SidebarOrder from './SidebarOrder';
import DataOrder from './DataOrder';
import { useForm, usePage, useRemember } from '@inertiajs/inertia-react';
import DataJemput from './DataJemput';
import DataTujuan from './DataTujuan';
import Modal from '@/Components/core/Modal';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { Inertia } from '@inertiajs/inertia';

const FormOrder = ({ type, layananData, dateStart, seatSisa }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [date, setDate] = useState(dateStart);
  const [updateSeat, setUpdateSeat] = useRemember(false);
  const [seatEmpty, setSeatEmpty] = useRemember(seatSisa);
  const [dateShow, setDateShow] = useState(new Date(dateStart));

  const { data, setData, post, processing, errors, reset } = useForm({
    nama_penumpang: '',
    tanggal_pemberangkatan: new Date(),
    jumlah_seat: 1,
    layanan: 1,
    latlng_asal: {},
    alamat_asal: '',
    deskripsi_asal: '',
    latlng_tujuan: {},
    alamat_tujuan: '',
    deskripsi_tujuan: ''
  });

  useEffect(() => {
    if (!_.isEmpty(errors)) {
      toast.error('Ada yang belum terisi !', {
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
  }, [errors]);

  useEffect(() => {
    if (seatSisa === undefined) {
      seatSisa = seatEmpty;
    }
    if (updateSeat && (seatSisa !== seatEmpty)) {
      setSeatEmpty(seatSisa);
      setUpdateSeat(false);
    }
  }, [seatSisa, updateSeat]);

  useEffect(() => {
    if (update) {
      Inertia.get(route(route().current()),
        { tanggalPemberangkatan: date, idLayanan: data.layanan },
        {
          replace: true,
          preserveState: true,
          preserveScroll: true
        }
      );
      setUpdateSeat(true);
      setUpdate(false);
    }
  }, [date, data.layanan]);

  useEffect(() => {
    setDate(new Date(dateShow).toISOString().slice(0, 10));
    setUpdate(true);
  }, [dateShow]);

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
    setDateShow(date);
  };

  const onSelectChange = (e) => {
    setData(e.target.name, e.target.value);
    setUpdate(true);
  };

  const onLocationChange = (name, latLng) => {
    setData(name, latLng);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('client-order.store'));
  };

  const formType = () => {
    switch (type) {
      case "layanan":
        return (
          <DataOrder
            data={data}
            layananData={layananData}
            errors={errors}
            onSelectChange={onSelectChange}
            onDateChange={onDateChange}
            onHandleChange={onHandleChange} />
        );
      case "data":
        return (
          <DataOrder
            data={data}
            layananData={layananData}
            seatSisa={seatEmpty}
            errors={errors}
            onSelectChange={onSelectChange}
            onDateChange={onDateChange}
            onHandleChange={onHandleChange} />
        );
      case "jemput":
        return (
          <DataJemput
            data={data}
            errors={errors}
            onLocationChange={onLocationChange}
            onHandleChange={onHandleChange} />);
      case "tujuan":
        return (
          <DataTujuan
            data={data}
            errors={errors}
            onReset={reset}
            onLocationChange={onLocationChange}
            onHandleChange={onHandleChange} />);
      default:
        return (
          <DataOrder
            data={data}
            errors={errors}
            onDateChange={onDateChange}
            onHandleChange={onHandleChange} />);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg">
        <div className="flex flex-col md:-mr-px">
          <SidebarOrder />
          {formType()}
          <footer className='mt-4'>
            <div className="flex flex-col px-6 py-5 border-t border-slate-200">
              <div className="flex self-end">
                <button onClick={() => reset()} className="btn btn-error hover:bg-red-500 text-slate-100 border-slate-200 hover:border-slate-300">
                  Reset
                </button>
                <button disabled={processing || (seatEmpty - data.jumlah_seat < 0)} className={`btn ${processing && "loading"} bg-indigo-500 hover:bg-indigo-600 disabled:text-black text-white ml-3 border-none`} onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}>
                  Pesan Travel
                </button>
                <Modal id="info-modal" modalOpen={modalOpen} setModalOpen={setModalOpen}>
                  <div className="p-5 flex space-x-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-indigo-100">
                      <svg className="w-4 h-4 shrink-0 fill-current text-indigo-500" viewBox="0 0 16 16">
                        <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
                      </svg>
                    </div>
                    <div>
                      <div className="mb-2">
                        <div className="text-lg font-semibold text-slate-800">
                          Apakah data yang anda masukkan sudah benar?
                        </div>
                      </div>
                      <div className="text-sm mb-10">
                        <div className="space-y-2">
                          <p className='text-gray-800 font-medium text-sm'>
                            Pastikan anda memasukkan data secara jelas dan benar. Apabila terjadi kesalahan anda dapat menghubungi admin melalui WA.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-end space-x-2">
                        <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => {
                          e.stopPropagation();
                          setModalOpen(false);
                        }}>Cancel</button>
                        <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={(e) => {
                          e.stopPropagation();
                          submit(e);
                          setModalOpen(false);
                        }}>Ya, Pesan Travel</button>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default FormOrder;
