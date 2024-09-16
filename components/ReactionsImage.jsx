import Image from "next/image";
import clsx from "clsx";

export default function ReactionsImage({ reaction, toLeft, zIndex }) {
  return (
    <Image
      src={`/${reaction}.svg`}
      className={clsx(
        `size-7 bg-gray-100 p-1 rounded-full border border-white z-${zIndex}`,
        {
          "ml-[-0.7rem]": toLeft,
        }
      )}
      width={28}
      height={28}
    />
  );
}
