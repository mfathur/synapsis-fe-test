type Props = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col pt-2 px-4 space-y-2 flex-grow md:ml-60">
      {children}
    </div>
  );
};

export default PageWrapper;
