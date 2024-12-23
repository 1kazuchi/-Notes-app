/* eslint-disable react/prop-types */

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="No notes" className="w-96" />
      <p className="w-1/2 text-md font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};
export default EmptyCard;
