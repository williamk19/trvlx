import SeatPicker from 'react-seat-picker';
import { useEffect, useState } from 'react';

const SeatSelector = ({
  rows,
  seatSisa,
  seatDipilih,
  setSeatDipilih,
}) => {
  const RenderSeat = ({ rows, seatSisa, setSeatDipilih }) => {
    const [edit, setEdit] = useState(true);
    const [seatSelected, setSeatSelected] = useState([]);

    useEffect(() => {
      console.log('1');
      // setSeatDipilih(seatSelected);
    }, [seatSelected]);

    const addSeatCallback = async ({ row, number, id }, addCb) => {
      // setData('seat_dipilih', [...data.seat_dipilih, { seat_id: id }]);
      setEdit(true);
      setSeatSelected((prev) => [...prev, { seat_id: id }])
      addCb(row, number, id);
    };

    const removeSeatCallback = async ({ row, number, id }, removeCb) => {
      const deletedData = seatSelected.filter((e) => e.seat_id !== id);
      setSeatSelected(deletedData);
      removeCb(row, number);
    };

    if (rows.length > 0) {
      return (
        <SeatPicker
          addSeatCallback={addSeatCallback}
          removeSeatCallback={removeSeatCallback}
          rows={rows}
          maxReservableSeats={seatSisa}
          alpha
          visible
          selectedByDefault
        />
      );
    } else {
      return <>loading</>;
    }
  };

  return (
    <div>
      <h1 className='text-gray-900 md:text-lg lg:text-xl font-bold'>
        Silahkan Pilih Tempat Duduk
      </h1>
      <div className='mt-4'>
        <RenderSeat
          rows={rows}
          seatSisa={seatSisa}
          seatDipilih={seatDipilih}
          setSeatDipilih={setSeatDipilih} />
      </div>
    </div>
  );
};

export default SeatSelector;
