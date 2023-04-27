import React, { useEffect, useState } from 'react';
import SidebarOrder from './SidebarOrder';
import DataOrder from './DataOrder';
import { Link, useForm, useRemember } from '@inertiajs/inertia-react';
import DataJemput from './DataJemput';
import DataTujuan from './DataTujuan';
import Modal from '@/Components/core/Modal';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';
import 'react-toastify/dist/ReactToastify.css';
import { Inertia } from '@inertiajs/inertia';

const FormOrder = ({
  type,
  jadwalData,
  seatTerpesan,
  edit,
  orderId,
  orderEdit,
  dateStart,
  seatSisa,
  seatTotal
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [date, setDate] = useState(dateStart);
  const [updateSeat, setUpdateSeat] = useRemember(false);
  const [seatEmpty, setSeatEmpty] = useRemember(seatSisa);
  const [dateShow, setDateShow] = useState(new Date(dateStart));
  const [idPembayaran, setIdPembayaran] = useState(orderEdit?.id_payment);
  const [seatDipilih, setSeatDipilih] = useState([]);

  const optionJadwal = jadwalData.map((l) => {
    return {
      label: `${l.kota_asal} - ${l.kota_tujuan} - (${l.biaya_jasa})`,
      options: l.schedules.map((s) => ({
        name: 'jadwal',
        label: `${l.kota_asal} - ${l.kota_tujuan} ${s.waktu.split(':').slice(0, -1).join(':')}`,
        value: s.id
      }))
    };
  });

  const { data, setData, post, processing, errors, reset, put } = useForm({
    nama_penumpang: orderEdit?.nama_penumpang ? orderEdit.nama_penumpang : '',
    tanggal_pemberangkatan: orderEdit?.tanggal_pemberangkatan ? new Date(orderEdit.tanggal_pemberangkatan) : new Date(),
    jumlah_seat: orderEdit?.total_seat ? orderEdit?.total_seat : 0,
    jadwal: orderEdit?.id_schedule ? orderEdit?.id_schedule : optionJadwal[0]?.options[0]?.value,
    latlng_asal: orderEdit?.lokasi ? {
      lat: orderEdit.lokasi.lat_asal,
      lng: orderEdit.lokasi.lng_asal
    } : {},
    alamat_asal: orderEdit?.lokasi ? orderEdit.lokasi.alamat_asal : "",
    deskripsi_asal: orderEdit?.lokasi.deskripsi_asal ? orderEdit.lokasi.deskripsi_asal : "",
    latlng_tujuan: orderEdit?.lokasi ? {
      lat: orderEdit.lokasi.lat_tujuan,
      lng: orderEdit.lokasi.lng_tujuan
    } : {},
    alamat_tujuan: orderEdit?.lokasi ? orderEdit.lokasi.alamat_tujuan : "",
    deskripsi_tujuan: orderEdit?.lokasi.deskripsi_tujuan ? orderEdit.lokasi.deskripsi_tujuan : "",
    status: orderEdit?.status_pembayaran ? orderEdit?.status_pembayaran : 'confirmed',
    seatSelected: []
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
      setSeatDipilih([]);
      setSeatEmpty(seatSisa);
      setUpdateSeat(false);
    }
  }, [seatSisa, updateSeat]);

  useEffect(() => {
    if (update) {
      if (orderEdit) {
        Inertia.get(`/order/list/${orderId}/data`,
          { tanggalPemberangkatan: date, idJadwal: data.jadwal },
          {
            replace: true,
            preserveState: true,
            preserveScroll: true
          }
        );
      } else {
        Inertia.get(route(route().current()),
          { tanggalPemberangkatan: date, idJadwal: data.jadwal },
          {
            replace: true,
            preserveState: true,
            preserveScroll: true
          }
        );
      }
      setUpdate(false);
      setUpdateSeat(true);
      setSeatDipilih([]);
    }
  }, [date, data.jadwal]);

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

  const onSelectChange = (e) => {
    setData(e.name, e.value);
    setUpdate(true);
  };

  const onDateChange = (date) => {
    setData('tanggal_pemberangkatan', date);
    setDateShow(date);
  };

  const onLocationChange = (name, latLng) => {
    setData(name, latLng);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!orderEdit) {
      post(route('order.store'));
    } else {
      put(route('order.update', {
        order: orderEdit,
        ...data
      }));
    }
  };

  const formType = () => {
    switch (type) {
      case "data":
        return (
          <DataOrder
            seatTerpesan={seatTerpesan}
            edit={edit}
            optionJadwal={optionJadwal}
            data={data}
            jadwalData={jadwalData}
            errors={errors}
            seatSisa={seatEmpty}
            idPembayaran={idPembayaran}
            seatTotal={seatTotal}
            setData={setData}
            seatDipilih={seatDipilih}
            setSeatDipilih={setSeatDipilih}
            onDateChange={onDateChange}
            onSelectChange={onSelectChange}
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
      <div className="bg-white shadow-lg rounded-lg mb-8">
        <div className="flex flex-col md:-mr-px">
          <SidebarOrder
            tanggalPemberangkatan={date}
            idJadwal={data.jadwal}
            edit={edit}
            orderId={orderId} />
          {formType()}
          <footer>
            <div className={`flex
              justify-end
              px-6
              py-5
              border-t
              border-slate-200`}>
              <div className="flex self-end">
                {!edit && (
                  <button onClick={() => reset()} className="btn btn-error hover:bg-red-500 text-slate-100 border-slate-200 hover:border-slate-300">
                    Reset
                  </button>
                )}
                <button
                  disabled={processing || (edit && data.status === "confirmed" && seatEmpty - data.jumlah_seat < -1) || (edit && data.status !== "confirmed" && seatEmpty - data.jumlah_seat < 0) || (!edit && seatEmpty - data.jumlah_seat < 0)}
                  className={`btn ${processing && "loading"} bg-indigo-500 hover:bg-indigo-600 disabled:text-black text-white ml-3 border-none`}
                  onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}>
                  {edit ? 'Edit' : 'Tambahkan'}
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
                          {edit ? 'Edit' : 'Tambahkan'} Order Ke dalam Database?
                        </div>
                      </div>
                      <div className="text-sm mb-10">
                        <div className="space-y-2">
                          <p className='text-gray-800 font-medium text-sm'>
                            Apakah anda setuju untuk menambahkan pesanan / order ke dalam Database anda. Jika ya, maka anda dapat melihat data yang telah di tambahkan ke tabel order travel.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-end space-x-2">
                        <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => {
                          e.stopPropagation();
                          setModalOpen(false);
                        }}>Cancel</button>
                        <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            submit(e);
                            setModalOpen(false);
                          }}>Ya, {edit ? 'Edit Data' : 'Tambahkan'}</button>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </footer>
        </div >
      </div >
    </div >
  );
};

export default FormOrder;
