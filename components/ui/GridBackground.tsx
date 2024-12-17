const GridBackground: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={`relative min-h-screen ${className ?? ""}`}>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_400px_at_100%_200px,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_400px_at_100%_200px,#4a3a8c,transparent)]"></div>
      {children}
    </div>
  );
};

export default GridBackground;
