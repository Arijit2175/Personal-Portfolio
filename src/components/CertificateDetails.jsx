import { motion } from "motion/react";

const CertificateDetails = ({ certificate, closeModal }) => {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 backdrop-blur-sm">
      <motion.div
        className="relative w-full max-w-2xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm top-5 right-5 bg-midnight/90 hover:bg-gray-500"
          aria-label="Close certificate details"
        >
          <img src="assets/close.svg" className="w-6 h-6" alt="Close" />
        </button>

        <img
          src={certificate.image}
          alt={certificate.title}
          className="object-cover w-full rounded-t-2xl h-52"
        />

        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={certificate.logo}
              alt={certificate.organization}
              className="w-10 h-10 p-1 rounded-lg bg-white/10"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">{certificate.title}</h3>
              <p className="text-sm text-neutral-400">{certificate.organization}</p>
            </div>
          </div>

          <p className="mb-3 text-sm text-neutral-400 md:text-base">
            {certificate.description}
          </p>
          <p className="text-sm text-neutral-500">Issued: {certificate.issued}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateDetails;
