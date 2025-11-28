import bg from '../../../public/logo/bg.png';

interface VerifyOTPBackgroundImageProps {
  children: React.ReactNode;
}

export function VerifyOTPBackgroundImage({ children }: VerifyOTPBackgroundImageProps) {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {children}
    </div>
  );
}

