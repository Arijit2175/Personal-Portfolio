const CopyEmailButton = () => {
  const [copied, setCopied] = React.useState(false);
  const email = "arijitkarmakar2175@gmail.com";
  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onclick={copyToClipboard} className="relative px-1 py-4 text-sm text-center
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