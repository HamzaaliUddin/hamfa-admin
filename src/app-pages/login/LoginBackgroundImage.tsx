import bg from '../../../public/logo/bg.png';

interface LoginBackgroundImageProps {
  children: React.ReactNode;
}

export function LoginBackgroundImage({ children }: LoginBackgroundImageProps) {
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

