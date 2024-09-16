import Link from "next/link";
import Image from "next/image";

export default function SideBarButton({ image, text, href }) {
  return (
    <Link
      href="/"
      className="flex flex-row gap-3 w-full rounded-lg p-2 font-light hover:bg-blue-600/10 hover:text-blue-600 hover:underline"
    >
      {image && (
        <Image
          src={image}
          alt={text}
          width={24} // Adjust width as needed
          height={24} // Adjust height as needed
          // Adds margin to the right of the image
        />
      )}
      <p>{text}</p>
    </Link>
  );
}
