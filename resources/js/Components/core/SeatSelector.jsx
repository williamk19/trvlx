import Seat from './Seat';

const SeatSelector = ({
  data,
  rows,
  edit,
  seatSisa,
  seatDipilih,
  setSeatDipilih,
  seatTerpesan
}) => {

  return (
    <div>
      <h1 className='text-gray-900 md:text-lg lg:text-xl font-bold'>
        Silahkan Pilih Tempat Duduk
      </h1>
      <div className='mt-4'>
        {rows.map((row, idx) => {
          return (
            <div className='p-1 flex gap-2' key={idx}>
              {row.map((r) => (
                <Seat key={r.id} seatTerpesan={seatTerpesan} edit={edit} data={data} detail={r} seatDipilih={seatDipilih} setSeatDipilih={setSeatDipilih} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatSelector;
