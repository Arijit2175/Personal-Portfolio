const CopyEmailButton = () => {
  return (
    <button className="relative px-1 py-4 text-sm text-center
    rounded-full font-extralight bg-primary w-[12rem]
    cursor-pointer overflow-hidden">
        <p className="flex-items-center justify-center gap-2">
            <img src="assets/copy.svg" className="w-5" alt="copyicon"/>
            Copy Email Address
        </p>
    </button>
  );
};

export default CopyEmailButton