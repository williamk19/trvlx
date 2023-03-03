import { useEffect, useState } from 'react';

const Seat = ({ detail, data, edit, seatDipilih, setSeatDipilih, seatTerpesan }) => {
  // const seatSelectionHandler = () => {}

  const [isSelected, setIsSelected] = useState(
    (seatDipilih.some((e) => e.seatNumber === detail.id))
      ? true
      : false
  );

  // useEffect(() => {
  //   if (edit && seatTerpesan.length > 0) {
  //     if (seatTerpesan.some((e) => e.seat_number === detail.id)) {
  //       console.log(seatTerpesan);
  //       setIsSelected(true);
  //     }
  //   }
  // }, [edit, seatTerpesan])

  // useEffect(() => {
  //   if (edit && seatTerpesan.length > 0) {
  //     if (seatTerpesan.some((e) => e.seat_number === detail.id)) {
  //       console.log({seatNumber: detail.id});
  //       setSeatDipilih("asjidosa");
  //     }
  //   }
  // }, [seatTerpesan])

  useEffect(() => {
    if (seatDipilih.length === 0) {
      setIsSelected(false);
    }
  }, [seatDipilih]);

  useEffect(() => {
    if (isSelected) {
      if (!data.seatSelected.some((e) => e.seatNumber === detail.id)) {
        setSeatDipilih((prev) => [...prev, { seatNumber: detail.id }]);
      }
    } else {
      const deletedData = seatDipilih.filter((e) => e.seatNumber !== detail.id);
      setSeatDipilih(deletedData);
    }
  }, [isSelected]);

  const onClickHandler = (detail) => {
    setIsSelected(!isSelected);
  };

  return (
    <input
      disabled={edit}
      key={detail.id}
      type="checkbox"
      checked={isSelected}
      onClick={(e) => onClickHandler(detail.id)}
      className="checkbox checkbox-accent bg-emerald-300" />
  );
};

export default Seat;
