import AppLogo from "../assets/ecosync-lg.svg";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div className="w-[45%] p-10">
        <div className="max-w-[400px] mx-auto h-full">{children}</div>
      </div>
      <div className="bg-gradient-to-b from-[#49D077] to-[#07401B] w-full">
        <div className="bg-[url('/garbage-collection.png')] bg-no-repeat bg-contain bg-bottom w-full h-full flex flex-col items-center pt-[20vh]">
          <AppLogo />
          <p className="text-white text-center text-xl mt-3">
            Environmental cleanliness begins with each individual <br /> desire
            to be clean
          </p>
        </div>
      </div>
    </div>
  );
};
