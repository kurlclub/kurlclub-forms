import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full pb-6 pt-4 flex items-center bg-secondary-blue-500 justify-center gap-2 text-sm text-white/60 border-t border-white/10">
      <span>Powered by</span>
      <a
        href="https://kurlclub.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center"
      >
        <Image
          src="/assets/svg/logo-light.svg"
          alt="Kurl Club Logo"
          width={100}
          height={24}
          className="rounded-md"
        />
      </a>
    </footer>
  );
};

export default Footer;
