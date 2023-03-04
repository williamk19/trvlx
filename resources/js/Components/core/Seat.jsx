import { useEffect, useState } from 'react';

const Seat = ({ detail, data, edit, seatDipilih, setSeatDipilih, seatTerpesan }) => {
  console.log(seatTerpesan);
  const [isSelected, setIsSelected] = useState(
    ((seatDipilih.some((e) => e.seatNumber === detail.id))
      ? true
      : false)
  );

  const [isTerpesan, setIsTerpesan] = useState(
    (seatTerpesan.some((e) => e.seat_number === detail.id))
      ? true
      : false
  );

  useEffect(() => {
    setIsTerpesan((seatTerpesan.some((e) => e.seat_number === detail.id))
      ? true
      : false);
  }, [seatTerpesan]);

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
      disabled={edit || isTerpesan}
      key={detail.id}
      type="checkbox"
      checked={isSelected || isTerpesan}
      onClick={(e) => onClickHandler(detail.id)}
      className="checkbox checkbox-accent bg-emerald-300" />
  );
};

export default Seat;
