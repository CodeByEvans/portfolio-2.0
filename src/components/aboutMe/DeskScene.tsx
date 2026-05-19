import type { RefObject } from "react";
import Paper from "./Paper";

interface Props {
  deskRef: RefObject<HTMLDivElement | null>;
  deskWrapperRef: RefObject<HTMLDivElement | null>;
  paperRef: RefObject<HTMLDivElement | null>;
  lines: string[];
  onPaperClick: () => void;
}

const DeskScene = ({ deskRef, deskWrapperRef, paperRef, lines, onPaperClick }: Props) => {
  return (
    <div ref={deskWrapperRef} className="relative z-10 w-[95%] max-w-4xl">
      {/* Patas */}
      <div
        className="absolute left-[10%] sm:left-[12%] -bottom-14 sm:-bottom-16 w-5 sm:w-6 h-14 sm:h-16 z-0"
        style={{
          background: "linear-gradient(to right, #1a0f08, #2a1a10, #1a0f08)",
          borderRadius: "0 0 4px 4px",
        }}
      />
      <div
        className="absolute right-[10%] sm:right-[12%] -bottom-14 sm:-bottom-16 w-5 sm:w-6 h-14 sm:h-16 z-0"
        style={{
          background: "linear-gradient(to right, #1a0f08, #2a1a10, #1a0f08)",
          borderRadius: "0 0 4px 4px",
        }}
      />

      {/* Superficie de la mesa */}
      <div
        ref={deskRef}
        className="relative z-10 w-full h-64 sm:h-84 flex flex-col items-center pt-4 sm:pt-6"
        style={{
          background: "linear-gradient(180deg, #8a5a38 0%, #7a4c2c 30%, #6e4225 60%, #623920 100%)",
          transform: "perspective(800px) rotateX(6deg)",
          transformOrigin: "bottom center",
          borderRadius: "3px 3px 0 0",
          boxShadow: "inset 0 2px 0 rgba(180,130,90,0.2), inset 0 30px 60px rgba(0,0,0,0.35)",
        }}
      >
        {/* Veta de madera */}
        <div
          className="absolute inset-0 rounded-t-[3px]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(88.5deg,
                transparent 0px, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 3.5px,
                transparent 3.5px, transparent 7px, rgba(0,0,0,0.12) 7px, rgba(0,0,0,0.12) 7.8px,
                transparent 7.8px, transparent 14px, rgba(0,0,0,0.06) 14px, rgba(0,0,0,0.06) 14.4px,
                transparent 14.4px, transparent 18px, rgba(0,0,0,0.04) 18px, rgba(0,0,0,0.04) 18.3px,
                transparent 18.3px, transparent 25px, rgba(0,0,0,0.10) 25px, rgba(0,0,0,0.10) 25.6px,
                transparent 25.6px, transparent 28px, rgba(0,0,0,0.05) 28px, rgba(0,0,0,0.05) 28.3px,
                transparent 28.3px, transparent 32px, rgba(0,0,0,0.07) 32px, rgba(0,0,0,0.07) 32.5px,
                transparent 32.5px, transparent 37px, rgba(0,0,0,0.03) 37px, rgba(0,0,0,0.03) 37.3px,
                transparent 37.3px, transparent 42px, rgba(0,0,0,0.09) 42px, rgba(0,0,0,0.09) 42.7px,
                transparent 42.7px, transparent 50px, rgba(0,0,0,0.05) 50px, rgba(0,0,0,0.05) 50.5px,
                transparent 50.5px, transparent 58px, rgba(0,0,0,0.11) 58px, rgba(0,0,0,0.11) 58.7px,
                transparent 58.7px, transparent 62px
              ),
              repeating-linear-gradient(180deg,
                transparent 0px, transparent 20px, rgba(80,50,30,0.08) 20px, rgba(80,50,30,0.08) 21px,
                transparent 21px, transparent 45px, rgba(60,35,20,0.06) 45px, rgba(60,35,20,0.06) 46px,
                transparent 46px, transparent 70px, rgba(80,50,30,0.07) 70px, rgba(80,50,30,0.07) 71.5px,
                transparent 71.5px, transparent 100px
              )
            `,
            opacity: 0.7,
          }}
        />

        <div className="flex-1" />
        <div
          ref={paperRef}
          className="mb-4 sm:mb-5 cursor-pointer group"
          onClick={onPaperClick}
        >
          <div className="transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_0_18px_rgba(234,179,8,0.4)] rounded-sm">
            <Paper lines={lines} />
          </div>
        </div>
      </div>

      {/* Cara frontal de la mesa */}
      <div
        className="relative z-10 w-full overflow-hidden"
        style={{
          height: "clamp(44px, 6vw, 76px)",
          background: "linear-gradient(to bottom, #4e2a14 0%, #3a1e0c 30%, #281408 60%, #1a0e05 100%)",
          borderRadius: "0 0 5px 5px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 8px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(160,100,60,0.12)",
        }}
      >
        {/* Veta vertical de madera */}
        <div
          className="absolute inset-0 rounded-b-[5px]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg,
                transparent 0px, transparent 6px, rgba(0,0,0,0.10) 6px, rgba(0,0,0,0.10) 6.8px,
                transparent 6.8px, transparent 14px, rgba(0,0,0,0.06) 14px, rgba(0,0,0,0.06) 14.5px,
                transparent 14.5px, transparent 22px, rgba(0,0,0,0.04) 22px, rgba(0,0,0,0.04) 22.3px,
                transparent 22.3px, transparent 30px, rgba(0,0,0,0.08) 30px, rgba(0,0,0,0.08) 30.6px,
                transparent 30.6px, transparent 38px, rgba(0,0,0,0.05) 38px, rgba(0,0,0,0.05) 38.4px,
                transparent 38.4px, transparent 46px, rgba(0,0,0,0.07) 46px, rgba(0,0,0,0.07) 46.5px,
                transparent 46.5px, transparent 55px, rgba(0,0,0,0.03) 55px, rgba(0,0,0,0.03) 55.3px,
                transparent 55.3px, transparent 65px, rgba(0,0,0,0.09) 65px, rgba(0,0,0,0.09) 65.7px,
                transparent 65.7px, transparent 80px
              )
            `,
            opacity: 0.5,
          }}
        />

        {/* Brillo central del monitor sobre la cara frontal */}
        <div
          className="absolute inset-0 opacity-[0.18] rounded-b-[5px]"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(180,130,90,0.8) 0%, transparent 55%)",
          }}
        />

        {/* Sombra proyectada al suelo */}
        <div
          className="absolute -bottom-12 left-[3%] right-[3%] h-14"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 40%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
};

export default DeskScene;
