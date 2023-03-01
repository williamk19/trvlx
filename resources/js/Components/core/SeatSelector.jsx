import SeatPicker from 'react-seat-picker';
import { useState } from 'react';

const SeatSelector = ({ rows, seatSisa }) => {
  const [loading, setLoading] = useState(false);

  const addSeatCallback = async ({ row, number, id }, addCb) => {
    setLoading(true);
    // await new Promise(resolve => setTimeout(resolve, 1500));
    addCb(row, number, id);
    setLoading(false);
  };

  const removeSeatCallback = async ({ row, number, id }, removeCb) => {
    setLoading(true);
    // await new Promise(resolve => setTimeout(resolve, 1500));
    removeCb(row, number);
    setLoading(false);
  };

  const RenderSeat = ({ rows, seatSisa }) => {
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
          loading={loading}
          tooltipProps={{ multiline: true }}
        />
      )
    } else {
      return <>loading</>;
    }
  }

  return (
    <div>
      <h1 className='text-gray-900 text-xl font-bold'>
        Silahkan Pilih Tempat Duduk
      </h1>
      <div className='mt-4'>
        <RenderSeat rows={rows} seatSisa={seatSisa} />
      </div>
    </div>
  );
};

export default SeatSelector;
