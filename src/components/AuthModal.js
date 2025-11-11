export const AuthModal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="h-92 w-full max-w-screen-sm relative">{children}</div>
    </div>
  );
};
