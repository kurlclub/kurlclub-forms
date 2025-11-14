import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-secondary-blue-500 border-t border-white/10">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-sm text-white/60">
          <span>Powered by</span>
          <a
            href="https://kurlclub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src="/assets/svg/logo-light.svg"
              alt="Kurl Club Logo"
              width={100}
              height={24}
              className="rounded-md"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
