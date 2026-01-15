import Image from "next/image";

export default function Splash() {
  return (
    <>
      <div
        className={
          "w-full min-h-screen bg-primary flex justify-center items-center text-white"
        }
      >
        <div
          className={
            "animate-bounce gap-3 flex items-center justify-center flex-col"
          }
        >
          <Image
            src={"/icon.svg"}
            alt={"Icon"}
            width={100}
            height={100}
            className={"bg-white rounded-2xl p-5"}
          />
          <h1
            className={
              "font-normal text-3xl font-phosphate leading-9 text-center"
            }
          >
            QIXLY
            <br /> Deals
          </h1>
        </div>
      </div>
    </>
  );
}
